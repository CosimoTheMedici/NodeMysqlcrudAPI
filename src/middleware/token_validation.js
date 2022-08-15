const { verify } =  require("jsonwebtoken")
require('dotenv').config();

exports.validateToken = (req,res,next) => {
    let token = req.get("authorization");
   // let token = req.getHeader("authorization");
    console.log(req)
    if(token){
        token = token.slice(7);
        const crypt_key = process.env.TOKEN_HASH1
        verify(token,crypt_key,(err,decoded) =>{
            console.log(crypt_key)
            if(err){
                res.json({
                    success:0,
                    status:401,
                    message:{err}
                });
            } else {
                next();
            }
        })
    } else {
        res.json({
            success: 0,
            status:401,
            message: "Access denied! unauthorized user"
        });
    }

}
