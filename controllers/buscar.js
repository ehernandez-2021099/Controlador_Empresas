const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Empresa = require('../models/empresas');
const Sucursal = require('../models/sucursal');

const coleccionesPermitidas = [
    'sucursal',
];


const buscarSucursal = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino ); 

    if ( esMongoID ) {
        const sucursal = await Sucursal.findById(termino);
        return res.json({
            results: ( sucursal ) ? [ sucursal ] : [] 
        });
    } 

    const regex = new RegExp( termino, 'i');

    const sucursal = await Sucursal.find({
        $or: [ { nombre: regex }, { ubicacion: regex } ],
    });

    res.json({
        results: sucursal
    })

}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La colección: ${ coleccion } no existe en la DB
                  Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }


    switch (coleccion) {
        case 'sucursal':
            buscarSucursal(termino, res);
        break;
        /*case 'sucursals':
           buscarSucursales(termino, res);
        break;*/
        default:
            res.status(500).json({
                msg: 'Error, se te olvido hacer esta busqueda...'
            });
        break;
    }

}


module.exports = {
    buscar
}