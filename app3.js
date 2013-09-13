// var http = require('http');
var fs = require('fs'); // para ler arquivos

var express = require('express'); // carrega o módulo Express
var app = express(); // cria uma instância do express

var hello = fs.readFileSync('HelloWorld1.html'); // lê o arquivo

/*
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(hello); // serve o conteúdo do arquivo html lido
}).listen(8080, '127.0.0.1');
*/

app.listen(8080); // fica escutando na porta 8080

app.get('/', function(req, res) {
	res.end(hello); // responde qdo navegador pede diretório raiz
});

console.log('Servidor escutando em http://127.0.0.1:8080/');
