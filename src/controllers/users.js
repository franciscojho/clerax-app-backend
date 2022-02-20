import User from '../models/users.js'

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json({ users })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const getUser = (req, res) => {
    try {
        const user = req.user
        res.status(201).json({ user })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export { getUsers, getUser }
