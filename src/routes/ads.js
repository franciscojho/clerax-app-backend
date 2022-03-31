import { Router } from 'express'
import { getAds, createAd, deleteAd, updateAd } from '../controllers/ads.js'
import validateToken from '../middlewares/validateToken.js'

export const adRouter = Router()

adRouter.get('/', validateToken, getAds)
adRouter.post('/', validateToken, createAd)
adRouter.put('/:id', validateToken, updateAd)
adRouter.delete('/:id', validateToken, deleteAd)
