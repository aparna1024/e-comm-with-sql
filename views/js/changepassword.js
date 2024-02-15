function checkPassword() {
    var newPassword = document.getElementById("newpasswd").value;
    var confirmPassword = document.getElementById("confirmpasswd").value;
  
    if (newPassword === confirmPassword) {

      const uppass=document.getElementById("uppass")
      uppass.addEventListener("click",function(err){
          const npass=document.getElementById("newpasswd").value;
          updatepassword(npass,function(err){
          if(err){
          alert(err);
          }else{
              alert("Your password updated sucessfully!!! ");
          }
          })
      })
      function updatepassword(npass,callback){
          fetch('/changepasswd',{
              method:"post",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({newpasswd:npass}),
          }).then(function(res){
              if(res.status===200){
                  console.log("status is 200");
                  callback();
              }else{
                  callback("something wemt wrong");
              }
          })
      }

    } else {
      document.getElementById("message").innerHTML = "Passwords do not match!";
    }
  }