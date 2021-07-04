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
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    userModels.receiveDocument(username, function (data) {
        res.render('student_receive', { notifications, fetchData: data });
    });
})

module.exports = router;