const { verify } =  require("jsonwebtoken")

exports.validateToken = (req,res,next) => {
    let token = req.get("authorization");
   // let token = req.getHeader("authorization");
    console.log(req)
    if(token){
        token = token.slice(7);
        verify(token,process.env.TOKEN_HASH,(err,decoded) =>{
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
