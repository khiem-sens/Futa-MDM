const mongoDB = require("../Model/Mongodb/products.mongo");
const neoDB = require("../Model/Neo4j/comment.neo4j");
const redisDB = require("../Model/Redis/cart.redis");
const cassandraDB = require("../Model/Cassandra/user.cassandra");

const mongoTestCo = async (req, res) => {
    const productList = await mongoDB.getAllProducts();
    res.status(200).json(productList);
}

const neo4jTestCo = async (req, res) => {
    const commentList = await neoDB.getAllComment();
    res.status(200).json(commentList);
}

const redisTestCo = async (req, res) => {
    const cartList = await redisDB.getAllCartByHkey('CART:US01');
    res.status(200).json(cartList);
}

const cassandraTestCo = async (req, res) => {
    const result = await cassandraDB.getAllUser();
    const userList = result.rows;
    res.status(200).json(userList);
}

module.exports = { mongoTestCo, neo4jTestCo, redisTestCo, cassandraTestCo };
