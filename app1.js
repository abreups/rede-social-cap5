var http = require('http');
http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end('Hello, World!');
}).listen(8080, '127.0.0.1');
console.log('Servidor escutando em http://127.0.0.1:8080/');
