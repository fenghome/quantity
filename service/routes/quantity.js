const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
  return res.send({success:true,data:[]});
})

module.exports = router;
