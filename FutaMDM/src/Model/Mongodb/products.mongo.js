const {client} = require('../Redis/cart.redis');

const mongoose = require('mongoose');
const message = require('../../messages/message.class');
const productModel = require('./models/product.model');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

try {
    mongoose.connect(process.env.TIKI_MONGODB_URL, options);
    console.log(message.mongo_Connect_Success);
} catch (error) {
    console.log(message.mongo_Connect_Fail);
    console.log(error);
}



const getAllProducts = async () => {
    const productList = await productModel.find({});
    return productList;
}

const getProductByObjectID = async (_id) => {
    const product = await productModel.findById(_id);

    return product;
}

const getProductByNameNoIndex = async(searchText) => {
    let arr = [];
    searchText.split(' ').forEach(element => {
        let reg = new RegExp(element,"i");
        arr.push({
            name: {$regex: reg}
        })
    });
    //console.time('searchNoIndex');
    const listPro = await productModel.find({$and: arr});
    //console.timeEnd('searchNoIndex');
    return listPro;
}

const getProductByNameWithIndex = async(searchText) => {
    //console.time('searchWithIndex');
    // const listPro = await productModel.find(
    //     { $text: { $search: `${searchText}` } },
    //     { score: { $meta: "textScore" } }
    // ).sort({ score: { $meta: "textScore" } } );
    const listPro = await productModel.find(
        { $text: { $search: `${searchText}` } }
    );
   // console.timeEnd('searchWithIndex');
    return listPro;
}

const addProduct = async (data) => {
    await productModel.create(data);
}

const updateProduct = async (data) => {
    await productModel.findOneAndUpdate({_id : data._id}, data);
}

const deleteProduct = async (id) => {
    await productModel.findByIdAndRemove(id);
}

module.exports = { getAllProducts,getProductByObjectID,getProductByNameNoIndex
    ,getProductByNameWithIndex,addProduct, updateProduct, deleteProduct };




