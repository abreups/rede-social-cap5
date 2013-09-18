Introdução:

Assume-se que você está trabalhando um uma máquina Linux (como Ubuntu)
e que você já sabe instalar o node.js e sabe instalar módulos
com o comando npm.

Construindo um Hello World do simples ao elaborado

Iniciaremos com um "Hello World" bem simples e iremos introduzindo
os componentes de Jade, Backbone, Express até chegar nos módulos
como estão no capiítlo 5 do livro "Construindo Aplicações
Node com MongoDB e Backbone".


Passo 0: html básico

Um arquivo em html puro e simples que faz o mesmo serviço que 
o resultado de todo o código do capítulo 5 seria:

	<!DOCTYPE html>
	<html lang="en">
		<head>
			<title>
				Social Network
			</title>
		</head>
		<body>
			<div id="content">Hello, World!</div>
		</body>
	</html>

					Arquivo: HelloWorld1.html

Digite esse código html em um editor de texto, salve no disco
com o nome 'HelloWorld1.html' e abra em
um navegador qualquer para obter o texto "Hello, World!" na 
janela do navegador.


Passo 1: node.js

Vamos então ao Passo 1: como fazer o node.js produzir esse mesmo
resultado, ou seja, não queremos abrir o arquivo usando os menus
do navegador (como 'Arquivo... Abrir Arquivo' no Firefox). Queremos
apontar o navegar para uma URL e ter o arquivo "servido" ao nosso
navegador.

Para isso precisamos fazer o node.js "servir" esse código html, e apontaremos
nosso navegador para, por exemplo, 'http://localhost:8080'.

O código "mais simples" para fazer o node.js produzir uma saída
seria:

	var http = require('http');
	http.createServer(function (req, res) {
		  res.writeHead(200, {'Content-Type': 'text/html'});
			res.end('Hello, World!');
	}).listen(8080, '127.0.0.1');
	console.log('Servidor escutando em http://127.0.0.1:8080/');

						Arquivo: app1.js

Esse código foi adaptado do exemplo fornecido na homepage
do projeto node.js (http://nodejs.org).

Digite esse código em um editor de texto, salve no arquivo
chamado 'app1.js' e execute o comando: 'node app1.js' na 
linha de comando. Então, abra seu navegador e digite a
URL 'http://localhost:8080' (ou 'http://127.0.0.1:8080'
que dá na mesma).

OK, bacana; mas não queremos colocar o código html da nossa página
dentro do código de app1.js (que é o que estamos fazendo
com a linha "res.end('Hello, World!')". Queremos que app1.js sirva o
código html de um arquivo externo, tal como nosso arquivo 
'HelloWorld1.html'.

Para isso, temos que usar alguma função que leia o arquivo que
contém o código html, colocando esse conteúdo em uma variável
e usando essa variável na chamada de "res.end(...)", assim:

	var http = require('http');
	var fs = require('fs'); // para ler arquivos
	var hello = fs.readFileSync('HelloWorld1.html'); // lê o arquivo
	http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(hello); // serve o conteúdo do arquivo html lido
	}).listen(8080, '127.0.0.1');
	console.log('Servidor escutando em http://127.0.0.1:8080/');

						Arquivo: app2.js

Esse código foi adaptado do exemplo fornecido em
http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server

Altere o arquivo 'app1.js' para que fique como o código acima,
salve com o nome de app2.js e execute o comando: "node app2.js" na linha de comando.
Então, abra seu navegador e digite a URL 'http://localhost:8080'.

Nota: a chamada de função fs.readFileSync(...) é do tipo "blocking",
ou seja, o programa fica esperando a função terminar (o arquivo
ser lido) antes de seguir em frente. Em princípio você deveria
evitar funções "blocking" e usar apenas técnicas assíncronas
(que são "non-blocking") através de "callback functions".
OK, OK, mas por enquanto vamos ficar assim mesmo porque isso vai
acabar desaparecendo mais pra frente então não vamos complicar agora.


Passo 2: Express

Do jeito que está, nosso "servidor web" só consegue servir um único
documento. E se quiséssemos ter vários documentos html distintos
que seriam acessados com uma URL mais específica. Por exemplo,
e se quiséssemos que a homepage do site fosse acessada por 
'http://localhost:8080/' e uma descrição sobre o site fosse acessível
por 'http://localhost:8080/about'. Então, do jeito que está não
dá, pois qualquer acesso vai sempre voltar o documento
HelloWorld1.html.

Uma maneira bastante popular de acrescentar essa funcionalidade que
desejamos é usar o módulo Express para o Node.
O Express tem um monte de funcionalidades mas vou explicar apenas 
algumas coisas básicas para que possamos entender como ele está 
sendo usado no capítulo 5 do livro.

Pra começar, vamos reescrever app2.js (renomeando o arquivo
para app3.js) para fazer a mesma coisa só que usando Express.

A primeira coisa a fazer é carregar o módulo do Express, assim:

	var express = require('express');
	var app = express();

Agora nós vamos dividir a chamada "http.createServer (....).listen(...)"
em duas partes:

a. uma parte que vai ficar "escutando" chamadas na porta 8080;
b. e outra parte que vai responder às chamadas servindo uma página html;

Note que no nosso código atual essas duas funções são meio que feitas
ao mesmo tempo; a resposta a uma chamada na porta 8080 é a devolução
do arquivo html. O motivo de quebrarmos em duas partes é, bem ..., sei lá.

A parte que escuta a porta 8080 é simplesmente:

	app.listen(8080);

E a parte que responde usa o método 'get' do Express:

	app.get('/', function(req, res) {
		res.end(hello);
	});

O que esse código está dizendo é o seguinte: quando o navegador solicitar 
uma página no diretório raiz '/' do site, devolva a página carregada na 
variável "hello".

O código final do arquivo app3.js fica assim:

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

						Arquivo: app3.js

Com o arquivo app3.js salvo em disco, execute 'node app3.js' na linha de
comando, abra seu navegador e digite a URL 'http://localhost:8080'.
Você verá a frase "Hello, World!" na janela do navegador indicando que
tudo ainda funciona.

Note que várias linhas estão excluídas colocando-as como comentário.
Uma delas é logo a primeira que carregava o módulo 'http'. Não 
precisamos mais usar esse módulo diretamente pois o Express oferece
as funcionalidades de http server que precisamos (a linha 
"app.listen(...)" está fazendo isso).

Você pode simplesmente apagar as linhas comentadas e o seu código vai ficar mais
enxuto, assim:

	var fs = require('fs'); // para ler arquivos
	var express = require('express'); // carrega o módulo Express
	var app = express(); // cria uma instância do express
	var hello = fs.readFileSync('HelloWorld1.html'); // lê o arquivo
	app.listen(8080); // fica escutando na porta 8080
	app.get('/', function(req, res) {
		res.end(hello); // responde qdo navegador pede diretório raiz
	});
	console.log('Servidor escutando em http://127.0.0.1:8080/');

						Arquivo: app4.js

Pra você ver algumas das vantagens que o Express oferece sem que tenhamos
que fazer nada, abra a seguinte URL no navegador:
http://localhost:8080/teste

Note que o navegador mostra algo do tipo "Cannot GET /teste".

Se você se lembra, antes de usarmos o Express, qualquer página sempre
voltava com o mesmo conteúdo. Agora não, somente o acesso a '/'
retorna nosso documento. Acesso a outras URLs retornam uma mensagem
"de erro". Execute "node app1.js", tente acessar a URL 
http://localhost:8080/teste e veja você mesmo.

Se quiser brincar de Express, experimente acrescentar as seguinte linhas 
de código imediatamente antes da linha "console.log(...)" e depois teste 
com seu navegador a URL "http://localhost:8080/teste".

	app.get('/teste', function(req, res) {
		res.end('Voce acessou teste');
	});

Mas isso não faz parte do capítulo 5 do livro, portanto vamos deixar de 
fora do nosso código por enquanto. Mas aqui vai o código completo do 
arquivo pra você não ficar com dúvidas:

	var fs = require('fs'); // para ler arquivos
	var express = require('express'); // carrega o módulo Express
	var app = express(); // cria uma instância do express
	var hello = fs.readFileSync('HelloWorld1.html'); // lê o arquivo
	app.listen(8080); // fica escutando na porta 8080
	app.get('/', function(req, res) {
		res.end(hello); // responde qdo navegador pede diretório raiz
	});
	app.get('/teste', function(req, res) {
		res.end('Voce acessou teste');
	});
	console.log('Servidor escutando em http://127.0.0.1:8080/');

						Arquivo: app5.js


Mas vale aqui um comentário sobre essa funcionalidade: chama-se "rotas". 
É uma das grandes utilizações do Express. O "get" em "app.get()" é 
referência direta ao verbo "GET" do protocolo HTTP. Da mesma forma,
O Express implementa vários outros verbos do protocolo HTTP, tais como
POST, PUT, etc. 
Uma excelente referência para aprender Express é o livro "Express Web
Application Development", escrito por Hage Yaapa. Vale a pena, e foi
lá que eu aprendi tudo isso.

Vamos então à segunda funcionalidade do Express.


Passo 3: Jade

O propósito mais simples do Jade é simplificar a criação de documentos html.
Obviamente que o "pulo do gato" é criar documentos html de forma dinâmica,
como parte de um programa em execução.

Um exemplo bem básico do uso do Jade é o seguinte:

1. crie um arquivo chamado teste.jade com esse conteúdo
(atenção com o espaçamento. Use tab):

	html
		body
			p.
				Mundo, mundo, vasto mundo.

						Arquivo: teste.jade

2. execute na linha de comando:
jade teste.jade

3. abra no editor de texto o arquivo gerado: teste.html

4. abra no navegador o arquivo teste.html

Percebeu o que o Jade fez? Ele gerou os markups html a partir
de instruções bem mais simples.
Exemplo: "body" virou "<body> ... </body>"

A homepage do projeto Jade é bem autoexplicativa.
http://jade-lang.com/tutorial/

O que vamos fazer então é escrever um arquivo .jade que gere o que 
por enquanto é nosso arquivo HelloWorld1.html.

Como nosso arquivo HelloWorld1.html é realmente bem simples, a 
equivalência com Jade não é difícil:

"<html>...</html>" --> html
"<head>...</head>" --> head
"<body>...</body>" --> body
"<title>...</title>" --> title

e para criar um div que tem um id chamado 'content' é só fazer:
"div#content".

Nosso arquivo HelloWorld2.jade fica então assim:

	!!! 5
	html(lang="en")
		head
			title Social Network
		body
			div#content Hello, World!

						Arquivo: HelloWorld2.jade

Nota: as duas primeiras linhas do arquivo ficam como exercício
para você "entender" (vai, é fácil).

A título de experiência, faça o Jade converter esse arquivo em 
uma versão em html com a seguinte linha de comando:
jade HelloWorld2.jade

Abra o resultado (o arquivo renderizado HelloWorld2.html)
em um editor de texto e depois abra no navegador.
Note que o arquivo em html não está indentado, o que facilitaria
sua leitura por nós humanos, mas é perfeitamente entendido pelo
navegador.

Veja que nosso arquivo HelloWorld2.jade ficou muito parecido
com o arquivo index.jade no Exemplo 5.3 do livro!

OK; se você entendeu o que o Jade, faz o próximo passo é fazer o 
Express e o Jade trabalharem juntos. 

Para isso, precisamos primeiro
dizer ao Express que ele vai trabalhar com o Jade (isso porque
o Express também trabalha com outras ferramentas parecidas com 
o Jade, tais como o 'ejs' ou o 'hogan').
A linha de comando que ajusta o Express para trabalhar com Jade é:

	app.set('view engine', 'jade');

Você pode ler essa linha de comando da seguinte forma: "setar a 
variável chamada 'view engine' com o valor 'jade'".
Essa variável é usada pelo Jade para saber qual a máquina de
renderização de HTML que vai ser usada.

E por falar em renderização, para renderizar uma página HTML
a partir de um arquivo em Jade, usamos o comando:

	app.render("nomeDaPagina.jade");

Só falta um detalhe, mas vamos ver isso daqui a pouco.
Então vamos modificar o arquivo app5.js, incluindo essas 2 linhas
e vamos usar o arquivo HelloWorld2.jade que criamos acima para
renderizar nossa página HTML.

Dessa forma, nosso arquivo app5.js fica assim (agora como app6.js):

	// var fs = require('fs'); // para ler arquivos
	var express = require('express'); // carrega o módulo Express
	var app = express(); // cria uma instância do express
	// var hello = fs.readFileSync('HelloWorld1.html'); // lê o arquivo
	app.set('view engine', 'jade'); // ajusta engine de renderização para jade
	app.listen(8080); // fica escutando na porta 8080
	app.get('/', function(req, res) {
		res.render('HelloWorld2.jade'); // responde qdo navegador pede diretório raiz
	});
	// app.get('/teste', function(req, res) {
	// 	res.end('Voce acessou teste');
	// });
	console.log('Servidor escutando em http://127.0.0.1:8080/');

						Arquivo: app6.js

Se você tentar executar esse arquivo com 'node app6' 
você vai receber uma mensagem de erro. Tente e veja.

E por quê? Dê uma olhada no seu diretório 'node modules'. Tá vendo
um sub-diretório chamado jade? Não? Então; é isso. Falta instalar o
Jade! Vamos lá:

	npm install jade

Olha lá de novo e... pronto.
Agora roda 'node app6' outra vez.

	node app6

Putz! Erro de novo?
Então, o detalhe que eu deixei passar logo antes é que temos que
dizer ao Express onde estão os arquivos '.jade' que serão renderizados.
O livro não usa o comando que eu vou mostrar agora porque o livro usa
o RequireJS para fazer isso. Vamos falar do RequireJS mais adiante, mas
para ficarmos com uma versão funcional do programa vamos usar:

	app.set('views', '.');

Leia essa linha de comando da seguinte forma: "Express, a variável
'views' agora tem o valor de 'diretório raiz' (ou seja, o mesmo
diretório onde o arquivo app6.js está)".

Acrescente essa linha em app6.js (que agora vai se chamar app7.js):

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

						Arquivo: app7.js

Rode então o programa com:

	node app7

Aponte o navegador para http://localhost:8080 e veja que nossa mensagem
de Hello world está lá.

Como você pode imaginar, é possível colocar os arquivos .jade em outro
diretório, e isso é provavelmente o que você gostaria de fazer à medida
que sua aplicação vai crescendo e a quantidade de arquivos vai crescendo
também. Criar uma estrutura de sub-diretórios para organizar onde
ficam os arquivos jade, onde ficam as imagens, etc é altamente
recomendável. No livro, os arquivos jade ficam num diretório
chamado 'views' dentro do diretório raiz. Vamos então criar esse
diretório, mover o arquivo HellowWorld2.jade para lá e acertar o código.

Árvore de diretório:

.			: aqui ficam todos os appx.js que já criamos
./views		: aqui colocamos os arquivos .jade

E o novo app8.js fica assim (já removendo as linhas comentadas):

	var express = require('express'); // carrega o módulo Express
	var app = express(); // cria uma instância do express
	app.set('view engine', 'jade'); // ajusta engine de renderização para jade
	app.set('views', './views'); // local onde os arquivos .jade estão
	app.listen(8080); // fica escutando na porta 8080
	app.get('/', function(req, res) {
		res.render('HelloWorld2.jade'); // responde qdo navegador pede diretório raiz
	});
	console.log('Servidor escutando em http://127.0.0.1:8080/');

						Arquivo: app8.js

Compare esse código com o do Exemplo 5.2 do livro e veja que estamos
quase lá.


Passo 4: Require JS

Nossa aplicação de Rede Social vai muito bem, obrigado, mas ninguém
vai chamar uma aplicação de "Rede Social" que apenas escreve "Hello
World" na janela do navegador, certo? O que queremos é possibilitar
que esse Hello World vá se expandindo para um verdadeiro programa
em JavaScript.

Para isso precisaremos de "código em Javascript", e a maneira
mais óbvia de se incluir código Javascript numa página html
é usar a tag <script>. Algo assim:

	<script type='text/javascript' src='xyz.js'></script>

Se colocarmos essa linha na seção <head> do código html, então
o programa em Javascript chamado xyz.js vai ser carregado (e executado)
logo quando a página html começa a ser carregada pelo navegador.

Ora, nossa aplicação de Rede Social poderia ser feita dessa forma.
Provavelmente teríamos uma código gigante em xyz.js e tudo resolvido.
Mas é exatamente a parte do "código gigante" que queremos evitar.
Primeiro que dar manutenção em um programa com centenas de linhas
no mesmo arquivo é terrível; dificulta o trabalho de um grupo
de programadores, por exemplo.
E se resolvermos subdividir nosso código em vários módulos, por exemplo:

	<script type='text/javascript' src='modulo1.js'></script>
	<script type='text/javascript' src='modulo2.js'></script>
	<script type='text/javascript' src='etc.js'></script>

começamos a entrar na questão de em que ordem os módulos têm que ser
carregados, se precisamos de todos eles carregados agora ou se podemos
carregar alguns apenas quando necessário (e como gerenciar isso), etc.

É nesse ponto que entra o RequireJS. Ele faz todo esse controle de
carregar quais módulos em que momento pra você.

Então, o único módulo que vamos carregar na nossa página inicial
vai ser justamente o RequireJS. A linha do tag <script> fica assim:

	<script type='text/javascript' src='require.js'></script>

Tá, mas o RequireJS não é o nosso programa de Rede Social. Como é
que dizemos ao Require que ele carregue nosso programa?

Muito bem, suponha então que nosso maravilhoso programa de Rede Social
vai começar com um arquivo chamado 'boot.js' (não criamos esse arquivo
ainda, calma).

Para dizer ao require que ele carregue esse módulo (ou programa, como
eu muito informalmente também o denomino) usamos um atributo para
a tag <script> chamado 'data-main'. Nossa linha de tag <script>
fica agora assim:

	<script data-main='boot' type='text/javascript' src='require.js'></script>

Note que, por convenção, não colocamos a extensão '.js' depois de 'boot'.
Essa linha então, quando interpretada pelo navegador, vai carregar o 
programa em Javascript chamado 'require.js' e este, por sua vez, depois
de carregado, vai carregar e executar o programa em Javascript chamado
'boot.js'.

Do jeito que a linha do <script> está escrita, tanto o arquivo
require.js como o arquivo boot.js tem que estar no mesmo diretório
do programa app8.js (que é o programa que começou a rodar primeiro).

Bem, da mesma forma que não queríamos ter um arquivo gigante com um
monte de código dentro dele, também não queremos ter um diretório
apenas com todos os arquivos da nossa aplicação. Vai ficar uma bagunça
encontrar as coisas; e foi pra isso que sub-diretórios foram criados,
certo?

Já havíamos criado um diretório só pra colocar os arquivos Jade
(chamado /views).

A estrutura de sub-diretórios proposta pelo livro é criar um
sub-diretório (ou pasta) chamada 'public' e debaixo dela colocar
tudo que possa (e deva) estar disponível para download pelo
cliente.
Para que a pasta 'public' não se torne ela mesma uma bagunça,
o autor divide um pouco mais a coisa e cria uma sub-pasta 'js'
para colocar tudo que tem a ver com Javascript.
E como código em Javascript virá de duas grandes fontes -- você,
o programador e os módulos prontos tais como o RequireJS -- criamos
uma outra sub-pasta só para as bibliotecas de terceiros (os tais
módulos prontos).
Essa "organização" fica assim então:

	/ : diretório raiz onde está app8.js
	|
	+-- public : daqui pra baixo tudo é acessível ao cliente
		  |
		  + - - js : nossos próprios arquivos JavaScript
				|
				+-- libs : bibliotecas de terceiros

Atenção: crie então essas pastas no seu computador e coloque os
arquivos em questão lá, assim:

public : aqui ainda não tem nenhum arquivo
public/js : aqui vai ficar o boot.js
public/js/libs : baixe o require.js e coloque aqui!

Baixe o require.js do site: http://requirejs.org
Na data em que escrevo esse texto a versão era a 2.1.8 e o link 
completo para baixar a versão "minified" (ou seja, enxuta, sem 
comentários) era: http://requirejs.org/docs/release/2.1.8/minified/require.js

Muito bem, se você está seguindo o raciocínio até agora, então 
tem um ajuste que temos que fazer na linha da tag <script>, que
ainda está assim:

	<script data-main='boot' type='text/javascript' src='require.js'></script>

E qual  ajuste seria esse?
Bem, depois dessa mexida toda com pastas e sub-pastas, nem o arquivo
'boot.js' nem o 'require.js' estão no mesmo diretório que 'app8.js'.
A linha correta seria essa:

	<script data-main='/public/js/boot' type='text/javascript' src='/public/js/libs/require.js'></script>

E onde colocamos essa linha mesmo?
No HelloWorld2.html.
Cacilda, mas o HelloWorld2.html é gerado pelo HelloWorld2.jade.
Isso! Você já tem a resposta: coloque essa linha no HelloWorld2.jade, mas
no formato Jade.
Parece difícil mas não é. Consulte aí qualquer material de referênca em 
Jade (eu recomendo o livro "Express Web Application Development", 
escrito por Hage Yaapa) e veja que essa linha fica assim:

	script(data-main='/public/js/boot', type='text/javascript', src='/public/js/libs/require.js')

O arquivo HelloWorld2.jade completo fica assim então (e vamos renomeá-lo
para HelloWorld3.jade:

	!!! 5
	html(lang="en")
		head
			title Social Network
			script(data-main='/public/js/boot', type='text/javascript', src='/public/js/libs/require.js')
			
		body
			div#content Hello, World!

						Arquivo: HelloWorld3.jade

Vá lá no diretório 'views' e execute:
	jade HelloWorld3.jade

Depois examine o arquivo gerado ('HelloWorld3.html') e confira se a tag
do <script> está lá bonitinha.

Como alteramos a versão do HelloWorld para número 3 (sim, o número
depois do nome do arquivo é um tipo bem porco de controle de versão),
vamos ajustar o app8.js para fazer referência e esse novo arquivo
(e criamos o app9.js):

	var express = require('express'); // carrega o módulo Express
	var app = express(); // cria uma instância do express
	app.set('view engine', 'jade'); // ajusta engine de renderização para jade
	app.set('views', './views'); // local onde os arquivos .jade estão
	app.listen(8080); // fica escutando na porta 8080
	app.get('/', function(req, res) {
		res.render('HelloWorld3.jade'); // responde qdo navegador pede diretório raiz
	});
	console.log('Servidor escutando em http://127.0.0.1:8080/');

						Arquivo: app9.js




Esse papo é meio teórico mas tem uma série de 2 vídeos no YouTube
que explicam de uma forma muito didática esse mecanismo.
Recomendo que você assista a esses vídeos:

Parte 1: http://www.youtube.com/watch?v=M-wjQjsryMY
Parte 2: http://www.youtube.com/watch?v=HwO_qwcJ4rs


