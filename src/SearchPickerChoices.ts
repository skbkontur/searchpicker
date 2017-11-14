import {EventObject} from "./EventObject";
import {IPickerItem} from "./pickeritems/IPickerItem";
import {ISearchPickerOptions} from "./options/ISearchPickerOptions";
import {Utility} from "./Utils";

export class SearchPickerChoices extends EventObject {

    selected: IPickerItem[] = [];
    keepActive: boolean = false;
    isActive: boolean = false;

    private inputElm: any;
    private inputJsElmWrap: any;
    private backstrokeLength: number;
    private pendingBackstroke: HTMLLIElement[] = [];
    private highlightedChoice: any;
    private sizerElm: HTMLDivElement;
    private sizerElmText: Text;
    private inFocus: boolean;
    private prevInputTextLength: number;
    // флаг, обозначающий что пользователь не стирает текст, и есть смысл автодополнять
    private shouldUpdateAutoComplete: boolean;

    constructor(private container: any
        , private options: ISearchPickerOptions) {
        super();
        this.sizerElm = <HTMLDivElement>document.getElementById('__srchpicker-sizer');
        if (this.sizerElm) {
            this.sizerElmText = <Text>this.sizerElm.childNodes[0];
        }
        this.setup();
    }

    addChoice(item: IPickerItem) {
        let id = this.selected.push(item) - 1;
        //insert new choice item into DOM
        this.container.insertBefore(this.$renderChoice(item, id), this.inputJsElmWrap);
        this.setSearchText('');
        this.scaleSearchField();
    }

    removeChoice(item: IPickerItem) {
        for (let i = 0; i < this.selected.length; i++) {
            if (this.selected[i].id === item.id) {
                this.selected.splice(i, 1);
                this.removeChoiceElement(item.id.toString());
                this.scaleSearchField();
                this.$notifyEvent('choiceRemoved', item);
                return;
            }
        }
    }

    removeAll() {
        let length = this.selected.length;
        for (let i = 0; i < length; i++) {
            this.removeChoice(this.selected[0]);
        }
    }

    getSearchText(): string {
        return this.inputElm.value;
    }

    setSearchText(val: string) {
        this.inputElm.value = val;
    }

    focus() {
        if (!this.canSelectMoreChoices()) return;
        this.onFocus();
        this.inputElm.focus();
    }

    getHeight() {
        return this.container.offsetHeight;
    }

    canSelectMoreChoices(): boolean {
        if (this.options.maxSelectedChoices <= 0) return true;
        return this.selected.length < this.options.maxSelectedChoices;
    }

    setAutocompleteText(text: string) {
        if (!this.shouldUpdateAutoComplete) {
            return;
        }

        if (text && this.inputElm.value.length) {
            this.removeAutocompleteText();

            let selStart = this.inputElm.value.length,
                inputValue = this.escapeRegexp(this.inputElm.value);

            if (text.toUpperCase().search(inputValue.toUpperCase()) === 0) {
                this.inputElm.value = text;
            } else {
                this.inputElm.value += ` (${text})`;
            }
            let selEnd = this.inputElm.value.length;
            this.inputElm.setSelectionRange(selStart, selEnd);
        }
        this.scaleSearchField();

    }

    removeAutocompleteText() {
        if (this.inputElm.selectionStart) {
            this.inputElm.value = this.inputElm.value.substring(0, this.inputElm.selectionStart);
        }
    }

    private escapeRegexp(text: string) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    private setup() {
        this.applyTemplate();
        this.bindEvents();
        this.scaleSearchField();
    }

    private scaleSearchField() {
        if (!this.canSelectMoreChoices()) {
            this.inputElm.style.display = 'none';
            this.keepActive = false;
            this.onBlur();
            return;
        }

        let placeholderText = this.selected.length > 0 ? '' : this.options.placeholder;
        this.inputElm.placeholder = placeholderText;

        this.ensureSizerElement();

        this.sizerElmText.nodeValue = this.inputElm.value || placeholderText;
        let w = this.sizerElm.offsetWidth + 20;

        this.inputElm.style.width = w + 'px';

        if (this.inputElm.style.display !== 'block')
            this.inputElm.style.display = 'block';
    }

    private ensureSizerElement() {
        if (!this.sizerElm) {
            let div = document.createElement('div');
            let styleBlock = "position:absolute; left: -1000px; top: -1000px;";
            let styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
            for (let i = 0; i < styles.length; i++) {
                let style = styles[i];
                styleBlock += style + ":" + Utility.getCssPropertyValue(this.inputElm, style) + ";";
            }
            div.id = '__srchpicker-sizer';
            div.style.cssText = styleBlock;
            this.sizerElmText = document.createTextNode('');
            div.appendChild(this.sizerElmText);
            document.body.appendChild(div);

            this.sizerElm = div;
        }
    }

    private bindEvents() {
        this.container.onclick = () => {
            this.onClick();
        };
        this.inputElm.onblur = () => {
            this.onBlur();
        };
        this.inputElm.onfocus = () => {
            this.onFocus();
        };
        this.inputElm.onkeyup = (e) => {
            this.onKeyUp(e);
        };
        this.inputElm.oninput = (e) => {
            // IE 11 может выбросить событие input при установке плейсхолдера в элемент
            if (document.activeElement !== e.target) {
                return;
            }
            this.onInput(e);
        };
        this.inputElm.onkeydown = (e) => {
            this.onKeyDown(e);
        };

    }

    private onClick() {
        if (!this.canSelectMoreChoices())
            return;
        if (this.options.minLengthToSearch == 0 && this.isActive) {
            this.clearBackstroke();
            this.$notifyEvent('search', this.getSearchText());
        }
    }

    private onKeyUp(evt: any) {

        switch (evt.keyCode) {
            case 46:
            case 8:
                if (this.backstrokeLength < 1 && this.selected.length > 0) {
                    this.keydownBackstroke();
                } else if (!this.pendingBackstroke.length && this.canSelectMoreChoices()) {
                    this.clearHilightedChoice();
                    //this.$notifyEvent('search', this.getSearchText());
                }
                this.scaleSearchField();
                break;
            case 13:
                if(this.inputElm.value){
                    evt.preventDefault();
                }
                this.$notifyEvent('enter', evt);
                break;
            case 27:
                this.$notifyEvent('escape', evt);
                break;
            case 9:
            case 38:
            case 40:
            case 16:
            case 17:
            case 224: // mac
            case 91:
            case 92:
            default:
                break;
        }
    }

    private onInput(evt: any) {
        this.shouldUpdateAutoComplete = this.prevInputTextLength <= this.inputElm.value.length;
        this.prevInputTextLength = this.inputElm.value.length;

        if (this.canSelectMoreChoices()) {
            this.clearBackstroke();
            this.scaleSearchField();
            this.$notifyEvent('search', this.getSearchText());
        }
    }

    private onKeyDown(evt: any) {
        switch (evt.keyCode) {
            case 46:
            case 8://backspace & del
                this.backstrokeLength = this.inputElm.value.length;
                break;
            case 9:
                this.$notifyEvent('tab', evt);
                break;
            case 13:
            case 16:
            case 17:
                if(this.inputElm.value){
                    evt.preventDefault();
                }
                break;
            case 38:
                evt.preventDefault();
                this.shouldUpdateAutoComplete = true;
                this.$notifyEvent('arrowUp', evt);
                break;
            case 40:
                evt.preventDefault();
                this.shouldUpdateAutoComplete = true;
                this.$notifyEvent('arrowDown', evt);
                break;
            case 35: // left, right, home, end
            case 36:
            case 37:
            case 39:
                // возможный сброс выделения с текста автодополнения
                if (this.inputElm.selectionStart !== this.inputElm.selectionEnd) {
                    this.onInput(evt);
                }
                break;
            default:
                if (!this.canSelectMoreChoices()) {
                    evt.preventDefault();
                } else {
                    this.scaleSearchField();
                    //перебрасываем набор текста в инпут
                    if (document.activeElement !== this.inputElm) {
                        this.inputElm.focus();
                        this.onFocus();
                    }
                }
                break;
        }
    }

    private onRemoveChoiceClick(choice) {
        let id = Utility.getAttribute(choice, 'data-id');
        let item = this.getSelectedChoiceById(id);
        if (item != null)
            this.removeChoice(item);
    }

    private clearHilightedChoice() {
        if (this.highlightedChoice) {
            Utility.removeClass(this.highlightedChoice, 'highlighted');
            this.highlightedChoice = null;
        }
    }

    private clearBackstroke() {
        if (this.pendingBackstroke.length) {
            for (let li of this.pendingBackstroke) {
                Utility.removeClass(li, 'search-choice-focus');
            }
            this.pendingBackstroke = [];
        }
    }

    private keydownBackstroke() {
        if (this.pendingBackstroke.length) {
            for (let li of this.pendingBackstroke) {
                let id = Utility.getAttribute(li, 'data-id');
                let selectedItem = this.getSelectedChoiceById(id);
                if (selectedItem != null) {
                    this.removeChoice(selectedItem);
                    //li.blur();
                }


            }
            this.clearBackstroke();


            //this.$notifyEvent('blur')
            //this.inputElm.focus();

        } else {
            let items = this.container.getElementsByTagName("li");
            let lastChoice = null;
            for (let i = 0; i < items.length; i++) {
                if (Utility.hasClass(items[i], 'search-choice'))
                    lastChoice = items[i];
            }
            this.pendingBackstroke[0] = lastChoice;
            if (this.pendingBackstroke[0] != null)
                Utility.addClass(this.pendingBackstroke[0], "search-choice-focus");
        }
    }

    private onBlur() {
        this.inFocus = false;
        if (!this.isActive) return;
        setTimeout(() => {

            if (!this.keepActive) {

                Utility.removeClass(this.container, 'active'); // active in ul root elem
                this.isActive = false;
                this.clearBackstroke();
                this.$notifyEvent('blur');
            }
        }, 10);
    }

    private onFocus() {
        this.inFocus = true;
        if (this.isActive) return;
        Utility.addClass(this.container, 'active'); // active in ul root elem
        this.isActive = true;
        setTimeout(() => {
            if (this.inFocus && document.activeElement === this.inputElm)
                this.$notifyEvent('focus');
        }, 10);
    }

    private removeChoiceElement(id: string) {
        let choices = this.container.getElementsByTagName('li');
        for (let i = 0; i < choices.length; i++) {
            if (Utility.hasClass(choices[i], 'search-choice')
                && Utility.getAttribute(choices[i], 'data-id') === id) {
                choices[i].parentElement.removeChild(choices[i]);
                return;
            }
        }
    }

    private applyTemplate(): void {
        this.inputJsElmWrap = document.createElement('li');
        this.inputJsElmWrap.className = 'search-field';

        this.inputElm = document.createElement('input');
        this.inputElm.type = 'text';
        this.inputElm.placeholder = this.options.placeholder;
        this.inputElm.autocomplete = 'off';

        this.inputJsElmWrap.appendChild(this.inputElm);
        this.container.appendChild(this.inputJsElmWrap);
    }

    private $renderChoice(item: IPickerItem, index: number): any {
        let choice = document.createElement('li');
        choice.tabIndex = 0; //important to receive keyboard events
        choice.className = 'search-choice';
        choice.setAttribute('data-id', item.id.toString());

        if (this.options.maxSelectedChoices == 1) {
            Utility.addClass(choice, "sole-choice");
        }

        choice.onclick = (e) => {

            if (Utility.hasClass(e.target, 'search-choice-close')) {
                this.onRemoveChoiceClick(choice);
                return;
            }

            Utility.addClass(choice, "search-choice-focus");

            if (e.metaKey || e.ctrlKey) {
                Utility.addClass(choice, "search-choice-focus");
                this.pendingBackstroke.push(choice);
            } else if (e.shiftKey) {
                let newChoices = this.getChoicesRange(choice, this.pendingBackstroke[this.pendingBackstroke.length - 1]);

                for (let ch of newChoices) {
                    Utility.addClass(ch, "search-choice-focus");
                    this.pendingBackstroke.push(ch);
                }

            } else {
                this.pendingBackstroke.forEach(el => {
                    if (el !== choice) {
                        Utility.removeClass(el, "search-choice-focus");
                    }
                });
                this.pendingBackstroke = [choice];
            }

            //e.preventDefault();
            e.stopPropagation();
            if(this.inputElm.style.display !== "none"){
                this.inputElm.focus();
            }

        };

        choice.onkeyup = (e) => {
            this.onKeyUp(e);
        };

        choice.onkeydown = (e) => {
            this.onKeyDown(e);
        };

        choice.onblur = (e) => {
            this.onBlur();
        };

        choice.onfocus = (e) => {
            this.onFocus();
        };

        choice.appendChild(this.options.choiceRenderer(item, this.options.maxSelectedChoices == 1));


        return choice;
    }

    private getSelectedChoiceById(id: string): IPickerItem {
        for (let i = 0; i < this.selected.length; i++) {
            if (this.selected[i].id.toString() === id)
                return this.selected[i];
        }
        return null;
    }

    private getChoicesRange(choice1: HTMLLIElement, choice2: HTMLLIElement): HTMLLIElement[] {
        let nodesToAdd = [], inInterval = false;

        for (let k = 0, e = this.container.childNodes.item(0); k < this.container.childNodes.length; ++k) {
            if (e === choice1 || e === choice2) {
                nodesToAdd.push(e);
                inInterval = !inInterval;
                if (!inInterval) break;
            } else if (inInterval && Utility.hasClass(e, "search-choice")) {
                nodesToAdd.push(e);
            }
            e = e.nextSibling
        }

        return nodesToAdd;
    }

}