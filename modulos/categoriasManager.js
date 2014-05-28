/**
 * Created by cristobal on 05/02/14.
 */


var mongodb = require('./mongodb'),
    db = mongodb.inventariodb,
    categorias = db.model('categorias');


exports.nuevaCategoria = function (callback, data) {
    callback(data || {titulo: "Nueva Categoria", categoria: {id: 0, nombre: '', descripcion: '', activo: true}, btn: 'Guardar'});
}


/* métodos de  inserción, actualización & borrado */

exports.agregarCategoria = function (data, callback) {
    nombre = data.nombre;
    descripcion = data.descripcion;
    activo = data.activo ? true : false;
    categorias.findOne({_id: data._id}, function (e, o) {
        if (o) {
            delete data._id;
            categorias.update({ _id: o._id }, { $set: data}, callback);
        } else {
            delete data._id;
            (new categorias(data)).save(data, callback);
        }
    });
}

exports.editarCategoria = function (_id, callback) {
    var self = this;
    categorias.findOne({_id: _id}, function (e, o) {
        if (o) self.nuevaCategoria(callback, {categoria: o, btn: 'Actualizar', titulo: "Categoria: " + o.nombre});
        else  self.nuevaCategoria(callback);
    });
}

exports.listaCategorias = function (callback) {
    categorias.find({}, function (err, docs) {
        if (!err) callback(docs);
        else {
            throw err;
            callback(null);
        }
    });
}

