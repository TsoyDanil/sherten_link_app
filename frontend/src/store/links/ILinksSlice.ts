import { EStatuses } from "../../enum/EStatuses";

export default interface ILinksSlice {
    linksLoading: boolean,
    shortenLink: string | undefined,
    requestStatus: EStatuses | null
}