var express = require('express'); // carrega o módulo Express
var app = express(); // cria uma instância do express

app.set('view engine', 'jade'); // ajusta engine de renderização para jade
app.set('views', './views'); // local onde os arquivos .jade estão

app.listen(8080); // fica escutando na porta 8080

app.get('/', function(req, res) {
	res.render('HelloWorld3.jade'); // responde qdo navegador pede diretório raiz
});

console.log('Servidor escutando em http://127.0.0.1:8080/');
