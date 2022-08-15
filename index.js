const express = require('express')
//const express = require ('express');
const bodyParser = require('body-parser')

const app = express();

const port = process.env.PORT || 5000;
// parser requests data cntent type application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({extended:false}))

//parser requests data content type application/json
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello not you me');
});
const employeeRoutes =  require('./src/routes/employee.routes.js')

app.use('/api/v1/employee',employeeRoutes);

//listen to port
app.listen(port,()=>{
    console.log("express running on port 500");
});