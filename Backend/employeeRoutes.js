const express = require('express');
const router = express.Router();
const db = require('./db');

// 1. List all employees with paging
router.get('/employees', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const [rows] = await db.execute(
            'SELECT * FROM employees LIMIT ?, ?',
            [(page - 1) * limit, parseInt(limit)]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Add a new employee
router.post('/employees', async (req, res) => {
    const { department_id, name, dob, phone, photo, email, salary, status } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO employees (department_id, name, dob, phone, photo, email, salary, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [department_id, name, dob, phone, photo, email, salary, status]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Edit an existing employee
router.put('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { department_id, name, dob, phone, photo, email, salary, status } = req.body;
    try {
        await db.execute(
            'UPDATE employees SET department_id = ?, name = ?, dob = ?, phone = ?, photo = ?, email = ?, salary = ?, status = ? WHERE id = ?',
            [department_id, name, dob, phone, photo, email, salary, status, id]
        );
        res.json({ message: 'Employee updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Delete an employee
router.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM employees WHERE id = ?', [id]);
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Get Department-wise highest salary
router.get('/stats/highest-salary', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT d.name AS department, MAX(e.salary) AS highest_salary
            FROM employees e
            JOIN departments d ON e.department_id = d.id
            GROUP BY e.department_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Salary range-wise employee count
router.get('/stats/salary-range', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
                CASE 
                    WHEN salary <= 50000 THEN '0-50000'
                    WHEN salary BETWEEN 50001 AND 100000 THEN '50001-100000'
                    ELSE '100000+' 
                END AS salary_range,
                COUNT(*) AS employee_count
            FROM employees
            GROUP BY salary_range
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Name and age of the youngest employee in each department
router.get('/stats/youngest-employee', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
                d.name AS department, 
                e.name AS employee_name, 
                TIMESTAMPDIFF(YEAR, e.dob, CURDATE()) AS age
            FROM employees e
            JOIN departments d ON e.department_id = d.id
            WHERE e.dob = (
                SELECT MIN(dob) FROM employees WHERE department_id = e.department_id
            )
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
