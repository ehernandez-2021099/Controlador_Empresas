const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Empresa = require('../models/empresas');

const validarJWT = async( req = request, res= response, next ) => {

    const token = req.header('x-token');

    //Si no viene el token
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición !token'
        })
    }
    
    
    try {

        const { uid } = jwt.verify( token,process.env.SECRET_KEY_FOR_TOKEN);
       
        // leer al usuario que corresponda el uid
        const empresa = await Empresa.findById( uid );
        
        //Verificar si el uid del usuario no existe
        if ( !empresa ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB fisicamente'
            })
        }

        //Verufucar su ek uid tiene estado true
        if ( !empresa.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }

        
        req.empresa = empresa;
        next();
        
    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        })

    }


}

module.exports = {
    validarJWT
}
