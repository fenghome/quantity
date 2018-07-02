var express = require('express');
const Company = require('../models/company');
const Employee = require('../models/employee');
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
  Company.find().sort({ "_id": -1 }).exec(function (err, companys) {
    if (err) {
      return res.send({ success: false });
    }
    return res.send({
      success: true,
      data: companys
    });
  })
})

router.put('/', function (req, res, next) {
  const company = req.body;
  Company.update({ _id: company._id }, company, function (err, company) {
    if (err) {
      return res.send({ success: false });
    }
    return res.send({
      success: true,
      data: company
    })
  })
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id;
  Company.findOne({ _id: id }, function (err, company) {
    if (err) return res.send({ success: false, message: "删除失败" });
    if (company.employees.length > 0) {
      return res.send({ success: false, message: "单位有人员，不能删除" });
    }
    Company.deleteOne({ _id: id }, function (err, company) {
      if (err) {
        return res.send({ success: false, message: "删除失败" });
      }
      return res.send({
        success: true,
        data: company
      })
    })
  })
})

router.get('/:value', function (req, res, next) {
  const value = req.params.value;
  Company.find({ companyName: new RegExp(value) }, function (err, companys) {
    if (err) {
      res.send({ success: false })
    }
    return res.send({
      success: true,
      data: companys
    })
  })
})

module.exports = router;
