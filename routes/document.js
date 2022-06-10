var express = require('express');
var router = express.Router();
var staffController = require('../controllers/staff')
var auth = require('../utils/auth')
var userModels = require('../models/user')
var jwt = require('jsonwebtoken')
var env = require('dotenv')
var auth = require('../utils/auth')
var userController = require('../controllers/user')

//getting received page
env.config()
     
router.get('/special_test', async (req, res) => {

    let data = auth.details(req);
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;

    userModels.specialTest(username, function (data) {
        res.render('document/special_test', { username:fullName,notifications, fetchData: data });
    });
})


router.get('/special_exam', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })
    
    let data = auth.details(req);
    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;


    userModels.specialExam(username, function (data) {
        res.render('document/special_exam', {username:fullName, notifications, fetchData: data });
    });
})


router.get('/postpone_studies', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    let data = auth.details(req);
    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;

    userModels.postponeStudies(username, function (data) {
        res.render('document/postpone_studies', { username:fullName,notifications, fetchData: data });
    });
})


router.get('/resume_studies', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    let data = auth.details(req);
    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;

    userModels.resumeStudies(username, function (data) {
        res.render('document/resume_studies', {username:fullName, notifications, fetchData: data });
    });
})


module.exports = router;