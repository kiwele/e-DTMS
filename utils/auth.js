var jwt = require("jsonwebtoken")
var env = require('dotenv')

env.config()
module.exports.token = function ({ id }) {
    // expire after one hour
    return jwt.sign({
        username: id,
    }, process.env.SECRET, { expiresIn: "1h" });
}

module.exports.verify = function (req, res, next) {
    const token = req.headers.cookie.split('=');
    const { error } = jwt.verify(token[1], process.env.SECRET)
    if (error) {
        res.redirect('/')
    } else {
        next();
    }
}

module.exports.details = function (req) {
    const token = req.headers.cookie.split('=');
    let data = jwt.verify(token[1], process.env.SECRET)
    
    return { username: data.username }
}