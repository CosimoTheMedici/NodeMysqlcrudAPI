var dbConn = require('../../config/db.config')

var Employee = function (employee) {
    this.first_name     =   employee.first_name;
    this.last_name      =   employee.last_name;
    this.email          =   employee.email;
    this.phone          =   employee.phone;
    this.organization   =   employee.organization;
    this.designation    =   employee.designation;
    this.salary         =   employee.salary;
    this.status         =   employee.status ? employee.status : 1;
    this.created_at     =   new Date();
    this.updated_at     =   new Date();
}

//get all employees

 Employee.getAllEmployees = (result) =>{
    dbConn.query('SELECT * FROM employees',(err,res) =>{
        if(err){
            console.log('Error while fetching employees', err);
            result(null,err);

        }else{
            console.log("Employees fetched successfully");
            result(null,res);
        }
    })

}

//get employee by ID from DB

Employee.getAllEmployeeeByID = (id, result ) => {
    console.log("id2",id)
    dbConn.query('SELECT * FROM employees WHERE id=?',id , (err,res)=>{
        if(err){
            console.log('Error while fetching by id',err);
            result(null,err);
        }else 
        {
            result(null,res)
        }

    })

}
//create new employee
Employee.createEmployee = (employeeReqData, result)=>{
    dbConn.query('INSERT INTO employees SET ?',employeeReqData,(err,res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null,err);
            //result(null,{status:false,message:err});
        }else {
            console.log('Emlployee Created successfully')
            result(null,res)
            //result(null,{status: true,message:'Employee Created successfully',insertId:res.id})
        }
    })
}

Employee.updateEmployee = (employeeReqData,id,result)=>{
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employeeReqData.first_name,employeeReqData.last_name,employeeReqData.email,employeeReqData.phone,employeeReqData.organization,employeeReqData.designation,employeeReqData.salary, id],(err,res) =>{
        if(err){
            console.log('Error while updating user')
            result(null,err);
        }else {
            console.log('Employee updated successfully')
            result(null,res)
        }
    })

}

module.exports = Employee;
