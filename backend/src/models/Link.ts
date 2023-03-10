import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LinkSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    shortUrl: {
        type: String,
        require: true
    },
    originalUrl: {
        type: String,
        require: true
    }
})

export const Link = mongoose.model('Link', LinkSchema)

