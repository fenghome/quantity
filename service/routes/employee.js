const express = require('express');
const Employee = require('../models/employee');
const Company = require('../models/company');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', function (req, res, next) {
  Employee.find({}).populate('company', 'companyName').exec(function (err, doc) {
    if (err) {
      return res.send({
        success: false
      })
    }

    return res.send({
      success: true,
      data: doc
    })
  })
});

router.post('/', function (req, res, next) {
  let employee = req.body;
  const companyId = employee.company;
  employee.company = new mongoose.Types.ObjectId(employee.company);
  Employee.create(employee, function (err, doc) {
    if (err) return res.send({
      success: false
    });
    Company.findOne({ _id: companyId }, function (err, findCompany) {
      if (err) return res.send({ success: false });
      let updateCompany = {};
      let updateProp = 'infact' + employee.quantityType.slice(-2)
      updateCompany[updateProp] = findCompany[updateProp] + 1;
      Company.update({ _id: companyId }, updateCompany, function (err, doc) {
        if (err) return res.send({ success: false });
        return res.send({ success: true, data: doc });
      })
    });
  })
});

router.put('/', function (req, res, next) {
  let employee = req.body;
  employee.company = new mongoose.Types.ObjectId(employee.company);
  Employee.update({ _id: employee.id }, employee, function (err, doc) {
    if (err) return res.send({ success: false });
    return res.send({
      success: true,
      data: doc
    })
  })
});

router.delete('/:employeeId/:companyId/:quantityType', function (req, res, next) {
  const employeeId = req.params.employeeId;
  const companyId = req.params.companyId;
  const quantityType = req.params.quantityType;
  Employee.deleteOne({ _id: employeeId }, function (err, doc) {
    if (err) return res.send({ success: false });
    Company.findOne({ _id: companyId }, function (err, findCompany) {
      let updateCompany = {};
      const quantityProp = 'infact' + quantityType.slice(-2);
      updateCompany[quantityProp] = findCompany[quantityProp] - 1;
      Company.update({ _id: companyId }, updateCompany, function (err, doc) {
        if (err) return res.send({ success: false });
        return res.send({
          success: true,
          data: doc
        })
      })
    })
  })
});

module.exports = router;
