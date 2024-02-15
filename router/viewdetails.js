const express=require("express");
const router=express();
const path=require('path')
const viewdetails=require('../controller/add')
router.post('/viewdetails',viewdetails.postviewdetails)
router.get('/viewdetails',viewdetails.getviewdetails)

module.exports=router;