const {response, request } = require('express');
const Sucursal = require('../models/sucursal');
 
const getSucursal = async (req = request, res = response) => {
    
    //condiciones del get
    const query = { estado: true};  

    const listaSucursal = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query).populate('empresa', 'nombreEmpres'),     
    ]);   
    res.status(201).json({
        msg: 'get Api - Controlador de sucursal',
        listaSucursal

    });
}

const getSucursaById = async (req = request, res = response) => {


    const {id} = req.params;

    const sucursal = await Sucursal.findById(id);
   
    res.json({
        msg: 'Get by Id - get Sucusal',
        sucursal,

    });
}

const postSucursal = async (req = request, res = response) => {
    
    // const { nombreSucursal,empresa,ubicacion} = req.body;
    // const empresaGuardada = new Sucursal({nombreSucursal, empresa, ubicacion})
     
    // const salt = bcrypt.
    const{...body}=req.body;
    
        
        // nombreSucursal:nombreSucursal,
        // empresa:req.empresa.id,
        // ubicacion:ubicacion.toUpperCase(),

        const data = {
            ...body,
            empresa: req.empresa.id
    }

    const sucursalDB = await Sucursal(data);
     await sucursalDB.save();
  
 
     res.json({
        msg: 'Post Api - post Sucursal',
        sucursalDB
         
     });
 
}

const putSucursal = async (req = request, res = response) => {
    
    const { id } = req.params;
    const {_id,...resto } = req.body; 

    const sucursalEdita= await Sucursal.findByIdAndUpdate(id, resto,{new:true});

    res.json({
        msg:'Put Api - Sucursal', 
        sucursalEdita
    });
}

const deleteSucursal = async (req = request, res = response) => {
    const { id } = req.params;

    const sucursalBorrada = await Sucursal.findByIdAndUpdate(id, { estado: false });
    
    res.json({
        msg:'Delete api - delete Sucursal', 
        sucursalBorrada
    });
}

module.exports = {
    getSucursal,
    postSucursal,
    putSucursal,
    deleteSucursal
}