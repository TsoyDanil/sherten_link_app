import { v4 } from "uuid"
import { EStatuses } from "../enum/EStatuses"
import ILink from "../interfaces/ILink"
import ILinkDto from "../interfaces/ILinkDto"
import IResponse from "../interfaces/IResponse"
import { mongoDB } from "../repository/mongoDB"

export class LinksServiceMongo {
    
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
            if (!linkDto.originalUrl) throw new Error('Origin URL should appear')
            const link: any = {
                originalUrl: linkDto.originalUrl,
                shortUrl: new Date().getDate().toString()
            }
            await mongoDB.getDB().collection('links').insertOne({...link})
            const response: IResponse = {
                status: EStatuses.SUCCESS,
                result: [],
                extraMessage: 'New Link added'
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