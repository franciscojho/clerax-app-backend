import { Router } from 'express'
import { getAllAds } from '../controllers/public.js'

export const publicRouter = Router()

publicRouter.get('/', getAllAds)
