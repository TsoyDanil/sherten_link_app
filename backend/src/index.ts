import express, {Express, Response, Request} from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { config } from './index.config'
import healthCheck from './controllers/healthCheck'
import links from './controllers/links'
import IResponse from "./interfaces/IResponse";
import { linksServiceMongo } from "./services/linksMongo";
import { EStatuses } from "./enum/EStatuses";

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/health-check', healthCheck)
app.use('/links', links)

app.get('/:shortUrl', async (req: Request, res: Response) => {
    try{
        const response: IResponse = await linksServiceMongo.getLinkByShortUrl(req.params.shortUrl)
        if (response.status === EStatuses.SUCCESS){
            // @ts-ignore
            res.status(301).redirect(response.result.originalUrl)
        } else{
            res.status(418).send(response)
        }
    } catch(err: unknown){
        console.log(err);
    }
})

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