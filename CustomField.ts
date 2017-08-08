import {SearchPickerResults} from "./src";
import {DefaultSearchPickerOptions} from "./src/options/DefaultSearchPickerOptions";
import {ISearchPickerOptions} from "./src/options/ISearchPickerOptions";
import {TESTDATA} from "./testdata";

export class CustomField {

    private searchPickerResults;
    private elem: HTMLInputElement;

    constructor(elementLocator: string) {
        this.elem = <HTMLInputElement>document.querySelector(elementLocator);

        if (this.elem) {
            let defaults: ISearchPickerOptions = new DefaultSearchPickerOptions();
            defaults.source = TESTDATA;
            this.searchPickerResults = new SearchPickerResults(this.elem, defaults);

            this.elem.addEventListener("input", (e) => {
                if (e.target == document.activeElement) {
                    this.searchPickerResults.search(this.elem.value.split("\n").pop());
                }
            });

            this.searchPickerResults.on("resultSelected", result => {
                let temp = this.elem.value.split("\n");
                temp.pop();
                this.elem.value = temp.join("\n") + (temp.length ? "\n" : "") + result.title + "\n";

            });

            this.elem.addEventListener("keydown", evt => {
                let kc = (<KeyboardEvent>evt).keyCode;
                switch (kc) {
                    case 13:
                        if(this.searchPickerResults.isShown) {
                            this.searchPickerResults.selectHighlighted('enter');
                            this.searchPickerResults.hide();
                            evt.preventDefault();
                        }
                        break;
                    case 38:
                        this.searchPickerResults.moveSelectedUp();
                        evt.preventDefault();
                        break;
                    case 40:
                        this.searchPickerResults.moveSelectedDown();
                        evt.preventDefault();
                        break;
                }
            })

        } else {
            console.error("No element found to create CustomField Searchpicker");
        }
    }


}