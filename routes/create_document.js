var multer = require('multer')
var express = require('express')
var router = express.Router()
var applController = require('../controllers/appload')
var userModels = require('../models/user')
var auth = require('../utils/auth')
const staffController = require('../controllers/staff')
var jwt = require('jsonwebtoken')




router.get('/create_document',auth.verify, async (req, res) => {
 
  let data = auth.details(req);
  let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
  const notifications = await staffController.natification({ user_id: username })
  
  res.render('create_document', {message:"",username:data.username, notifications})
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
  async (req, res, next) => {
    let data = auth.details(req);
    docname = req.body.docType;
    filee = req.file;
    username = data.username;
  
    info = { docname, filee, username };
    userModels.appload(info, function (error, data) {});

//getting back to document creation page    
    if(username != 10 && username != 20){
      
      let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
      const notifications = await staffController.natification({ user_id: username })

      res.redirect('/staff_create_document')
      res.render("staff_create_document", 
      { message: "Congratulations!! document sumitted successifully.", notifications });
  } else{
    
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    res.render("create_document", 
    { message: "Congratulations!! document sumitted successifully.", 
    username:data.username , notifications  });  
  }
  
  

  })

module.exports = router
