const neo4j = require('neo4j-driver');
const message = require('../../messages/message.class');
try {
    var driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic('neo4j', '12345678'));
    console.log(message.neo4j_Connect_Success);
} catch (error) {
    console.log(error);
    console.log(message.neo4j_Connect_Fail);
}


const setDeparture = async (id, departure, status, timeDeparture) => {
    let session = driver.session();
    try {
        await session.run(`
        MERGE (d:Departure {id: $id})
        ON CREATE SET d = {id: $id, name: $name, status: $status, timeDeparture: $timeDeparture}`, 
        { id: id, name: departure, status: status, timeDeparture: timeDeparture });
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}
const checkExistDepartureByName = async (id) => {
    let session = driver.session();
    try {
        let result = await session.run(`
        MATCH (d:Departure {id: $id})
        RETURN d`, { id: id});
        return result.records.length > 0;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        await session.close();
    }
}
const getDepartureByName = async (id) => {
    let session = driver.session();
    try {
        let result = await session.run(`
        MATCH (d:Departure {id:$id})
        RETURN d`, { id: id });
        console.log(result.records);
        return result.records;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        await session.close();
    }
}

const setDestination = async (id, destination, status, timeArrival) => {
    let session = driver.session();
    try {
        await session.run(`
        MERGE (a:Arrival {id: $id})
        ON CREATE SET a = {id: $id, name: $name, status: $status, timeArrival: $timeArrival}`, { id: id, name: destination, status: status, timeArrival: timeArrival});    
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const checkExistDestinationByName = async (id) => {
    let session = driver.session();
    try {
        let result = await session.run(`
        MATCH (a:Arrival {id: $id})
        RETURN a`, { id: id});
        return result.records.length > 0;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        await session.close();
    }
}

const getDestinationByName = async (id) => {
    let session = driver.session();
    try {
        let result = await session.run(`
        MATCH (a:Arrival {id: $id})
        RETURN a`, { id: id });
        console.log(result.records);
        return result.records;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        await session.close();
    }
}

const setRelationDeptoArr = async (id) => {
    let session = driver.session();
    try {
        await session.run(`
        MATCH (d:Departure {id: $id})
        MATCH (a:Arrival {id: $id})
        MERGE (d)-[:ROUTE]->(a)`, { id: id});    
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
        MATCH (d:Departure {name: $departure})-[:ROUTE]->(a:Arrival)
WITH collect(a.name) AS tmp1
MATCH (d:Departure)-[:ROUTE]->(a:Arrival {name: $destination})
WITH tmp1, collect(d.name) AS tmp2
RETURN [x IN tmp1 WHERE x IN tmp2] AS commonCities`, { departure, destination });
console.log(result.records);
        let commonCities = result.records[0].get('commonCities');
console.log(commonCities.join(', '));
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