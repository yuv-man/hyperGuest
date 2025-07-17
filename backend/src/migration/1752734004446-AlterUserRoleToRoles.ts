import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserRoleToRoles1680000000001 implements MigrationInterface {
  name = 'AlterUserRoleToRoles1680000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users_temp" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "username" TEXT NOT NULL UNIQUE,
        "roles" TEXT NOT NULL DEFAULT '["User"]',
        "status" TEXT NOT NULL DEFAULT 'Enabled' CHECK (status IN ('Enabled', 'Disabled', 'Pending'))
      )
    `);

    await queryRunner.query(`
      INSERT INTO users_temp (id, username, roles, status)
      SELECT 
        id,
        username,
        json('[' || quote(role) || ']'),
        status
      FROM users
    `);

    await queryRunner.query(`DROP TABLE users`);

    await queryRunner.query(`ALTER TABLE users_temp RENAME TO users`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback to single role model
    await queryRunner.query(`
      CREATE TABLE "users_old" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "username" TEXT NOT NULL UNIQUE,
        "role" TEXT NOT NULL DEFAULT 'User',
        "status" TEXT NOT NULL DEFAULT 'Enabled'
      )
    `);

    await queryRunner.query(`
      INSERT INTO users_old (id, username, role, status)
      SELECT
        id,
        username,
        json_extract(roles, '$[0]'),
        status
      FROM users
    `);

    await queryRunner.query(`DROP TABLE users`);
    await queryRunner.query(`ALTER TABLE users_old RENAME TO users`);
  }
}
