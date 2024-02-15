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
const { param } = require("../router/home");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const creatAccMail=require('../utils/creat_acc_mail')
const passwdChangeMail=require('../utils/changepasswdmail')
const forgotPasswd=require('../utils/forgotpassmail')
const { PassThrough } = require("stream");
const { log } = require("console");


// --------------------------------------------------------------------------
// --------------------------------Transporter-------------------------------
// --------------------------------------------------------------------------
exports.gettransporter=(req,res,next)=>{
    if(req.session.isLoggedIn && req.session.role=="transporter"){

    sqlconnection.query(`select *,userorder.flag from userorder Join user on userorder.userid=user.email join address on address.addid=userorder.addid`,function(err,result){
        if(err)throw err;
        else{
            const data=JSON.parse(JSON.stringify(result));
            
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


function accountCreated (email){
    creatAccMail.creatAccMail(email);
    console.log("signup working")
}

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
    

    sqlconnection.query(`INSERT into product value("${productname}","${productprice}","${productimg}","${productquantity}","${productdes}","${flag}","${sid}")`,function(err,result){
        if(err)throw err;
        else{
            res.render("admin",{sadmin:true ,username:req.session.username});
        }
    })
    }
}


// -------------------------------------------------------------------------------------------------------------------------------------------
//  After adding new product by saller ....admin gets that products for aprove or reject,only approved products is visible to user for buy 
// -------------------------------------------------------------------------------------------------------------------------------------------
exports.getProductReq=(req,res,next)=>{
    if(req.session.role=="admin"){
        console.log("get product for approve by admin");

        sqlconnection.query(`SELECT * from product where flag="false"`,function(err,result,field){
            if(err)throw err;
            if(result){
                const data=JSON.parse(JSON.stringify(result));
                res.render('productReq',{username:req.session.username,admin:true,data:data,role:req.session.role});
            }
        })
    }
    else{
        res.redirect('login');
    }
    
}


// ---------------------------------------------------------------------
// -------------------saving user Address for order deliver-------------
// ---------------------------------------------------------------------
exports.getsaveAddress=(req,res,next)=>{
    console.log("getSaveAddress is calling in add.js")
    let userid=req.session.userid;
    sqlconnection.query(`SELECT * from address where userid="${userid}"`,function(err,result,field){
        if(err)throw err;
        else{
            const data=JSON.parse(JSON.stringify(result));
           
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
        
        sqlconnection.query(`INSERT into address values("${userid}","${name}","${contactNo}","${add}","${pin}","${city}","${state}","${addid}")`,function(err,result,field){
            if(err)throw err;
            else{
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
    
    sqlconnection.query(`update user SET password="${hash}" where email="${email}"`,function(err,result){
        if(err)throw err;
        else{
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
    
    
    sqlconnection.query(`SELECT * from product JOIN cart on product.productimg = cart.productid where cart.userid="${userid}"`,async function(err,result,field){
        if(err)throw err;
        if(result){
            
            const data=JSON.parse(JSON.stringify(result));
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
    sqlconnection.query(`SELECT * from cart where userid="${userid}" AND productid="${productid}"`,async function(err,result,field){
        if(err)throw err;
        
        if(result.length>0){
            
            const data=JSON.parse(JSON.stringify(result));
            
            var q=Number(data[0].quantity);
            q=q+1;
            
            sqlconnection.query(`UPDATE cart SET quantity= "${q}" where userid="${userid}" AND productid="${productid}"`,function(err,resut,field){
                if(err)throw err;
                if(result){
                    console.log("quantity updated");
                }
            })
        }else{
            console.log("new cart");
            sqlconnection.query(`INSERT into cart values("${userid}","${productid}","${quantity}")`,function(err,result){
                if(err)throw err;
                res.status(200);
                res.send();
            });
        }
    })
     
}


// ---------------------------------------------------------------------------------------
// ------------------------------Saller Approved by Admin --------------------------------
// ---------------------------------------------------------------------------------------
 exports.postApproveAdmin=(req,res,next)=>{
    console.log("addmin approve in add.js file");
    adminId=req.body.data
    sqlconnection.query(`Update user SET flag="true" where email="${adminId}"`,function(err,result){
        if(err)throw err;
        else{
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
    adminId=req.body.data
    sqlconnection.query(`Update user SET flag="reject" where email="${adminId}"`,function(err,result){
        if(err)throw err;
        else{
            console.log("status update successfully for admin approval");
            res.status(200);
            res.send();
        }

    })
}

// --------------------------------------------------------------------------------------------
// -----------------------------delete product from user cart-------------------------------
// -----------------------------------------------------------------------------------------
 exports.deletedelcard=(req,res,next)=>{
    const id=req.body.data
    userid=req.session.userid
    
    sqlconnection.query(`DELETE from cart where userid="${userid}" AND productid="${id}"`,function(err,result,field){
        console.log("delete cart succesfully!!!");
        res.status(200)
        res.send();
    })
 }


// --------------------------------------------------------------------------------------
//  ----------------------------------Saller delete any product --------------------------
// ---------------------------------------------------------------------------------------
 exports.deletedelproduct=(req,res,next)=>{
    console.log("delete card")
    const id=req.body.data
    username=req.session.username
    email=req.session.email
    sqlconnection.query(`delete from product where productimg="${id}"`,function(err,result,fiel){
        if(err)throw err;
        if(result){
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
        sqlconnection.query(`SELECT * from product where sallerid="${userid}"`,async function(err,result,field){
            if(err)throw err;
            if(result){
                const data=JSON.parse(JSON.stringify(result));
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

    sqlconnection.query(`UPDATE product SET productname="${pname}",productprice="${pprice}",productquantity="${pquantity}",productdes="${pdes}" where productimg="${pid}"`,function(err,result,field){
        if(err)throw err;
        else{
            console.log("product updated!!!!");
            const data=JSON.parse(JSON.stringify(result));
            res.redirect("/updateproduct");
        }
    } )
}

// ---------------------------------------------------------------------------------------------------
//  ------------saller product is approved by admin  i.e. saller can sale the product-----------------
// ---------------------------------------------------------------------------------------------------
exports.postapproveproduct=(req,res,next)=>{
    console.log("product approved request in main");
    const id=req.body.data;
    
    let f="true";
    sqlconnection.query(`Update product SET flag="${f}" where productimg="${id}"`,function(err,result,fiel){
        if(err)throw err;
        if(result){
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
    sqlconnection.query(`Update product SET flag="${f}" where productimg="${id}"`,function(err,result,fiel){
        if(err)throw err;
        if(result){
            res.status(200);
            res.send();
        }
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
    sqlconnection.query(`SELECT * from cart where userid="${userid}"`,async function(err,result,fiels){

        if(err) throw err;
        if(result){
            const data=JSON.parse(JSON.stringify(result));
            data.forEach(d=>{
                let productid=d.productid;
                let quantity=d.quantity;
                
                sqlconnection.query(`INSERT into \`userorder\` (userid, productid, quantity, orderdate, flag, addid) values("${userid}","${productid}","${quantity}","${orderdate}","${flag}","${aid}")`,function(err,result){
                    if(err)throw err;
                    if(result){
                        sqlconnection.query(`DELETE from cart where userid="${userid}" and productid="${productid}"`,function(err,result){
                            if(err)throw err;
                            else{
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
        sqlconnection.query(`SELECT *,userorder.flag from userorder Join product on userorder.productid=product.productimg Join user on  userorder.userid=user.email join address on address.addid=userorder.addid where user.email ="${userid}" `,function(err,result,field){
            if(err)throw err;
            if(result){
                        const data=JSON.parse(JSON.stringify(result));
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
    sqlconnection.query(`Update userorder SET flag="cancel" where productid="${pid}" AND userid="${uid}"`,function(err,result,field){
       if(err)throw err;
       else{
        res.status(200);
        console.log("order cancel status updated successfully!!!");
        res.send();
       }
    })
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

    sqlconnection.query(`update userorder SET flag="conform" where userid="${uemail}" AND productid="${pid}" AND addid="${aid}"`,function(err,result){
        if(err)throw err;
        else{
            res.status(200);
                res.send();
        }
    })
}


// -----------------------------------------------------------------------------------------------
// status is updated conform to dispatch ,that means product is dispatched for deliver
// -----------------------------------------------------------------------------------------------
exports.postdispatchorder=(req,res,next)=>{
    const pid=req.body.pid;
    const uemail=req.body.uemail;
    const dispatchdate=req.body.dispatchdate
    sqlconnection.query(`Update userorder Set flag="dispatched" ,dispatchdate="${dispatchdate}" where productid="${pid}" And userid="${uemail}" And flag="conform"`,function(err,result){
        console.log("flag updated from conform to dispatched");
        if(err)throw err;
        else{
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
    sqlconnection.query(`UPDATE userorder SET flag="${flg}",delivereddate="${deldate}" where productid="${pid}" And userid="${uemail}" And flag="dispatched"`,function(err,result){
        console.log("flag updated from  dispatched to delivereddate");
        if(err)throw err;
        else{
            res.status(200);
            res.send();
        }
    })
   
}