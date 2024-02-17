const sqlconnection =require('./sqldb');
function changepasswd(hash,email){
    
   return new Promise(function(resolve,reject){
    sqlconnection.query(`update user SET password="${hash}" where email="${email}"`,function(err,result){
        if(err) reject(err);
        if(result){
            resolve(JSON.parse(JSON.stringify(result)));
        }
})}
)}
module.exports={changepasswd};
