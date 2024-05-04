const express = require("express");
const commentCon = require('../Controller/comment.con');
const route = express.Router();

route.get('/:id', commentCon.getCommentById);
module.exports = route;