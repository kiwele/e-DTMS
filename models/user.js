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
    user_id: data.regnumber,
    course_id: null,
    position_id: 3,
    role_id: 3,
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
    type_id: info.docname,
    status_id: 0,
  };

  var sql = "INSERT INTO document SET ?";
  db.query(sql, docinfo, function (err, data) {
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
    date_dispatched: new Date(),
    comments: "",
    document_destination: "secretary",
    user_id: info.username,
    office_id: 1,
    document_id: info.filee.filename,
  };

  var sql = "INSERT INTO document_movement SET ?";
  db.query(sql, docMovementInfo, function (err, data) {
    if (err) throw err;
    console.log('document  movement inserted successifuly')
  });
}

// viewing documents form documents movement table
module.exports.viewDocument = (userinfo, callback) => {
  sql = 'SELECT * FROM document_movement where user_id =? and read_status = 0';
  db.query(sql, userinfo, function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}

module.exports.receiveDocument =  (userinfo, callback) => {
  sql = 'SELECT * FROM document_movement where document_destination =? and read_status = 0';
  db.query(sql, userinfo, function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}

module.exports.approveDocument = (approveInfo, callback) => {

  const approve = {
    date_received: new Date(),
    date_dispatched: new Date(),
    comments: approveInfo.coment,
    document_destination: approveInfo.dest,
    user_id: approveInfo.user_id,
    office_id: 1,
    document_id: approveInfo.document_id,
  };

  var sql = "INSERT INTO document_movement SET ?";
  db.query(sql, approve, function (err, data) {
    if (err) throw err;
    console.log('document approved successifuly')
  });

}

module.exports.natification = ({ user_id }) => {
  return new Promise(async (reject, resolve) => {
    try {
      sql = 'SELECT c.type_name, count(c.type_name) as total FROM document_movement as a JOIN document as b on a.document_destination = ? and a.read_status = 0 and a.document_id = b.document_id JOIN document_type as c ON b.type_id = c.type_id group by c.type_name';
      await db.query(sql, [user_id], function (err, data) {
        if (err) throw err;
        let total = 0
        data.forEach(e => {
          total += e.total
        })
        resolve({
          total,
          notifications: data
        })
      });
    } catch (error) {
      reject(error)
    }
  })
}
