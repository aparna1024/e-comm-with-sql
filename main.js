
const express = require('express')
var session=require('express-session');
const app = express();
const bodyParser=require("body-parser");
const path=require("path")

app.use(session({
    secret:"sharma",
    resave:true,
    saveUninitialized:true,
}));

app.use(express.static(path.join(__dirname,'views')))
app.use(bodyParser.urlencoded({ extended: false}));

const multer=require('multer');
const upload=multer({dest:'uploads'})
app.use(express.static('uploads'));
app.use(upload.single("productimage"));
app.use(express.json());
app.set('view engine','ejs');
const home=require('./router/home')
const login=require('./router/login')
const registration=require('./router/registration');
const passwd=require('./router/passwd');
const admin=require('./router/admin')
const addcard=require('./router/addcard')
app.use(home);
app.use(login);
app.use(registration);
app.use(passwd);
app.use(admin);
app.use(addcard);
app.use((req,res,next)=>{
    res.status(404).send("<h1>page not found</h1>");
})

app.listen(3009,function(){
    console.log("server is running on port 3009")
});
