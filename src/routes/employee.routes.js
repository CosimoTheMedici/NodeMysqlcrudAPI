const express = require('express')
const router = express.Router();


const employeeController = require('../controllers/employee.controller');
const { validateToken } = require('../middleware/token_validation');


router.get('/',validateToken,employeeController.getEmployeeList);

//get emp by id
router.get('/:id', validateToken,employeeController.getEmployeeByID)

//create new employee
router.post('/',validateToken,employeeController.createNewEmployee);

router.put('/:id',validateToken,employeeController.updateEmployeeAllData);

router.post('/users',validateToken,employeeController.createEmployeeUser);

router.post('/users/login',employeeController.loginEmployeeUser);



module.exports = router;