import { ISearcher } from "./ISearcher";
import { IPickerItem } from "../pickeritems/IPickerItem";
import { ISearchPickerOptions } from "../options/ISearchPickerOptions";
export declare class DefaultSearcher implements ISearcher {
    private pickerItems;
    private lastSearchText;
    private foundItems;
    private tmrId;
    search(query: string, options: ISearchPickerOptions, onresults: (items: IPickerItem[]) => void, onerror?: (message: string) => void): void;
    private $map(source, options);
}
