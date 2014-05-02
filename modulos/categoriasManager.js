/**
 * Created by cristobal on 05/02/14.
 */


var mongodb = require('./mongodb'),
    db = mongodb.inventariodb,
    categorias = db.model('categorias');


/* métodos de  inserción, actualización & borrado */

exports.agregarCategoria = function (data, callback) {
    console.log(data);
    categorias.findOne({nombre: data.nombre}, function (e, o) {
            if (o) {
                o.nombre = data.nombre;
                o.descripcion = data.descripcion;
                o.activo = data.activo;
                o.save(callback);
            } else {
               (new categorias(data)).save(data, callback);
            }
        });
}

exports.editarCategoria = function (_id, callback) {
    categorias.findOne({_id: _id}, function (e, o) {
            if (o) {
                callback(o);
            } else {
               callback(null);
            }
        });
}

exports.listaCategorias = function(callback){
    categorias.find({}, function(err, docs) {
            if (!err){
                callback(docs);
            }
            else {
                throw err;
                callback(null);
            }
        });
}

