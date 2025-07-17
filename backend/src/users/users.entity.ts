import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserStatusEnum } from '../enums/userStatus';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column('simple-json', { default: ['User'] })
  roles: string[];

  @Column()
  status: UserStatusEnum;
}
