import Ad from '../models/ad.js'
import User from '../models/user.js'
import parserRateQuery from '../utils/parser-rate-query.util.js'

export const getAllAds = async (req, res) => {
    try {
        const { query } = req
        const { radioFilter, department, province, district } = query
        const criteria = {
            expired: false,
            ...(department && { region: department }),
            ...(province && { province: province }),
            ...(district && { city: district }),
            ...(radioFilter && { rate: parserRateQuery(radioFilter) }),
        }
        const ads = await Ad.find(criteria).sort({ createdAt: -1 })
        const adsPromises = ads.map(async (ad) => {
            const user = await User.findById(ad.user)
            return { ...ad._doc, user: { name: user.fullName, mobile: user.mobile } }
        })
        const publicAds = await Promise.all(adsPromises)
        res.status(201).json({ ads: publicAds })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}
