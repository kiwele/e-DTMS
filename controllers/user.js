var userModels = require('../models/user')
var bycript = require('bcryptjs')



module.exports.user = function(data){
   
   bycript.hash(data.password,10,(err,hash)=>{
      userModels.user({
         firstname: data.firstname,
         middlename: data.middlename,
         lastname: data.firstname,
         regnumber: data.regnumber,
         yearofstudy: data.yearofstudy,
         password: hash,
       })
   })
    
}

module.exports.userLogin = function(req,res) { 
    var credentials = {
        user_id: req.body.user_id,
        password: req.body.password,
      }
      
   
    if (credentials) {


      userModels.userLogin(credentials.user_id, function (data) {

        if (credentials) {


            userModels.userLogin(credentials.user_id, function (data) {
      
                bycript.compare(credentials.password, data[0].password, function (err, result) {
      
                    if (result == true) {
                       
                      res.redirect('/index')
                           
                         } else {
      
                             res.send('incorrect email and/or password')
                         }
                     });
      
      
             });
      
      
         } else {
             res.send('Please enter username and password')
      
       
          }
          


       


   } )

    }
}