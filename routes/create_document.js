var multer  = require('multer')
var express = require('express')
var router = express.Router()
var applController = require('../controllers/appload')
var userModels = require('../models/user')



router.get('/create_document', (req, res) => {
        res.render('create_document')
   });

router.post('/create_document',multer({storage:applController.image(), fileFilter: 
  (req,file, cb) => {
    if(file.mimetype !=="application/pdf"){
        req.fileValidationError = "goes wrong on the mime type";
        return cb(null, false, new Error("goes wrong on the mime type"));
        
    }
    cb(null, true);
}
}).single("file"), 
       function (req, res, next) {
     docname = req.body.docType;
     filee =req.file;

     info = { docname,filee};
     userModels.appload(info);
    
  })

  module.exports = router
