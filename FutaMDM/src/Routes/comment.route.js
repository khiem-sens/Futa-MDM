const express = require("express");
const adminCon = require('../Controller/admin.con');
const commentCon = require('../Controller/comment.con');
const route = express.Router();

route.get('/:id', commentCon.getCommentById);

module.exports = route;