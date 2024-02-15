var mysql= require('mysql');
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    port:"3308",
    database:"e_comm"
});
con.connect((err)=>{
    if(err)throw err;
    console.log("connected");
})
module.exports=con;