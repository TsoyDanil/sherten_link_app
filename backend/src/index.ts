import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { config } from './index.config'
import healthCheck from './controllers/healthCheck'
import links from './controllers/links'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/health-check', healthCheck)
app.use('/links', links)

const run = () => {
    try{
        mongoose.connect(`mongodb://localhost/${config.mongoServerName}`)
        app.listen(config.port, () => {
            console.log(`Server started at http://localhost:${config.port}`);
        })
    } catch(err: unknown){
        console.log(err);
    }
};

run()