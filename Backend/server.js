const express = require('express');
const cors = require('cors');
const db = require('./db');  // Importing the db connection
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());  // To parse JSON bodies

// POST route to add an employee
app.post('/api/employees', (req, res) => {
  const { department_id, name, dob, phone, photo, email, salary, status } = req.body;

  const query = `INSERT INTO employees (department_id, name, dob, phone, photo, email, salary, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [department_id, name, dob, phone, photo, email, salary, status], (err, result) => {
    if (err) {
      console.error('Error inserting employee:', err.message);  // More detailed logging
      return res.status(500).json({ message: 'Error inserting employee' });
    }
    res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
  });
});

// GET route to fetch employees with pagination
app.get('/api/employees', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query = `SELECT * FROM employees LIMIT ?, ?`;

  db.query(query, [offset, limit], (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err.message);
      return res.status(500).json({ message: 'Error fetching employees' });
    }
    res.status(200).json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
