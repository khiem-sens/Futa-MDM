
const enpNotFound = (req, res, next) => {
    res.status(404).json({
        error_message: 'Endpoint not found'
    });
}

const someThingBroke = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Something broke!'
    });
}

const error = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Something broke!'
    });
}

module.exports = { someThingBroke, enpNotFound, error}