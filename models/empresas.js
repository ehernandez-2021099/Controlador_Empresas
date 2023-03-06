const { Schema, model } = require('mongoose');


const EmpresasSchema = Schema({
    nombreEmpres: {
        type:String,
        required: true

    },
    correo: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    estado: {
        type : Boolean,
        default : true
    },
    tipo:{
        type:String,
        required:true
    }
});


module.exports = model('Empresas', EmpresasSchema);