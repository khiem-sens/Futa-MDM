const express = require("express");
const searchRoute = require("../Controller/seinarchRoute.con");
const route = express.Router();

//root path '/searchroute'
route.get('/search/route/:searchText', searchRoute.searchByRoute);
module.exports = route;