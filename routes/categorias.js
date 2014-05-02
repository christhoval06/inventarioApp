/**
 * Created by cristobal on 04/30/14.
 */

var categoriasManager = require('../modulos/categoriasManager');

module.exports = function (app) {

    app.get('/categoria', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined)
            res.redirect('/');
        else {
            res.render('./categoria/editor', {categoria:{_id:0, nombre: '', descripcion: '', activo: true}, btn: 'Guardar', titulo: "Nueva Categoria"})
        }
    });

    app.post('/categoria', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined)
            res.redirect('/');
        else
            categoriasManager.agregarCategoria({
                nombre: req.param("nombre"),
                descripcion: req.param("descripcion"),
                activo: req.param("activo")=="on" ? true : false
            },function (e) {
                res.contentType('json');
                if (e) res.json({success: false, error: e});
                else  res.json({success: true});
            });
    });

    app.get('/categoria/lista', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined)
            res.redirect('/');
        else {
            categoriasManager.listaCategorias(function(data){
                console.log(data);
            });
        }
    });
}
