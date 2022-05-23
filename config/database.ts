import { connect } from 'mongoose'

const dbConnection = async () => {
    const { MONGODB_CNN, MONGODB_CNN_TEST, NODE_ENV } = process.env
    const connectionString =
        NODE_ENV === 'test' ? MONGODB_CNN_TEST : MONGODB_CNN

    try {
        await connect(connectionString || '')
        console.log('Database Online')
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection
