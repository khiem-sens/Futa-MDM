const express = require("express");
const adminCon = require('../Controller/admin.con');
const route = express.Router();

route.get('/', adminCon.index);

// ---------------Manage User
route.get('/manageuser', adminCon.manageUser);
route.patch('/updateuser', adminCon.updateUser);
route.delete('/deleteuser/:email', adminCon.deleteUser);

// ---------------Manage Product
route.get('/manageproduct', adminCon.manageProduct);
route.patch('/updateproduct', adminCon.updateProduct);
route.delete('/deleteproduct/:id', adminCon.deleteProduct);
route.post('/addproduct', adminCon.addProduct);

// ---------------Manage Comment
route.get('/managecomment', adminCon.manageComment);
route.patch('/lockcomment', adminCon.lockComment);
route.delete('/deletecomment/:id', adminCon.deleteComment);



module.exports = route;