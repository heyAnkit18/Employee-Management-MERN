const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route to get employees with pagination
router.get('/employees', employeeController.getEmployees);

module.exports = router;
