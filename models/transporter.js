const sqlconnection =require('./sqldb');

function transporter(){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`select *,userorder.flag from userorder Join user on userorder.userid=user.email join address on address.addid=userorder.addid`,function(err,result){
            if(err)reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })
}

function dispatchedorder(dispatchdate,pid,uemail){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`Update userorder Set flag="dispatched" ,dispatchdate="${dispatchdate}" where productid="${pid}" And userid="${uemail}" And flag="conform"`,function(err,result){
            if(err)reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })
}

function deliverorder(flg,deldate,pid,uemail){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`UPDATE userorder SET flag="${flg}",delivereddate="${deldate}" where productid="${pid}" And userid="${uemail}" And flag="dispatched"`,function(err,result){
            if(err)reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })
}


module.exports={transporter,dispatchedorder,deliverorder}