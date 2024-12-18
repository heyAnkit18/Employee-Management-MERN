const db = require('../config/db');  // Assuming you have db.js for database connection

// Get all employees with pagination
exports.getEmployees = (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  
  if (page < 1 || limit < 1) {
    return res.status(400).json({ message: "Invalid page or limit values" });
  }

  const offset = (page - 1) * limit;
  const query = 'SELECT * FROM employees LIMIT ? OFFSET ?';

  db.query(query, [limit, offset], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching employees', error: err });
    }

    db.query('SELECT COUNT(*) AS total FROM employees', (err, countResults) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching total count', error: err });
      }

      const totalCount = countResults[0].total;
      const totalPages = Math.ceil(totalCount / limit);

      res.status(200).json({ employees: results, totalPages });
    });
  });
};

// Add an employee
exports.addEmployee = (req, res) => {
  const { department_id, name, dob, phone, photo, email, salary, status } = req.body;

  // Ensure that all required fields are present
  if (!department_id || !name || !dob || !phone || !email || !salary || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO employees (department_id, name, dob, phone, photo, email, salary, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [department_id, name, dob, phone, photo, email, salary, status], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding employee', error: err });
    }
    res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
  });
};

// Edit an employee
exports.editEmployee = (req, res) => {
  const employeeId = req.params.id;
  const { department_id, name, dob, phone, photo, email, salary, status } = req.body;

  // Ensure all required fields are present
  if (!department_id || !name || !dob || !phone || !email || !salary || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'UPDATE employees SET department_id = ?, name = ?, dob = ?, phone = ?, photo = ?, email = ?, salary = ?, status = ? WHERE id = ?';
  db.query(query, [department_id, name, dob, phone, photo, email, salary, status, employeeId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error editing employee', error: err });
    }
    res.status(200).json({ message: 'Employee updated successfully' });
  });
};

// Delete an employee
exports.deleteEmployee = (req, res) => {
  const employeeId = req.params.id;
  const query = 'DELETE FROM employees WHERE id = ?';
  db.query(query, [employeeId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting employee', error: err });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  });
};

// Get statistics
exports.getStatistics = (req, res) => {
  const query = `
    SELECT 
      d.name AS department_name,
      MAX(e.salary) AS highest_salary,
      COUNT(CASE WHEN e.salary BETWEEN 0 AND 50000 THEN 1 END) AS '0-50000',
      COUNT(CASE WHEN e.salary BETWEEN 50001 AND 100000 THEN 1 END) AS '50001-100000',
      COUNT(CASE WHEN e.salary > 100000 THEN 1 END) AS '100000+',
      (SELECT e2.name FROM employees e2 WHERE e2.department_id = d.id ORDER BY e2.dob ASC LIMIT 1) AS youngest_employee
    FROM 
      employees e
    INNER JOIN 
      departments d ON e.department_id = d.id
    GROUP BY 
      d.name;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching statistics', error: err });
    }

    res.status(200).json({ statistics: results });
  });
};

// Get highest salary by department
exports.getHighestSalaryByDept = (req, res) => {
  const query = `
    SELECT department_id, MAX(salary) AS highest_salary
    FROM employees
    GROUP BY department_id
  `;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching highest salary by department', error: err });
    }

    res.status(200).json({ highestSalaryByDept: result });
  });
};

// Get salary range wise employee count
exports.getSalaryRangeWiseCount = (req, res) => {
  const query = `
    SELECT 
      COUNT(CASE WHEN salary BETWEEN 0 AND 50000 THEN 1 END) AS '0-50000',
      COUNT(CASE WHEN salary BETWEEN 50001 AND 100000 THEN 1 END) AS '50001-100000',
      COUNT(CASE WHEN salary > 100000 THEN 1 END) AS '100000+'
    FROM employees
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching salary range count', error: err });
    }
    res.status(200).json({ salaryRangeCount: results[0] });
  });
};

// Get youngest employee by department
exports.getYoungestEmployeeByDept = (req, res) => {
  const query = `
    SELECT 
      d.name AS department_name,
      e.name AS youngest_employee
    FROM 
      employees e
    INNER JOIN 
      departments d ON e.department_id = d.id
    WHERE 
      e.dob = (SELECT MIN(dob) FROM employees WHERE department_id = d.id)
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching youngest employee by department', error: err });
    }

    res.status(200).json({ youngestEmployeeByDept: results });
  });
};
