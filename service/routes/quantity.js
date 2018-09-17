const express = require('express');

var mongoose = require('mongoose');
const router = express.Router();
const Quantity = require('../models/quantity');
const Employee = require('../models/employee');
const Company = require('../models/company');
const { getQuantityName, getQuantityInfactProp, getInfactPropFormApply, getQuantityApplyProp } = require('../utils/utils');

router.get('/', function (req, res) {
  Quantity.find()
    .populate({ path: 'employee', select: { name: 1, IDCard: 1 } })
    .sort({ "_id": -1 })
    .exec(function (err, doc) {
      if (err) return res.send({ success: false });
      res.send({ success: true, data: doc });
    });
})

router.post('/', function (req, res) {
  let { quantityId, inCompanyId, inCompanyName, currInCompanyUses, quantityBody } = req.body;

  let newEmployees = [];
  let newQuantitys = [];
  let oldEmployeeIds = [];
  let oldEmployees = [];
  let oldQuantitys = [];
  let inCompanys = {};
  let outCompanyNames = [];
  let outCompanys = {};
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
    inCompanys[infactProp] = parseInt(inCompanys[infactProp] || 0) + 1;
    const applyProp = getQuantityApplyProp(item.quantityType);
    inCompanys[applyProp] = parseInt(inCompanys[applyProp] || 0) - 1;
    //调出单位编制调整信息
    let outCompanyName = item.outCompany;
    outCompanyNames.push(outCompanyName);
    let outCompany = {};
    if (!outCompanys[outCompanyName]) {
      outCompany[infactProp] = 1;
      outCompanys[outCompanyName] = { ...outCompany };
    } else if (outCompany[outCompanyName] && !outCompanys[outCompanyName][infactProp]) {
      outCompany[infactProp] = 1;
      outCompanys[outCompanyName] = { ...outCompany[outCompanyName], ...outCompany };
    } else {
      outCompany[infactProp] = parseInt(outCompanys[outCompanyName][infactProp]) + 1;
      outCompanys[outCompanyName] = { ...outCompany[outCompanyName], ...outCompany };
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
      Company.findOne({ _id: inCompanyId }, function (err, doc) {
        if (err) return res.send({ success: false, data: err });
        for (key in inCompanys) {
          doc[key] = parseInt(doc[key]) + parseInt(inCompanys[key]);
        }
        doc.save();
        Company.find({ companyName: { $in: outCompanyNames } }, function (err, doc) {
          if (err) return res.send({ success: false, data: err });
          doc.forEach(item => {
            let outCompany = outCompanys[item.companyName];
            for (key in outCompany) {
              item[key] = item[key] - outCompany[key];
            }
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
  })
});

router.delete('/:quantityId',function(req,res,next){
  Quantity.find({quantityId:req.params.quantityId})
  .populate({path:'employee',select:{'name':1,'IDCard':1,'company':1}})
  .sort({"_id":-1})
  .exec(function(err,quantity){
    if(err) return res.send({success:false,data:err});
    let employeeIds = [];
    let outCompanyNames = [];
    let employeeMap = {};
    let outCompanyMap = {};
    let inCompanyMap = {};

    quantity.forEach(item=>{
      let employeeId = item.employee._id;
      let outCompanyName = item.outCompanyName;
      employeeIds.push(employeeId);
      outCompanyNames.push(outCompanyName);
      employeeMap[employeeId] = item.outCompanyName;
      outCompanyMap[outCompanyName] = outCompanyMap[outCompanyName] || {};
      let quantityType = item.quantityType;
      let infactProp = getQuantityInfactProp(quantityType);
      outCompanyMap[outCompanyName][infactProp] = outCompanyMap[outCompanyName][infactProp]||0 + 1;
      inCompanyMap[infactProp] = inCompanyMap[infactProp]||0 - 1;
      let applyProp = getQuantityApplyProp(quantityType);
      inCompanyMap[applyProp] = inCompanyMap[applyProp]||0 + 1;
    }); 
    Employee.find({_id:{$in:employeeIds}},function(err,employees){
      if(err) return res.send({success:false,data:err});
      Company.find({companyName:{$in:outCompanyNames}},function(err,companys){
        if(err) return res.send({success:false,data:err});
        let removeEmployeeIds = [];
        if(companys.length == 0 ){
          removeEmployeeIds = employeeIds;
        }else{
          employees.forEach(e=>{
            let company = companys.find(item=>{
              return item.companyName == employeeMap[e._id];
            });
            if(company){
              e.company = company._id;
              e.save();
            }else{
              removeEmployeeIds = employeeIds;
            }
          });
        }
        Employee.remove({_id:{$in:removeEmployeeIds}}).exec();
        
        if(companys.length > 0){
          companys.forEach(c=>{
            Object.keys(outCompanyMap[c.companyName]).forEach(k=>{
              c[k] = c[k] + outCompanyMap[c.companyName][k];
            });
            c.save();
          });
        }
        
        Company.findOne({companyName:quantity[0].inCompanyName},function(err,doc){
          Object.keys(inCompanyMap).forEach(key=>{
            doc[key] = doc[key] + inCompanyMap[key];
            doc.save();
          })
        })

        Quantity.remove({quantityId:req.params.quantityId},function(err,doc){
          if(err) return res.send({success:false,data:err});
          return res.send({success:true,data:doc});
        })
      })
    })
  })
})

module.exports = router;
