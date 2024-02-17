const sqlconnection =require('./sqldb');


function postadmin(productname,productprice,productimg,productquantity,productdes,flag,sid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`INSERT into product value("${productname}","${productprice}","${productimg}","${productquantity}","${productdes}","${flag}","${sid}")`,function(err,result){
            if(err)reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })
}

function getupdateproduct(userid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT * from product where sallerid="${userid}"`,async function(err,result,field){
            if(err)reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })
}

function postupdateproduct(pname,pprice,pquantity,pdes,pid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`UPDATE product SET productname="${pname}",productprice="${pprice}",productquantity="${pquantity}",productdes="${pdes}" where productimg="${pid}"`,function(err,result,field){
            if(err)reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })
}

function conformorder(uemail,pid,aid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`update userorder SET flag="conform" where userid="${uemail}" AND productid="${pid}" AND addid="${aid}"`,function(err,result){
            if(err)reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })

}

function deleteProduct(id){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`delete from product where productimg="${id}"`,function(err,result){
            if(err)reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })
}


module.exports={postadmin,getupdateproduct,postupdateproduct,conformorder,deleteProduct}