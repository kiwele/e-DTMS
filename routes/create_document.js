var multer = require('multer')
var express = require('express')
var router = express.Router()
var applController = require('../controllers/appload')
var userModels = require('../models/user')
var auth = require('../utils/auth')



router.get('/create_document',auth.verify,(req, res) => {
  let data = auth.details(req);
  res.render('create_document', {message:"",username:data.username})
});

router.post('/create_document',auth.verify, multer({
  storage: applController.document(), fileFilter:
    (req, file, cb) => {
      if (file.mimetype !== "application/pdf") {
        req.fileValidationError = "goes wrong on the mime type";
        return cb(null, false, new Error("goes wrong on the mime type"));

      }
      cb(null, true);
    }
}).single("file"),
  function (req, res, next) {
    let data = auth.details(req);
    docname = req.body.docType;
    filee = req.file;
    username = data.username;
  
    info = { docname, filee, username };
    userModels.appload(info, function (error, data) {});

//getting back to document creation page    
    if(username != 10 && username != 20){
      res.redirect('/staff_create_document')
      res.render("staff_create_document", 
      { message: "Congratulations!! document sumitted successifully." });
  } else{
    
    res.render("create_document", 
    { message: "Congratulations!! document sumitted successifully.", 
    username:data.username   });  
  }
  
  

  })

module.exports = router
