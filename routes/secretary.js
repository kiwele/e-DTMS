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

    let data = auth.details(req);
    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;
    res.render('index2', { notifications,username:fullName })
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
        //  console.log(notifications)

        let data = auth.details(req);
        let names = await  userModels.giveNames(data.username)
        let fullName = names[0].first_name + ' ' + names[0].middle_name;

        userModels.receiveDocument(username, function (data) {
            
            res.render('receive_document', { notifications,username:fullName, fetchData: data });
        });
    })

// geting cancel  page
router.get('/cancel', async (req, res) => {
    
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })
       
        let data = auth.details(req);
        let names = await  userModels.giveNames(data.username)
        let fullName = names[0].first_name + ' ' + names[0].middle_name;

    res.render('cancel', { username:fullName, data: req.query.take[0],data1: req.query.take[1], message: "", notifications });
})

// caceling the documents
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
       
        let data = auth.details(req);
        let names = await  userModels.giveNames(data.username)
        let fullName = names[0].first_name + ' ' + names[0].middle_name;

        res.render('cancel', { username:fullName, data: "",data1:"", message: "Congratulations document has been cancelled" ,notifications});
})


router.get('/staff_view_document', async (req, res)=>{  
        let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })
        
        let data = auth.details(req);
        let names = await  userModels.giveNames(data.username)
        let fullName = names[0].first_name + ' ' + names[0].middle_name;

         userModels.viewDocument(username, function (data) {
        res.render('staff_view_document', {username:fullName, fetchData: data, notifications });
    });        
})

router.get('/aprove/:document', async (req, res) => {
    let user_id = auth.details(req);
    let senderNumber = user_id.username;
    let  document_id =  req.params;

    const succ =  await userModels.seccessor(senderNumber)  
      
    let destiny = await userModels.destiny(succ);

    

 await userModels.updateStatus(document_id)
     const aproveData = {senderNumber , document_id, destiny}

      await userModels.aproveButton(aproveData); 
      
      
  });


  
router.get('/feedback',auth.verify, async (req, res) => {
 
    let data = auth.details(req);
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;

    res.render('staff_create_document', {username:fullName,message:"",notifications})
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

  let names = await  userModels.giveNames(data.username)
  let fullName = names[0].first_name + ' ' + names[0].middle_name;

  
  res.render("staff_create_document", {username:fullName, message: "Congratulations!! document responded successifully.", notifications });
  
})

router.get('/receive_response', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })


    let data = auth.details(req);
    
    const office_id = await userModels.giveOfficeId(data.username);

    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;

    userModels.receiveResponce(office_id, function (data) {
        res.render('response', {username:fullName, notifications, fetchData: data });
    });
})

// pushing responce to either student or office
router.get('/push_response', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })


    let data = auth.details(req);
    student = req.query.student;
    document_id = req.query.document_id;
    
    const succ =  await userModels.seccessor(student)     
    let destiny = await userModels.destiny(succ);

    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;
    
    // performend when final sender is not supposed to send to student
    if(destiny != data.username){
       
        let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })
        res.render('mvr_office', {username:fullName, data: student, data1: document_id, message: "", notifications });
        
        
    } else {
        // send direct to student
        let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })
        res.render('mvr_student', {username:fullName, data: student,data1: document_id, message: "", notifications });
    } 
})


router.post('/rsp_office', async (req, res)=>{
   
    let data = auth.details(req);

    let names = await  userModels.giveNames(data.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;
    
    office = req.body.office_id;
    student_responded = req.body.student_no;
    document_id = req.body.document_id;
    Sender_no = data.username;
     
   info = {office, student_responded,document_id,Sender_no};
   userModels.respondoffice(info); 
   let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })

   res.render('mvr_office', {username:fullName, data: "",data1: "", message: "Congratulation document responded successifull", notifications });


})

router.post('/rsp_student', async (req, res)=>{
   
    let user_id = auth.details(req)
    let names = await  userModels.giveNames(user_id.username)
    let fullName = names[0].first_name + ' ' + names[0].middle_name;

    var respondInfo = {
        sender: user_id.username,
        document_id: req.body.document_id,
        user_id: user_id.username,
        dest: req.body.destin,
        coment: "",
    }
    userModels.cancelDocument(respondInfo)
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })
        res.render('mvr_student', {username:fullName, data: "",data1:"", message: "Congratulations responce has been sent" ,notifications});


})


module.exports = router;