const db = require('../../database')

module.exports.addCollege = (collegeData)=>{

    let value = {
                 college_name: collegeData.collegeName, 
                 college_id: collegeData.collegeId
                }
  
        var sql = "INSERT INTO college SET ?";
  
     var result = db.query(sql, value, (err, data)=>{
       if(err) throw err;
      console.log("data successifullly inserted in college")
     });
  }
