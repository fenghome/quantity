const express = require('express');

var mongoose = require('mongoose');
const router = express.Router();
const Quantity = require('../models/quantity');
const Employee = require('../models/employee');
const Company = require('../models/company');
const { getQuantityName } = require('../utils/utils');

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
      let quantitys = [...newQuantitys, ...oldQuantitys];
      Quantity.insertMany(quantitys, function (err, doc) {
        if (err) return res.send({ success: false, data: err });
        return res.send({success:true,data:doc});
      })
    })
  })
})

module.exports = router;
