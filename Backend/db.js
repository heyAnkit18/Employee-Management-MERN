const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',    
    user: 'root',           
    password: '1806',       
    database: 'employees',  
});

module.exports = pool.promise();
