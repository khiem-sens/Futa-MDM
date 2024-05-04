const express = require('express');
require('dotenv').config();
const authUser = require('./src/middlewares/authUser.mdw');
const getUserId = require('./src/middlewares/getUserId.mdw');
const tempForTest = require('./src/middlewares/tempForTest.mdw');

const app = express();


//Config something 
require('./src/Config/Config')(app);

//Login, Register routes
app.use('/account', require('./src/Routes/account.route'));

app.use('/comment', require('./src/Routes/comment.route'));

//homePage routes
app.use('/',tempForTest,require('./src/Routes/homePage.route'));

//Product Detail routes
app.use('/productdetail', tempForTest,require('./src/Routes/productDetail.route'));

app.use('/search/route', tempForTest,require('./src/Routes/searchRoute.route'));

//Cart page routes
app.use('/cart',tempForTest,require('./src/Routes/cart.route'));

//Order page routes
app.use('/order',tempForTest,require('./src/Routes/order.route'));

//Test Connection route
app.use('/connect',require('./src/Routes/testConnect.route'));

//exception page route
app.use('/',require('./src/Routes/exeption.route'));


app.listen(process.env.LOCAL_PORT, () => {
    console.log('App running on port: ' + process.env.LOCAL_PORT);
})  