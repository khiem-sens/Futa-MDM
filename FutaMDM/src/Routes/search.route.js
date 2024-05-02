const express = require("express");
const searchCon = require("../Controller/search.con");
const route = express.Router();

//root path '/search'
route.get('/product/index/:searchText',searchCon.searchWithIndex);
route.get('/product/noindex/:searchText',searchCon.searchNoIndex);


module.exports = route;