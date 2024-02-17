const express = require("express");
const app=express();
const path=require("path")
var session=require("express-session")
const bcrypt=require("bcrypt");
const soltrount=10;
const sqlconnection=require('../models/sqldb');
const sqlhome=require("../models/home");
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

// ----------- user home page ------------------------------
exports.getHome=(req,res,next)=>{
    if(req.session.isLoggedIn){
        const username=req.session.username
        let d=sqlhome.home().then(function(data){
            if(data){
                res.render('home',{username:username,data:data,admin:false,role:req.session.role,flag:req.session.flag});
            }
        })
    }else{
    res.render('home',{username:null});
    }
}
// ----------------------------------------------------------------
// --------------------Admin/Saller dashboard-----------------------
exports.getHomeadmin=(req,res,next)=>{
    const sid=req.session.userid
    if(req.session.isLoggedIn){
        if(req.session.role=="saller"){ //Saller dashboard Home page

        let data=sqlhome.homeSaller(sid)
        .then(function(data){
            if(data)
            {
                    var nOrder=0;
                    var dOrder=0;
                    data.forEach(z=>{
                            if(z.flag==="submit")
                            nOrder++;
                            else if(z.flag==='delivered'){
                                dOrder++;
                            }
                        })
                        
                        res.render('homeadmin',{sadmin:"true",status:req.session.flag,username:req.session.username,admin:false,nOrder:nOrder,dOrder:dOrder,allorderRec:data,role:req.session.role,flag:req.session.flag});   
                }
            })

        }
        else if(req.session.role="admin"){ //Admin dashboard Home page
        const username=req.session.username
            
        let data=sqlhome.homeAdmin()
        .then(function(data){
            if(data)
            {
                    pendingStatus=0;
                    rejectStatus=0;
                    approveStatus=0;
                    data.forEach(r=>{
                        if(r.flag=="false"){
                            pendingStatus++;
                        }
                        else if(r.flag=="true"){
                            approveStatus++;
                        }
                        else
                        rejectStatus++;
                    })
                    res.render('homeadmin',{username:username,admin:true,status:"",reqAdmin:data,Npending:pendingStatus,Nreject:rejectStatus,Napprove:approveStatus,sadmin:null,role:"admin"});
                }
            })
    }
   
}else{
    res.render('home',{username:null});
    }
}
