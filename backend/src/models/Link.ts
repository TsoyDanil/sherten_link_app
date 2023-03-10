import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LinkSchema = new Schema({
    shortUrl: {
        type: String,
        require: true
    },
    originalUrl: {
        type: String,
        require: true
    }
})

const Link = mongoose.model('Link', LinkSchema)
export default Link

