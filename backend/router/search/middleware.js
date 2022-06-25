const jwt = require('jsonwebtoken');
const query = require('../../config');

function getChat(req, res, next){
    if(req.query.searchValue && req.query.type){
        let commandQuery = `
            SELECT 
        `
    }
}

module.exports = {
    getChat: getChat
}