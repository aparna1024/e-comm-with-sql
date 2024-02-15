const express=require("express");
const router=express();
const path=require('path')
const admin=require('../controller/add')
// Routes for Saller 
router.get('/admin',admin.getadmin)
router.post('/admin',admin.postadmin)
router.post('/updateproduct',admin.postupdateproduct)
router.get('/updateproduct',admin.getupdateproduct)
router.post('/delproduct',admin.deletedelproduct)
router.post('/conformorder',admin.postconformorder);

// Routes for Admin
router.get('/productsReq',admin.getProductReq);
router.post('/approveproduct',admin.postapproveproduct);
router.post('/rejectproduct',admin.postrejectproduct);
router.post('/approveAdmin',admin.postApproveAdmin);
router.post('/rejectAdmin',admin.postRejectAdmin);

module.exports=router;