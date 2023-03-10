import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { HealthCheckController } from './controllers/healthCheck'
import { postgresDB } from './repository/postgresDB'
import { LinksController } from './controllers/links'

dotenv.config()

class App {
    private app: Express
    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.app.use(cors())
    }

    public init = async(): Promise<void> => {
        try{
            this.app.use('/health-check', new HealthCheckController().getRouter())
            this.app.use('/links', new LinksController().getRouter())
            this.app.use(express.static('public'))
            this.app.listen(process.env.APP_PORT, () => {
                console.log(`Server is running on port ${process.env.APP_PORT}`)
            })
            await postgresDB.init()
        } catch(err: unknown){
            console.log(err);
        }
    }
}

const app = new App()
app.init()