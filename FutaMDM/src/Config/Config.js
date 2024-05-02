const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');


module.exports =(app) => {
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true}));
    app.use('/',express.static('src/public'));  // Only apply static folder for name index.ejs
    app.use('/productdetail',express.static('src/public')); 
    app.use('/cart',express.static('src/public'));  
    app.use('/order',express.static('src/public'));  
    app.set("view engine", "ejs");        
    app.set("views",path.join(process.cwd() + "/src/Views"));
    app.use(bodyParser.urlencoded({ extended: false }));
};
