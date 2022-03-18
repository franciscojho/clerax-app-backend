import { Router } from 'express'
import { getUsers, getUser, updateUser } from '../controllers/users.js'
import validateToken from '../middlewares/validateToken.js'

const router = Router()
router.put('/', validateToken, updateUser)
router.get('/', validateToken, getUser)
router.get('/all', validateToken, getUsers)

export default router
