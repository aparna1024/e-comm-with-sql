const express = require("express");
const app=express();
const path=require("path")
var session=require("express-session")
const sqladmin=require("../models/admin");
const sqlsaller=require("../models/saller");
app.use(
    session({
      secret: "sharma",
      resave: true,
      saveUninitialized: true,
    })
);
const bodyParser=require("body-parser");
const { param } = require("../router/home");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// --------------------------------Admin page --------------------------------
// ---------------------------------------------------------------------------
exports.getadmin=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        res.render('login');
    }else{
        if(req.session.role=="admin"){
            const username=req.session.username
            admin=req.session.admin
            res.render('admin',{username:username,admin:true,sadmin:false})
        }else if(req.session.role=="saller"){
            res.render("admin",{sadmin:true ,username:req.session.username,admin:false,role:req.session.role,flag:req.session.flag});
        }
        else{
            res.render('login');
        }
    }
    
}

// ------------------------------------------------------------------------
// ---------------------saller add any new product -----------------------
// -----------------------------------------------------------------------
exports.postadmin=(req,res,next)=>{
    if(req.session.role=="saller"){
    const productname=req.body.productname
    const productdes=req.body.productdes
    const productprice=req.body.productprice
    const productquantity=req.body.productquantity
    const productimg=req.file.filename
    const flag="false";
    const sid=req.session.userid
    

    let data=sqlsaller.postadmin(productname,productprice,productimg,productquantity,productdes,flag,sid).then(function(data){
        if(data){
            res.render("admin",{sadmin:true ,username:req.session.username,admin:false,role:req.session.role,flag:req.session.flag});
        }
    })
    }
}


// --------------------------------------------------------------------------------------
//  ----------------------------------Saller delete any product --------------------------
// ---------------------------------------------------------------------------------------
exports.deletedelproduct=(req,res,next)=>{
    console.log("delete card")
    const id=req.body.data
    username=req.session.username
    sqlsaller.deleteProduct(id).then(function(data){
        if(data){
            console.log("product is deleted!!!!");
            res.status(200);
            res.send();
        }
    })
}


//  --------------------------------------------------------------------------------------
//  ----------------------------------Saller Update any product --------------------------
// ---------------------------------------------------------------------------------------
exports.getupdateproduct=(req,res,next)=>{
    if(req.session.isLoggedIn && req.session.role=="saller"){
    username=req.session.username
    const userid=req.session.userid
        admin=req.session.admin
        username=req.session.username
        const email=req.session.email
        admin=req.session.shopname
        sqlsaller.getupdateproduct(userid).then(function(data){
            if(data){
                res.render('updateproduct',{username:username,admin:true,data:data,sadmin:true,role:req.session.role,flag:req.session.flag});
            }
        })
    }
    else{
    res.render('updateproduct',{username:null,admin:false,sadmin:false});
    }
}

exports.postupdateproduct=(req,res,next)=>{
    console.log("postupdateproduct")
    username=req.session.username
    const userid=req.session.userid
    admin=req.session.admins
    const pid=req.body.id;
    const pname=req.body.productname;
    const pdes=req.body.productdes;
    const pprice=req.body.productprice;
    const pquantity=req.body.productquantity;

    sqlsaller.postupdateproduct(pname,pprice,pquantity,pdes,pid).then(function(data){
        if(data){
            console.log("product updated!!!!");
            res.redirect("/updateproduct");
        }
    } )
}




// ------------------------------------------------------------------------------------------------
// when saller conform the user order,then status is updated from subimt to conform by the saller
// ie. dispatch and deliver processing is start
// --------------------------------------------------------------------------------------------------
exports.postconformorder=(req,res,next)=>{
    console.log("orderconform from the saller");
    const aid=req.body.aid;
    const uemail=req.body.uemail;
    const pid=req.body.pid

    sqlsaller.conformorder(uemail,pid,aid).then(function(data){
        if(data){
            res.status(200);
            res.send();
        }
    })
}