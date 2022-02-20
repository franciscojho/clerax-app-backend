import mongoose from 'mongoose'

const connect = () => {
    console.log('connecting')
    mongoose.connect('mongodb://admin:root@localhost:27017/clerax?authSource=admin', {
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
