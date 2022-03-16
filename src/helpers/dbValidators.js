import bcrypt from 'bcrypt'
import User from '../models/users.js'

const validateUserEmail = async (email, { req }) => {
    const user = await User.findOne({ email })
    if (req.url === '/signin') {
        !user &&
            (() => {
                throw new Error(`El email: ${email}, no se encontró`)
            })()
    }
    if (req.url === '/signup') {
        user &&
            (() => {
                throw new Error(`El email: ${email}, ya está registrado`)
            })()
    }
}

const validateUserPassword = async (password, { req }) => {
    const email = req.body.email
    const user = await User.findOne({ email })
    if (user) {
        const isValid = await bcrypt.compare(password, user.password)
        !isValid &&
            (() => {
                throw new Error(`El password es incorrecto`)
            })()
    }
}

const userExistsById = async (id) => {
    const doesIdExist = await User.findById(id)
    if (!doesIdExist) {
        throw new Error(`El id no existe ${id}`)
    }
}

export { validateUserEmail, validateUserPassword, userExistsById }
