var express = require('express');
var router = express.Router();


router.get('/receive_document', (req ,res) => {
    res.render('receive_document');
} 
)

router.get('/approve',(req , res)=>{
    res.render('approve');
})

module.exports = router;