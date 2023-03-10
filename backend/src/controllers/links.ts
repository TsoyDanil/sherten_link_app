import express, { Router, Request, Response } from 'express'
import { EStatuses } from '../enum/EStatuses'
import ILink from '../interfaces/ILink'
import ILinkDto from '../interfaces/ILinkDto'
import IResponse from '../interfaces/IResponse'
import { mongoDB } from '../repository/mongoDB'
import { linksServiceMongo, LinksServiceMongo } from '../services/linksMongo'

export class LinksController {
    private router: Router
    private service: LinksServiceMongo
    constructor(){
        this.router = express.Router()
        this.service = linksServiceMongo
        this.router.get('/', this.getLinks)
        this.router.get('/:shortUrl', this.findShortLink)
        this.router.post('/', this.addLink)
    }   

    private getLinks = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getLinks()
        res.send(response)
    }

    private addLink = async (req: Request, res: Response): Promise<void> => {
        const linkDto: ILinkDto = req.body
        const response = await this.service.addLink(linkDto)
        res.send(response)
    }

    private findShortLink = async (req: Request, res: Response) => {

    }

    public getRouter = (): Router => {
        return this.router
    }
}