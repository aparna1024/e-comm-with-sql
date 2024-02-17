
const post_login = require('../models/login');
const post_login_fun=post_login.login;
const express = require("express");
const app=express();
const path=require("path")
var session=require("express-session")
const bcrypt=require("bcrypt");
const soltrount=10;
const sqlconnection=require('../models/sqldb');
app.use(
    session({
      secret: "sharma",
      resave: true,
      saveUninitialized: true,
    })
);
const bodyParser=require("body-parser");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// logout session
exports.getlogout=(req,res,next)=>{
    req.session.isLoggedSaleAdmin=false;
    req.session.salesAdminId=null;
    req.session.shopname=false;
    req.session.status=false;
    req.session.isLoggedIn=false;
    req.session.admin=false;
    req.session.email=null;
    req.session.username=null;
    req.session.istlogin=false;
    res.redirect('/')
}

// login
exports.getlogin=(req,res,next)=>{
    if(!req.session.isLoggedIn){
    res.render('login');
    }
}

exports.postlogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    let data=post_login_fun(email)
    .then(async function(data){
        if(data)
        {
            const bypass=data[0].password;
            req.session.username=data[0].username;
            req.session.role=data[0].role;
            req.session.userid=data[0].email;
            req.session.flag=data[0].flag;
            req.session.isLoggedIn=true;
            const a=await bcrypt.compare(password,bypass);
            if(a){
                if(req.session.role=="transporter"){
                    res.redirect('/transporter');
                }else
                res.redirect('/');
            }else{
                res.redirect('/login');
            }
        }
    })
    
}
