module.exports.index = function(application, request, response){
    var connection = application.config.db();
    var noticiasDAO = new application.app.models.NoticiasDAO(connection);

    noticiasDAO.getUltimasNoticias(function(error, result){
        //Método imputado pelo EJS ao Express. Ele ja reconhece a extensão .ejs então não é necessário informá-la, assim como o diretório "views" já é reconhecido.
        response.render("home/index", {noticias: result});
    });
}