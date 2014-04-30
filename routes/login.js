/**
 * Created by cristobal on 04/07/14.
 */

var cuentasManager = require('../modulos/cuentasManager');
var moment = require('moment');

module.exports = function (app) {

    app.get('/', function (req, res) {
        // verifica si los datos del usuario estan guardados en las cookies
        if (req.cookies.usuario === undefined || req.cookies.clave=== undefined) {
             res.render('login', { title: 'Hola' });
        } else {
            // login automatico
            cuentasManager.autoLogin(req.cookies.usuario, req.cookies.clave, function (o) {
                if (o !== null) {
                    req.session.usuario = o;
                } else {
                    res.render('login', { title: 'Bienvenid@s' });
                }
            });
        }
    });

    app.post('/', function (req, res) {
        console.log("/");
        cuentasManager.manualLogin(req.param('usuario'), req.param('clave'), function (e, o) {
            console.log("//");
            if (!o) {
                res.send(e, 400);
            } else {
                req.session.usuario = o;
                if (req.param('recordarme') == 'true') {
                    res.cookie('usuario', o.usuario, { maxAge: 900000 });
                    res.cookie('clave', o.clave, { maxAge: 900000 });
                }
                res.send(o, 200);
            }
        });
    });


    app.get('/signup', function (req, res) {
        cuentasManager.agregarNuevoUsuario({
            usuario: 'christhoval',
            nombre: 'Christhoval Barba',
            clave: 'c706180t',
            tipo: 7,
            activo: true
        }, function (e) {
            if (e) {
                res.send(e, 400);
            } else {
                res.send('ok', 200);
            }
        });
    });
}