var express = require('express');
var router = express.Router();
var userController =require('../controllers/user')
var userModels = require('../models/user')
var auth = require('../utils/auth')


  
  router.get('/view_documents',auth.verify, userController.viewDocument);

module.exports = router;
