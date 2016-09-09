const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);

app.set('port', (process.env.API_PORT || 3001));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
