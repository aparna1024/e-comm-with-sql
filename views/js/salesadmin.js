



const newOrderRequestSA=document.getElementById("newOrderSA");
newOrderRequestSA.addEventListener("click",function(){
    console.log("action clicking on newOrderRequest")
    const totaldeliverorder=document.getElementById("b");
    const totalOrderRequest=document.getElementById("c");
    const newOrderRequest=document.getElementById("a");
    totaldeliverorder.style.display="none";
    totalOrderRequest.style.display="none";
    newOrderRequest.style.display="block";
})
const tDRequestSA=document.getElementById("deliverSA");
tDRequestSA.addEventListener("click",function(){
    console.log("action clicking on  total deliver")
    const totalOrderRequest=document.getElementById("c");
    const newOrderRequest=document.getElementById("a");
    const totaldeliverorder=document.getElementById("b")
    totalOrderRequest.style.display="none";
    newOrderRequest.style.display="none";
    totaldeliverorder.style.display="block";
})


const totalOrderRequestSA=document.getElementById("totalorderSA");
totalOrderRequestSA.addEventListener("click",function(){
    console.log("action clicking on total order")
    const newOrderRequest=document.getElementById("a");
    const totaldeliverorder=document.getElementById("b");
    const totalOrderRequest=document.getElementById("c");
    newOrderRequest.style.display="none";
    totaldeliverorder.style.display="none";
    totalOrderRequest.style.display="block";
})


const conform=document.querySelectorAll(".conform");
conform.forEach((button,i)=>{
    button.addEventListener("click",function(err){
        const uid=`${button.classList[1]}`
        const pid=`${button.classList[2]}`
        const aid=`${button.classList[3]}`
        
        conformorder(uid,pid,aid,function(err){
            if(err){
                alert(err)
            }else{
                console.log("corder is conform!!!!");
                const norder=document.getElementById("norder");
                const no=Number(norder.innerText);
                norder.innerText=no-1;
                const k=document.getElementById("status"+uid+""+pid+""+aid);
                console.log("k="+k);
                k.innerText="Status= conform";
                const cdiv=document.getElementById("pr"+pid+""+uid);
                cdiv.remove();
    
            }
        })
    })

})
function conformorder(uid,pid,aid,callback){
    fetch('/conformorder',{
    method:"post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({uemail:uid,pid:pid,aid:aid}),
    }).then(function(res){
    if(res.status===200){
        console.log("approved status is 200");
        callback();
    }else{
        callback("something went wrong");
    }
    })
}






