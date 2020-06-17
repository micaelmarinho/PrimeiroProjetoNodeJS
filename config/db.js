var mysql = require("mysql");

//Criamos uma variável que armazena a conexão e depois exportamos a variável. Fazemos isso para impedir que uma conexão com o banco de dados seja feita toda vez que houver uma requisição ao nosso site, porque o consign carrega os módulos automaticamente no objeto app do express, que é o servidor.
var connMySQL = function(){
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "portal_noticias"
    });

    //Só exibe quando uma requisição for feita, e não sempre que o servidor inicia.
    console.log("Uma requisição foi feita e uma conexão com o banco de dados foi estabelecida");

    return connection;
}

module.exports = function(){
    console.log("O consign fez o autoload da variável que contém a conexão com o banco de dados");
    return connMySQL;
}
        