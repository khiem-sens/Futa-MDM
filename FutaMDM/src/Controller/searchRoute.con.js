const mongoDB = require("../Model/Mongodb/products.mongo");
const neoDB = require("../Model/Neo4j/route.neo4j");
const { moneyConvert } = require("../public/javascript/moneyConvert");

const searchByRoute = async (req, res) => {
    let userid = req.userid;
    let searchText = req.params.searchText;
    let time = req.query.time;
    let roundTrip = req.query.roundTrip;
    

    console.log(time);
    console.log(roundTrip);
    if(roundTrip == "true"){
        let routeTmp1 = []
        console.log("Route")
        console.log(searchText);
        let routeOutgoing = searchText;
        let depart = routeOutgoing.split("-")[0];
        let des = routeOutgoing.split("-")[1];
        let tmpStr = await neoDB.getRouteByName(depart, des);
        console.log(tmpStr);
        const _listOneWay = await mongoDB.getProductByNameNoIndex(routeOutgoing);
        tmpStr.forEach(async (element) => {
            let routeTmp = `${depart}-${element}`;
            let tmp1 = await mongoDB.getProductByNameNoIndex(routeTmp);
            //push tmp1 to routeTmp1
            tmp1.forEach(element => {
                routeTmp1.push(element);
            });

        });
        tmpStr.forEach(async (element) => {
            let routeTmp = `${element}-${des}`;
            let tmp1 = await mongoDB.getProductByNameNoIndex(routeTmp);
            //push tmp1 to routeTmp1
            tmp1.forEach(element => {
                routeTmp1.push(element);
            });

        });
        let routeReturn = searchText.split("-").reverse().join("-");
        console.log(routeOutgoing);
        console.log(routeReturn);
        let depart2 = routeReturn.split("-")[0];
        let des2 = routeReturn.split("-")[1];
        let tmpStr2 = await neoDB.getRouteByName(depart, des);
        console.log(tmpStr2);
        const _listReturn = await mongoDB.getProductByNameNoIndex(routeReturn);
        tmpStr2.forEach(async (element) => {
            let routeTmp2 = `${element}-${des2}`;
            let tmp2 = await mongoDB.getProductByNameNoIndex(routeTmp2);
            //push tmp1 to routeTmp1
            tmp2.forEach(element => {
                routeTmp1.push(element);
            });

        });

        


        res.render("pages/searchRouteRound", { userid, _listOneWay, _listReturn, searchText, moneyConvert });
        return;
    }
    else{
        let routeTmp2 = []
        let routeOutgoing = searchText;
        let depart = routeOutgoing.split("-")[0];
        let des = routeOutgoing.split("-")[1];
        let tmpStr = await neoDB.getRouteByName(depart, des);
        console.log(tmpStr);
    const _listOneWay = await mongoDB.getProductByNameNoIndex(routeOutgoing);
    tmpStr.forEach(async (element) => {
        let routeTmp = `${depart}-${element}`;
        let tmp1 = await mongoDB.getProductByNameNoIndex(routeTmp);
        //push tmp1 to routeTmp1
        tmp1.forEach(element => {
            routeTmp2.push(element);
        });
        let routeTmp2 = `${element}-${des}`;
        let tmp2 = await mongoDB.getProductByNameNoIndex(routeTmp2);
        //push tmp1 to routeTmp1
        tmp2.forEach(element => {
            routeTmp2.push(element);
        });

    });
    console.log(_listOneWay);

    // res.status(200).json({result: [...listName.values()]});
    res.render("pages/searchRoute", { userid, _listOneWay, searchText, moneyConvert });
    return;
    }
}

module.exports = {
    searchByRoute
}