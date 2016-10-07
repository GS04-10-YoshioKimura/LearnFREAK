
//のびすけさん記事( http://qiita.com/n0bisuke/items/647a244430b46375aba0 )より
//httpサーバー立ち上げ
// var app = require('http').createServer(function(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end(fs.readFileSync('index.html'));
// }).listen(4000);

console.log('接続数取得テスト');



var http = require('http');
var path = require('path');
var fs = require('fs');

// var async = require('http');
var socketio = require('socket.io');
var express = require('express');

var router = express();

//ここから
router.use(express.static('public'));
//ここまで

var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

var clients = [];
var vote = '';

io.on('connection', function (socket) {
  console.log("ID: "+socket.id.substring(2)+"has connected");
  console.log("テストテスト");
  clients[socket.id] = vote;

  socket.on('vote', function(data){
    clients[socket.id] = data; // good or bad
    var result = calcVote(clients);
    io.sockets.emit('vote', result);
    console.log("aaaa");
  });

  //ここから
  console.log('コネクション数',socket.client.conn.server.clientsCount);
  console.log(io.sockets);
  io.sockets.emit('count', socket.client.conn.server.clientsCount);

  socket.on('disconnect', function(data) {
    console.log('コネクション数',socket.client.conn.server.clientsCount);
    io.sockets.emit('count', socket.client.conn.server.clientsCount);
  });
  //ここまで



});

var calcVote = function(calcclients){
  var sums = {
    good:0,
    bad:0
  };
  calcclients.forEach(function(vote){
    switch (vote) {
      case 'good' :
      sums.good += 1;
      break;
      case 'bad' :
      sums.bad += 1;
      break;
    }
  });
  return sums;
};

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
