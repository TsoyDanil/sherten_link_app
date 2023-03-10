import { EStatuses } from "../enum/EStatuses"
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

    public addLink = async() => {

    }
}

export const linksServiceMongo = new LinksServiceMongo()