const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getSucursaById,getSucursal,postSucursal,putSucursal,deleteSucursal } = require('../controllers/sucursal');
const { validarCampos } = require('../middlewares/validar-campos');
const {  existeAsignacionPorId,validarMunicipio} = require('../helpers/db-validator');
const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
],getSucursal);


router.post('/agregar',[
    validarJWT,
    check('nombreSucursal', 'El nombre es obligatorio').not().isEmpty(),
    check('ubicacion', 'La ubicacio es obligatorio').not().isEmpty(),
    //check('ubicacio').custom(validarMunicipio),
    validarCampos,
],postSucursal);

router.put('/editar/:id',[
    validarJWT,
    check('nombreSucursal', 'El nombre es obligatorio').not().isEmpty(),
    check('ubicacion', 'La ubicacio es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    validarCampos,
],putSucursal);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    validarCampos
] ,deleteSucursal);


module.exports = router;