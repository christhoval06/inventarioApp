/**
 * Created by cristobal on 04/04/14.
 */
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema,
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
    tipo: { type: Number, min: 0, max: 7, default: 0 },
    activo: { type: Number, min: 0, max: 1, default: 1 },
    fc : { type: Date, default: Date.now }
})


exports.usuarios = mongoose.model( 'usuarios', usuarios );

var connection = mongoose.connect('mongodb://127.0.0.1/inventariodb', function(err){
    if (err){
        throw err;
        console.log(err.message);
    }
    console.log('conectado correctamente');
});


exports.inventariodb = connection;