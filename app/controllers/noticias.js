module.exports.noticia = function(application, request, response){
    var connection = application.config.db();

    var id_noticia = request.query;
        
    var NoticiasDAO = new application.app.models.NoticiasDAO(connection);
    NoticiasDAO.getNoticia(id_noticia, function(error, result){
        //Método imputado pelo EJS ao Express. Ele ja reconhece a extensão .ejs então não é necessário informá-la, assim como o diretório "views" já é reconhecido.
        response.render("noticias/noticia", {noticia: result});
    });
}

module.exports.noticias = function(application, request, response){
    var connection = application.config.db();

    var NoticiasDAO = new application.app.models.NoticiasDAO(connection);
    NoticiasDAO.getNoticias(function(error, result){
        //Método imputado pelo EJS ao Express. Ele ja reconhece a extensão .ejs então não é necessário informá-la, assim como o diretório "views" já é reconhecido.
        response.render("noticias/noticias", {noticias: result});
    });
}