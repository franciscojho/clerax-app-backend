import mongoose from 'mongoose'

const connect = () => {
    console.log('connecting')
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
    })
    mongoose.connection.once('open', () => {
        console.log('Database successfully connected')
    })
    mongoose.connection.on('error', () => {
        console.log('Something went wrong')
    })
}

export default connect
