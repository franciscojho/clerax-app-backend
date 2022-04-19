import express from 'express'
import dotenv from 'dotenv'
import connect from './database.js'
import cors from 'cors'
import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import { adRouter } from './routes/ads.js'
import { publicRouter } from './routes/public.js'

dotenv.config()
connect()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    console.log(req.userId)
    res.status(200).json({ message: "it's working" })
})

app.use('/api/auth', authRouter)

app.use('/api/user', usersRouter)

app.use('/api/adverts', adRouter)

app.use('/api/public', publicRouter)

app.listen(port, () => {
    console.log(`Server starting at port ${port}`)
})
