const express=require("express");
const router=express();
const path=require('path')
const registration=require('../controller/registration')
router.get('/registration',registration.getregistration)
router.post('/registration',registration.postregistration)
router.post('/reqForUserTobeSaller',registration.reqForUserTobeSaller);
module.exports=router;