module.exports = function(application){

    application.get("/noticia", function(request, response){
        application.app.controllers.noticias.noticia(application, request, response);
    });

    application.get("/noticias", function(request, response){
        application.app.controllers.noticias.noticias(application, request, response);
    });
}