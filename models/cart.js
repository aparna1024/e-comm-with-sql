const sqlconnection =require('./sqldb');
function getcart(userid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT * from product JOIN cart on product.productimg = cart.productid where cart.userid="${userid}"`,function(err,result,field){
            if(err)reject(err);
            if(result){ 
                resolve(JSON.parse(JSON.stringify(result)));
     } })

    })
}

function checkcart(userid,productid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT * from cart where userid="${userid}" AND productid="${productid}"`,async function(err,result,field){
            if(err)reject(err);
            if(result.length>0){ 
                resolve(JSON.parse(JSON.stringify(result)));
            }
            else{
                resolve();
            }
     })
    })
}
function updatecartProductQuantity(q,userid,productid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`UPDATE cart SET quantity= "${q}" where userid="${userid}" AND productid="${productid}"`,function(err,result){
            if(err)reject(err);
            if(result){ 
                resolve(JSON.parse(JSON.stringify(result)));
     } })

    })
}

function postcart(userid,productid,quantity){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`INSERT into cart values("${userid}","${productid}","${quantity}")`,function(err,result){
            if(err)reject(err);
            if(result){ 
                resolve(JSON.parse(JSON.stringify(result)));
     } })

    })
}

function deletemycart(userid,id){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`DELETE from cart where userid="${userid}" AND productid="${id}"`,function(err,result){
            if(err)reject(err);
            if(result){ 
                resolve(JSON.parse(JSON.stringify(result)));
     } })

    })
}


module.exports={getcart,checkcart,updatecartProductQuantity,postcart,deletemycart};