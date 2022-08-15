// get all employee list
const EmployeeModel = require('../models/employee.model')
const UserModel = require('../models/user.model')
const {genSaltSync,hashSync,compareSync} = require("bcrypt")
const { sign } = require('jsonwebtoken')

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
    //console.log("data ",req.body)
    const employeeReqData = new EmployeeModel(req.body)
    console.log('employeeReqData', employeeReqData);
    ///check null
    if(req.body.constructor === Object && Object.keys(req.body).length ===0){
        //res.send(400).send({success : false,message:'please fill all fields'})
    }else {
        console.log('valid datas')
        EmployeeModel.createEmployee(employeeReqData,(err,employee)=>{
            if(err)
                res.send(err)
                res.json({status:true,message:"Employee Created Successfully",data:employee})
            

        })
    }
}

exports.updateEmployeeAllData = (req,res) => {
    const employeeReqData = new EmployeeModel(req.body)
    //console.log('employee ',employeeReqData);

    if(req.body.constructor === Object && Object.keys(req.body).length===0){
        //res.send(400).send({success : false,message :'please fill all fields'})
    } else {
        console.log('valid data')
        EmployeeModel.updateEmployee(employeeReqData,req.params.id,(err,employee)=>{
            if(err)
                 res.send(err)
                 res.json({status:true,message:"Employee updated Successfully",data:employee})
        })
    }

    
}

exports.createEmployeeUser = (req,res) => {
    const body = req.body
    const salt = genSaltSync(10);
    body.password = hashSync(body.password,salt);

    //const userReqData = new EmployeeModel(body)

    UserModel.createUser(body,(err,results) =>{
        if(err){
        console.log(err)
        return res.status(500).json({
            success:0,
            message:"Database connection invalid"
        })
      }
      return res.status(200).json({
        success:1,
        data:results,
        message:"user added"
      })
    })
}

exports.loginEmployeeUser = (req,res) =>{
    const body = req.body;
    UserModel.getUserByUsername(body.username,(err,results) =>{
        if(err){
            console.log(err)
        }
        if(!results){
            return res.json({
                success:0,
                data:"Invalid email or password"
            });
        }
        const result = compareSync(body.password,results.password)
        if(result){
            results.password = undefined;
            const jsontoken = sign({result:results},"qwe1234",{
                expiresIn:"1h"
            });
            return res.json({
                success:1,
                message:"login successfully",
                token:jsontoken
            });
        } else {
            return res.json({
                success:0,
                data:"Invalid email or password"
            });
        }
    })

}