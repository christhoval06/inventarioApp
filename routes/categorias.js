/**
 * Created by cristobal on 04/30/14.
 */

var categoriasManager = require('../modulos/categoriasManager');

module.exports = function (app) {

    app.get('/categoria/:id?', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined)
            res.redirect('/');
        else {
            if(req.params.id)
                categoriasManager.editarCategoria(req.params.id,function(data){
                    if(data)
                       res.render('./categoria/editor', {categoria: data, btn: 'Actualizar', titulo: "Categoria: " + data.nombre})
                    else
                        res.render('./categoria/editor', {categoria:{_id:0, nombre: '', descripcion: '', activo: true}, btn: 'Guardar', titulo: "Nueva Categoria"})
                });
            else
                res.render('./categoria/editor', {categoria:{_id:0, nombre: '', descripcion: '', activo: true}, btn: 'Guardar', titulo: "Nueva Categoria"})
        }
    });

    app.post('/categoria/:id?', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined)
            res.redirect('/');
        else
        console.log(req.param("activo") ? true : false);
            categoriasManager.agregarCategoria({
                nombre: req.param("nombre"),
                descripcion: req.param("descripcion"),
                activo: req.param("activo") ? true : false
            },function (e) {
                res.contentType('json');
                if (e) res.json({success: false, error: e});
                else  res.json({success: true});
            });
    });

    app.get('/categorias', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined)
            res.redirect('/');
        else {
            categoriasManager.listaCategorias(function(data){
                if(data)
                    res.render('./categoria/lista',{categorias: data, titulo: "lista de Categorias"});
                else
                    res.render('inicio', {msg: "error-cargar-lista-categorias"});
            });
        }
    });
}
