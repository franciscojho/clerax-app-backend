import { Router } from 'express'
import { check } from 'express-validator'
import { signUp, signIn } from '../controllers/auth.js'
import validateFields from '../middlewares/validateFields.js'
import { validateUserEmail, validateUserPassword } from '../helpers/dbValidators.js'

const router = Router()

const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

router.post(
    '/signup',
    [
        check('fullName', 'El nombre es requerido'),
        check('email', 'El email es requerido').isEmail(),
        check('email').custom(validateUserEmail),
        check('dni', 'El DNI es requerido'),
        check('mobile', 'El celular es requerido'),
        check(
            'password',
            'La contraseña debe contener mínimo ocho carácteres y un número'
        ).matches(regex),
        validateFields,
    ],
    signUp
)

router.post(
    '/signin',
    [
        check('email', 'El email es requerido').isEmail(),
        check('email').custom(validateUserEmail),
        check('password').custom(validateUserPassword),
        check(
            'password',
            'La contraseña debe contener mínimo ocho carácteres y un número'
        ).matches(regex),
        validateFields,
    ],
    signIn
)

export default router
