var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/create_document', function(req, res, next) {
  res.render('create_document');
  
});

module.exports = router;
