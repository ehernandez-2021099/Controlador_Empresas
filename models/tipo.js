const {Schema, model} = require('mongoose');

const TipoScehcma = Schema({
    tipo:{
        type:String,
        require:[true, ' El campo tipo es obligatorio']
    },
});

module.exports = model('Tipo', TipoScehcma);