/**
 * Created by cristobal on 04/07/14.
 */


module.exports = function (app) {

    app.get('/producto', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario == undefined || req.cookies.clave== undefined) {
            res.render('login', { title: 'Hola' });
        } else {
            res.render('producto', {producto:{id:0, codigo: ''}})
        }
    });
}