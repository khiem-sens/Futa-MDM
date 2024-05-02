const {getCommentById} = require('../Model/Neo4j/comment.neo4j');


class commentCon {
    async getCommentById (req, res) {;
        const comment = await getCommentById(req.params.id);
        res.json(comment);
    }
}

module.exports = new commentCon();