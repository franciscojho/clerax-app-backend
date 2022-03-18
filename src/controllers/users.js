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

const updateUser = async (req, res) => {
    try {
        const { _id } = req.user
        const newUserData = req.body
        await User.findByIdAndUpdate(_id, newUserData)
        const user = await User.findById(_id)
        res.status(201).json({ user })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export { getUsers, getUser, updateUser }
