const express = require('express');
const routerMessage = express.Router();
const { getMessage } = require('./middleware')

routerMessage.get('/', getMessage)

module.exports = routerMessage