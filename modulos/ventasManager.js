/**
 * Created by cristobal on 05/02/14.
 */


var mongodb = require('./mongodb'),
    db = mongodb.inventariodb,
    ventas = db.model('ventas'),
    productos = db.model('productos'),
    categorias = db.model('categorias');



exports.nuevaVenta= function (callback, data) {
    var data = data || {titulo: "Nueva Venta", venta: {id: 0, descripcion: '', productos: [], nota: '', activo: true}, btn: 'Guardar'};
    categorias.find({activo: true}, {nombre: 1}, function (err, docs) {
        if (!err) {
            var Categorias = [];
            for (var i in docs) {
                var c = {};
                c._id = docs[i]._id;
                c.nombre = docs[i].nombre;
                c.selected = data.producto.categoriaid != 0 ? (c._id.equals(data.producto.categoriaid) ? true : false) : false;
                Categorias.push(c);
            }
            data.categorias = Categorias;
        } else {
            throw err;
            data.categorias = [];
        }
        callback(data);
    });
}

/* métodos de  inserción, actualización & borrado */

exports.agregarVenta = function (data, callback) {
    data.codigo = data.codigo;
    data.descripcion = data.descripcion;
    data.costo = data.costo;
    data.inventario = data.inventario || 0;
    data.vendidos = data.vendidos || 0;
    data.comprados = data.comprados || 0;
    data.categoriaid = data.categoriaid;
    data.activo = data.activo ? true : false;
    productos.findOne({_id: data._id}, function (e, o) {
        delete data._id;
        if (o) productos.update({ _id: o._id }, { $set: data}, callback);
        else (new productos(data)).save(callback);
    });
}

exports.editarVenta = function (_id, callback) {
    var self = this;
    productos.findOne({_id: _id}, function (e, o) {
        if (o) self.nuevaVenta(callback, {venta:  o, btn: 'Actualizar', titulo: "Editar Venta"});
        else  self.nuevaVenta(callback);
    });
}

exports.listaProductos = function (callback) {
    productos.find({}, function (err, docs) {
        if (!err) {
            callback(docs);
        }
        else {
            throw err;
            callback(null);
        }
    });
}

exports.borrarProducto = function (_id, callback) {
    productos.remove({_id: _id}, function (err) {
        if (!err) callback({success: true, msg: 'p01'});
        else {
            throw err;
            callback({success: false, msg: 'p00'});
        }
    });
}

