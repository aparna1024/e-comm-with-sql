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

// registration as a simple user
exports.getregistration=(req,res,next)=>{
    if(!req.session.isLoggedIn){
    res.render('registration')
    }
}

exports.postregistration=async(req,res,next)=>{
    username=req.body.username;
    email=req.body.email;
    password=req.body.password;
    role="user";
    flag="false";
    const salt=await bcrypt.genSalt(soltrount);
    const hash=await bcrypt.hash(req.body.password,salt);
    sqlconnection.query(`SELECT * from user where email="${email}"`,function(err,result,fiels){

        if(err) throw err;
        if(result.length>0){
            console.log("email already exist");
            
        }else{
            console.log("new email");
            sqlconnection.query(`INSERT into user values("${username}", "${email}", "${hash}","${role}","${flag}")`,function(err,result){
                if(err)throw err;
                res.render('login') 
            });
        }
    })
              
}


// -------------------------------------------------------------
// user request to become as a saller to the admin
// -----------------------------------------------------------------
exports.reqForUserTobeSaller= async(req,res,next)=>{
    email=req.session.userid
    
    sqlconnection.query(`Update user SET role="saller" where email="${email}"`,function(err,result){

        if(err) throw err;
        if(result.length>0){
          console.log("request is submit for to become as a saller also");
        }
    })
       
}

