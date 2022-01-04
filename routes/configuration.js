var express = require('express')
var router = express.Router()
var ejs = require('ejs')
ejs.open ='{{';
ejs.close ='}}';


router.get('/configuration', (req, res)=>{
    res.render('configuration/userconfig');
})

module.exports = router