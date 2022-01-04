var jwt = require("jsonwebtoken")
var env = require('dotenv')

env.config()
module.exports.token = function ({ id }) {
    // expire after one hour
    return jwt.sign({
        username: id,
    }, process.env.SECRET, { expiresIn: 3600000 },);
}

module.exports.verify = function (req, res, next) {
    try{
        const token = req.headers.cookie.split('=');
        const  {error}  = jwt.verify(token[1], process.env.SECRET,);
        next();

    } catch(error){
                 
      
        if(error.name=="TokenExpiredError"){
            res.send('token expired ')
        }

        else if(error.name=="JsonWebTokenError"){
            res.send('jwt is malformed')
        }
        else{
            res.send("<html><head></head> <body> <p>cant veify pelease <button> <a href ='/'>login</a></button>   </p></body></html>")
        }
            //  error =[
            //     {
            //         name: 'TokenExpiredError',
            //         message: 'token expired',
            //         },

            //     {
            //         name: 'JsonWebTokenError',
            //         message: 'jwt malformed'
            //       }
            //     ] 

            //      if(error[0].name){
        
            //         res.send(error[0].message)
            //       }
            //       else if(error[1].name) 
            //       {
            //         res.send(error[1].message)  
            //       } else {
            //         res.send('baridi')
                      
            //       }
                  
    }
    
}

module.exports.details = function (req,res) {
    try{

        const token = req.headers.cookie.split('=');
   
        let data = jwt.verify(token[1], process.env.SECRET)
        return { username: data.username }

    } catch(error){
        res.redirect('/')

    }
   
}
