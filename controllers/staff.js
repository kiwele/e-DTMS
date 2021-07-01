var userModels = require('../models/user')
var auth = require('../utils/auth')

//fetching document info from database
module.exports.viewDocument = (req, res) => {
    // let info = auth.details(req);
    // userModels.viewDocument(info.username, function (data) {
    //     res.render('staff_view_document', { fetchData: data });
    // });
}

module.exports.natification = ({ user_id }) => {
    return new Promise(async (reject, resolve) => {
        try {
            const result = await userModels.natification({ user_id });
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })

}

module.exports.trackDocument = function (document_id) {
    return new Promise(async (reject, resolve) => {
        try {
            const result = await userModels.trackDocument(document_id);
            resolve(result)
        }
        catch (error) {
            reject(error)
        }
    })
}