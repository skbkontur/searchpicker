import {IPickerItem} from "../pickeritems/IPickerItem";
import {ISearchPickerOptions} from "../options/ISearchPickerOptions";

export interface ISearcher {
    /**
     * Search data
     * @param {string} query                                user query
     * @param {ISearchPickerOptions} options                current searchpicker options
     * @param {(items: IPickerItem[]) => void} onresults    callback with result
     * @param {(message: string) => void} onerror           callback with search error
     */
    search(query: string
        , options: ISearchPickerOptions
        , onresults: (items: IPickerItem[], data?:any) => void
        , onerror?: (message: string, data?:any) => void);
}

