/**
 * Created by Web on 2017/6/18.
 */
//创建服务器
const http = require("http")
const express = require("express")
//const qs = require("querystring")
const pool = require("./lib/pool")
const user = require("./lib/user")
const music = require("./lib/music")

let app = express()
let srv = http.createServer(app).listen(8080)

/*********处理各种请求********/
//静态资源用express中间件处理
app.use(express.static("public"))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})
app.post('/Login',user.login)
app.post('/Lists',music.getListsSongs)