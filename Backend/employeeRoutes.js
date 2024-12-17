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


module.exports = router;

