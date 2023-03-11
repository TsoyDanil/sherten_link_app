import { AxiosResponse } from "axios";
import { EStatuses } from "../enum/EStatuses";
import ILinkDto from "../interfaces/ILinkDto";
import IResponse from "../interfaces/IResponse"
import { instance } from "./instance";


class LinksApi {
    public addLink = async(linkDto: ILinkDto): Promise<IResponse> => {
        try{
            const response: AxiosResponse<IResponse> = await instance.post('/links', linkDto)
            return response.data
        } catch(err: unknown){
            console.log(err);
            const error = err as Error
            const response: IResponse = {
                status: EStatuses.FAILURE,
                result: null,
                extraMessage: error.message
            }
            return response
        }
    }
}

export const linksApi = new LinksApi()