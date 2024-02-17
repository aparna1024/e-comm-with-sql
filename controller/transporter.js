const express = require("express");
const app=express();
const path=require("path")
var session=require("express-session")

const sqltransporter=require("../models/transporter");
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

// --------------------------------------------------------------------------
// --------------------------------Transporter-------------------------------
// --------------------------------------------------------------------------
exports.gettransporter=(req,res,next)=>{
    if(req.session.isLoggedIn && req.session.role=="transporter"){

    sqltransporter.transporter().then(function(data){
        if(data){
        var nConform=0;
        var numberDeliveris=0;
        var numberdispatch=0;
        data.forEach(p=>{
            if(p.flag==="conform")
            nConform++;
            else if(p.flag==="dispatched")
            numberdispatch++;
            else if(p.flag==="delivered")
            numberDeliveris++;
        })
            res.render('transporter',{orderdata:data,nConform:nConform,nDeliver:numberDeliveris,nDispatch:numberdispatch});   
    }
    })}else{
        res.render('login')
    }
}

// -----------------------------------------------------------------------------------------------
// status is updated conform to dispatch ,that means product is dispatched for deliver
// -----------------------------------------------------------------------------------------------
exports.postdispatchorder=(req,res,next)=>{
    const pid=req.body.pid;
    const uemail=req.body.uemail;
    const dispatchdate=req.body.dispatchdate
    sqltransporter.dispatchedorder(dispatchdate,pid,uemail).then(function(data){
        console.log("flag updated from conform to dispatched");
        
        if(data){
            res.status(200);
            res.send();
        }
    })
   
}
// -----------------------------------------------------------------------------------------------------------------
// user gets his/her order ,after this -> status is updated "dispatched to deliverd" with the order delivered date
// -----------------------------------------------------------------------------------------------------------------
exports.postdeliverorder=(req,res,next)=>{
    
    console.log("dispatch conform from the tranporter");
    const pid=req.body.pid;
    const uemail=req.body.uemail;
    const deldate=req.body.delivereddate
    
    const flg="delivered";
    sqltransporter.deliverorder(flg,deldate,pid,uemail).then(function(data){
        if(data){
            console.log("flag updated from  dispatched to delivereddate");
            res.status(200);
            res.send();
        }
    })
   
}


