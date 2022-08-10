var mysql = require('mysql')


const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"node_mysql_crud_db"
})
dbConn.connect(function(error){
    if(error) throw error;
    //console.log('Databse Connected Successfully');
})

module.exports = dbConn
//module.exports = dbConn
//exports.default = dbConn;\
