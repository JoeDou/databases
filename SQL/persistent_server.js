var mysql = require('mysql');
var chatServer = require('basic-server.js');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + dbConnection.threadId);
});
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */


// connection.query('INSERT INTO webHistorian.webHistorianTable (website, updated) Values ("www.google.com", true)', function(err, results){
//   if (err){
//     console.log('sql error: ' + err);
//     throw(err);
//   } else {
//     console.log('sql results: ' + results);
//   }
// });

// dbConnection.query('SELECT * from webHistorian.webHistorianTable', function(err, rows, fields){
//   if (err){
//     console.log('sql error: ' + err);
//     throw(err);
//   } else {
//     console.log('sql row results: ' + rows[0].website);
//     console.log('sql fields results: ' + JSON.stringify(fields));

//   }
// });
