/*
 * Alvin 2017/6/18.
 */
const mysql = require("mysql");

let pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'jbb@123',
  database: 'music_play',
  connectionLimit: 5
});

module.exports = pool;
