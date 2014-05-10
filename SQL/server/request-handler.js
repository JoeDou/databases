var utils = require('./utils');
var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");

var Message = sequelize.define('Message', {
  contents: Sequelize.STRING,
  username: Sequelize.STRING,
  room: Sequelize.STRING
});

Message.sync();

var getMessages = function(request, response) {
  console.log('in get message');
  Message.findAll().success(function(data) {
    // This function is called back with an array of matches.
    console.log('get message data: ' + JSON.stringify(data));
    utils.sendResponse(response, data);
  });
};

var postMessage = function(request, response) {
  utils.collectData(request, function(message){
    var newMessage = Message.build({
      contents: message.text,
      username: message.username,
      room: 'room1'
    });
    newMessage.save().success(function(){
      utils.sendResponse(response);
    });
  });
};

//MYSQL connection
// var dbConnection = mysql.createConnection({
//   user: "root",
//   password: "",
//   database: "chat"
// });

// dbConnection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + dbConnection.threadId);
// });


// var messages = [
//   {
//     username: 'fred',
//     text: 'hello world',
//     roomName: 'lobby',
//     objectId: idCounter
//   }
// ];

// var getMessages = function(request, response) {
//   var query = 'SELECT * from chat.messages';

//   dbConnection.query(query, function(err, rows, fields){
//     if (err){
//       console.log('sql error: ' + err);
//       throw(err);
//     } else {
//       // console.log('sql rows results:' + JSON.stringify(rows));
//       // console.log('sql fields results: ' + JSON.stringify(fields));
//       utils.sendResponse(response,rows);
//     }
//   });
// };

// var postMessage = function(request, response) {
//   utils.collectData(request, function(message){
//     var query = 'INSERT INTO chat.messages (username, contents, created_at, room) values ("' + message.username + '","'+ message.text+'", NOW(),"room1")';
//     dbConnection.query(query, function(err, results){
//       if (err){
//         console.log('sql error: ' + err);
//         throw(err);
//       } else {
//         console.log('sql results: ' + results);
//         utils.sendResponse(response);
//       }
//     });
//   });
// };


var options = function(request, response) {
  utils.sendResponse(response);
};

var actions = {
  'GET': getMessages,
  'POST': postMessage,
  'OPTIONS': options
};

module.exports = function(request, response) {

  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    utils.send404(response);
  }
};
