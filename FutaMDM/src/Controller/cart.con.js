const message = require("../messages/message.class");
const mongoDB = require("../Model/Mongodb/products.mongo");
const redisDB = require("../Model/Redis/cart.redis");
const { moneyConvert } = require("../public/javascript/moneyConvert");


const getCartInfo = async (userid) => {
    let hkey = 'CART:' + userid;
    const hashCart = await redisDB.getAllCartByHkey(hkey);
    let cartInfo = [];
    for (let field in hashCart) {
        let proID = field.substring(8); //Just get product object ID
        let proInfo = await mongoDB.getProductByObjectID(proID);
        cartInfo.push({
            product_objID: proID,
            product_name: proInfo.name,
            thumbnail_url: proInfo.thumbnail_url,
            price: proInfo.price,
            price_usd: proInfo.price_usd.toFixed(2),
            quantity: +hashCart[field],
            total_price_vnd: +proInfo.price * (+hashCart[field]),
            total_price_usd: +proInfo.price_usd * (+hashCart[field]),
        })
    }
    return cartInfo;
}

const cartCon = async (req, res) => {
    let userid = req.userid;
    let cartInfo = await getCartInfo(userid);
    res.render("pages/cart", { userid,cartInfo, moneyConvert });
}

const addQuantityOfPro = async (req, res) => {
    let userid = req.userid;
    let proID = req.body.proID;
    let value = req.body.value;
    await redisDB.addQuantityOfProduct('CART:' + userid, 'PRODUCT:' + proID, value);

    res.status(200).json({});
}

const removePro = async (req, res) => {
    let userid = req.userid;
    let proID = req.body.proID;
    await redisDB.removeProFromCart('CART:' + userid, 'PRODUCT:' + proID);
    res.status(200).json({});
}

const addToCart = async (req, res)=>{
    let userid = req.userid;
    let proID = req.body.proID;
    let value = req.body.value;
    await redisDB.addCart('CART:' + userid, 'PRODUCT:' + proID, value);
    res.status(200).json({});
}

module.exports = { cartCon, addQuantityOfPro, removePro, addToCart, getCartInfo };