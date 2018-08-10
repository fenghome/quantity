const express = require('express');

var mongoose = require('mongoose');
const router = express.Router();
const Quantity = require('../models/quantity');
const Employee = require('../models/employee');
const Company = require('../models/company');
const { getQuantityName, getQuantityInfactProp } = require('../utils/utils');

router.get('/', function (req, res) {
  Quantity.find()
    .populate({ path: 'employee', select: { name: 1, IDCard: 1 } })
    .exec(function (err, doc) {
      if (err) return res.send({ success: false });
      res.send({ success: true, data: doc });
    });
})

router.post('/', function (req, res) {
  let { quantityId, inCompanyId, inCompanyName, quantityBody } = req.body;

  let newEmployees = [];
  let newQuantitys = [];
  let oldEmployeeIds = [];
  let oldEmployees = [];
  let oldQuantitys = [];
  let companys = {};
  quantityBody.forEach(item => {
    if (item.isNewEmployee) {
      newEmployees.push({
        company: inCompanyId,
        name: item.employeeId,
        IDCard: item.IDCard,
        quantityType: item.quantityType,
        quantityName: getQuantityName(item.quantityType)
      });
      newQuantitys.push({
        quantityId,
        // employee:item.employeeId,
        IDCard: item.IDCard,
        quantityType: item.quantityType,
        quantityName: getQuantityName(item.quantityType),
        inCompanyName,
        outCompanyName: item.outCompany
      })
    } else {
      oldEmployeeIds.push(item.employeeId);
      oldEmployees.push({
        company: inCompanyId,
        IDCard: item.IDCard,
        quantityType: item.quantityType,
        quantityName: getQuantityName(item.quantityType)
      });
      oldQuantitys.push({
        quantityId,
        employee: item.employeeId,
        quantityType: item.quantityType,
        quantityName: getQuantityName(item.quantityType),
        inCompanyName,
        outCompanyName: item.outCompany
      })
    }

    //根据company分类汇总
    const infactProp = getQuantityInfactProp(item.quantityType);
    companys[infactProp] = parseInt(companys[infactProp]) || 0 + 1;

  });

  Employee.insertMany(newEmployees, function (err, insertEmployees) {
    if (err) return res.send({ success: false, data: err });
    newQuantitys.map((q, index) => {
      const emp = insertEmployees.find(e => e.IDCard == q.IDCard);
      newQuantitys[index].employee = emp._id;
      delete newQuantitys[index].IDCard;
    });
    Employee.find({ _id: { $in: oldEmployeeIds } }, function (err, doc) {
      if (err) return res.send({ success: false, data: err });
      doc.forEach((item, index) => {
        item.company = oldEmployees[index].company;
        item.IDCard = oldEmployees[index].IDCard;
        item.quantityType = oldEmployees[index].quantityType;
        item.quantityName = oldEmployees[index].quantityName;
        item.save();
      });
      Company.findOne({ _id: inCompanyId }, function (err, doc) {
        if (err) return res.send({ success: false, data: err });
        for (key in companys) {
          doc[key] = parseInt(doc[key]) + parseInt(companys[key]);
        }
        doc.save();
        let quantitys = [...newQuantitys, ...oldQuantitys];
        Quantity.insertMany(quantitys, function (err, doc) {
          if (err) return res.send({ success: false, data: err });
          return res.send({ success: true, data: doc });
        })
      })

    })
  })
})

module.exports = router;
