/**
 * Created by cristobal on 04/30/14.
 */

var categoriasManager = require('../modulos/categoriasManager'),
    msgMgr = require('../modulos/messagesManager');

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
        else{
            var code = req.body._id == '0' ? 'c02' : 'c03';
            categoriasManager.agregarCategoria(req.body, function (e) {
                res.contentType('json');
                res.setHeader('Content-Type', 'text/json');
                if (e) res.json({success: false, error: e.message, code: 0});
                else  res.json({success: true, code: code});
            });
        }
    });

    app.get('/categorias/:msg?', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else {
            categoriasManager.listaCategorias(function (data) {
                res.render('./categoria/lista', {categorias: data, titulo: "lista de Categorias", success: data.length > 0, msg: {is:!(!req.params.msg), msg: msgMgr.getMessage(req.params.msg) }});
            });
        }
    });

    app.get('/categoria/:id/delete', function (req, res) {
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else {
            categoriasManager.borrarCategorias(req.params.id, function (data) {
                res.redirect("/categorias/" + data.msg);
            });
        }
    });
}
