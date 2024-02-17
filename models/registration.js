const sqlconnection =require('./sqldb');
function registration(username,email,hash,role,flag){
    return new Promise(function(resolve,reject){
        sqlconnection.query(`SELECT * from user where email="${email}"`,function(err,result,fiels){

            if(err) reject(err);
            if(result.length>0){
                console.log("email already exist");
                let k="0";
                resolve(k);
            }else{
                console.log("new email");
                sqlconnection.query(`INSERT into user values("${username}", "${email}", "${hash}","${role}","${flag}")`,function(err,result){
                    if(err)reject(err);
                    let k="1";
                    resolve(k);
                });
            }
        })
    })
}
module.exports={registration};