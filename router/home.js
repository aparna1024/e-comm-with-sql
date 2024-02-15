const express=require("express");
const route=express();
const home=require('../controller/home');
route.get('/',home.getHome)
route.get('/homeadmin',home.getHomeadmin)


module.exports=route;