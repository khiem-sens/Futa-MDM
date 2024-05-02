const express = require("express");
const proDetailCon = require("../Controller/productDetail.con");
const route = express.Router();

//root '/productdetail'
route.get('/:objId', proDetailCon.productDetailCon);
route.post('/getinfo', proDetailCon.getProduct);
route.post('/setcomment', proDetailCon.setComment);


route.get('/getproduct/:objId', proDetailCon.getProductById);

module.exports = route;