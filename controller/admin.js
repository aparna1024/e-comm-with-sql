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

// ---------------------------------------------------------------------------------------
// ------------------------------Saller Approved by Admin --------------------------------
// ---------------------------------------------------------------------------------------
exports.postApproveAdmin=(req,res,next)=>{
    console.log("addmin approve in add.js file");
    Id=req.body.data

    sqladmin.approveSaller(Id)
        .then(function(data){
            if(data)
            {
            console.log("status update successfully for admin approval");
            res.status(200);
            res.send();
        }

    })
}


// -----------------------------------------------------------------------------------------
//  ----------------------------Saller reject by Admin--------------------------------------
// -----------------------------------------------------------------------------------------
exports.postRejectAdmin=(req,res,next)=>{
    console.log("addmin reject in add.js file");
    Id=req.body.data
    sqladmin.rejectSaller(Id)
        .then(function(data){
            if(data)
            {
            console.log("status update successfully for admin approval");
            res.status(200);
            res.send();
        }

    })
}

// ---------------------------------------------------------------------------------------------------
//  ------------saller product is approved by admin  i.e. saller can sale the product-----------------
// ---------------------------------------------------------------------------------------------------
exports.postapproveproduct=(req,res,next)=>{
    console.log("product approved request in main");
    const id=req.body.data;
    
    let f="true";
    sqladmin.approveSallerProduct(f,id)
        .then(function(data){
            if(data)
            {
            res.status(200);
            res.send();
        }
    })
}

// ---------------------------------------------------------------------------------------------------
//  ------------- saller product is Rejected by admin  i.e. saller can't sale the product ------------
// ---------------------------------------------------------------------------------------------------
exports.postrejectproduct=(req,res,next)=>{
    console.log("product reject request in main");
    const id=req.body.data;
    
    let f="reject";
    sqladmin.rejectSallerProduct(f,id)
    .then(function(data){
        if(data)
        {
            res.status(200);
            res.send();
        }
    })  
}


// -------------------------------------------------------------------------------------------------------------------------------------------
//  After adding new product by saller ....admin gets that products for aprove or reject,only approved products is visible to user for buy 
// -------------------------------------------------------------------------------------------------------------------------------------------
exports.getProductReq=(req,res,next)=>{
    if(req.session.role=="admin"){
        console.log("get product for approve by admin");

        sqladmin.getSallerProductReq()
        .then(function(data){
            if(data)
            {
                res.render('productReq',{username:req.session.username,admin:true,data:data,role:req.session.role});
            }
        })
    }
    else{
        res.redirect('login');
    }
    
}