const mongoDB = require("../Model/Mongodb/products.mongo");

const searchWithIndex = async (req, res) => {
    let searchText = req.params.searchText;
    let listName = new Set();
    const indexResult = await mongoDB.getProductByNameWithIndex(searchText);
    indexResult.forEach(pro => { listName.add({
        name: pro.name,
        id: pro._id
    }) });
    res.status(200).json({result: [...listName.values()]});
}

const searchNoIndex = async (req, res) => {
    let searchText = req.params.searchText;
    let listName = new Set();
    const noIndexResult = await mongoDB.getProductByNameNoIndex(searchText);
    noIndexResult.forEach(pro => { listName.add({
        name: pro.name,
        id: pro._id
    }) });
    res.status(200).json({result: [...listName.values()]});
}

module.exports = {
    searchWithIndex,searchNoIndex
};
