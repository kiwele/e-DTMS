var express = require('express');
var router = express.Router();
var userController =require('../controllers/user')
var userModels = require('../models/user')
var auth = require('../utils/auth')
var staffController = require('../controllers/staff')
var jwt = require('jsonwebtoken')


  
  router.get('/view_documents',auth.verify,  async (req, res) => {
    let info = auth.details(req);

    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })
     
    userModels.viewDocument(info.username,function (data) {        
        res.render('view_documents', { fetchData: data, username: info.username, notifications });
    });
});

module.exports = router;
