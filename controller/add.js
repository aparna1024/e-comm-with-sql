const express = require("express");
const app=express();
const path=require("path")
var session=require("express-session")
const bcrypt=require("bcrypt");
const soltrount=10;
const sqlconnection=require('../models/sqldb');
const sqlcart=require('../models/cart')
const sqlorder=require('../models/order');
const sqlpassword=require('../models/password')
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

const creatAccMail=require('../utils/creat_acc_mail')
const passwdChangeMail=require('../utils/changepasswdmail')
const forgotPasswd=require('../utils/forgotpassmail')
const { PassThrough } = require("stream");
const { log } = require("console");





function accountCreated (email){
    creatAccMail.creatAccMail(email);
    console.log("signup working")
}


// ---------------------------------------------------------------------
// -------------------saving user Address for order deliver-------------
// ---------------------------------------------------------------------
exports.getsaveAddress=(req,res,next)=>{
    console.log("getSaveAddress is calling in add.js")
    let userid=req.session.userid;
    sqlorder.getAddress(userid).then(function(data){
        if(data){
            res.status(200);
            res.send(data);
        }
    })
    }

exports.postsaveAddress=(req,res,next)=>{
        var userid=req.session.userid
        var name=req.body.name;
        var contactNo=req.body.contactNo;
        var add=req.body.add;
        var pin=req.body.pin;
        var city=req.body.city;
        var state=req.body.state;
        var addid=req.body.addid;
        
        sqlorder.postAddress(userid,name,contactNo,add,pin,city,state,addid).then(function(data){
            if(data){
            console.log("new address is add into database");
            res.status(200);
            res.send();
            }
        }) 
    }
    
// -----------------------------------------------------------------
// -------------------------password update-------------------------
// -----------------------------------------------------------------
exports.getchangepasswd=(req,res,next)=>{
    if(req.session.isLoggedIn){
    const username=req.session.username
    res.render('changepasswd',{username:username,sadmin:"",role:req.session.role,flag:req.session.flag});
    }else{
        res.render("login");
    } 
}

exports.postchangepasswd=async(req,res,next)=>{
    if(req.session.isLoggedIn){
    const username=req.session.username
    const email=req.session.userid
    const salt=await bcrypt.genSalt(soltrount);
    const hash=await bcrypt.hash(req.body.newpasswd,salt);
    admin=req.session.admin
    sqlpassword.changepasswd(hash,email).then(function(data){
        if(data){
            console.log("password updated!!!!");
            res.status(200);
            res.redirect('/');
        }
    })
} 
}

function passwdchange(email,username){

    passwdChangeMail.passwdChangeMail([{
        Email:email,
        Name:username
    }],
    "project E-comm");
}

// -------------------------------------------------
exports.getforgotpasswd=(req,res,next)=>{
    const username=req.session.username
    res.render('forgotpasswd');
}
exports.postforgotpasswd=(req,res,next)=>{
    email=req.body.email;
    
}

// ----------------------------------------------------------------------------------------
// -------------------------------when user click my cart----------------------------------
// ----------------------------------------------------------------------------------------
exports.getaddcard=(req,res,next)=>{
    console.log("afterclicking mycart");
    if(!req.session.isLoggedIn){
        res.redirect('/login');   
    }
    username=req.session.username
    const userid=req.session.userid
    sqlcart.getcart(userid)
    .then(function(data){
        if(data)
        {
            let productNo=data.length;
            let amount=0;
            data.forEach(p=>{
                amount+=(Number(p.productprice)*Number(p.quantity));
            })
            res.render('addcard',{username:username,admin:false,data:data,amount:amount,productNo:productNo,role:req.session.role});
        }
    })
}


// --------------------------------------------------------------------------------------------
// ---------------when user add any product to the cart----------------------------------------
// --------------------------------------------------------------------------------------------
exports.postaddcard=(req,res,next)=>{
    console.log("postaddcard")
    let userid=req.session.userid
    
    let productid=req.body.data
    quantity=1;
    sqlcart.checkcart(userid)
    .then(function(data){
        if(data)
        {
            var q=Number(data[0].quantity);
            q=q+1;
            let d1=sqlcart.updatecartProductQuantity(q,userid,productid).then(function(data){
                if(data)
                {
                    console.log("quantity updated");
                }
            })
        }else{
            console.log("new cart");
            let d2=sqlcart.postcart(userid,productid,quantity).then(function(data){
                res.status(200);
                res.send();
            });
        }
    })
     
}

// --------------------------------------------------------------------------------------------
// -----------------------------delete product from user cart-------------------------------
// -----------------------------------------------------------------------------------------
 exports.deletedelcard=(req,res,next)=>{
    const id=req.body.data
    userid=req.session.userid
    sqlcart.deletemycart(userid,id)
        .then(function(data){
        console.log("delete cart succesfully!!!");
        res.status(200)
        res.send();
    })
 }

// ------------------------------------------------------------------------------------
// -----------------when order is conform/Done by the user ----------------------------
// ----------------when user buy the product-------------------------------------------
exports.postordersubmit=(req,res,next)=>{
console.log("order submit request in main.js");
    userid=req.session.userid;
    var orderdate=req.body.orderdate;
    var aid=req.body.aid;
    flag="submit";
    sqlorder.ordersubmit(userid).then(function(data){
        if(data){
            
            data.forEach(d=>{
                let productid=d.productid;
                let quantity=d.quantity;
                
                sqlorder.adddetails(userid,productid,quantity,orderdate,flag,aid).then(function(data){
                    
                    if(data){
                        sqlcart.deletemycart(userid,productid).then(function(data){
                            if(data){
                                console.log("after order cart remove");
                                res.status(200);
                                res.send();
                            }
                        })
                    }
                })

            })
            
        }
    })
}


// -----------------------------------------------------------------------------------------------
// -----------when user want to see his/her order details and status of the order-----------------
// -----------------------------------------------------------------------------------------------
exports.getmyorder=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        res.redirect('login');
    }else{
        userid=req.session.userid;
        sqlorder.myorder(userid).then(function(data){
            if(data){
                        res.render("myorder",{username:req.session.username,myorder:data,role:req.session.role,flag:req.session.flag});
                    }
            }
        )
    }
}


// --------------------------------------------------------------------------------------
// -------------------------when user cancel there order--------------------------------
// --------------------------------------------------------------------------------------
exports.cancelorder=(req,res,next)=>{
    const pid=req.body.pid;
    const uid=req.body.uid;
    sqlorder.cancelorder(pid,uid).then(function(data){
       if(data){
        res.status(200);
        console.log("order cancel status updated successfully!!!");
        res.send();
       }
    })
}

