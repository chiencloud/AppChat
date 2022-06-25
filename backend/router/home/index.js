const express = require('express');
const routerHome = express.Router();
const { getHome } = require('./middleware')

routerHome.get('/', getHome)

module.exports = routerHome