const express = require('express');
const routerLogin = express.Router();
const { postCheckLogin, postLogin } = require('./middleware')

routerLogin.post('/checklogin', postCheckLogin)
routerLogin.post('/', postLogin)

module.exports = routerLogin