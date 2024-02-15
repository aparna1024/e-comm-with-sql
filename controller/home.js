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

// ----------- user home page ------------------------------
exports.getHome=(req,res,next)=>{
    if(req.session.isLoggedIn){
        const username=req.session.username
    sqlconnection.query(`SELECT * from product where flag="true"`,async function(err,result,field){
        if(err)throw err;
        if(result){
            const data=JSON.parse(JSON.stringify(result));
            
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

            sqlconnection.query(`SELECT *,userorder.flag from userorder Join product on userorder.productid=product.productimg Join user on  userorder.userid=user.email join address on address.addid=userorder.addid where product.sallerid ="${sid}" `,function(err,result,field){
                if(err)throw err;
                else if (result){
                    const data=JSON.parse(JSON.stringify(result));
                   
                    var nOrder=0;
                    var dOrder=0;
                    var totalSale=0;
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
            
            sqlconnection.query(`SELECT * from user where role="saller"`,function(err,result){
                if(err)throw err;
                else{
                    const data=JSON.parse(JSON.stringify(result));
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
