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


router.get('/staff_create_document', (req, res) => {
    res.render('staff_create_document', { message: "" })
})

//gettind received page

router.get('/receive_document',auth.verify,staffController.receiveDocument, 
async (req, res, next) => {
    let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
    const notifications = await staffController.natification({ user_id: username })
    
    res.render('receive_document', { notifications});
})

// geting approve page
router.get('/approve', (req, res) => {
    res.render('approve', { data: req.query.take, message: "" });
})

// approving the documents
router.post('/approve', (req, res, next) => {

    let user_id = auth.details(req)
    var approveInfo = {
        sender: user_id.username,
        document_id: req.body.document_id,
        user_id: user_id.username,
        dest: req.body.destine,
        coment: req.body.coment,
    }
    userModels.approveDocument(approveInfo)
    res.render('approve', { data: "", message: "Congratulations document has been approved" });
})




router.get('/staff_view_document', auth.verify, staffController.viewDocument)

module.exports = router;