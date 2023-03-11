import express, { Request, Response, Router } from 'express'
import { EStatuses } from '../enum/EStatuses'
import ILinkDto from '../interfaces/ILinkDto'
import IResponse from '../interfaces/IResponse'
import { linksServiceMongo } from '../services/linksMongo'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try{
        const response: IResponse = await linksServiceMongo.getLinks()
        if (response.status === EStatuses.SUCCESS){
            res.send(response)
        } else{
            res.status(418).send(response)
        }
    } catch(err: unknown){
        console.log(err);
    }
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const linksDto: ILinkDto = req.body
        const response = await linksServiceMongo.addLink(linksDto)
        if (response.status === EStatuses.SUCCESS){
            res.send(` http://localhost:8000/${response.result?.shortUrl}`)
        } else{
            res.status(418).send(response)
        }
    } catch(err: unknown){
        console.log(err);
    }
})

export default router
