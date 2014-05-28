/**
 * Created by cristobal on 05/02/14.
 */


var mongodb = require('./mongodb'),
    db = mongodb.inventariodb,
    categorias = db.model('categorias');


exports.nuevaCategoria = function (callback, data) {
    callback(data || {titulo: "Nueva Categoria", categoria: {_id: 0, nombre: '', descripcion: '', activo: true}, btn: 'Guardar', del: false});
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
            (new categorias(data)).save(callback);
        }
    });
}

exports.editarCategoria = function (_id, callback) {
    var self = this;
    categorias.findOne({_id: _id}, function (e, o) {
        if (o) self.nuevaCategoria(callback, {categoria: o, btn: 'Actualizar', titulo: "Categoria: " + o.nombre, del: true});
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


exports.borrarCategorias = function (_id, callback) {
    categorias.remove({_id: _id}, function (err) {
        if (!err) callback({success: true, msg: 'c01'});
        else {
            throw err;
            callback({success: false, msg: 'c00'});
        }
    });
}


