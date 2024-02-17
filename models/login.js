
const sqlconnection =require('./sqldb');
function login(email){
    console.log("login in modules");
   return new Promise(function(resolve,reject){
    sqlconnection.query(`SELECT * from user where email="${email}"`,async function(err,result,field){
        if(err) reject(err);
        if(result){
            resolve(JSON.parse(JSON.stringify(result)));
        }
})}
)}
module.exports={login};

