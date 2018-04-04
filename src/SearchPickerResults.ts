import {Utility} from "./Utils";
import {IPickerItem} from "./pickeritems/IPickerItem";
import {EventObject} from "./EventObject";
import {ISearchPickerOptions} from "./options/ISearchPickerOptions";

export class SearchPickerResults extends EventObject {
    highlightedIndex: number;
    hideOnEmptyResults: boolean = false;
    selectFirstOnDefault: boolean = true;
    isShown: boolean = false;
    trackSelectedItems: boolean = true;
    private dropdownElm: HTMLDivElement;
    private resultsElm: any;
    private items: IPickerItem[] = [];
    private itemsToHide: IPickerItem[] = [];
    private selectedObj: any = {};
    private highlightedEl: any;
    private lastSearchQuery: string = null;

    private processSearchResponses: boolean = true;

    constructor(private sourceElm: HTMLElement, private options: ISearchPickerOptions) {
        super();
        this.setupHtml();
        this.bindEvents();
        this.highlightedIndex = this.getDefaultHighlightedIndex();
    }

    hide() {
        if (!this.isShown) return;
        this.dropdownElm.style.display = 'none';
        this.isShown = false;
    }

    show() {
        if (this.isShown) return;
        this.dropdownElm.style.display = 'block';
        this.isShown = true;
        this.invalidateActiveResultByIndex();
    }

    search(query: string) {
        if (this.lastSearchQuery === query) {
            if (this.hideOnEmptyResults && this.items.length === 0)
                this.hide();
            else
                this.show();
            return;
        }
        this.searchInternal(query);
    }

    repositionResults() {
        this.setTop(this.sourceElm.offsetHeight);
    }

    moveSelectedDown() {
        if (!this.isShown) return;
        this.highlightedIndex++;
        if (this.highlightedIndex > this.items.length - 1) {
            this.highlightedIndex = this.items.length - 1;
        }
        this.invalidateActiveResultByIndex();
    }

    moveSelectedUp() {
        if (!this.isShown) return;
        this.highlightedIndex--;
        if (this.highlightedIndex <= this.getDefaultHighlightedIndex()) {
            this.highlightedIndex = this.getDefaultHighlightedIndex();
        }
        this.invalidateActiveResultByIndex();
    }

    selectHighlighted(selectedVia?: string) {
        if (!this.highlightedEl) return;
        let id = Utility.getAttribute(this.highlightedEl, 'data-id');
        let item = this.getItemById(id);
        if (item != null)
            this.$notifyEvent('resultSelected', item, this.lastSearchQuery, selectedVia, this.items.indexOf(item)+1, this.items.length);

        this.setProcessSearchResponses(false);
    }

    setTop(top: number) {
        if (top <= 0) top = 0;
        this.dropdownElm.style.top = top + 'px';
    }

    addSelectedResult(result: IPickerItem) {
        if (!this.trackSelectedItems) return;//option disabled
        if (!this.selectedObj[result.id]) {
            this.selectedObj[result.id] = true;

            this.invalidateSelectedResults();
            this.clearHighlighted();
        }

    }

    removeSelectedResult(item: IPickerItem) {
        if (!this.trackSelectedItems) return;//option disabled
        if (!this.isSelected(item.id.toString()))
            return;
        delete this.selectedObj[item.id.toString()];

        this.invalidateSelectedResults();
    }

    updateOptions(options: ISearchPickerOptions) {
        this.options = options;
    }

    addToBlacklist(items: IPickerItem | IPickerItem[]) {
        if (!items) {
            return;
        }

        let toAdd;
        if (!Array.isArray(items)) {
            toAdd = [items];
        } else {
            toAdd = items
        }

        this.itemsToHide = this.itemsToHide.concat(toAdd);

        if (toAdd.length) {
            this.invalidateSelectedResults();
        }
    }

    removeFromBlacklist(items: IPickerItem | IPickerItem[]) {
        if (!items) {
            return;
        }

        let toRemove;
        if (!Array.isArray(items)) {
            toRemove = [items];
        } else {
            toRemove = items
        }

        if (toRemove.length) {
            for (let i of toRemove) {
                for (let b = this.itemsToHide.length - 1; b >= 0; b--) {
                    if (i.id === this.itemsToHide[b].id) {
                        this.itemsToHide.splice(b, 1);
                    }
                }
            }

            this.invalidateSelectedResults();
        }
    }

    getHighlighted(): IPickerItem {
        if (this.highlightedEl) {
            let hi = this.getItemById(this.highlightedEl.getAttribute("data-id"));
            if (hi) {
                return hi;
            }
        }
    }

    /* устанавливаем флаг, что не нужно обрабатывать результаты поиска
        (напр.  из-зп того что поле сейчас пустое) */
    setProcessSearchResponses(process: boolean) {
        this.processSearchResponses = process;
    }

    private isSelected(id: string) {
        return typeof (this.selectedObj[id]) !== 'undefined';
    }

    private searchInternal(query: string) {
        this.lastSearchQuery = query;

        this.setProcessSearchResponses(true);
        return this.options.searcher.search(query, this.options, (items, data) => {

            if (query !== this.lastSearchQuery || !this.processSearchResponses) {
                return;
            }

            this.resultsElm.innerHTML = '';
            this.items = items;

            let numResults = 0;
            if (items.length) {
                for (let i = 0; i < items.length; i++) {
                    //блеклист
                    if (this.itemsToHide.indexOf(items[i]) > -1 || this.isSelected(items[i].id)) {
                        continue;
                    }

                    //лимит на показываемые результаты
                    if (this.options.resultsLimit && i >= this.options.resultsLimit) {
                        break;
                    }

                    let result = this.$buildResult(items[i], query);
                    if (result != null) {
                        this.resultsElm.appendChild(result);
                        numResults++;
                    }
                }
            }

            this.clearHighlighted();

            if (numResults == 0) {
                if (this.hideOnEmptyResults) {
                    this.hide();
                    return;
                } else {
                    this.resultsElm.appendChild(this.$buildNoResults(query));
                }
            }

            if(this.options.resultFooterRenderer){
                let footer = this.$buildResultsFooter(query, items, data);
                if (footer != null) {
                    this.resultsElm.appendChild(footer);
                }
            }

            this.$notifyEvent('afterSearch', query, items, numResults);
            this.show();


        }, (message) => {
            this.resultsElm.appendChild(this.$buildErrorResult(message));
        });
    }

    private setupHtml() {
        this.dropdownElm = document.createElement('div');
        this.dropdownElm.className = 'dropdown';
        Utility.insertAfter(this.dropdownElm, this.sourceElm);

        this.resultsElm = this.$template();
        this.dropdownElm.style.left = '0';
        this.dropdownElm.style.display = 'none';
        this.dropdownElm.appendChild(this.resultsElm);
    }

    private bindEvents() {
        this.dropdownElm.onclick = e => {
            let result = e.target;
            while (result != null) {
                if (Utility.hasClass(result, 'result'))
                    break;
                result = result['parentElement'];
            }
            if (!result || Utility.hasClass(result, 'disabled'))
                return false;
            let id = Utility.getAttribute(result, 'data-id');
            let item = this.getItemById(id);
            if (item != null)
                this.$notifyEvent('resultSelected', item, this.lastSearchQuery, 'click', this.items.indexOf(item)+1, this.items.length);
            return false;
        };
    }

    private $buildResult(item: IPickerItem, query: string, data?:any): Node {
        let result = document.createElement('li');
        result.className = 'result';
        let idStr = item.id.toString();
        result.setAttribute('data-id', idStr);
        if (this.isSelected(idStr))
            result.className += ' disabled';
        result.appendChild(this.options.resultRenderer(item, query));
        return result;
    }

    private $buildResultsFooter(query: string, results?:IPickerItem[], data?:any): Node{
        let footer = document.createElement('div');
        footer.className = 'result-footer';
        if(this.options.resultFooterRenderer) {
            let footerContent = this.options.resultFooterRenderer(query, results, data);
            if(footerContent){
                footer.appendChild(footerContent);
            } else {
                return null;
            }
        }
        return footer;
    }

    private clearHighlighted() {
        this.highlightedIndex = this.getDefaultHighlightedIndex();
        //this.highlightedEl = null;
        this.invalidateActiveResultByIndex();
    }

    private $buildNoResults(query: string): Node {
        let noResult = document.createElement('li');
        noResult.className = 'no-results';
        noResult.appendChild(this.options.noResultsRenderer(query));
        return noResult;
    }

    private $buildErrorResult(message: string): Node {
        let errorResult = document.createElement('li');
        errorResult.className = 'no-results';
        errorResult.appendChild(document.createTextNode(message));
        return errorResult;
    }

    private $template(): Node {
        let ul = document.createElement('ul');
        ul.className = 'dropdown-menu';
        return ul;
    }

    private getItemById(id: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id.toString() === id)
                return this.items[i];
        }
        return null;
    }

    private invalidateSelectedResults() {
        this.$foreachResult(result => {
            let id = Utility.getAttribute(result, 'data-id');
            if (this.isSelected(id) || this.itemsToHide.some((item) => item.id === id)) {
                Utility.removeClass(result, 'highlighted');
                Utility.addClass(result, 'disabled');
            } else {
                Utility.removeClass(result, 'disabled');
            }
            return true;
        });
    }

    private invalidateActiveResultByIndex() {
        let hoverRemoved = false, elemFound = false;
        let index = 0;

        const beforeId = this.highlightedEl ? this.highlightedEl.getAttribute("data-id") : -1;

        this.highlightedEl = null;


        this.$foreachResult(result => {
            if (Utility.hasClass(result, 'disabled') || Utility.hasClass(result, 'no-results'))
                return true;  //continue
            if (!elemFound && index === this.highlightedIndex) {
                this.highlightedEl = result;
                elemFound = true;
            }
            else if (!hoverRemoved && Utility.hasClass(result, 'highlighted')) {
                Utility.removeClass(result, 'highlighted');
                hoverRemoved = true;
            }

            if (elemFound && hoverRemoved)
                return false; //break

            index++;
            return true; //continue
        });

        const afterId = this.highlightedEl ? this.highlightedEl.getAttribute("data-id") : -1;


        this.$notifyEvent("highlight", {
            item: afterId ? this.getItemById(afterId) : undefined,
            hasChanged: beforeId !== afterId
        });
        this.repositionResults();


        if (this.highlightedEl) {
            Utility.addClass(this.highlightedEl, 'highlighted');
            this.invalidateActiveResultVisible(this.highlightedEl);
        }
    }

    private invalidateActiveResult() {
        if (!this.highlightedEl) return;

        let hoverRemoved = false, itemFound = false;
        let index = 0;

        this.$foreachResult(result => {
            if (Utility.hasClass(result, 'disabled'))
                return true;

            if (!itemFound && this.highlightedEl === result) {
                this.highlightedIndex = index;
                itemFound = true;
            }
            else if (!hoverRemoved && Utility.hasClass(result, 'highlighted')) {
                Utility.removeClass(result, 'highlighted');
                hoverRemoved = true;
            }

            if (itemFound && hoverRemoved)
                return false;//break;

            index++;
            return true;//continue
        });

        Utility.addClass(this.highlightedEl, 'highlighted');
    }

    private $foreachResult(cb: (result: Node) => void) {
        let liCollection = this.resultsElm.childNodes;
        for (let i = 0; i < liCollection.length; i++) {
            if (!cb(liCollection[i]))
                break;
        }
    }

    private invalidateActiveResultVisible(el) {
        let resultsJsObj = this.resultsElm;
        let maxHeight = parseInt(Utility.getCssPropertyValue(resultsJsObj, 'maxHeight') || "190px", 10);
        let scrollTop = resultsJsObj.scrollTop;
        let visibleBottom = maxHeight + scrollTop;

        let elTop = el.offsetTop;
        let elBottom = elTop + el.offsetHeight;

        if (elBottom >= visibleBottom) {
            resultsJsObj.scrollTop = scrollTop + (elBottom - visibleBottom);
        } else if (el.offsetTop < scrollTop) {
            resultsJsObj.scrollTop = el.offsetTop;
        }
    }

    private getDefaultHighlightedIndex(): number {
        return this.selectFirstOnDefault ? 0 : -1;
    }
}