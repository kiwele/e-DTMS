const { date } = require('joi');
var db = require('../database')
var userController = ('../controllers/user')
var auth = require('../utils/auth')

module.exports.signup = function (data) {
  // login credentials insertion
  const values = {
    user_id: data.regnumber,
    password: data.password,
  };

  var sql = "INSERT INTO login_credentials SET ?";
  db.query(sql, values, function (err, data) {
    if (err) throw err;
    console.log("1 record added in login credentials");
  });

  // insertion of user profile data
  const profile = {
    registration_number: data.regnumber,
    first_name: data.firstname,
    middle_name: data.middlename,
    last_name: data.lastname,
    year_of_study: data.yearofstudy,
    user_id:data.regnumber,
    course_id:null,
    position_id:3,
    role_id:3,
  };

  var sql = "INSERT INTO user_profile SET ?";
  db.query(sql, profile, function (err, data) {
    if (err) throw err;
    console.log("1 record added in user profile");
  });
}

// fetching login data from the given id
module.exports.userLogin = function (credentials, callback) {
  sql = 'SELECT DISTINCT user_id, password FROM login_credentials WHERE user_id = ?';
  db.query(sql, credentials, function (error, data) {

    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  });
}

// aploading document in document table
module.exports.appload = (info, callback) => {
    const docinfo = {
      document_id: info.filee.filename,
      date_created: new Date(),
      type_id:info.docname,
      status_id:0,
    };

    var sql = "INSERT INTO document SET ?";
    db.query(sql,docinfo, function (err, data) {
      if (err) {
        throw err;
        // callback(err, null)
      } else {
        callback(null, { status: true, message: "look fine." })
      }
    });


    // inserting into document movement table .

    const docMovementInfo = {
      date_received: new Date(),
      date_dispatched:new Date(),
      comments:"",
      document_destination: "secretary",
      user_id:info.username,
      office_id:1,
      document_id:info.filee.filename,
    };

    var sql = "INSERT INTO document_movement SET ?";
    db.query(sql,docMovementInfo, function (err, data) {
      if(err) throw err;
      console.log('document  movement inserted successifuly')
    });
  }
  
module.exports.viewDocument = (callback) => {
  sql ='select document.document_id, document_type.type_name,document.date_created,document_status.status_name from document INNER JOIN document_type ON document.type_id = document_type.type_id INNER JOIN document_status ON  document.status_id=document_status.status_id';
  db.query(sql, function (err, data) {
    if (err) throw err;
    console.log(data)
    return callback(data);
  });
}
