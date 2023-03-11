import { createSlice } from "@reduxjs/toolkit"
import { linksApi } from "../../api/linksApi"
import { EStatuses } from "../../enum/EStatuses"
import ILinkDto from "../../interfaces/ILinkDto"
import { createAppAsyncThunk } from "../createAppAsyncThunk"
import ILinksSlice from "./ILinksSlice"


const namespace: string = 'links'

export const addLink = createAppAsyncThunk(
    `${namespace}/addLink`,
    async (linkDto: ILinkDto) => {
        return linksApi.addLink(linkDto)
    }
)

export const linksSlice = createSlice({
    name: namespace,
    initialState: {
        linksLoading: false,
        requestStatus: null,
        shortenLink: undefined
    } as ILinksSlice,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addLink.pending, (state) => {
            state.linksLoading = true
        })
        .addCase(addLink.rejected, (state) => {
            state.linksLoading = false
            state.requestStatus = EStatuses.FAILURE
        })
        .addCase(addLink.fulfilled, (state, action) => {
            state.linksLoading = false
            state.shortenLink = action.payload.result?.originalUrl
        })
    }
})