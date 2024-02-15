const express=require("express");
const route=express();
const passwd=require('../controller/add');
route.get('/changepasswd',passwd.getchangepasswd);
route.post('/changepasswd',passwd.postchangepasswd)
route.get('/forgotpasswd',passwd.getforgotpasswd);
route.post('/forgotpasswd',passwd.postforgotpasswd);

module.exports=route;