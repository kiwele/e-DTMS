var express = require('express');
var router = express.Router();
var staffController = require('../controllers/staff')
var auth = require('../utils/auth')
var userModels = require('../models/user')
var jwt = require('jsonwebtoken')
var env = require('dotenv')
var auth = require('../utils/auth')
var userController = require('../controllers/user')
var multer = require('multer')
var applController = require('../controllers/appload')



env.config()
router.get('/index2', async (req, res, next) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })
    res.render('index2', { notifications })
})


// router.get('/staff_create_document', async (req, res) => {

//     let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
//     const notifications = await staffController.natification({ user_id: username })

//     res.render('staff_create_document', { message: "", notifications })
// })

//gettind received page

router.get('/receive_document', async (req, res) => {
        let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })

        userModels.receiveDocument(username, function (data) {
            res.render('receive_document', { notifications, fetchData: data });
        });
    })

// geting approve page
router.get('/cancel', async (req, res) => {
    
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })
    res.render('cancel', { data: req.query.take[0],data1: req.query.take[1], message: "", notifications });
})

// approving the documents
router.post('/cancel', async (req, res, next) => {

    let user_id = auth.details(req)
    var cancelInfo = {
        sender: user_id.username,
        document_id: req.body.document_id,
        user_id: user_id.username,
        dest: req.body.destin,
        coment: req.body.coment,
    }
    userModels.cancelDocument(cancelInfo)
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })
        res.render('cancel', { data: "",data1:"", message: "Congratulations document has been approved" ,notifications});
})


router.get('/staff_view_document', async (req, res)=>{  
        let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })

         userModels.viewDocument(username, function (data) {
        res.render('staff_view_document', { fetchData: data, notifications });
    });        
})

router.get('/aprove/:document', async (req, res) => {
    let user_id = auth.details(req);
    let senderNumber = user_id.username;
    let  document_id =  req.params;
    const succ =  await userModels.seccessor(senderNumber)     
    let destiny = await userModels.destiny(succ);
    const aproveData = {senderNumber , document_id, destiny}

     await userModels.aproveButton(aproveData);   
  });


  
router.get('/feedback',auth.verify, async (req, res) => {
 
    let data = auth.details(req);
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })
    res.render('staff_create_document', {message:"",username:data.username, notifications})
  });
  
  router.post('/feedback',auth.verify, multer({
    storage: applController.document(), fileFilter:
      (req, file,cb) => {
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
      office = req.body.office_id;
      student_responded = req.body.student_no;
      filee = req.file;
      Sender_no = data.username;
       
     info = { docname, office, student_responded,filee,Sender_no};
     userModels.respond(info, function (error, data) {});
     
  
  //getting back to document creation page   
  
  let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
  const notifications = await staffController.natification({ user_id: username })

  
  res.render("staff_create_document", 
  { message: "Congratulations!! document responded successifully.", notifications });
  
})

router.get('/receive_response', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })


    let data = auth.details(req);
    
    const office_id = await userModels.giveOfficeId(data.username);

    userModels.receiveResponce(office_id, function (data) {
        res.render('response', { notifications, fetchData: data });
    });
})


module.exports = router;