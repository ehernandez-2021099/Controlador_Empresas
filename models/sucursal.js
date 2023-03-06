const { Schema, model } = require('mongoose');
  
const SucursalesSchema = Schema({
    nombreSucursal: {
        type: String,
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresas',
        required: true

    },
    ubicacion: {
        type:String,
        required: true

    },
    estado: {
        type:Boolean,
        default:true,
        required: true

    },
});


module.exports = model('Sucursales', SucursalesSchema);