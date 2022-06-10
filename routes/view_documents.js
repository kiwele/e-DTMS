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
    let names = await  userModels.giveNames(info.username)
    
    let fullName = names[0].first_name + ' ' + names[0].middle_name;
    
    userModels.viewDocument(info.username,function (data) {        
        res.render('view_documents', { fetchData: data, username: fullName, notifications });
    });
});

router.get('/track/:document', auth.verify, async (req, res) => {
  let  document_id =  req.params; 
  const trackInfo = await userController.trackDocument(document_id);
 
  let date_received =trackInfo.data[0].date_received;
  let destination = trackInfo.data2[0].position_name;
  let origin = trackInfo.data4[0].pname;
  let inf = {origin, destination, date_received}

  // console.log(trackInfo[0].positionName);
  res.status(200).json([inf]);


});

router.get('/viewDoc/:document', auth.verify, async (req, res) => {
  let  document_id =  req.params; 
  const trackInfo = await userController.updateDocument(document_id);
  res.status(200).json(trackInfo);
});



module.exports = router;
