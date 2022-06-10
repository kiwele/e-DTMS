const express = require('express')
const router = express.Router()
const officeModels = require('../../models/configuration/office')

module.exports.addOffice = (req, res)=>{
     officeModels.addCollege(req.body)
     res.redirect('/office')

}
