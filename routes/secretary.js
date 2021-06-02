var express = require('express');
var router = express.Router();
var staffController = require('../controllers/staff')

router.get('/index2', (req,res,next)=>{
    res.render('index2',{})
})
router.get('/staff_create_document', (req,res)=>{
    res.render('staff_create_document',{})
})


router.get('/receive_document', staffController.receiveDocument
)

router.get('/approve',(req , res)=>{
    res.render('approve');
})


router.get('/staff_view_document',staffController.viewDocument)

module.exports = router;