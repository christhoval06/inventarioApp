/**
 * Created by cristobal on 04/07/14.
 */

var productosManager = require('../modulos/productosManager'),
    msgMgr = require('../modulos/messagesManager');

module.exports = function (app) {

    app.get('/producto', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined) {
            res.redirect('/');
        } else {
            productosManager.nuevoProducto(function (p) {
                res.render('./producto/producto', p);
            });
        }
    });


    app.get('/producto/:id?', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else {
            productosManager.editarProductos(req.params.id, function (data) {
                res.render('./producto/producto', data);
            });
        }
    });


    app.post('/producto/:id?', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else{
            var code = req.body._id == '0' ? 'p02' : 'p03';
            productosManager.agregarProductos(req.body, function (e, p) {
                res.contentType('json');
                res.setHeader('Content-Type', 'text/json');
                if (e) res.json({success: false, error: e.message, code: 0});
                else  res.json({success: true, code: code});
            });
        }
    });


    app.get('/productos/:msg?', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else {
            productosManager.listaProductos(function (data) {
                res.render('./producto/lista', {productos: data, titulo: "lista de Productos", success: data.length > 0, msg: {is:!(!req.params.msg), msg: msgMgr.getMessage(req.params.msg) }});
            });
        }
    });

     app.get('/producto/:id/delete', function (req, res) {
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else {
            productosManager.borrarProducto(req.params.id, function (data) {
                res.redirect("/productos/" + data.msg);
            });
        }
    });
}