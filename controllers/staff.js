 var userModels = require('../models/user')



//fetching document info from database
module.exports.viewDocument = (req,res)=>{

    userModels.viewDocument(function(data){
     res.render('staff_view_document', {fetchData:data});
    });
  
}

// view documents received to staff

module.exports.receiveDocument = (req,res)=>{

    userModels.viewDocument(function(data){
     res.render('receive_document', {fetchData:data});
     
    });
  
}
