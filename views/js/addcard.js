var cutNewAddressfields=document.getElementById('cutNewAddressfield');
            cutNewAddressfields.addEventListener('click',function(){
                NewAddFun();
            });
            var saveAddress =document.getElementById("saveAddress");
            saveAddress.addEventListener('click',function(){
                var name=document.getElementById('name').value;
                var contactNo=document.getElementById('ContactNo').value;
                var add=document.getElementById('DAddress').value;
                var pin=document.getElementById('pin').value;
                var city=document.getElementById('city').value;
                var state=document.getElementById('state').value;
                console.log(name +" "+ contactNo+" "+ add +" "+ pin +" "+ city +" "+ state);
                var addid=Date.now();
                console.log("addid= "+addid);
                AddressSaveFun(name,contactNo,add,pin,city,state,addid,function(err){
                    if(err){
                        alert(err);
                    }else{
                        console.log("res is 200");
                            name.value="";
                            contactNo.value="";
                            add.value="";
                            pin.value="";
                            city.value="";
                            state.value="";
                        console.log("after res");
                        AddAddressToDom(name,contactNo,add,pin,city,state,addid);
                        NewAddFun();

                    }
                })
            }) 

            function getAddress(){
                fetch('/getsaveAddress',{
                    method:"GET"
                }).then(function(response){
                    if(response.status!==200){
                    throw new Error("wrong");
                }
                return response.json();
                }).then(function(abc){
                    console.log(abc);
                    

                    (abc).forEach(function(dataAdd){
                        console.log("dataAdd="+dataAdd);
                        AddAddressToDom(dataAdd.username,dataAdd.contact,dataAdd.address,dataAdd.pin,dataAdd.city,dataAdd.state,dataAdd.addid);
                    })
                }).catch(function(error){
                alert(error); 
                })
            }


                function AddAddressToDom(name,contactNo,add,pin,city,state,addid){
                    console.log("........"+name +" "+ contactNo+" "+ add +" "+ pin +" "+ city +" "+ state);
                    var SDiv=document.getElementById('AddressList');
                    var div1=document.createElement('div');
                    div1.setAttribute('class','div1');
                    var div2=document.createElement('div');
                    div2.setAttribute('class','div2');
                    
                    var div21=document.createElement('div')
                    div21.setAttribute('class','div21');
                    var div22=document.createElement('div');
                    div22.setAttribute('class','div22');
                    var div221=document.createElement('div');
                    var div221a=document.createElement('div');
                    div221a.setAttribute('class','div221a');
                    var div2211=document.createElement('div');
                    var bold=document.createElement('b');
                    // bold.style.paddingTop=10;
                    bold.innerText=""+name;
                    var div2212=document.createElement('div');
                    var div225=document.createElement('div');
                    // var bttn=document.createElement('button');
                    // bttn.setAttribute('class','btn');
                    // bttn.innerText="Edit";

                    div2211.appendChild(bold);
                    // div2212.appendChild(bttn);
                    div221a.appendChild(div2211);
                    div221a.appendChild(div2212);
                    div221.appendChild(div221a);
                    var div222=document.createElement('div')
                    div222.innerText=""+add+""+city;
                    var div223=document.createElement('div');
                    div223.innerText=""+state+"-"+pin;
                    var div224=document.createElement('div');
                    div224.innerText=""+contactNo;
                    var div225=document.createElement('div');
                    var DeliverToThis=document.createElement('button');
                    DeliverToThis.innerText="Deliver to this Address";
                    DeliverToThis.setAttribute('class','btn');
                    DeliverToThis.setAttribute('id',addid);
                    DeliverToThis.style.width="100%";
                    DeliverToThis.style.marginTop="30px"
                    div22.appendChild(div221);
                    div22.appendChild(div222);
                    div22.appendChild(div223);
                    div22.appendChild(div224);
                    div225.appendChild(DeliverToThis);
                    div22.appendChild(div225);

                    div2.appendChild(div21);
                    div2.appendChild(div22);
                    div1.appendChild(div2);
                    SDiv.appendChild(div1);
                    // --------------------------------------------------------------
                    DeliverToThis.addEventListener("click",function(e){
                        const aid=(e.target.id);
                        console.log("deliver to click aid="+aid)

                        var date=new Date();
                        console.log(date);
                        
                        var mnth=date.getMonth()+1;
                        var yr=date.getFullYear();
                        var dt=date.getDate();
                        let orderdate=dt+"-"+mnth+"-"+yr;
                        console.log("orderdate="+orderdate);

                        ordersubmit(orderdate,aid,function(err){
                            if(err){
                                alert(err);
                            }else{
                                console.log("order submittion successfully");
                                alert("order Submit!!!!!");
                            }
                        });


                    })
                    // --------------------------------------------------------------- 
                }


            function ordersubmit(orderdate,aid,callback){
                fetch('/orderSubmit',{
                        method:"post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderdate:orderdate,aid:aid}),
                    }).then(function(response){
                        if(response.status===200){
                            callback();
                        }else{
                            callback("something went wrong at order submition");
                        }
                 })
            }

            
            function AddressSaveFun(name,contactNo,add,pin,city,state,addid,callback){
                fetch('/saveAddress',{
                        method:"post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name:name , contactNo:contactNo , add:add ,pin:pin ,city:city ,state:state,addid:addid}),
                    }).then(function(response){
                        if(response.status===200){
                            callback();
                        }else{
                            callback("something went wrong");
                        }
                 })

            }


            
            function NewAddFun(){
                console.log("cut Address field");
                var top=document.getElementById('Address');
                top.classList.remove('active');
                var A=document.getElementById('AddressTab');
                A.style.inset="0 -500px 0 auto";
                var head=document.getElementById('head');
                head.classList.remove('active');

            }

            const NewAddress=document.getElementById("NewAddressIs");
            NewAddress.addEventListener('click',function(){
                console.log("AddressTab clicking");
                var A=document.getElementById('AddressTab');
                A.style.inset="0 0 0 auto";
                var top=document.getElementById('Address');
                top.classList.toggle('active');
                var head=document.getElementById('head');
                head.classList.toggle('active');

            })

            const conti=document.getElementById("continue");
            var top=document.getElementById('asdf');
                
            conti.addEventListener('click',function(){
                var top=document.getElementById('asdf');
                top.style.display="none";
                var Add=document.getElementById('Address');
                Add.style.display="block";
                
                getAddress();
                conti.style.pointerEvents="none";
            })
            

        const view=document.querySelectorAll(".viewdetails")
        view.forEach((button,i)=>{
        button.addEventListener("click",function(err){
            const data=`${button.classList[1]}`
            
            console.log("viewdetails"+data)
            var container=document.getElementById("asdfg");
            container.classList.toggle('active');
            var preview=document.querySelector(".products-preview")
            var previewBox=preview.querySelectorAll(".right")
            var nav =document.getElementById("head");
            nav.style.display="none";
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
                    var nav =document.getElementById("head");
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

   const del=document.querySelectorAll(".delete")
    del.forEach((button,i)=>{
        button.addEventListener("click",function(err){
            const price=`${button.classList[2]}`
            console.log("price is="+price);
            const data=`${button.classList[1]}`
            console.log("delcard"+data)
            deldata(data,function(err){
                if(err){
                    alert(err)
                }else{
                    var upPrice=document.getElementById("xxx");
                    var PPrice= upPrice.innerText;
                    upPrice.innerText=PPrice-price;
                    var item=document.getElementById("item").innerText
                    document.getElementById("item").innerText=item-1;
                    document.getElementById("xxxx").innerText=PPrice-price;
                var preview=document.querySelector(".asdf")
                var previewBox=preview.querySelectorAll(".container")
                previewBox.forEach(pre=>{
                    
                    var target=pre.getAttribute("cid");
                    console.log("target=",target)
                    if(data === target ){
                        pre.remove();
                    }
                })
                }
            })
        })
    })
    function deldata(data,callback){
    fetch('/delcard',{
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