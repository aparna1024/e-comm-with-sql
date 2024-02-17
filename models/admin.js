const sqlconnection =require('./sqldb');

function approveSaller(Id){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`Update user SET flag="true" where email="${Id}"`,function(err,result){
            if(err)reject(err);
            if(result){ 
                resolve(JSON.parse(JSON.stringify(result)));
     } })

    })
}

function rejectSaller(Id){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`Update user SET flag="reject" where email="${Id}"`,function(err,result){
            if(err)reject(err);
            if(result){ 
                resolve(JSON.parse(JSON.stringify(result)));
     } })

    })
}

function getSallerProductReq(){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT * from product where flag="false"`,function(err,result){
            if(err)reject(err);
            if(result){ 
            resolve(JSON.parse(JSON.stringify(result)));
     } })

    })
}


function approveSallerProduct(f,id){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`Update product SET flag="${f}" where productimg="${id}"`,function(err,result){
            if(err)reject(err);
            if(result){ 
                resolve(JSON.parse(JSON.stringify(result)));
     } })

    })
}
function rejectSallerProduct(f,id){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`Update product SET flag="${f}" where productimg="${id}"`,function(err,result){
            if(err)reject(err);
            if(result){ 
                resolve(JSON.parse(JSON.stringify(result)));
     } })

    })
}





module.exports={approveSaller,rejectSaller,rejectSallerProduct,approveSallerProduct,getSallerProductReq}