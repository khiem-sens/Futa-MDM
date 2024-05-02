const mongoDB = require("../Model/Mongodb/products.mongo");
const {moneyConvert} = require("../public/javascript/moneyConvert");


const homePageCon = async (req, res) => {
    let userid = req.userid;
    let allPro = await mongoDB.getAllProducts();
    let _10Pro = [];
    let i = 0;
    allPro.forEach((element) => {
        if (i < 9 && element.rating_average === 5) {
            _10Pro.push(element);
            i++;
        }
    })

    let _4proPerLine = [];
    while (allPro.length >= 4) {
        let temp1 = allPro.splice(0, 4);
        _4proPerLine.push(temp1);
    }
    _4proPerLine.push(allPro);
    res.render("pages/index", { _10Pro, _4proPerLine,moneyConvert, userid });
}


module.exports = { homePageCon }