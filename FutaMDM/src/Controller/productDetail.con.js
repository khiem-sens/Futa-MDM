const mongoDB = require("../Model/Mongodb/products.mongo");
const neoDB = require("../Model/Neo4j/comment.neo4j");
const redisDB = require("../Model/Redis/cart.redis");
const { moneyConvert } = require("../public/javascript/moneyConvert");


const getProduct = async (req, res) => {
    const proInfo = await mongoDB.getProductByObjectID(req.body._id);
    res.status(200).json({
        name: proInfo.name,
        image: proInfo.thumbnail_url,
        price: proInfo.price
    })
}


const productDetailCon = async (req, res) => {
    let userid = req.userid;
    let cmtImages = [];
    let cmtCustomers = [];
    let sellers = [];

    const proInfo = await mongoDB.getProductByObjectID(req.params.objId);
    let price = moneyConvert(String(proInfo.price));
    let comments = await neoDB.getCommentByProductID(proInfo.id);
    let checkExistInCart = await redisDB.checkExistPro('CART:' + userid, 'PRODUCT:' + proInfo._id);

    for (let i = 0; i < comments.length; i++) {
        let images = await neoDB.getCommentImage(proInfo.id, comments[i].id);
        let customers = await neoDB.getCustomerComment(proInfo.id, comments[i].id);
        let seller = await neoDB.getSeller(proInfo.id, comments[i].id);

        cmtImages.push(...images);
        cmtCustomers.push(customers);
        sellers.push(seller);
    };
    let checkCommentExists = await neoDB.checkExistsComment(userid, proInfo.id);

    res.render("pages/productDetail", {userid, proInfo, price, comments, cmtImages, cmtCustomers, sellers, checkExistInCart, checkCommentExists });
}

const setComment = async(req, res) =>{
    let userid = req.userid;
    let username = req.username;
    let proID = req.body.proid;
    let title = req.body.title;
    let content = req.body.content;
    let rating = req.body.rating;
    let commentID = String(userid)+String(proID);

    let checkCusExists = await neoDB.checkExistsCustomer(userid);
    if(checkCusExists == false){
        await neoDB.setCustomer(userid,username,commentID);
    }
    await neoDB.setComment(proID, userid, title, content, commentID, rating);
    await neoDB.setRelationCustoCom(userid,commentID);
    await neoDB.setRelationComtoPro(commentID,proID);
    res.status(201).json({});
} 

const getProductById = async (req, res) => {
    const product = await getProductByObjectID(req.params.objId);
    res.json(product);
}

module.exports = {
    productDetailCon, getProduct, setComment, getProductById
}