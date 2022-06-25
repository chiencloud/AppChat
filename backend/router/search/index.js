const express = require('express');
const routerSearch = express.Router();
const { getCheckUserName } = require('./middleware')

routerSearch.get('/', getCheckUserName)

module.exports = routerSearch