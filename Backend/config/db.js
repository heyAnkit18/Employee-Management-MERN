const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',  
  user: 'root',       
  password: 'mysql123',       
  database: 'employees' 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); 
  }
  console.log('Connected to the database');
});

module.exports = db;

