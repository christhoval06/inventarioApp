/**
 * Created by cristobal on 04/30/14.
 */


module.exports = function (app) {

    app.get('/categoria', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined) {
            res.redirect('/');
        } else {
            res.render('categoria', {categoria:{_id:0, nombre: '', descripcion: '', activo: true}, btn: 'Guardar', titulo: "Nueva Categoria"})
        }
    });
}
