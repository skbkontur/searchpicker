import {EventObject} from "./EventObject";
import {IPickerItem} from "./pickeritems/IPickerItem";
import {SearchPickerChoices} from "./SearchPickerChoices";
import {SearchPickerResults} from "./SearchPickerResults";
import {ISearchPickerOptions} from "./options/ISearchPickerOptions";
import {DefaultSearchPickerOptions} from "./options/DefaultSearchPickerOptions";
import {Utility} from "./Utils";

export class SearchPicker extends EventObject {

    public pickerItems: IPickerItem[] = [];
    public choices: SearchPickerChoices;
    public results: SearchPickerResults;
    public options: ISearchPickerOptions;
    private inFocus: boolean;
    private choicesElm: any;
    private searchTmrId: number = null;

    private isMobile:boolean;

    constructor(private container: any
        , options: ISearchPickerOptions) {
        super();

        this.isMobile = isMobile();
        this.options = this.extendOptions(new DefaultSearchPickerOptions(), options);
        this.setupHtml();
        this.bindEvents();
    }

    getChoices(): IPickerItem[] {
        return this.choices.selected;
    }

    clearChoices() {
        this.choices.removeAll();
    }

    addChoice(item: IPickerItem) {
        this.choices.addChoice(item);
        this.results.addSelectedResult(item);
    }

    removeChoice(item: IPickerItem) {
        this.choices.removeChoice(item);
        this.results.removeSelectedResult(item);
    }

    updateSource(source: any[]) {
        this.options.source = source;
        this.results.updateOptions(this.options);
    }

    focus() {
        this.choices.focus();
    }

    allowInput(){
        this.choices.forbidInput = false;
    }

    forbidInput(){
        this.choices.forbidInput = true;
    }

    private setupHtml() {
        Utility.addClass(this.container, 'container');
        this.applyTemplate();
        this.choices = new SearchPickerChoices(this.choicesElm, this.options, this.isMobile);
        this.results = new SearchPickerResults(this.choicesElm, this.options);
    }

    private bindEvents() {
        this.container.onclick = () => this.onClick();

        this.container.onmouseleave = () => {
            this.choices.keepActive = false;
        };
        this.container.onmouseenter = () => {
            this.choices.keepActive = true;
        };

        this.choices.on('search', (text) => {
            this.onSearch(text);
        });
        this.choices.on('blur', () => {
            this.inFocus = false;
            this.results.hide();
        });
        this.choices.on('focus', () => {
            this.inFocus = true;
            this.onSearch(this.choices.getSearchText());
        });
        this.choices.on('escape', () => {
            this.onEscape();
        });

        this.choices.on('tab', (e) => {
            this.onSelect(e, 'tab');
        });
        this.choices.on('enter', (e) => {
            this.onSelect(e, 'enter');
        });

        this.choices.on('arrowDown', () => this.results.moveSelectedDown());
        this.choices.on('arrowUp', () => this.results.moveSelectedUp());
        this.choices.on('choiceRemoved', item => this.onChoiceRemoved(item));

        this.results.on('resultSelected', (result,query, selectedVia, rank, count) => this.onResultSelected(result, query, selectedVia, rank, count ));

        this.results.on('highlight', ({item, changed}) => {
            if (item) {
                this.choices.setAutocompleteText(item.title)
            }
        });
    }

    private onSearch(text: string) {
        if (text.length < this.options.minLengthToSearch || !this.choices.canSelectMoreChoices()) {
            this.results.hide();
            //случай, когда приходит устаревший поиск уже при пустом/недостаточно длинном поле
            this.results.setProcessSearchResponses(false);
        }
        else if (this.inFocus) {
            this.results.search(text);
            this.results.setProcessSearchResponses(true);
        }


    }

    private onChoiceRemoved(item: IPickerItem) {
        this.results.removeSelectedResult(item);
        this.$notifyEvent('choiceRemoved', item);
        this.results.setTop(this.choices.getHeight());
    }

    private onClick() {
        this.choices.focus();
    }

    private onEscape() {
        this.results.hide();
    }

    private onSelect(e, selectedVia?: string) {
        if (!this.results.isShown)
            return;
        e.preventDefault();
        this.results.selectHighlighted(selectedVia);
    }

    private onResultSelected(result: IPickerItem,  query?:string, selectedVia?: string, rank?: number, totalCount?:number) {
        this.choices.addChoice(result);
        this.results.hide();
        this.results.addSelectedResult(result);
        this.results.setTop(this.choices.getHeight());
        this.$notifyEvent('choiceAdded', result, query, selectedVia, rank, totalCount);
    }

    private applyTemplate() {
        this.choicesElm = document.createElement('ul');
        this.choicesElm.className = 'choices form-control';
        if (this.options.maxSelectedChoices === 1) {
            Utility.addClass(this.choicesElm, "sole-choice");
        }
        this.container.appendChild(this.choicesElm);
    }

    private extendOptions(def: any, user: any): ISearchPickerOptions {
        var result = {};
        for (var prop in user) {
            result[prop] = user[prop];
        }
        for (var prop in def) {
            if (typeof (user[prop]) == 'undefined')
                result[prop] = def[prop];
        }
        return <ISearchPickerOptions>result;
    }



}

export function isMobile() {
    return !!(navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i))
}
