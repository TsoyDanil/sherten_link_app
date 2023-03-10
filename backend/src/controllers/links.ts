import express, { Router, Request, Response } from 'express'

export class LinksController {
    private router: Router
    constructor(){
        this.router = express.Router()
        this.router.get('/', this.getLinks)
        this.router.get('/:shortUrl', this.findShortLink)
    }   

    private getLinks = async (req: Request, res: Response) => {

    }

    private addLink = async (req: Request, res: Response) => {

    }

    private findShortLink = async (req: Request, res: Response) => {

    }

    public getRouter = (): Router => {
        return this.router
    }
}