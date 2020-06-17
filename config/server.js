var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

var app = express();

//Informando para o express que o nosso engine de view é o EJS.
app.set("view engine", "ejs");
//Considerando que este server está sendo solicitado na pasta raiz, devemos chamar pastas em geral a aprtir da pasta raiz.
app.set("views", "./app/views");

//Middleware que inclui todas as dependências estáticas dentro das views. Assim todos os arquivos estáticos referenciados nas páginas HTML serão buscados em "app/public" automaticamente.
app.use(express.static("./app/public"));

//Usando o Body Parser como Middleware da aplicação. Middlewares manipulam os objetos de request e response de requisições
//Usamos já o método "urlEncoded" com parâmetro de extended = true, para fazer a tratativa das URLs de forma já codificada.
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

//Inclui todas as rotas do diretório routes dentro do objeto app do express, assim nao precisamos definir rota a rota no arquivo app.js
//O consign faz o auto load dos nossos módulos e executa eles. Se o módulo que estamos importando for uma função, ele a executa automaticamente.
//Como o objeto app está sendo usado no arquivo app.js, a base de busca para o diretório "routes", deve ser "app/routes"
//Ele joga tudo dentro do servidor. O servidor está sendo exportado para app.js que é onde ele é executado escutando a porta 8080
consign()
    .include("app/routes")
    .then("config/db.js") //Fazendo o auto load da conexão do banco de dados e exportando para o objeto express "app". Isso deixa a conexão com o banco disponível para todos os arquivos que recebem o objeto app do express como parâmetro.
    .then("app/models") //Carrega todas as querys de todas as tabelas no objeto app do express.
    .then("app/controllers") //Carrega os controllers
    .into(app);

module.exports = app;