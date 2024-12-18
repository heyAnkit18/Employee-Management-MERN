const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees with pagination
router.get('/', employeeController.getEmployees);

// Add a new employee
router.post('/', employeeController.addEmployee);

// Edit an employee
router.put('/:id', employeeController.editEmployee);

// Delete an employee
router.delete('/:id', employeeController.deleteEmployee);

// Get statistics
router.get('/statistics', employeeController.getStatistics);

// Get highest salary by department
router.get('/highestSalaryByDept', employeeController.getHighestSalaryByDept);

module.exports = router;

