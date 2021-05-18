var jwt = require("jsonwebtoken")
var env = require('dotenv')

env.config()
module.exports.token = function ({ id, email }) {
    // expire after one hour
    let after = 3600000;
    return jwt.sign({
        id, email
    }, proces.env.SECRET, { expiresIn: new Date.now() + after });
}

module.exports.verity = function (token) {
    // return boolean value
    return jwt.verify(token, process.env.SECRET)
}