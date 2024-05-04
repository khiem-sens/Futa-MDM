const mongoDB = require("../Model/Mongodb/products.mongo");
const neoDB = require("../Model/Neo4j/route.neo4j");
const {moneyConvert} = require("../public/javascript/moneyConvert");


const homePageCon = async (req, res) => {
    let userid = req.userid;
    let allPro = await mongoDB.getAllProducts();
    let _10Pro = [];
    let i = 0;
    console.log(allPro.length);
allPro.forEach(async (element) => {
    if (i < 9 && element.rating_average === 5) {
        _10Pro.push(element);
        i++;
    }
    let nameRoute = element.name;
    let departure = nameRoute.split("-")[0];
    let destination = nameRoute.split("-")[1];
    let checkExistDeparture = await neoDB.checkExistDepartureByName(element.id);
    let checkExistDestination = await neoDB.checkExistDestinationByName(element.id);
    if(checkExistDeparture == false){
        await neoDB.setDeparture(element.id, departure, element.status, element.timeDeparture);
        await neoDB.getDepartureByName(element.id);
    }

    if(checkExistDestination == false){
        await neoDB.setDestination(element.id, destination, element.status, element.timeArrival);
        await neoDB.getDestinationByName(element.id);
    }
    await neoDB.setRelationDeptoArr(element.id);

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