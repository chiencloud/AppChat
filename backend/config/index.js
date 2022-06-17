const mysql = require('mysql');

var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appchat2',
    charset : 'utf8mb4'
});

function query(queryCommand, queryFunction) {

    connect.query(queryCommand, queryFunction);
}

module.exports = query; 
