const express=require("express");
const router=express();
const path=require('path')
const cart=require('../controller/add')
router.post('/cart',cart.postaddcard)
router.get('/cart',cart.getaddcard)
router.get('/myorder',cart.getmyorder);
router.post('/cancelorder',cart.cancelorder)
router.post('/delcard',cart.deletedelcard)
router.post('/saveAddress',cart.postsaveAddress);
router.get('/getsaveAddress',cart.getsaveAddress);
router.post('/orderSubmit',cart.postordersubmit);

//Routes for transporter 
router.post('/dispatchorder',cart.postdispatchorder);
router.post('/deliverorder',cart.postdeliverorder);
router.get('/transporter',cart.gettransporter);
module.exports=router;