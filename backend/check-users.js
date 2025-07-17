const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Checking users in database...');

// Check existing users
db.all("SELECT id, username, roles, status FROM users", (err, rows) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log('Existing users:', rows);
  
  if (rows.length === 0) {
    console.log('No users found. Adding test user...');
    
    // Add a test user
    db.run(
      "INSERT INTO users (username, roles, status) VALUES (?, ?, ?)",
      ['aaa', JSON.stringify(['User']), 'Enabled'],
      function(err) {
        if (err) {
          console.error('Error adding user:', err);
        } else {
          console.log('Test user "aaa" added successfully with ID:', this.lastID);
        }
        db.close();
      }
    );
  } else {
    console.log('Users found in database');
    db.close();
  }
}); 