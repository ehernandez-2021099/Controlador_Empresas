const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getTipo, postTipo, putTipo, deleteTipo} = require('../controllers/tipo')
const router = Router();

router.get('/',[
    
    validarCampos
],getTipo);


router.post('/agregar',[
    
    check('tipo', 'El nombre es obligatorio').not().isEmpty(),
    //check('ubicacio').custom(validarMunicipio),
    validarCampos,
],postTipo);

router.put('/editar/:id',[
    
    check('tipo', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    validarCampos,
],putTipo);

router.delete('/eliminar/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    validarCampos
] ,deleteTipo);


module.exports = router;