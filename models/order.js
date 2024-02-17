const sqlconnection =require('./sqldb');
function myorder(userid){
   return new Promise(function(resolve,reject){
    sqlconnection.query(`SELECT *,userorder.flag from userorder Join product on userorder.productid=product.productimg Join user on  userorder.userid=user.email join address on address.addid=userorder.addid where user.email ="${userid}" `,function(err,result,field){
        if(err) reject(err);
        if(result){
            resolve(JSON.parse(JSON.stringify(result)));
        }
})}
)}

function ordersubmit(userid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT * from cart where userid="${userid}"`,async function(err,result,fiels){
         if(err) reject(err);
         if(result){
             resolve(JSON.parse(JSON.stringify(result)));
         }
        })
    })

}


function adddetails(userid,productid,quantity,orderdate,flag,aid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`INSERT into \`userorder\` (userid, productid, quantity, orderdate, flag, addid) values("${userid}","${productid}","${quantity}","${orderdate}","${flag}","${aid}")`,function(err,result){
         if(err) reject(err);
         if(result){
             resolve(JSON.parse(JSON.stringify(result)));
         }
        })
    })
}



function cancelorder(pid,uid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`Update userorder SET flag="cancel" where productid="${pid}" AND userid="${uid}"`,function(err,result,field){
         if(err) reject(err);
         if(result){
             resolve(JSON.parse(JSON.stringify(result)));
         }
 })}
)}

function getAddress(userid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT * from address where userid="${userid}"`,function(err,result,field){
         if(err) reject(err);
         if(result){
             resolve(JSON.parse(JSON.stringify(result)));
         }
        })
    })
}

function postAddress(userid,name,contactNo,add,pin,city,state,addid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`INSERT into address values("${userid}","${name}","${contactNo}","${add}","${pin}","${city}","${state}","${addid}")`,function(err,result,field){
         if(err) reject(err);
         if(result){
             resolve(JSON.parse(JSON.stringify(result)));
         }
        })
    })
}


module.exports={myorder,cancelorder,getAddress,postAddress,ordersubmit,adddetails};