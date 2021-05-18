var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/view_documents', function(req, res, next) {
  res.render('view_documents');
  
});

module.exports = router;
