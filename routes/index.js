var express = require('express');
var router = express.Router();
var auth = require('../utils/auth')

/* GET home page. */
router.get('/index', auth.verify, function (req, res, next) {
  let data = auth.details(req);
  res.render('index', {
    username: data.username
  });
});

module.exports = router;
