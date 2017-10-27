import {IPickerItem} from "../pickeritems/IPickerItem";
import {ISearcher} from "../searchers/ISearcher";

export interface ISearchPickerOptions extends ISearchPickerResultsOptions {
    placeholder?: string;
    maxSelectedChoices?: number;
    minLengthToSearch?: number;
    searchInValues?: boolean;
    resultsLimit?: number;

    pickerItemFactory?: (item: any) => IPickerItem;
}

export interface ISearchPickerResultsOptions {
    source: any[];

    resultRenderer?: (item: IPickerItem, query: string) => Node;
    resultFooterRenderer?: (query: string, results: IPickerItem[], data?:any) => Node;
    noResultsRenderer?: (query: string) => Node;
    choiceRenderer?: (item: IPickerItem, renderClose?: boolean) => Node;
    searcher?: ISearcher;
}

