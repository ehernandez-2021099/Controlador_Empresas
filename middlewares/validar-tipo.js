const { request, response } = require('express');


//Operador rest u operador spread 
const tieneTipo = ( ...tipos) => {

    return (req = request, res= response, next) => {

        if (!req.empresa) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!tipos.includes( req.empresa.tipo)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos tipos: ${ tipos }`
            })

        }

        next();

    }

}





module.exports = {
    tieneTipo
}