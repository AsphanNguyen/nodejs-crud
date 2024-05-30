const mysql = require('mysql');

exports.createcon = () =>{
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'eshop'
    });
}