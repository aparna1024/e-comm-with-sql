var formatP =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
var formatE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var submit=document.getElementById("submit");
        function validations(){
        
            var user=document.getElementById("username").value;
            var email=document.getElementById("email").value;
            var password=document.getElementById("password").value;

            if(user==""){
                document.getElementById("useremail").innerHTML="";
                document.getElementById("userpass").innerHTML="";
                document.getElementById("user").innerHTML="";
                document.getElementById("user").innerHTML="Please fill the username field";
                return false;
            }
            if((user.length <=2)|| (user.length >20)){
                document.getElementById("useremail").innerHTML="";
                document.getElementById("userpass").innerHTML="";
                document.getElementById("user").innerHTML="Username lenght must be between 2 to 20";
                return false;
            }
            if(!isNaN(user)){
                document.getElementById("useremail").innerHTML="";
                document.getElementById("userpass").innerHTML="";
                document.getElementById("user").innerHTML="Username start with character ";
                return false;
            }
            if(!isNaN(user[0])){
                document.getElementById("useremail").innerHTML="";
                
                document.getElementById("userpass").innerHTML="";
                document.getElementById("user").innerHTML="Username start with character ";
                return false;
            }
            if(email==""){
                document.getElementById("user").innerHTML="";
                document.getElementById("userpass").innerHTML="";
                document.getElementById("useremail").innerHTML="please fill the email field";
                return false;
            }
            if(!email.match(formatE)){
                document.getElementById("user").innerHTML="";
                document.getElementById("userpass").innerHTML="";
                document.getElementById("useremail").innerHTML="invalid email id";
                return false;
            }
            if(password==""){
                document.getElementById("user").innerHTML="";
                document.getElementById("useremail").innerHTML="";
                document.getElementById("userpass").innerHTML="please fill the password field";
                return false;
            }
            if(!password.match(formatP)){
                document.getElementById("user").innerHTML="";
                document.getElementById("useremail").innerHTML="";
                document.getElementById("userpass").innerHTML="password has to be minimum 8 characters long , one Uppercase letter at least ,one lowercase letter at least , One Number ,one special character";
                return false;
            }
        
    }