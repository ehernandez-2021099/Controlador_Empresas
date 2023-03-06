const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/login', [
    check('password', 'La password es obligatoria').not().isEmpty(),
    check('correo', 'El correo es valido').isEmail(),
    check('correo', 'El correo no es obligatorio').not().isEmpty(),
    validarCampos,
] ,login);


module.exports = router;