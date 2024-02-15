const update=document.querySelectorAll(".updateproduct")
    update.forEach((button,i)=>{
        button.addEventListener("click",function(err){
            const data=`${button.classList[1]}`
            console.log("update"+data)
            updatedata(data,function(err){
                if(err){
                    alert(err)
                }else{
                  alert("product data is updated succesfully!!!!");
                }
            })
        })
    })
    function updatedata(data,callback){
    fetch('/updateproduct',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data}),
    }).then(function(res){
        if(res.status===200){
                callback();
            }else{
                callback("something went wrong");
            }
    })
   }

    const del=document.querySelectorAll(".deleteproductadmin")
    del.forEach((button,i)=>{
        button.addEventListener("click",function(err){
            const data=`${button.classList[1]}`
            console.log("delcard"+data)
            deldata(data,function(err){
                if(err){
                    alert(err)
                }else{
                    window.location.href='/updateproduct';
                }
            })
        })
      })
    
    
    function deldata(data,callback){
    fetch('/delproduct',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data}),
    }).then(function(res){
        if(res.status===200){
                callback();
            }else{
                callback("something went wrong");

            }
    })
   }
