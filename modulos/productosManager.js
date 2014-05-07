/**
 * Created by cristobal on 05/02/14.
 */


var mongodb = require('./mongodb'),
    db = mongodb.inventariodb,
    productos = db.model('productos'),
    categorias = db.model('categorias'),
    ObjectId = db.ObjectId;


exports.nuevoProducto = function (callback, data) {
    var data = data || {titulo: "Nuevo Producto", producto: {id: 0, codigo: '', descripcion: '', costo: '0.00', inventario: '', vendidos: '', comprados: '', categoriaid: 0, activo: true}, btn: 'Guardar'};
    categorias.find({activo: true}, {nombre: 1}, function (err, docs) {
        if (!err) {
            var Categorias = [];
            for (var i in docs) {
                var c = {};
                c._id = docs[i]._id;
                c.nombre = docs[i].nombre
                if (c._id.equals(data.producto.categoriaid)) c.selected = true;
                else c.selected = false;
                Categorias.push(c);
            }
            data.categorias = Categorias;
            callback(data);
        } else {
            throw err;
            data.categorias = [];
            callback(data);
        }
    });
}

/* métodos de  inserción, actualización & borrado */

exports.agregarProductos = function (data, callback) {
    data.codigo = data.codigo;
    data.descripcion = data.descripcion;
    data.costo = data.costo;
    data.inventario = data.inventario || 0;
    data.vendidos = data.vendidos || 0;
    data.comprados = data.comprados || 0;
    data.categoriaid = data.categoriaid;
    data.activo = data.activo ? true : false;
    productos.findOne({_id: data._id}, function (e, o) {
        if (o) {
            console.log("update");
            delete data._id;
            productos.update({ _id: o._id }, { $set: data}, callback);
        } else {
            console.log("add");
            delete data._id;
            (new productos(data)).save(data, callback);
        }
    });
}

exports.editarProductos = function (_id, callback) {
    var self = this;
    productos.findOne({_id: _id}, function (e, o) {
        if (o) {
            self.nuevoProducto(callback, {producto: o, btn: 'Actualizar', titulo: "Categoria: " + o.codigo});
        } else {
            self.nuevoProducto(callback);
        }
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

