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
router.get('/special_test', (req, res) => {

    res.render("document/special_test");

    });

module.exports = router;