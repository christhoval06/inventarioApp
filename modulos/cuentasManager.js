/**
 * Created by cristobal on 04/07/14.
 */

var crypto 		= require('crypto'),
    moment 		= require('moment');

var mongodb = require('./mongodb'),
    db = mongodb.inventariodb,
    usuarios = db.model('usuarios');


/* métodos para validación de login*/

exports.autoLogin = function (usuario, clave, callback) {
    usuarios.findOne({usuario: usuario}, function (e, o) {
        if (o) {
            o.clave == clave ? callback(o) : callback(null);
        } else {
            callback(null);
        }
    });
}

exports.manualLogin = function (usuario, clave, callback) {
    console.log("manuallogin");
    usuarios.findOne({usuario: usuario}, function (e, o) {
        if (o == null) {
            callback('user-not-found');
        } else {
            validatePassword(clave, o.clave, function (err, res) {
                if (res) {
                    callback(null, o);
                } else {
                    callback('invalid-password');
                }
            });
        }
    });
}

/* métodos de  inserción, actualización & borrado */

exports.agregarNuevoUsuario = function (newData, callback) {
    usuarios.findOne({usuario: newData.usuario}, function (e, o) {
            if (o) {
                callback('username-taken');
            } else {
                saltAndHash(newData.clave, function (hash) {
                    newData.clave = hash;
                    // se agrega la fecha en la que se crea el usuario//
                    newData.fc = moment().format('DD MM YYYY, h:mm:ss');
                    (new usuarios(newData)).save(newData, callback);
                });

            }
        });
}


/* encriptación privada y métodos de validación */

var generateSalt = function () {
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function (str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function (clave, callback) {
    var salt = generateSalt();
    callback(salt + md5(clave + salt));
}

var validatePassword = function (plainPass, hashedPass, callback) {
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    callback(null, hashedPass === validHash);
}