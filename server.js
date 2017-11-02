/*
 * Alvin 2017/6/18.
 */
const http = require("http");
const express = require("express");
//const qs = require("querystring")
const pool = require("./lib/pool");
const user = require("./lib/user");
const music = require("./lib/music");

let app = express();
let srv = http.createServer(app).listen(8080);

app.use(express.static("public"));
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/public/index.html");
});
app.post('/Login', user.login);
app.post('/Lists', music.getListsSongs);
