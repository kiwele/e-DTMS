var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/juma', function(req, res, next) {
  res.render('login');
  res.sendFile('login.html');
});

module.exports = router;
