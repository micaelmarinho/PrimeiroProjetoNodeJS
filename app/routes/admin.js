module.exports = function(application){
    application.get("/formulario_inclusao_noticia", function(request, response){
        //Estamos passando a responsabilidade da lógica para o controller
        application.app.controllers.admin.formulario_inclusao_noticia(application, request, response);
    });

    application.post("/noticias/salvar", function(request, response){
        //Estamos passando a responsabilidade da lógica para o controller
        application.app.controllers.admin.salvarNoticia(application, request, response);
    });
}