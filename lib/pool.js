/**
 * Created by Web on 2017/6/18.
 */
//创建连接池
const mysql = require("mysql")

let pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'music_play',
    connectionLimit:5
})

module.exports = pool