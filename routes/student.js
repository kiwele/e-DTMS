var express = require('express');
var router = express.Router();
var staffController = require('../controllers/staff')
var auth = require('../utils/auth')
var userModels = require('../models/user')
var jwt = require('jsonwebtoken')
var env = require('dotenv')
var auth = require('../utils/auth')




env.config()


router.get('/student_docreceive', async (req, res) => {
    let data = auth.details(req);
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;

    userModels.receiveDocument(username, function (data) {
        res.render('student_receive', { notifications,username:fullName, fetchData: data });
    });
})


module.exports = router;