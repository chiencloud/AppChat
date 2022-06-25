const express = require('express');
const routerRegister = express.Router();
const { getCheckUserName, postRegister } = require('./middleware')

routerRegister.get('/checkusername', getCheckUserName)

routerRegister.post('/', postRegister)

module.exports = routerRegister