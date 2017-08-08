import {IPickerItem} from "../pickeritems/IPickerItem";
import {ISearchPickerOptions} from "../options/ISearchPickerOptions";

export declare interface ISearcher {
    search(query: string
        , options: ISearchPickerOptions
        , onresults: (items: IPickerItem[]) => void
        , onerror?: (message: string) => void);
}

