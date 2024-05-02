const express = require("express");
const homPaCon = require("../Controller/homePage.con");
const route = express.Router();

route.get('/', homPaCon.homePageCon);

module.exports = route;
