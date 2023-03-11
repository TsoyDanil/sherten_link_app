import shortid from "shortid"
import { EStatuses } from "../enum/EStatuses"
import ILink from "../interfaces/ILink"
import ILinkDto from "../interfaces/ILinkDto"
import IResponse from "../interfaces/IResponse"
import Link from "../models/Link"
import { mongoDB } from "../repository/mongoDB"

export class LinksServiceMongo {

    public getLinkByShortUrl = async(shortUrl: string): Promise<IResponse> => {
        try{
            const link: any = await mongoDB.getDB().collection('links').findOne({shortUrl: shortUrl})
            if (!link) throw new Error('No links found')
            const response: IResponse = {
                status: EStatuses.SUCCESS,
                result: link,
                extraMessage: 'Link found'
            }
            return response
        } catch(err: unknown){
            const error = err as Error
            const response: IResponse = {
                status: EStatuses.FAILURE,
                result: [],
                extraMessage: error.message
            }
            return response
        }
    }
    
    public getLinks = async() => {
        try{
            const data = await mongoDB.getDB().collection('links').find().toArray()
            const response: IResponse = {
                status: EStatuses.SUCCESS,
                result: data as any,
                extraMessage: 'Links found'
            }
            return response
        } catch(err: unknown){
            const error = err as Error
            const response: IResponse = {
                status: EStatuses.FAILURE,
                result: [],
                extraMessage: error.message
            }
            return response
        }
    }

    public addLink = async(linkDto: ILinkDto): Promise<IResponse> => {
        try{
            if (!linkDto.originalUrl || linkDto.originalUrl.trim() === '') throw new Error('Origin URL should appear')
            const linkBody: ILink = {...linkDto, shortUrl: shortid.generate()}
            const link = new Link(linkBody)
            await link.save()
            const response: IResponse = {
                status: EStatuses.SUCCESS,
                result: link as any,
                extraMessage: 'New link created'
            }
            return response
        } catch(err: unknown){
            const error = err as Error
            const response: IResponse = {
                status: EStatuses.FAILURE,
                result: [],
                extraMessage: error.message
            }
            return response
        }
    }
}

export const linksServiceMongo = new LinksServiceMongo()