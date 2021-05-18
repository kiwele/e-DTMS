var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
const {body , validationResult}  = require('express-validator')


/* GET users listing. */


router.get('/signup', function (req, res) {
  res.render("signup", {});
})


router.post('/signup',
      // username must be an email
       body('firstname').isNumeric(),
       body('middlename').isNumeric(),
       body('lastname').isNumeric(),
       body('regnumber').isNumeric(),
       body('yearofstudy').isNumeric(),
      // password must be at least 5 chars long
       body('password').isLength({ min: 5 }),

      (req, res) => {
     // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      }

  userController.user({
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.firstname,
    regnumber: req.body.regnumber,
    yearofstudy: req.body.yearofstudy,
    password: req.body.password,
  })
},
)

module.exports = router;
