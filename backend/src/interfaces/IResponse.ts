import { EStatuses } from "../enum/EStatuses";
import ILink from "./ILink";

export default interface IResponse {
    status: EStatuses
    result: ILink[]
    extraMessage: string
}