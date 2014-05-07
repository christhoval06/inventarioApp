/**
 * Created by cristobal on 04/07/14.
 */

var productosManager = require('../modulos/productosManager');

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
        else
            productosManager.agregarProductos(req.body, function (e, p) {
                res.contentType('json');
                res.setHeader('Content-Type', 'text/json');
                if (e) res.json({success: false, error: e.message});
                else  res.json({success: true, msg: "OK", producto: p});
            });
    });


    app.get('/productos', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave === undefined)
            res.redirect('/');
        else {
            productosManager.listaProductos(function (data) {
                if (data)
                    res.render('./producto/lista', {productos: data, titulo: "lista de Productos"});
                else
                    res.render('inicio', {msg: "error-cargar-lista-categorias"});
            });
        }
    });
}