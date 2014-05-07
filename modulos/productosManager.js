/**
 * Created by cristobal on 05/02/14.
 */


var mongodb = require('./mongodb'),
    db = mongodb.inventariodb,
    productos = db.model('productos'),
    categorias = db.model('categorias');


exports.nuevoProducto = function(callback, data){
    var data = data || {titulo: "Nuevo Producto", producto: {id:0, codigo: '', descripcion: '', costo:'0.00', inventario:'', vendidos: '', comprados:'', categoriaid: 0, activo: true}, btn: 'Guardar'};
     categorias.find({activo: true}, function(err, docs) {
            if (!err){
                data.categorias = docs;
                callback(data);
            }else {
                throw err;
                data.categorias = [];
                callback(data);
            }
        });
}

/* métodos de  inserción, actualización & borrado */

exports.agregarProductos= function (data, callback) {
    console.log(data);
    productos.findOne({codigo: data.codigo}, function (e, o) {
            if (o) {
                console.log("update");
                o.codigo = data.codigo;
                o.descripcion = data.descripcion;
                o.costo = data.costo;
                o.inventario = data.inventario;
                o.vendidos = data.vendidos;
                o.comprados = data.comprados;
                o.categoriaid = data.categoriaid;
                o.activo = data.activo ? true : false;
                o.save(callback);
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

