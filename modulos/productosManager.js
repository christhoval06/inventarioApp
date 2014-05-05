/**
 * Created by cristobal on 05/02/14.
 */


var mongodb = require('./mongodb'),
    db = mongodb.inventariodb,
    productos = db.model('productos');


/* métodos de  inserción, actualización & borrado */

exports.agregarProductos= function (data, callback) {
    productos.findOne({nombre: data.nombre}, function (e, o) {
            if (o) {
                o.nombre = data.nombre;
                o.descripcion = data.descripcion;
                o.activo = data.activo;
                o.save(callback);
            } else {
               (new productos(data)).save(data, callback);
            }
        });
}

exports.editarProductos = function (_id, callback) {
    productos.findOne({_id: _id}, function (e, o) {
            if (o) {
                callback(o);
            } else {
               callback(null);
            }
        });
}

exports.listaProductos = function(callback){
    productos.find({}, function(err, docs) {
            if (!err){
                callback(docs);
            }
            else {
                throw err;
                callback(null);
            }
        });
}

