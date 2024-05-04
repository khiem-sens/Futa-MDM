const mongoDB = require("../Model/Mongodb/products.mongo");
const express = require("express");
const homPaCon = require("../Controller/homePage.con");
const searchRoute = require("../Controller/searchRoute.con");
const route = express.Router();

route.get('/', homPaCon.homePageCon);
route.get('/search/route/:searchText', searchRoute.searchByRoute);

module.exports = route;
