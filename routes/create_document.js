var multer = require('multer')
var express = require('express')
var router = express.Router()
var applController = require('../controllers/appload')
var userModels = require('../models/user')
var auth = require('../utils/auth')
const staffController = require('../controllers/staff')
var jwt = require('jsonwebtoken')




router.get('/create_document',auth.verify, 

async (req, res) => {
 
  let data = auth.details(req);
  let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
  const notifications = await staffController.natification({ user_id: username })

  let names = await  userModels.giveNames(data.username)
  let fullName = names[0].first_name + ' ' + names[0].middle_name;

  res.render('create_document', {message:"",username:fullName, notifications})
}
);

router.post('/create_document',auth.verify, multer({
  storage: applController.document(), fileFilter:
    (req, file,cb) => {
      if (file.mimetype !== "application/pdf") {
        req.fileValidationError = "goes wrong on the mime type";
        return cb(null, false, new Error("goes wrong on the mime type"));
        }
      cb(null, true);
    }
}).array("file",5),
  async (req, res, next) => {
    let data = auth.details(req);
    docname = req.body.docType;
    filee = req.files;
    username = data.username;
    leter  = filee[0].filename;
    supot1 = filee[1].filename;
    supot2 = filee[2].filename;
    
    
    const succ =  await userModels.seccessor(username);
     
    let destiny = await userModels.destiny(succ);
    console.log(destiny)
     
   info = { docname, leter, username, destiny,supot1,supot2 };
   userModels.appload(info, function (error, data) {});
   

//getting back to document creation page    
    if(username != 10 && username != 20 && username != 100  ){
      
      let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
      const notifications = await staffController.natification({ user_id: username })

      res.redirect('/staff_create_document')
      res.render("staff_create_document", 
      { message: "Congratulations!! document submitted successifully.", notifications });
  } else{
    
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    res.render("create_document", 
    { message: "Congratulations!! document submitted successifully.", 
    username:data.username , notifications  });  
  }
  
  })

module.exports = router
