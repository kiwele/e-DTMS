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
            password: hash,
        })
    })

}

module.exports.userLogin = function (req, res) {
    var credentials = {
        user_id: req.body.user_id,
        password: req.body.password,
    }

    let bool = (req.body.user_id != '' || req.body.password != '') ? true : false

    if (bool) {
        userModels.userLogin(credentials.user_id, function (error, data) {

            if (error) {
                console.log(error)
            } else {
                if (data != '') {
                    bycript.compare(credentials.password, data[0].password, function (err, result) {

                        if (result == true) {
                            const token = auth.token({ id: credentials.user_id })

                            let after = 3600000;
                            res.cookie('file', token, {
                                httpOnly: true,
                                secure: false,
                                maxAge: new Date().getTime() + after,
                            })
                            if(credentials.user_id != 10 && credentials.user_id != 20){
                                res.redirect('/index2')
                            } else{

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

//fetching document info from database
module.exports.viewDocument = (req, res) => {

    userModels.viewDocument(function (data) {
        let info = auth.details(req);
        res.render('view_documents', { fetchData: data, username: info.username });


    });

}