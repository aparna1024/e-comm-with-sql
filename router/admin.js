const express=require("express");
const router=express();
const path=require('path')
const admin=require('../controller/admin')
const saller=require('../controller/saller')

// Routes for Saller 
router.get('/admin',saller.getadmin)
router.post('/admin',saller.postadmin)
router.post('/updateproduct',saller.postupdateproduct)
router.get('/updateproduct',saller.getupdateproduct)
router.post('/delproduct',saller.deletedelproduct)
router.post('/conformorder',saller.postconformorder);

// Routes for Admin
router.get('/productsReq',admin.getProductReq);
router.post('/approveproduct',admin.postapproveproduct);
router.post('/rejectproduct',admin.postrejectproduct);
router.post('/approveAdmin',admin.postApproveAdmin);
router.post('/rejectAdmin',admin.postRejectAdmin);

module.exports=router;