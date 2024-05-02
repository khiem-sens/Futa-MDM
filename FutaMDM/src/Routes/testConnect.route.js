const express = require("express");
const { mongoTestCo, neo4jTestCo, redisTestCo, cassandraTestCo} = require("../Controller/testConnect.con");
const route = express.Router();

route.get('/mongo', mongoTestCo);
route.get('/neo4j', neo4jTestCo);
route.get('/redis', redisTestCo);
route.get('/cassandra', cassandraTestCo);

module.exports = route;