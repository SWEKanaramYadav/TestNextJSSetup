var mysql = require('mysql');
const config =  require('./config/config');

var connection = mysql.createPool({
    connectionLimit: 1000,
    host: "62.72.30.188",
    user: "equator_dev",
    password: "Equator@123",
    database: "TestDB",
});

connection.getConnection(function (err) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("" + err + " : Error connecting database... \n\n");
    }
});

module.exports = connection;
