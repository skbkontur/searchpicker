import {ISearcher} from "./ISearcher";
import {IPickerItem} from "../pickeritems/IPickerItem";
import {ISearchPickerOptions} from "../options/ISearchPickerOptions";
import {Utility} from "../Utils";

export class DefaultSearcher implements ISearcher {

    private pickerItems: IPickerItem[] = null;
    private foundItems: IPickerItem[] = [];

    private tmrId: any;

    search(query: string
        , options: ISearchPickerOptions
        , onresults: (items: IPickerItem[], data?:any) => void
        , onerror?: (message: string) => void) {

        if (this.tmrId)
            clearTimeout(this.tmrId);

        this.tmrId = setTimeout(() => {
            if (!this.pickerItems) //TODO updating...
                this.pickerItems = $map(options.source, options);

            this.foundItems = Utility.filterItems(this.pickerItems, query, options);
            this.tmrId = null;
            onresults(this.foundItems);
        }, 50);

    }

}

function $map(source: any[], options: ISearchPickerOptions): IPickerItem[] {
    let result: IPickerItem[] = [];
    for (let i = 0; i < source.length; i++) {
        result.push(options.pickerItemFactory(source[i]));
    }
    return result;
}
