var app = require('express')();
var cors = require('cors')
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(cors());
app.options('*', cors());


const port = 3000
server.listen(port, () => {
    console.log( `running http at port ${port}`);
  });


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});