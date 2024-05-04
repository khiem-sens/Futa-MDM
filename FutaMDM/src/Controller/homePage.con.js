const mongoDB = require("../Model/Mongodb/products.mongo");
const neoDB = require("../Model/Neo4j/route.neo4j");
const {moneyConvert} = require("../public/javascript/moneyConvert");


const homePageCon = async (req, res) => {
    let userid = req.userid;
    let allPro = await mongoDB.getAllProducts();
    let _10Pro = [];
    let i = 0;
allPro.forEach(async (element) => {
    
    let nameRoute = element.name;
    console.log(nameRoute);
    // let departure = nameRoute.split("-")[0];
    // let destination = nameRoute.split("-")[1];
    // let checkExistDeparture = await neoDB.checkExistDepartureByName(departure);
    // let checkExistDestination = await neoDB.checkExistDestinationByName(destination);
    // if(checkExistDeparture == false){
    //     await neoDB.setDeparture(departure, element.status, element.timeDeparture);
    //     await neoDB.getDepartureByName(destination);
    // }
    // if(checkExistDestination == false){
    //     await neoDB.setDestination(destination, element.status, element.timeArrival);
    //     await neoDB.getDestinationByName(destination);
    // }
    // await neoDB.setRelationDeptoArr(element);
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


module.exports = { homePageCon}