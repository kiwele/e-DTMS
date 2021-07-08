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
 
    if(data.office == 0){

      const profile = {
        registration_number: data.regnumber,
        first_name: data.firstname,
        middle_name: data.middlename,
        last_name: data.lastname,
        year_of_study: data.yearofstudy,
        user_id: data.regnumber,
        course_id: data.program,
        position_id: data.position,
        role_id: data.role,
        office_id:"0",
        successor_position:data.sucssessor,
      };

      var sql = "INSERT INTO user_profile SET ?";
      db.query(sql, profile, function (err, data) {
        if (err) throw err;
        console.log("1 record added in user profile");
      });

    }  else{


      const profile = {
        registration_number: data.regnumber,
        first_name: data.firstname,
        middle_name: data.middlename,
        last_name: data.lastname,
        year_of_study: data.yearofstudy,
        user_id: data.regnumber,
        course_id: null,
        position_id: data.position,
        role_id: data.role,
        office_id:data.office,
        successor_position:data.sucssessor,
      };


  var sql = "INSERT INTO user_profile SET ?";
  db.query(sql, profile, function (err, data) {
    if (err) throw err;
    console.log("1 record added in user profile");
  });


    }

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
    document_id: info.leter,
    date_created: new Date(),
    type_id: info.docname,
    status_id:0,
    support1:info.supot1,
    support2:info.supot2,
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
    document_destination: info.destiny,
    user_id: info.username,
    office_id: 1,
    document_id: info.leter,
  };

  var sql = "INSERT INTO document_movement SET ?";
  db.query(sql, docMovementInfo, function (err, data) {
    if (err) throw err;
    console.log('document  movement inserted successifuly')
  });
}

// viewing documents form documents movement table
module.exports.viewDocument = (userinfo, callback) => {
  sql = 'select distinct a.document_id, c.type_name,b.date_created,d.status_name FROM document_movement as a  JOIN document as b on a.user_id =? and a.document_id = b.document_id JOIN document_type as c ON b.type_id = c.type_id JOIN document_status as d ON d.status_id = b. status_id';
  db.query(sql, userinfo, function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}

// receive all documents
module.exports.receiveDocument =  (userinfo, callback) => {
  sql = 'select distinct a.comments,a.document_id, c.type_name,b.date_created, a.user_id FROM document_movement as a  JOIN document as b on a.document_destination =? and read_status = 0 and a.document_id = b.document_id JOIN document_type as c ON b.type_id = c.type_id';

  db.query(sql, userinfo, function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}

// receive only special test
module.exports.specialTest =  (userinfo, callback) => {
  sql = 'select distinct  a.document_id, c.type_name,b.date_created, a.user_id FROM document_movement as a  JOIN document as b on a.document_destination =? and read_status = 0 and b.type_id = 3  and a.document_id = b.document_id JOIN document_type as c ON b.type_id = c.type_id';

  db.query(sql, userinfo, function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}

module.exports.specialExam =  (userinfo, callback) => {
  sql = 'select distinct  a.document_id, c.type_name,b.date_created, a.user_id FROM document_movement as a  JOIN document as b on a.document_destination =? and read_status = 0 and b.type_id = 4  and a.document_id = b.document_id JOIN document_type as c ON b.type_id = c.type_id';

  db.query(sql, userinfo, function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}
module.exports.postponeStudies =  (userinfo, callback) => {
  sql = 'select distinct  a.document_id, c.type_name,b.date_created, a.user_id FROM document_movement as a  JOIN document as b on a.document_destination =? and read_status = 0 and b.type_id = 1  and a.document_id = b.document_id JOIN document_type as c ON b.type_id = c.type_id';

  db.query(sql, userinfo, function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}
module.exports.resumeStudies =  (userinfo, callback) => {
  sql = 'select distinct  a.document_id, c.type_name,b.date_created, a.user_id FROM document_movement as a  JOIN document as b on a.document_destination =? and read_status = 0 and b.type_id = 2  and a.document_id = b.document_id JOIN document_type as c ON b.type_id = c.type_id';

  db.query(sql, userinfo, function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}

module.exports.receiveResponce =  (office_id, callback) => {
  sql = 'select distinct  a.document_id, c.type_name,b.date_created, a.user_id,a.responded_to FROM document_movement as a  JOIN document as b on a.resp_ofc =? and read_status = 0 and a.document_id = b.document_id JOIN document_type as c ON b.type_id = c.type_id';

  db.query(sql, office_id, function (err, data) {
    if (err) throw err;
    
    return callback(data);
  });
}

module.exports.cancelDocument = (cancelInfo, callback) => {

  const cancel = {
    date_received: new Date(),
    date_dispatched: new Date(),
    comments:cancelInfo.coment,
    document_destination: cancelInfo.dest,
    user_id: cancelInfo.user_id,
    office_id: 1, 
    document_id: cancelInfo.document_id,
  };

  var sql = "INSERT INTO document_movement SET ?";
  db.query(sql, cancel, function (err, data) {
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

module.exports.trackDocument = ({document})=>{
   return new Promise(async(reject,resolve)=>{
     try{
       let sql ='select date_received, document_destination, user_id from document_movement where document_id = ?';
       await db.query(sql,[document], function(err, data){
         if (err) throw err;
        resolve(data)
        })
     } catch(error){
       reject(error)
     }
   })

}


//getting success position from the database 
module.exports.seccessor = (username)=>{
    return new Promise(async(resolve, reject)=>{
  
      try{
         let sql ='select distinct successor_position from user_profile where registration_number = ?';
         db.query(sql,username, (err, data)=>{
           if (err) throw err;
           resolve(data[0]['successor_position'])
         })

      } catch(err){
        reject(error)
      }

    } )

}

module.exports.destiny = (succ)=>{
 return new Promise(async(resolve, reject)=>{
      
      try{
         let sql = 'select registration_number from user_profile where position_id = ?';
         db.query(sql,succ, (err, data)=>{
           if (err) throw err;
           resolve(data[0]['registration_number'])
         })

      } catch(err){
        reject(error)
      }

    } )
}

module.exports.updateStatus = (document_id)=>{

  let doc_id = document_id.document;

  return new Promise(async(resolve,reject)=>{
    
     
    try{
      
      let sql = 'UPDATE document_movement SET read_status = 1 WHERE document_id = ?';
      await db.query(sql,doc_id, function(err, data){
        if(err) throw (err)
        resolve(console.log('success'))
      })
    }catch(err){
      reject(error)
    }
  }); 




}

module.exports.aproveButton = (aproveData)=>{

// here data are inserted into document movement table after aproval
  const approve = {
    date_received: new Date(),
    date_dispatched: new Date(),
    comments: "",
    document_destination: aproveData.destiny,
    user_id: aproveData.senderNumber,
    office_id: 1,
    document_id: aproveData.document_id.document,
  };

  var sql = "INSERT INTO document_movement SET ?";
  db.query(sql, approve, function (err, data) {
    if (err) throw err;
    console.log('document approved successifuly')
  });

   

}

// inserting data when responding to student
module.exports.respond = (info, callback)=>{


  const docinfo = {
    document_id: info.filee.filename,
    date_created: new Date(),
    type_id: info.docname,
    status_id:1,
    support1:null,
    support2:null,
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
    document_destination:0,
    user_id: info.Sender_no,
    office_id: info.office,
    document_id: info.filee.filename,
    responded_to:info.student_responded,
    resp_ofc:info.office,
  };

  var sql = "INSERT INTO document_movement SET ?";
  db.query(sql, docMovementInfo, function (err, data) {
    if (err) throw err;
    console.log('document  responded successifuly')
  });

}



module.exports.giveOfficeId = (userOffice)=>{
  return new Promise(async(resolve, reject)=>{
       
       try{
          let sql = 'select office_id from user_profile where user_id = ?';
          db.query(sql,userOffice, (err, data)=>{
            if (err) throw err;
            resolve(data[0]['office_id'])
          })
 
       } catch(err){
         reject(error)
       }
 
     } )
 }

//  module.exports.giveDocType =(docname)=>{

//   return new Promise(async(resolve, reject)=>{
       
//     try{
//        let sql = 'select type_id from document_type where type_name = ?';
//        db.query(sql,userOffice, (err, data)=>{
//          if (err) throw err;
//          resolve(data[0]['type_id'])
//        })

//     } catch(err){
//       reject(error)
//     }

//   } )

//  }


 // inserting data when responding to student through another office
module.exports.respondoffice = (info, callback)=>{

  // inserting into document movement table .
  const docMovementInfo = {
    date_received: new Date(),
    date_dispatched: new Date(),
    comments: "",
    document_destination:0,
    user_id: info.Sender_no,
    office_id: info.office,
    document_id: info.document_id,
    responded_to:info.student_responded,
    resp_ofc:info.office,
  };

  var sql = "INSERT INTO document_movement SET ?";
  db.query(sql, docMovementInfo, function (err, data) {
    if (err) throw err;
    console.log('document  responded  successifuly')
  });

}

module.exports.giverRole =   (userID)=>{
  return new Promise(async(resolve, reject)=>{
       
       try{
          let sql = 'select role_id from user_profile where user_id = ?';
          db.query(sql,userID, (err, data)=>{
            if (err) throw err;
            resolve(data[0]['role_id'])
          })
 
       } catch(err){
         reject(error)
       }
 
     } )
 }