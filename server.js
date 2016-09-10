const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT
  // database: 'dropin'
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... \n\n");  
  } else {
    console.log("Error connecting database ... \n\n");  
  }
});

app.set('port', (process.env.API_PORT || 3001));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api/user', (req, res) => {
  connection.query('SELECT * FROM dropin.user', function(err, rows, fields) {
    res.json(rows);
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get('/api/chat', (req, res) => {

  const mockChats = [{title:"HI", replies:"HO"}, {title:"Hey", replies:"Ha"}, {title:"He", replies:"Ha"} ];

  res.json(mockChats);
});

io.on('connection',function(socket){
  socket.on('get msg',function(data){
    var data_client=data;
    io.emit('set msg',JSON.stringify(data_client));
  });
});

http.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
