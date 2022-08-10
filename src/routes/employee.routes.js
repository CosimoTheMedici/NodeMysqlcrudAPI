const express = require('express')
const router = express.Router();


const employeeController = require('../controllers/employee.controller');

router.get('/',employeeController.getEmployeeList);

//get emp by id
router.get('/:id', employeeController.getEmployeeByID)

//create new employee
router.post('/',employeeController.createNewEmployee);

module.exports = router;