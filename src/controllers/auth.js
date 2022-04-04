import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const signUp = async (req, res) => {
    try {
        const newUser = req.body

        const user = await User.create(newUser)

        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: '24h',
        })

        res.status(201).json({ user, token })
    } catch (error) {
        res.status(400).json(error)
    }
}

const signIn = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: '24h',
        })

        res.status(201).json({ user, token })
    } catch (error) {
        res.status(401).json({ error })
    }
}

export { signUp, signIn }
