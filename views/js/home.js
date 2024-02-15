function toggle(){
    var container=document.getElementById("asdf");
    container.classList.toggle('active');
    var r=document.getElementById("right");
    r.classList.toggle("active");
}
const view=document.querySelectorAll(".viewdetails")
view.forEach((button,i)=>{
    button.addEventListener("click",function(err){
        const data=`${button.classList[1]}`
        console.log("viewdetails"+data)

        var container=document.getElementById("asdfg");
        container.classList.toggle('active');
        var as=document.getElementById('as')
        as.classList.toggle('active')
        var nav =document.getElementById("navbar");
        nav.style.display="none";

        var preview=document.querySelector(".products-preview")
        var previewBox=preview.querySelectorAll(".right")
            previewBox.forEach(pre=>{
                
                var target=pre.getAttribute("kid");
                console.log("target=",target)
                if(data === target ){
                    console.log("234567");
                    console.log("pre ",pre);
                    pre.style.visibility="visible";
                    pre.style.opacity=1;
                    console.log("pre ",pre);
                }
        })
        previewBox.forEach(close=>{
            close.querySelector('.fa-xmark').onclick=()=>{
                close.style.visibility="hidden";
                close.style.opacity=0;
                container.classList.remove('active');
                as.classList.remove('active');
                var nav =document.getElementById("navbar");
                 nav.style.display="block";
                
            }
        })
    })
})

function details(data,callback){
fetch('/viewdetails',{
    method:"post",
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
const addcard=document.querySelectorAll(".addcard")
addcard.forEach((button,i)=>{
    button.addEventListener("click",function(err){
        const data=`${button.classList[1]}`
        console.log("addcard"+data)
        card(data,function(err){
            if(err){
                alert(err)
            }else{
                alert("product is added into card")
            }
        })
    })
})
function card(data,callback){
fetch('/cart',{
    method:"post",
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
