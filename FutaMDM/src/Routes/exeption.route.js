const express = require("express");
const route = express.Router();
const excepCon = require('../Controller/exeption.con');

route.get('/err', excepCon.error);
route.use(excepCon.enpNotFound);
route.use(excepCon.someThingBroke)

module.exports = route;
