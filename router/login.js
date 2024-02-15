const express=require("express");
const router=express();
const login=require('../controller/login');

router.get('/login',login.getlogin)
router.post('/login',login.postlogin);
router.get('/logout',login.getlogout);


module.exports=router;