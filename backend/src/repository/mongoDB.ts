import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'
import { config } from '../index.config'
dotenv.config()

export class MongoDB {
    private client: MongoClient
    private db: Db
    constructor(){
        this.client = new MongoClient(process.env.MONGO_CLIENT_URL || '')
        this.db = this.client.db(config.mongoServerName)
    }
    
    public getDB = (): Db => {
        return this.db
    }

    public init = async(): Promise<void> => {
        this.client = await MongoClient.connect(process.env.MONGO_CLIENT_URL || '')
        this.db = this.client.db('myLinks')
        console.log('Mongo connected');
    }

    public close = async(): Promise<void> => {
        if (!this.client) return 
        await this.client.close()
    }
}

export const mongoDB = new MongoDB()