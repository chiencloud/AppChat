const express = require('express');
const routerSearch = express.Router();
const { getSearchUser } = require('./middleware');

routerSearch.get('/', getSearchUser);

module.exports = routerSearch;
