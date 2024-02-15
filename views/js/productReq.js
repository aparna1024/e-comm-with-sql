const approve=document.querySelectorAll(".approveproduct")
    approve.forEach((button,i)=>{
        button.addEventListener("click",function(err){
            const data=`${button.classList[1]}`
            console.log("approve"+data)
            approvedata(data,function(err){
                if(err){
                    alert(err)
                }else{
                    const r=document.getElementById("r"+data);
                    r.remove();
                  alert("product is approved succesfully!!!!");
                }
            })
        })
    })
    function approvedata(data,callback){
    fetch('/approveproduct',{
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

    const reject=document.querySelectorAll(".rejectproduct")
    reject.forEach((button,i)=>{
        button.addEventListener("click",function(err){
            const data=`${button.classList[1]}`
            console.log("rejectproducr"+data)
            rejectdata(data,function(err){
                if(err){
                    alert(err)
                }else{
                    const r=document.getElementById("r"+data);
                    r.remove();
                  alert("product is rejected!!!!");
                }
            })
        })
      })
    
    
    function rejectdata(data,callback){
    fetch('/rejectproduct',{
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