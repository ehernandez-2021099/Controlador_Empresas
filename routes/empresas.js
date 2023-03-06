const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT,empresaExiste} = require('../middlewares/validar-jwt');
const {  postEmpresa,putEmpresa,deleteEmpresa,getEmpresa } = require('../controllers/empresa');
const { validarCampos } = require('../middlewares/validar-campos');
const {  tieneTipo } = require('../middlewares/validar-tipo');

const {  correoExiste, esTipoValido} = require('../helpers/db-validator');
const router = Router();
router.get('/',[
 
],getEmpresa);

router.post('/agregar',[
    //validarJWT,
    check('nombreEmpres', 'El tipo es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo','No es un correo valido').isEmail(),    
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('password', 'La password es obligatorio').not().isEmpty(),
    check('correo').custom(correoExiste),
    check('tipo').custom(esTipoValido),
    //tieneTipo('MONETARIA', 'COMESTIBLES','PRODUCTOS','HERRAMIENTAS'),
    validarCampos,
],postEmpresa);

router.put('/editar',[
    validarJWT,
    //check('id', 'No es un ID válido').isMongoId(),
    //check('id').custom( empresaExiste ),
    //validarJWT,
    //check('nombreEmpres', 'El tipo es obligatorio').not().isEmpty(),
    // check('correo', 'El correo es obligatorio').not().isEmpty(),
    // check('password', 'La password es obligatorio').not().isEmpty(),
    // check('correo').custom(correoExiste),
    check('tipo').custom(esTipoValido),
    validarCampos,
],putEmpresa);

router.delete('/eliminar', [
    validarJWT,

    validarCampos
] ,deleteEmpresa);





module.exports = router;