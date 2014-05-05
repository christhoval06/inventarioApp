/**
 * Created by cristobal on 04/07/14.
 */


module.exports = function (app) {

    app.get('/producto', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined) {
            res.redirect('/');
        } else {
            res.render('./producto/producto', {producto: {id:0, codigo: '', descripcion: '', costo:'0.00', inventario:'', vendidos: '', comprados:''}, btn: 'Guardar'})
        }
    });
}