const express = require('express');
const query = require('./config');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const app = express();
const port = 4000;

app.use(cors());
app.use(
    session({
        secret: 'appchat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);

app.get('/', (req, res) => {
    res.json('i');
});

app.post('/api/login', (req, res) => {
    let reponse;
    if (req.query.username && req.query.password) {
        let commandQuery = `SELECT NickName, Password FROM user WHERE NickName = '${req.query.username}' AND Password = '${req.query.password}'`;
        query(commandQuery, (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            if (results.length > 0) {
                req.session.nickname = req.query.username;
                console.log(req.query);
                reponse = {
                    token: jwt.sign(
                        {
                            username: req.query.username,
                        },
                        'appchat',
                    ),
                }
            } else
                reponse = {
                    fail: true
                }
        });
    } else
        reponse = {
            err: 'Lỗi'
        }

    res.json(reponse);
});

app.listen(port, (req, res) => {
    console.log(`listenning on port ${port}`);
});
