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
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    userModels.specialTest(username, function (data) {
        res.render('document/special_test', { notifications, fetchData: data });
    });
})


router.get('/special_exam', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    userModels.specialExam(username, function (data) {
        res.render('document/special_exam', { notifications, fetchData: data });
    });
})


router.get('/postpone_studies', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    userModels.postponeStudies(username, function (data) {
        res.render('document/postpone_studies', { notifications, fetchData: data });
    });
})


router.get('/resume_studies', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    userModels.resumeStudies(username, function (data) {
        res.render('document/resume_studies', { notifications, fetchData: data });
    });
})


module.exports = router;