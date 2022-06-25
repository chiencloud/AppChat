const jwt = require('jsonwebtoken');
const query = require('../../config');

function postCheckLogin(req, res, next){
    jwt.verify(req.body.token, 'appchat', (err, data) => {
        if (err) {
            res.json({
                login: false,
            });
        } else {
            let commanQuery = `SELECT NickName, UserId FROM user WHERE NickName = '${data.username}'`;
            query(commanQuery, (err, result) => {
                if (err)
                    res.json({
                        err: 'Lỗi csdl',
                    });
                else if (result.length === 1) {
                    res.json({
                        login: true,
                    });
                } else {
                    res.json({
                        login: false,
                    });
                }
            });
        }
    });
}

function postLogin(req, res, next) {
    if (req.body.username && req.body.password) {
        let commandQuery = `SELECT UserId, NickName, Password FROM user WHERE NickName = '${req.body.username}' AND Password = '${req.body.password}'`;
        query(commandQuery, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.length > 0) {
                // results = req.body.username;
                res.json({
                    token: jwt.sign(
                        {
                            userId: results[0].UserId,
                        },
                        'appchat',
                    ),
                    userId: results[0].UserId,
                });
            } else
                res.json({
                    fail: true,
                });
        });
    } else {
        res.json({
            err: 'Lỗi',
        });
    }
}


module.exports = {
    postCheckLogin: postCheckLogin,
    postLogin: postLogin,
}