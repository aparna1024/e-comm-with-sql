const sqlconnection =require('./sqldb');
function home(){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT * from product where flag="true"`,async function(err,result,field){
            if(err)reject(err);
            if(result){
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })
}

function homeAdmin(){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT * from user where role="saller"`,function(err,result){
            if(err) reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })

}

function homeSaller(sid){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT *,userorder.flag from userorder Join product on userorder.productid=product.productimg Join user on  userorder.userid=user.email join address on address.addid=userorder.addid where product.sallerid ="${sid}" `,function(err,result,field){
            if(err) reject(err);
            else{
                resolve(JSON.parse(JSON.stringify(result)));
            }
        })
    })
}


module.exports={home,homeAdmin,homeSaller};