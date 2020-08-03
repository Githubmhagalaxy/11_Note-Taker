var http = require('http');
var app = require('./app');


var port = 80;

app.set('port', port);

http.createServer(app).listen(port);
