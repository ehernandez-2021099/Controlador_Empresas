const {request, response}= require('express');
const Tipo = require('../models/tipo');

const getTipo = async (req = request, res = response) => {

    //Cursos del get
    const query = { Tipo };

    const listaTipo = await Promise.all([
        Tipo.countDocuments(query),
        Tipo.find(query)//.populate('usuario', 'nombre')
    ]);

    res.json({
        msg: 'get Api - Controlador Tipo',
        listaTipo
    });

}

const postTipo = async (req = request, res = response) => {
    //toUpperCase para todo a Mayusculas
    const{ tipo, ...body}=req.body;
    const data = {
        ...body,
        tipo
    }
    const tipoDB = await Tipo(data);

    //validacion para verificar si ya existe dicha categoria para que no lo agregue
    // if (categoriaDB) {
    //     return res.status(400).json({
    //         msg: `La categoria ${categoriaDB.nombre}, ya existe`
    //     });
    // }

    //Guardar en DB
    await tipoDB.save();

    res.status(201).json(tipoDB);
}


const putTipo = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    
    // resto.nombre = resto.nombre.toUpperCase();
    // resto.usuario = req.usuario._id;

    //Editar o actualiar la cateogira
    const tipoEditado = await Tipo.findByIdAndUpdate(id, resto, { new: true });
    res.status(201).json(tipoEditado);

}

const deleteTipo = async (req = request, res = response) => {

    const { id } = req.params;
    // const cursoEliminar = await Curso.findByIdAndDelete

    //Editar o actualiar la cateogira: Estado FALSE
    const tipoEliminado = await Tipo.findByIdAndDelete(id);

    res.status(201).json({
        msg: 'delete Api - Controlador Tipo',
        tipoEliminado
    });

}

module.exports={
    getTipo,
    postTipo,
    putTipo,
    deleteTipo
}