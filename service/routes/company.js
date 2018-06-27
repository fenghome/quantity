var express = require('express');
const Company = require('../models/company');
var router = express.Router();


/* GET home page. */
router.post('/', function (req, res, next) {
  const data = req.body;
  const company = {
    ...data,
    infactXZ: 0,
    applyXZ: 0,
    infactZF: 0,
    applyZF: 0,
    infactGQ: 0,
    applyGQ: 0,
    infactQE: 0,
    applyQE: 0,
    infactCE: 0,
    applyCE: 0,
    infactZS: 0,
    applyZS: 0,
  };
  Company.create(company, function (err, doc) {
    if (err) {
      return res.send({ success: false });
    }
    return res.send({
      success: true,
      data: doc
    })
  })
});

router.get('/', function (req, res, next) {
  Company.find({}, function (err, companys) {
    if (err) {
      return res.send({ success: false });
    }
    return res.send({
      success: true,
      data: companys
    });
  })
})

module.exports = router;
