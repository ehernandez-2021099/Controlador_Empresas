const Tipo = require('../models/tipo');
const Sucursal = require('../models/sucursal');
const Empresa = require('../models/empresas');
const empresas = require('../models/empresas');


const existeAsignacionPorId = async(id) => {

    const existeSucursal = await Sucursal.findById(id);

    if ( !existeSucursal ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}


const empresaExiste = async( nombre = '' ) => {

    const existeEmpresa = await Empresa.findOne( { nombre } );

    if ( !existeEmpresa ) {
        throw new Error(`El nombre de la empresa ${ empresas } no está registrado en la DB`);
    }

}

const esTipoValido = async( tipo = '' ) => {

    const existetipo = await Tipo.findOne( { tipo } );

    if ( !existetipo ) {
        throw new Error(`El rol ${ tipo } no está registrado en la DB`);
    }

}


const correoExiste = async(correo = '')=>{
    const existeEmail = await Empresa.findOne( { correo } );

    if ( existeEmail ) {
        throw new Error(`El nombre: ${correo } ya existe y esta registrado en la DB`);
    }
}


//No me dio tiempo de hacer esto
const validarMunicipio = async(ubicado = '')=>{
    const municipios = [
        "san josé pinula",
        "san juan sacatepéquez",
        "san miguel petapa",
        "santa catarina pinula",
        "chuarrancho",
        "fraijanes",
        "guatemala",
        "san pedro ayampuc",
        "san pedro sacatepéquez",
        "san raymundo",
        "mixco",
        "palencia",
        "san josé del golfo",
        "villa canales",
        "amatitlán",
        "chinautla",
        "villa nueva"
    ];
    const ubicacion = ubicado.toLowerCase();
    
    
    if(!municipios.includes(ubicacion)){
        throw new Error(`El municipio no esta registrado en el departamento Guatemala`);
    }
    
    
}

module.exports = {
    correoExiste,
    existeAsignacionPorId,
    validarMunicipio,
    empresaExiste,
    esTipoValido
}
