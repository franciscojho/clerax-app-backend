import { Router } from 'express'
import { getUsers, getUser } from '../controllers/users.js'
import validateToken from '../middlewares/validateToken.js'

const router = Router()
router.get('/', validateToken, getUser)
router.get('/all', validateToken, getUsers)

export default router
