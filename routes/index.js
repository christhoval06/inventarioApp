/*
 * GET home page.
 */

module.exports = function (app) {

    app.get('/inicio', function (req, res) {
        console.log(req.cookies);
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined)
            res.redirect('/');
        else
            res.render('inicio', {});
    });

    app.get('/logout', function (req, res) {
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined)
            res.redirect('/');
        else{
            res.clearCookie('usuario');
		    res.clearCookie('clave');

		    req.session.destroy(function(e){
                res.send('ok', 200); }
            );
        }
    });
}
