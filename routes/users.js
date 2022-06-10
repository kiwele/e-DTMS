var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
const { body, validationResult } = require('express-validator');
const { route } = require('.');
const userModels = require('../models/user')


router.get('/signup', function (req, res) {
  res.render("signup", {});
})

router.post('/signup',
  // username must be an email
  body('firstname').exists(),
  body('middlename').exists(),
  body('lastname').exists(),
  body('regnumber').isNumeric(),
  body('yearofstudy').isNumeric(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),

  async(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let check = await  userModels.checkUser(req.body.regnumber)
    
    if(check > 0){
      res.send('user already exist!!! signup again <a href = "signup">Signup</a>')
    }
     else{
       try{

      userController.signup({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.firstname,
        regnumber: req.body.regnumber,
        yearofstudy: req.body.yearofstudy,
        program: req.body.program,
        position: req.body.position,
        role: req.body.role,
        office: req.body.office,
        sucssessor:req.body.soccessPosion,
        password: req.body.password,
      })
    } catch(error){
      console.log(error)
    }
    }
        
  },
)

router.get('/', function (req, res, next) {
  res.render('login', {error:""});
})

router.post('/', userController.userLogin)

router.post('/create')


module.exports = router;

