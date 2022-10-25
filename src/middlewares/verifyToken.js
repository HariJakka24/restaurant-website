const jwt = require("jsonwebtoken");
require("dotenv").config();


//create a middleware which can verify bearer token
const verifyToken = (req, res, next) => {
    //get bearer token
    let bearerToken = req.headers.authorization;
    if(bearerToken == undefined){
        res.status(200).send({message:"unauthorized request"})
    }
    //extract token
    else{
        let token = bearerToken.split(" ") [1]
        //verify the token with same secret key used for encrytion
        //if token is invalid, it will throw error Object which will be caught by error handler
        try{
            jwt.verify(token, process.env.SECRET_KEY)

            //if no error
            next()
        }
        catch(err){
            next(new Error("session expired.. relogin to continue"))
        }
    }
}

module.exports = verifyToken;