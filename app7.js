// var fs = require('fs'); // para ler arquivos
var express = require('express'); // carrega o módulo Express
var app = express(); // cria uma instância do express

// var hello = fs.readFileSync('HelloWorld1.html'); // lê o arquivo
app.set('view engine', 'jade'); // ajusta engine de renderização para jade
app.set('views', '.'); // local onde os arquivos .jade estão

app.listen(8080); // fica escutando na porta 8080

app.get('/', function(req, res) {
	res.render('HelloWorld2.jade'); // responde qdo navegador pede diretório raiz
});

// app.get('/teste', function(req, res) {
// 	res.end('Voce acessou teste');
// });

console.log('Servidor escutando em http://127.0.0.1:8080/');
