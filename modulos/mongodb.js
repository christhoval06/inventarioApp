/**
 * Created by cristobal on 04/04/14.
 */


var mongoose = require( 'mongoose' ),
Schema   = mongoose.Schema,
ObjectId = Schema.ObjectId;

/*

var situaciones = new Schema({
    nombre    : String,
    code    : String
});

var usuarios = new Schema({
	nombre: String,
    nick: String,
    telefono: String,
    imei: String,
	fecha: { type: Date, default: Date.now }
});

var emergencia = new Schema({
    usuarioId    : { type: ObjectId, ref: 'usuarios' },
    situacionId  : { type: ObjectId, ref: 'situaciones' },
    geo: {type: [Number], index: '2d'},
    lugar    : String,
    descripcion    : String,
    fecha : { type: Date, default: Date.now },
    completo: Boolean
});

var reportes = new Schema({
    emergenciaId    : { type: ObjectId, ref: 'emergencia' },
    nombre    : String,
    sexo    : String,
    estado    : String,
    trauma    : String,
    fecha : { type: Date, default: Date.now },
    completo: Boolean
});

*/

var usuarios = new Schema({
        usuario: { type: String, lowercase: true, trim: true, required: true, index: { unique: true, sparse: true }},
        nombre: { type: String, required: true},
        clave: { type: String, required: true},
        tipo: { type: Number, min: 0, max: 7, default: '0' },
        activo: { type: Boolean, default: true },
        fc : { type: Date, default: Date.now }
    }),
    categorias = new Schema({
        nombre: { type: String, trim: true, required: true, index: { unique: true, sparse: true }},
        descripcion: { type: String},
        activo: { type: Boolean, default: true },
        fc : { type: Date, default: Date.now }
    }),
    productos = new Schema({
        codigo: { type: String, trim: true, required: true, index: { unique: true, sparse: true }},
        descripcion: { type: String, required: true},
        costo: { type: Number, default: '0' },
        inventario: { type: Number, default: '0' },
        vendidos: { type: Number, default: '0' },
        comprados: { type: Number, default: '0' },
        categoriaid    : { type: ObjectId, ref: 'categorias', default: null},
        activo: { type: Boolean, default: true },
        fc : { type: Date, default: Date.now }

    }),
    ventas = new Schema({
        fecha: { type: Date, default: Date.now, required: true },
        descripcion: { type: String, required: true},
        productos: [{productoid: { type: ObjectId, ref: 'productos', default: null}, cantidad: { type: Number, default: '0' }, costo: { type: Number, default: '0' }}],
        nota: { type: String, default: ''},
        activo: { type: Boolean, default: true },
        fc : { type: Date, default: Date.now }

    });;


exports.usuarios = mongoose.model( 'usuarios', usuarios );
exports.categorias = mongoose.model( 'categorias', categorias );
exports.productos = mongoose.model( 'productos', productos );
exports.ventas = mongoose.model( 'ventas', ventas );
exports.ObjectId = ObjectId;

//var conDB = 'mongodb://christhoval:c706180t@ds053497.mongolab.com:53497/inventariodb';
var conDB = 'mongodb://127.0.0.1/inventariodb';
var connection = mongoose.connect(conDB, function(err){
    if (err){
        console.log(err.message);
        throw err;
    }
    console.log('conectado correctamente');
});


exports.inventariodb = connection;