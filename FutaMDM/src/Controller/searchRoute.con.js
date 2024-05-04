const mongoDB = require("../Model/Mongodb/products.mongo");
const { moneyConvert } = require("../public/javascript/moneyConvert");

const searchByRoute = async (req, res) => {
    let userid = req.userid;
    let searchText = req.params.searchText;
    let time = req.query.time;
    let roundTrip = req.query.roundTrip;
    console.log(time);
    console.log(roundTrip);
    if(roundTrip == "true"){
        console.log("Route")
        console.log(searchText);
        let routeOutgoing = searchText;
        let routeReturn = searchText.split("-").reverse().join("-");
        console.log(routeOutgoing);
        console.log(routeReturn);
        const _listOneWay = await mongoDB.getProductByNameNoIndex(routeOutgoing);
        const _listReturn = await mongoDB.getProductByNameNoIndex(routeReturn);

        res.render("pages/searchRouteRound", { userid, _listOneWay, _listReturn, searchText, moneyConvert });
        return;
    }else{
    const _listOneWay = await mongoDB.getProductByNameNoIndex(searchText);
    console.log(_listOneWay);

    // res.status(200).json({result: [...listName.values()]});
    res.render("pages/searchRoute", { userid, _listOneWay, searchText, moneyConvert });
    return;
    }
}

module.exports = {
    searchByRoute
}