var db = require('../database')

module.exports.user = function(data){

  console.log(data)
    
    // const values ={ user_id:data.user_id,
    //                 password:data.password,
    //               };

    // var sql = "INSERT INTO login_credentials SET ?";
    // db.query(sql,values, function (err, data) {
    //     if (err) throw err;
    //     console.log("1 record added in login credentials");
    //   });




    //   const profile ={ registration_number:data.user_id,
    //                   first_name:data.firstname,
    //                   middle_name:data.middlename,
    //                   last_name:data.lastname,
    //                   year_of_study:data.yearofstudy,
    //                  };

    //    var sql = "INSERT INTO user_profile SET ?";
    //    db.query(sql,profile, function (err, data) {
    //         if (err) throw err;
    //           console.log("1 record added in user profile");
    //          });


}