var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var auth = require('../utils/auth')
var userModels = require('../models/user')

var jwt = require('jsonwebtoken')
var auth = require('../utils/auth')
const staffController = require('../controllers/staff')

/* GET home page. */
router.get('/index', auth.verify, async (req, res) => {

  let data = auth.details(req);
  
  let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
  const notifications = await staffController.natification({ user_id: username })

  let names = await  userModels.giveNames(data.username)
  let fullName = names[0].first_name + ' ' + names[0].middle_name;
 
  res.render('index', { username: data.username , username: fullName, notifications});
});

router.get('/logout', function (req, res) {
  res.cookie('file', "", {
     maxAge: 0,
  })
 
  res.redirect('/')
})

module.exports = router;
