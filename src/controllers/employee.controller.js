// get all employee list
const EmployeeModel = require('../models/employee.model')

exports.getEmployeeList = (req, res)=>{
    EmployeeModel.getAllEmployees((err,employees) =>{
        console.log('We are here')
        if(err)
            res.send(err)
            console.log("Employee",employees);
            res.send(employees)       
    })
    
}

//get employee by ID

exports.getEmployeeByID = (req,res) => {
    EmployeeModel.getAllEmployeeeByID(req.params.id,(err,employee)=>{
        if(err)
        res.send(err);
        console.log("single employee daya",req.params.id)
        res.send(employee)

    })
}

//create a new employee
exports.createNewEmployee = (req,res)=>{
    console.log("create new employee ")
}