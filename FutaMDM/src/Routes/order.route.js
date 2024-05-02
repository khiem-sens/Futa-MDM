const express = require("express");
const orderCon = require("../Controller/order.con");
const route = express.Router();

//rootpath : /order

route.post('/confirmOrder',orderCon.orderCon);
route.get('/orderManage',orderCon.orderManage);
route.post('/cancleorder', orderCon.cancleOrder);
route.post('/orderagain', orderCon.orderAgain);

module.exports = route;
