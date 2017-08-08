import { ISearchPickerOptions } from "./ISearchPickerOptions";
import { IPickerItem } from "../pickeritems/IPickerItem";
import { ISearcher } from "../searchers/ISearcher";
export declare class DefaultSearchPickerOptions implements ISearchPickerOptions {
    source: any[];
    placeholder: string;
    maxSelectedChoices: number;
    minLengthToSearch: number;
    searchInValues: boolean;
    resultsLimit: number;
    pickerItemFactory: (item: any) => IPickerItem;
    resultRenderer: (item: IPickerItem, query: string) => Node;
    noResultsRenderer: (query: string) => Text;
    choiceRenderer: (item: IPickerItem, renderClose?: boolean) => HTMLSpanElement;
    searcher: ISearcher;
}
