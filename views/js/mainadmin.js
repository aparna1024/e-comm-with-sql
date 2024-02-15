// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// ----------------------------script for  main Admin --------------------------------------------
const newAdminRequestAre=document.getElementById("newAdminRequestAre");
newAdminRequestAre.addEventListener("click",function(){

    const totalSalesAdmin=document.getElementById("totalSalesAdmin");
    totalSalesAdmin.style.display="none";

    const totalRejectedAdminRequest=document.getElementById("totalRejectedAdminRequest")
    totalRejectedAdminRequest.style.display="none";

    const totalApprovedAdminRequest=document.getElementById("totalApprovedAdminRequest");
    totalApprovedAdminRequest.style.display="none"

    const newAdminRequest=document.getElementById("newAdminRequest");
    newAdminRequest.style.display="block";

})

const totalApprovedAdminRequestAre=document.getElementById("totalApprovedAdminRequestAre")
totalApprovedAdminRequestAre.addEventListener("click",function(){

    const newAdminRequest=document.getElementById("newAdminRequest");
    newAdminRequest.style.display="none";

    const totalSalesAdmin=document.getElementById("totalSalesAdmin");
    totalSalesAdmin.style.display="none";

    const totalRejectedAdminRequest=document.getElementById("totalRejectedAdminRequest")
    totalRejectedAdminRequest.style.display="none";

    const totalApprovedAdminRequest=document.getElementById("totalApprovedAdminRequest");
    totalApprovedAdminRequest.style.display="block"

})


const totalRejectedAdminAre=document.getElementById("totalRejectedAdminAre")
totalRejectedAdminAre.addEventListener("click",function(){

    const newAdminRequest=document.getElementById("newAdminRequest");
    newAdminRequest.style.display="none";

    const totalApprovedAdminRequest=document.getElementById("totalApprovedAdminRequest");
    totalApprovedAdminRequest.style.display="none"

    const totalSalesAdmin=document.getElementById("totalSalesAdmin");
    totalSalesAdmin.style.display="none";

    const totalRejectedAdminRequest=document.getElementById("totalRejectedAdminRequest")
    totalRejectedAdminRequest.style.display="block";

})

const totalSalesAdminAre=document.getElementById("totalSalesAdminAre");
totalSalesAdminAre.addEventListener("click",function(){

    const newAdminRequest=document.getElementById("newAdminRequest");
    newAdminRequest.style.display="none";

    const totalApprovedAdminRequest=document.getElementById("totalApprovedAdminRequest");
    totalApprovedAdminRequest.style.display="none"

    const totalRejectedAdminRequest=document.getElementById("totalRejectedAdminRequest")
    totalRejectedAdminRequest.style.display="none";

    const totalSalesAdmin=document.getElementById("totalSalesAdmin");
    totalSalesAdmin.style.display="block";

})

const approve=document.querySelectorAll(".Approve")
approve.forEach((button,i)=>{
button.addEventListener("click",function(err){
    const data=`${button.classList[1]}`
    const email=`${button.classList[2]}`
    const shopname=document.getElementById("shopname"+data).innerText;
    console.log("approve id="+data);
    console.log("approve shopname="+shopname);
    console.log("approve email="+email);
    approveAdmin(data,function(err){
        if(err){
            alert(err)
        }else{
            alert("New Sales Admin Approved")
            const SelectDivForApprove=document.getElementById(`${button.classList[1]}`);
            const nApprove=document.getElementById("nApprove")
            nA=Number( nApprove.innerText)
            nApprove.innerText=nA+1;
            const nPending=document.getElementById("nPending")
            nP=Number( nPending.innerText)-1
            nPending.innerText=nP;
            const approveAdminis=document.getElementById("addAproveAdmin");

            const div=document.createElement('div');
            div.setAttribute("class","process");
            div.setAttribute("id",data);

            const divshop=document.createElement('div');
            divshop.innerText=shopname;

            const divemail=document.createElement('div');
            divemail.innerText=data;

            const divApp=document.createElement('div');
            divApp.innerText="Approved";

            div.appendChild(divshop)
            div.appendChild(divemail)
            div.appendChild(divApp);
            approveAdminis.appendChild(div);
            console.log("append Admin successfully")
            const salesidis=document.getElementById("salesidis"+data)
            salesidis.innerText="approved";
            SelectDivForApprove.remove();
        }
    })
})
})
function approveAdmin(data,callback){
fetch('/approveAdmin',{
    method:"post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({data:data}),
}).then(function(res){
    if(res.status===200){
        console.log("approved status is 200");
        callback();
    }else{
        callback("something wemt wrong");
    }
})
}

const reject=document.querySelectorAll(".Reject")
reject.forEach((button,i)=>{
button.addEventListener("click",function(err){
    const data=`${button.classList[1]}`
    console.log("reject id="+data)
    const email=`${button.classList[2]}`
    const shopname=document.getElementById("shopname"+data).innerText;
    rejectAdmin(data,function(err){
        if(err){
            alert(err)
        }else{

            alert("New Sales Admin rejected")
            const SelectDivForApprove=document.getElementById(`${button.classList[1]}`);
            const nReject=document.getElementById("nReject")
            nR=Number(nReject.innerText)
            
            nReject.innerText=nR+1;
            const nPending=document.getElementById("nPending")
            nP=Number( nPending.innerText)
            nPending.innerText=nP-1;
            const rejectAdminis=document.getElementById("addRejectAdmin");

            const div=document.createElement('div');
            div.setAttribute("class","process");
            div.setAttribute("id",data);

            const divshop=document.createElement('div');
            divshop.innerText=shopname;

            const divemail=document.createElement('div');
            divemail.innerText=data;

            const divApp=document.createElement('div');
            divApp.innerText="rejected";

            div.appendChild(divshop)
            div.appendChild(divemail)
            div.appendChild(divApp);
            rejectAdminis.appendChild(div);
            console.log("append Admin successfully");

            const salesidis=document.getElementById("salesidis"+data)
            salesidis.innerText="rejected";
            
            SelectDivForApprove.remove();
        }
    })

})
})

function rejectAdmin(data,callback){
fetch('/rejectAdmin',{
    method:"post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({data:data}),
}).then(function(res){
    if(res.status===200){
        callback();
    }else{
        callback("something wemt wrong");
    }
})
}
