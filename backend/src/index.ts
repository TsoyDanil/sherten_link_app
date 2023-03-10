
// class App {
//     private app: Express
//     constructor(){
//         this.app = express()
//         this.app.use(express.json())
//         this.app.use(cors())
//     }

//     public init = async(): Promise<void> => {
//         try{
//             this.app.use('/health-check', new HealthCheckController().getRouter())
//             this.app.use('/links', new LinksController().getRouter())
//             this.app.use(express.static('public'))
//             this.app.listen(process.env.APP_PORT, () => {
//                 console.log(`Server is running on port ${process.env.APP_PORT}`)
//             })
//             await mongoDB.init()
//         } catch(err: unknown){
//             console.log(err);
//         }
//         process.on('exit', () => {
//             mongoDB.close()
//         })
//     }
// }
import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { config } from './index.config'
import healthCheck from './controllers/healthCheck'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/health-check', healthCheck)

const run = () => {
    try{
        mongoose.connect('mongodb://localhost/links')
        app.listen(config.port, () => {
            console.log(`Server started at http://localhost:${config.port}`);
        })
    } catch(err: unknown){
        console.log(err);
    }
};

run()