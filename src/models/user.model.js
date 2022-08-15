var dbConn = require('../../config/db.config')


var User = function (user) {
    this.username       =   user.username;
    this.password       =   user.password;
    this.empolyeeID     =   user.empolyeeID;
}

User.createUser = (data,callBack) => {
    dbConn.query('INSERT INTO authentication SET ?',
    data,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
User.getUserByUsername = (username, callBack )=>{
    dbConn.query('SELECT * FROM authentication WHERE username=?',
    [username],
    (error,results,fields)=>{
        if(error){
            callBack(error)
        }
        return callBack(null,results[0]);
    })
}


module.exports = User;
