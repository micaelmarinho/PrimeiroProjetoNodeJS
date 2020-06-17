module.exports.formulario_inclusao_noticia = function(application, request, response){
    //Método imputado pelo EJS ao Express. Ele ja reconhece a extensão .ejs então não é necessário informá-la, assim como o diretório "views" já é reconhecido.
    response.render("admin/form_add_noticia", {errors: {}, noticia: {}});
}

module.exports.salvarNoticia = function(application, request, response){
    var noticia = request.body; //Com o Body-Parser o objeto body de request torna-se manipulável
    
    //Métodos do middleware Express-Validator
    request.assert("titulo", "Título é obrigatório").notEmpty();
    request.assert("resumo", "Resumo é obrigatório").notEmpty();
    request.assert("resumo", "Resumo deve conter entre 10 e 100 caracteres").len(10, 100);
    request.assert("autor", "Autor é obrigatório").notEmpty();
    request.assert("data_criacao", "Data é obrigatório").notEmpty().isDate({format: "YYYY-MM-DD"});
    request.assert("noticia", "Notícia é obrigatório").notEmpty();

    var errors = request.validationErrors();

    if(errors){
        //Passando Errors para exibição das mensagens de erros para o usuário
        //Passando os dados da request que o usuário acabou de fazer para que ele não tenha que digitar tudo novamente se errar.
        response.render("admin/form_add_noticia", {errors: errors, noticia: noticia});
        return;
    }

    var connection = application.config.db();

    var NoticiasDAO = new application.app.models.NoticiasDAO(connection);
    NoticiasDAO.salvarNoticia(noticia, function(error, result){
        //Redireciona para a página de notícias. Se tivéssemos feito render("noticias/noticias"), se o usuário recarregar a página com F5, o formulário pode ser reenviado, criando um novo registro idêntico no banco de dados.
        response.redirect("/noticias");
    });
}