/**
 * Created by cristobal on 04/30/14.
 */

var categoriasManager = require('../modulos/categoriasManager');

module.exports = function (app) {

    app.get('/categoria/:id?', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else
            categoriasManager.editarCategoria(req.params.id, function (c) {
                res.render('./categoria/categoria', c)
            });
    });

    app.post('/categoria/:id?', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else
            categoriasManager.agregarCategoria(req.body, function (e) {
                res.contentType('json');
                res.setHeader('Content-Type', 'text/json');
                if (e) res.json({success: false, error: e.message});
                else  res.json({success: true, msg: "OK"});
            });
    });

    app.get('/categorias', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else {
            categoriasManager.listaCategorias(function (data) {
                res.render('./categoria/lista', {categorias: data, titulo: "lista de Categorias", success: false});
            });
        }
    });
}
