var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var auth = require('../utils/auth')
const staffController = require('../controllers/staff')

/* GET home page. */
router.get('/index', auth.verify, async (req, res) => {

  let data = auth.details(req);
  let { username } = jwt.verify(req.cookies.file, process.env.SECRET)
  const notifications = await staffController.natification({ user_id: username })
  res.render('index', { username: data.username , notifications});
});

module.exports = router;
