
var multer = require('multer')
var path = require('path')
var mimetype =require('mime-types')

module.exports.image = ()=>{
    return multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null, path.join(__dirname, "../public/aploads"));
        },
        filename:(req, file, cb)=>{
            cb(null,
                file.fieldname + "-"+ Date.now() +path.extname(file.originalname));
        },
    

        
        
    });
}

