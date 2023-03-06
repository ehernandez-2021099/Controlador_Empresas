const {response, request } = require('express');
const bcrypt = require('bcryptjs');
const Empresa = require('../models/empresas');
  
const getEmpresa = async (req = request, res = response) => {
    //Condiciones del get
    const query = { estado: true};   

    const listaEmpresa = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query),
        
    ]);
    
    res.json({
        msg: 'get Api - Controlador de empresa',
        listaEmpresa

    });
}



const postEmpresa = async (req = request, res = response) => {

    const { correo, password, nombreEmpres, tipo} = req.body;
    const GuardadoDB = new Empresa({correo, password, nombreEmpres, tipo});

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    GuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await GuardadoDB.save();
 

    res.json({
        msg: 'Post Api - post Empresa',
        GuardadoDB
    });

}

const putEmpresa = async (req = request, res = response) => {
    const id = req.empresa.id;
    
    const { _id, estado, correo, ...restoData } = req.body;

    if ( restoData.password ) {
        const salt = bcrypt.genSaltSync();
        restoData.password = bcrypt.hashSync(restoData.password, salt)
    }

    const empresaGuardadoDB = await Empresa.findByIdAndUpdate( id, restoData);


    res.json({
        msg: 'Empresa Editada',
        empresaGuardadoDB,

    });

}

const deleteEmpresa = async(req = request, res = response) => {
    const id = req.empresa.id;

    
     const eliminarEmpresa = await Empresa.findByIdAndUpdate(id, { estado: false });
    
    res.json({
        msg: 'Delete Api - del Empresa',
        eliminarEmpresa
    });
}

module.exports = {
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
    getEmpresa,
}