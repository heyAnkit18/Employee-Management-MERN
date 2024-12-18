// const mysql = require('mysql2');

// // Create a MySQL connection pool
// const pool = mysql.createPool({
//     host: 'localhost',    
//     user: 'root',           
//     password: '1806',       
//     database: 'employees',  
// });

// module.exports = pool.promise();


const mysql = require('mysql');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Replace with your MySQL username
  password: 'mysql123',  // Replace with your provided MySQL password
  database: 'employee',  // Use the database 'employee'
});

// Establish the connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;
