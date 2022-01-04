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
    // const trackInfo = await userController.trackDocument(document_id);   
     
    userModels.viewDocument(info.username,function (data) {        
        res.render('view_documents', { fetchData: data, username: info.username, notifications });
    });
});

router.get('/track/:document', auth.verify, async (req, res) => {
  let  document_id =  req.params; 
  const trackInfo = await userController.trackDocument(document_id);
  res.status(200).json(trackInfo);
});

router.get('/viewDoc/:document', auth.verify, async (req, res) => {
  let  document_id =  req.params; 
  const trackInfo = await userController.updateDocument(document_id);
  res.status(200).json(trackInfo);
});



module.exports = router;
