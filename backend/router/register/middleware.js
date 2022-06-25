const jwt = require('jsonwebtoken');
const query = require('../../config');

function getCheckUserName(req, res, next){
    if (req.query.username) {
        let commandQuery = `
            SELECT NickName 
            FROM user
            WHERE NickName = '${req.query.username}'
        `;

        query(commandQuery, (err, result) => {
            if (err) {
                res.json(false);
            } else {
                res.json(result.length > 0 ? true : false);
            }
        })
    }
}

function postRegister(req, res, next){
    if (req.body.username && req.body.fullname && req.body.password && req.body.gender) {
        let commandQuery = `
            INSERT INTO user (Password, FullName, NickName, Gender) 
            VALUES ('${req.body.password}','${req.body.fullname}','${req.body.username}','${req.body.gender}')
        `;

        query(commandQuery, (err, result) => {
            if (err) {
                res.json(false);
            } else {
                res.json(true);
            }
        });
    }
}


module.exports = {
    getCheckUserName: getCheckUserName,
    postRegister: postRegister,
}