//Chamamo DAO por convenção de Orientação a Objetos com MVC, pois estamos acessando um objeto de dados (Data Access Object (DAO))
function NoticiasDAO(connection){
    this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback){
    this._connection.query("select * from noticias", callback);
};

NoticiasDAO.prototype.getNoticia = function(id_noticia, callback){
    this._connection.query("select * from noticias where id = " + id_noticia.id, callback);
};

NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
    //O módulo MySQL do Node.js permite usarmos o caractere "?" como coringa para fazer a query informando o JSON diretamente, sem precisar construir a query SQL inteira
    this._connection.query("insert into noticias set ? ", noticia, callback);
};

NoticiasDAO.prototype.getUltimasNoticias = function(callback){
    //O módulo MySQL do Node.js permite usarmos o caractere "?" como coringa para fazer a query informando o JSON diretamente, sem precisar construir a query SQL inteira
    this._connection.query("select * from noticias order by data_criacao desc limit 5", callback);
};

module.exports = function(){
    return NoticiasDAO;
}