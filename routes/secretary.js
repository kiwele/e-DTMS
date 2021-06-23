var express = require('express');
var router = express.Router();
var staffController = require('../controllers/staff')
var auth = require('../utils/auth')
var userModels = require('../models/user')
var jwt = require('jsonwebtoken')
var env = require('dotenv')
var auth = require('../utils/auth')

env.config()
router.get('/index2', async (req, res, next) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })
    res.render('index2', { notifications })
})


router.get('/staff_create_document', async (req, res) => {

    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })

    res.render('staff_create_document', { message: "", notifications })
})

//gettind received page

router.get('/receive_document', async (req, res) => {
        let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })

        userModels.receiveDocument(username, function (data) {
            res.render('receive_document', { notifications, fetchData: data });
        });
    })

// geting approve page
router.get('/approve', async (req, res) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })
    res.render('approve', { data: req.query.take, message: "", notifications });
})

// approving the documents
router.post('/approve', async (req, res, next) => {

    let user_id = auth.details(req)
    var approveInfo = {
        sender: user_id.username,
        document_id: req.body.document_id,
        user_id: user_id.username,
        dest: req.body.destine,
        coment: req.body.coment,
    }
    userModels.approveDocument(approveInfo)
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })
        res.render('approve', { data: "", message: "Congratulations document has been approved" ,notifications});
})


router.get('/staff_view_document', async (req, res)=>{

    
        let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
        const notifications = await staffController.natification({ user_id: username })

         userModels.viewDocument(username, function (data) {
        res.render('staff_view_document', { fetchData: data, notifications });
    });        
})

module.exports = router;