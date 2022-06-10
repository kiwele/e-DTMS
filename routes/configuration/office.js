const express = require('express');
const router = express.Router();
const officeCotroller = require('../../controllers/configuration/office')


router.get('/office', function (req, res) {
    res.render("configuration/office", {});
  }) 

router.post('/office', officeCotroller.addOffice)

module.exports = router
  