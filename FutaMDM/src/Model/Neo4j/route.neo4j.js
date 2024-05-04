const neo4j = require('neo4j-driver');
const message = require('../../messages/message.class');
try {
    var driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic('neo4j', '12345678'));
    console.log(message.neo4j_Connect_Success);
} catch (error) {
    console.log(error);
    console.log(message.neo4j_Connect_Fail);
}


const setDeparture = async (departure, status, timeDeparture) => {
    let session = driver.session();
    try {
        await session.run(`
        MERGE (d:Departure {name: $name})
        ON CREATE SET d = {name: $name, status: $status, timeDeparture: $timeDeparture}`, 
        { name: departure, status: status, timeDeparture: timeDeparture });
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}
const checkExistDepartureByName = async (departure) => {
    let session = driver.session();
    try {
        let result = await session.run(`
        MATCH (d:Departure {name: $name})
        RETURN d`, { name: departure });
        return result.records.length > 0;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        await session.close();
    }
}
const getDepartureByName = async (departure) => {
    let session = driver.session();
    try {
        let result = await session.run(`
        MATCH (d:Departure {name: $name})
        RETURN d`, { name: departure });
        console.log(result);
        return result.records;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        await session.close();
    }
}

const setDestination = async (destination, status, timeArrival) => {
    let session = driver.session();
    try {
        await session.run(`
        MERGE (a:Arrival {name: $name})
        ON CREATE SET a = {name: $name, status: $status, timeArrival: $timeDeparture}`, { name: destination, status: status, timeArrival: timeArrival});    
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const checkExistDestinationByName = async (destination) => {
    let session = driver.session();
    try {
        let result = await session.run(`
        MATCH (a:Arrival {name: $name})
        RETURN a`, { name: destination });
        return result.records.length > 0;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        await session.close();
    }
}

const getDestinationByName = async (destination) => {
    let session = driver.session();
    try {
        let result = await session.run(`
        MATCH (a:Arrival {name: $name})
        RETURN a`, { name: destination });
        console.log(result);
        return result.records;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        await session.close();
    }
}

const setRelationDeptoArr = async (departure, destination) => {
    let session = driver.session();
    try {
        await session.run(`
        MATCH (d:Departure {name: $departure})
        MATCH (a:Arrival {name: $destination})
        MERGE (d)-[:ROUTE]->(a)`, { departure, destination });    
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const getRouteByName = async (departure, destination) => {
    let session = driver.session();
    try {
        let result = await session.run(`
        MATCH path = (d:Departure {name: $departure})-[:ROUTE*]->(a:Arrival {name: $destination})
        WHERE ALL(node IN nodes(path)[1..-1] WHERE (node:DestinationTmp))
        RETURN path`, { departure, destination });
        console.log(result.records);
        return result.records;

    } catch (error) {
        console.log(error);
        return [];
    } finally {
        await session.close();
    }
}

module.exports = {
    setDeparture, checkExistDepartureByName, setDestination, checkExistDestinationByName, setRelationDeptoArr, getRouteByName,
    getDepartureByName, getDestinationByName
}