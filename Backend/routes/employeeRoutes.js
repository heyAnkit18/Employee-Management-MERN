const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Routes for employee operations
router.get('/employees', employeeController.getEmployees);
router.post('/employees', employeeController.addEmployee);
router.put('/employees/:id', employeeController.editEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

// Route for statistics
router.get('/statistics', employeeController.getStatistics);

module.exports = router;
