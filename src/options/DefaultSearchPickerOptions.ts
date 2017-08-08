import {ISearchPickerOptions} from "./ISearchPickerOptions";
import {IPickerItem} from "../pickeritems/IPickerItem";
import {DefaultPickerItem} from "../pickeritems/DefaultPickerItem";
import {Utility} from "../Utils";
import {ISearcher} from "../searchers/ISearcher";
import {DefaultSearcher} from "../searchers/DefaultSearcher";

export class DefaultSearchPickerOptions implements ISearchPickerOptions {
    source: any[] = [];
    placeholder: string = '';
    maxSelectedChoices: number = 0;
    minLengthToSearch: number = 1;
    searchInValues: boolean = false;
    resultsLimit:number;
    //Представление элемента
    pickerItemFactory: (item: any) => IPickerItem = (item) => {
        return DefaultPickerItem.create(item.id, item.title);
    };
    resultRenderer: (item: IPickerItem, query: string) => Node = (item, query) => {
        var root = document.createElement('a');
        root.setAttribute('href', '#');
        var textNodes = Utility.wrapResultText(item.title, query);
        for (var i = 0; i < textNodes.length; i++) {
            root.appendChild(textNodes[i]);
        }
        return root;
    };
    noResultsRenderer = (query: string) => {
        return document.createTextNode('По запросу "' + Utility.htmlEncode(query) + '" ничего не найдено');
    };

    choiceRenderer = (item: IPickerItem, renderClose?:boolean) =>{
        let choice = document.createElement('span');
        choice.appendChild(document.createTextNode(item.title));

        if(renderClose){
            let close = document.createElement('a');
            close.href = 'javascript: void(0);';
            close.className = 'search-choice-close';

            choice.appendChild(close);
        }
        
        return choice;
    }
    searcher: ISearcher = new DefaultSearcher();
}
