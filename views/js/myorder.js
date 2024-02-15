
const cancelorder=document.querySelectorAll(".cancelorderis")
cancelorder.forEach((butn,i)=>{
    butn.addEventListener("click",function(err){
        console.log("..................");
        const pid=`${butn.classList[1]}`
        const uid=`${butn.classList[2]}`
        console.log("pid= "+pid+" oid= "+uid);
        updateStatus(pid,uid,function(err){
            if(err){
                alert(err)
            }else{
                console.log("status updated!!!!");
                const a=document.getElementById(pid+uid)
                const b=document.getElementById("p"+pid);
                b.innerText="Status for Delivery: cancel";
                a.remove();
            }
        })
    })
})
function updateStatus(pid,uid,callback){
    fetch('/cancelorder',{
        method:"post",
        headers:{"Content-Type":"application/json"},
    body:JSON.stringify({pid:pid,uid:uid}),
}).then(function(res){
    if(res.status===200){
        console.log("status is 200");
        callback();
    }else{
        callback("something wemt wrong");
    }
    })

}