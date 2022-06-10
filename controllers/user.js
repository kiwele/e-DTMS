var userModels = require('../models/user')
var bycript = require('bcryptjs')
var auth = require('../utils/auth')



module.exports.signup = function (data) {

    bycript.hash(data.password, 10, (err, hash) => {
        userModels.signup({
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.firstname,
            regnumber: data.regnumber,
            yearofstudy: data.yearofstudy,
            program:data.program,
            position:data.position,
            role:data.role,
            office:data.office,
            sucssessor:data.sucssessor,
            password: hash,
        })
    })

}


module.exports.userLogin = async(req, res)=>{
    
    var credentials = {
                       user_id: req.body.user_id, 
                       password: req.body.password,
                      }

    const role = await userModels.giverRole(credentials.user_id)
    if(role == 0){
        res.send("<p> user doesnt exist! Please  <a href='/'>login</a> with valid user </p>");
    }

    else {


        let bool = (req.body.user_id != '' || req.body.password != '') ? true : false

        if (bool) {
            userModels.userLogin(credentials.user_id, (error, data)=>{
    
                if (error) {
                    return error;
                } else {
                    if (data != '') {
                        bycript.compare(credentials.password, data[0].password, (err, result) =>{
    
                            if (result == true) {
                                const token = auth.token({ id: credentials.user_id })
    
                                let after = 3600000;
                                res.cookie('file', token, {
                                    httpOnly: true,
                                    secure: true,
                                     maxAge: after,
                                     // maxAge: new Date().getTime() + after,
                                })
                                
                                    if (role != 1) {
                                         res.redirect('/index2')
                                     }
                                     else {
                                             res.redirect('/index')
                                           }
    
                            } else {
                                res.render("login", { error: "Invalid username or password." })
                            }
                        });
                    } else {
                        res.render("login", { error: "Invalid username or password." })
                    }
                }
            })
    
        } else {
            res.render("login", { error: "Empty value is not allowed." })
        }
    }


    }
    
   


module.exports.trackDocument = function (document_id) {
    return new Promise(async (reject, resolve) => {
        try {
            const result = await userModels.trackDocument(document_id);
            // console.log(result);
            // let positionId =  await userModels. givePositionId(trackInfo[0].document_destination);
            // console.log(positionId[0].document_destination);
            resolve(result)
        }
        catch (error) {
            
           reject(error)
        }
    })
}

module.exports.updateDocument = function (document_id) {
    return new Promise(async (reject, resolve) => {
        try {
            const result = await userModels.updateDocument(document_id);
            resolve(result)
        }
        catch (error) {
            reject(error)
        }
    })
}

