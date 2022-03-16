import jwt from 'jsonwebtoken'
import User from '../models/users.js'

const validateToken = async (req, res, next) => {
    try {
        let user
        const bearerToken = req.header('Authorization')
        if (bearerToken && bearerToken.includes('Bearer')) {
            const token = bearerToken.split(' ')[1]
            const { id } = jwt.verify(token, process.env.SECRET)
            user = await User.findById(id)
            if (!user) {
                res.status(400).json({
                    errors: { msg: 'Authentication error, unable to find user' },
                })
            }
        } else {
            res.status(400).json({
                errors: { msg: 'Error in the header, it is malformed' },
            })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ error })
    }
}

export default validateToken
