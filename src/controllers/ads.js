import Ad from '../models/ad.js'
import User from '../models/user.js'

const getAds = async (req, res) => {
    try {
        const { query } = req
        const userId = req.user._id
        let message = 'No ads found'
        let criteria = {}
        let count = 0

        switch (query.filter) {
            case 'expired':
                criteria = { expired: true }
                break

            case 'active':
                criteria = { expired: false }
                break

            default:
                break
        }

        const user = await User.findById(userId)

        if (!user) throw new Error('User not found')

        const ads = await Ad.find({ user: userId, ...criteria }).sort({ createdAt: -1 })

        if (ads.length > 0) {
            message = 'Ads found'
            count = ads.length
        }

        res.status(201).json({ message, ads, count })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

const createAd = async (req, res) => {
    try {
        const { body } = req
        const { _id: userId } = req.user

        const user = await User.findById(userId)

        if (!user) throw new Error('User not found')

        const ad = await Ad.create({ ...body, user: userId })
        user.ads.push(ad._id)
        await user.save({ validateBeforeSave: false })

        res.status(201).json({ message: 'Ad created', ad })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

const updateAd = async (req, res) => {
    try {
        const { id } = req.params
        const { _id: userId } = req.user

        const ad = await Ad.findByIdAndUpdate({ _id: id, user: userId }, req.body, {
            new: true,
        })

        if (!ad) {
            res.status(403).json({ message: `Ad with id ${id} not found` })
            return
        }

        res.status(201).json({ message: 'Ad updated', ad })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

const deleteAd = async (req, res) => {
    try {
        const { id } = req.params
        const { _id: userId } = req.user

        const ad = await Ad.findOneAndDelete({ _id: id, user: userId })

        if (!ad) {
            res.status(403).json({ message: `Ad with id ${id} not found` })
            return
        }

        res.status(201).json({ message: 'Ad deleted', ad })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

export { getAds, createAd, updateAd, deleteAd }
