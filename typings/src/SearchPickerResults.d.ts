import { IPickerItem } from "./pickeritems/IPickerItem";
import { EventObject } from "./EventObject";
import { ISearchPickerOptions } from "./options/ISearchPickerOptions";
export declare class SearchPickerResults extends EventObject {
    private sourceElm;
    private options;
    highlightedIndex: number;
    hideOnEmptyResults: boolean;
    selectFirstOnDefault: boolean;
    isShown: boolean;
    trackSelectedItems: boolean;
    private dropdownElm;
    private resultsElm;
    private items;
    private itemsToHide;
    private selectedObj;
    private highlightedEl;
    private lastSearchQuery;
    private processSearchResponses;
    constructor(sourceElm: HTMLElement, options: ISearchPickerOptions);
    hide(): void;
    show(): void;
    search(query: string): void;
    repositionResults(): void;
    moveSelectedDown(): void;
    moveSelectedUp(): void;
    selectHighlighted(selectedVia?: string): void;
    setTop(top: number): void;
    addSelectedResult(result: IPickerItem): void;
    removeSelectedResult(item: IPickerItem): void;
    updateOptions(options: ISearchPickerOptions): void;
    addToBlacklist(items: IPickerItem | IPickerItem[]): void;
    removeFromBlacklist(items: IPickerItem | IPickerItem[]): void;
    getHighlighted(): IPickerItem;
    private isSelected(id);
    setProcessSearchResponses(process: boolean): void;
    private searchInternal(query);
    private setupHtml();
    private bindEvents();
    private $buildResult(item, query);
    private clearHighlighted();
    private $buildNoResults(query);
    private $buildErrorResult(message);
    private $template();
    private getItemById(id);
    private invalidateSelectedResults();
    private invalidateActiveResultByIndex();
    private invalidateActiveResult();
    private $foreachResult(cb);
    private invalidateActiveResultVisible(el);
    private getDefaultHighlightedIndex();
}
