const neo4j = require('neo4j-driver');
const message = require('../../messages/message.class');

try {
    var driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic('neo4j', '12345678'));
    console.log(message.neo4j_Connect_Success);
} catch (error) {
    console.log(error);
    console.log(message.neo4j_Connect_Fail);
}

const getAllComment = async () => {
    let session = driver.session();
    let commentLists = [];
    try {
        var result = await session.run('MATCH (p:Comment) RETURN p', {});
        result.records.forEach((singleRecord) => {
            commentLists.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return commentLists;
}

const getCommentByProductID = async (proID) => {
    let session = driver.session();
    let commentLists = [];
    try {
        var result = await session.run(`MATCH (c:Comment) WHERE (c)-[:COMMENT_FOR]->({id:${proID}}) RETURN c`, {});
        // MATCH (c:Customer)-[:COMMENT]->(com:Comment)
        // WHERE com.productID = 7379565
        // RETURN c, com
        result.records.forEach((singleRecord) => {
            commentLists.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return commentLists;
}

const getCommentImage = async (proID, comID) => {
    let session = driver.session();
    let images = [];
    try {
        var result = await session.run(`
        MATCH (i:Image),(c:Comment),(p:Product)
        WHERE c.id = "${comID}" AND p.id = ${proID}
        AND (c)-[:CMT_IMAGE]->(i) 
        AND (c)-[:COMMENT_FOR]->(p)
        RETURN i`, {});
        result.records.forEach((singleRecord) => {
            images.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return images;
}

const getCustomerComment = async (proID, comID) => {
    let session = driver.session();
    let customers = [];
    try {
        var result = await session.run(`
        MATCH (cus:Customer),(com:Comment),(p:Product)
        WHERE com.id =  "${comID}"  AND p.id = ${proID}
        AND (cus)-[:COMMENT]->(com)
        AND (com)-[:COMMENT_FOR]->(p)
        RETURN cus`, {});
        result.records.forEach((singleRecord) => {
            customers.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return customers;
}

const getSeller = async (proID, comID) => {
    let session = driver.session();
    let Sellers = [];
    try {
        var result = await session.run(`
        MATCH (com:Comment),(p:Product),(s:Seller)
        WHERE com.id =  "${comID}"  AND p.id = ${proID}
        AND (s)-[:SELL]->(p)
        AND (com)-[:COMMENT_FOR]->(p)
        RETURN s`, {});
        result.records.forEach((singleRecord) => {
            Sellers.push(singleRecord.get(0).properties);
        })
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return Sellers;
}

const setComment = async (proID, userID, title, content, commentID, rating) => {
    let session = driver.session();
    try {
        await session.run(`
        CREATE (c:Comment{
            productID:${proID},
            rating: ${rating},
            title: "${title}",
            content: "${content}",
            createby: "${userID}",
            id:"${commentID}",
            create_at: ${new Date().getTime()}})`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const setRelationComtoPro = async (commentID, proID) => {
    let session = driver.session();
    try {
        await session.run(`
        MATCH (c:Comment),(p:Product)
        WHERE c.id = "${commentID}"
            AND p.id = ${proID}
        CREATE (c)-[:COMMENT_FOR]->(p)`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const checkExistsComment = async (userID, proID) => {
    let session = driver.session();
    let flag = false;
    try {
        var result = await session.run(`
         MATCH (n:Comment)
         WHERE n.productID= ${proID}
          AND n.createby= "${userID}"
          RETURN n`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    if (result.records.length > 0) {
        flag = true;
    }
    return flag;
}

const checkExistsCustomer = async (cusID) => {
    let session = driver.session();
    let flag = false;
    try {
        var result = await session.run(`
         MATCH (n:Customer)
         WHERE n.id = "${cusID}"
          RETURN n`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    if (result.records.length > 0) {
        flag = true;
    }
    return flag;
}

const setCustomer = async (cusID, cusName, commentID) => {
    let session = driver.session();
    try {
        await session.run(`
     CREATE(c:Customer{
        created_time: "${new Date()}",
        full_name: "${cusName}",
        purchased: true,
        name: "${cusName}",
        avatar: "//tiki.vn/assets/img/avatar.png",
        id: "${cusID}"})`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const setRelationCustoCom = async (CustomerID, CommentID) => {
    let session = driver.session();
    try {
        await session.run(`
        MATCH (c:Customer),(p:Comment)
        WHERE c.id = "${CustomerID}"
            AND p.id = "${CommentID}"
        CREATE (c)-[:COMMENT]->(p)`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}


const deleteComment = async (id) => {
    let session = driver.session();
    try {
        await session.run(`MATCH (i:Image {comID: '${id}'}) DETACH DELETE i`, {});
        await session.run(`MATCH (p:Comment {id: '${id}'}) DETACH DELETE p`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const lockComment = async (data) => {
    let session = driver.session();
    try {
        await session.run(`MATCH (p:Comment {id: '${data.id}'}) SET p.status= '${data.status}'`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
}

const getCommentById = async (id) => {
    let session = driver.session();
    let comment;
    try {
        comment = await session.run(`MATCH (p:Comment {id: '${id}'}) RETURN p`, {});
    } catch (error) {
        console.log(error);
    } finally {
        await session.close();
    }
    return comment.records[0].get(0).properties;
}

module.exports = {
    getAllComment, getCommentByProductID, getCommentImage,
    getCustomerComment, getSeller, setComment, setRelationComtoPro, checkExistsComment,
    checkExistsCustomer, setCustomer, setRelationCustoCom,
    deleteComment, getCommentById, lockComment 
}

