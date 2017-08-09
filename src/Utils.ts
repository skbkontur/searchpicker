/*
 * Helpers methods. Allow support zepto.js, jqLite (built-in angular.js), jQuery
 */
import {IPickerItem} from "./pickeritems/IPickerItem";
import {ISearchPickerOptions} from "./options/ISearchPickerOptions";

export class Utility {

    static wrapResultText(source: string, query: string): Node[] {
        let nodes: Node[] = [];
        let startpos: number;
        let zregex = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
        if (query.length) {
            startpos = source.search(zregex);
            if (startpos < 0) {
                nodes.push(document.createTextNode(source));
            } else {
                nodes.push(document.createTextNode(source.substr(0, startpos)));

                let em = document.createElement('em');
                em.appendChild(document.createTextNode(source.substr(0, startpos + query.length).substr(startpos)));
                nodes.push(em);
                nodes.push(document.createTextNode(source.substr(startpos + query.length)));
            }
        } else {
            nodes.push(document.createTextNode(source));
        }
        return nodes;
    }

    static filterItems(items: IPickerItem[], query: string, options: ISearchPickerOptions): IPickerItem[] {
        query = Utility.ltrim(query);//trim input query

        let regex = new RegExp('^' + query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');

        let ref: IPickerItem[] = items.slice(0);
        let foundItems: IPickerItem[] = [];

        for (let i = 0; i < ref.length; i++) {
            let item = ref[i];
            let itemName = item.title;

            if (options.searchInValues) {
                itemName += ' ' + item.id.replace(/^\w+\\/g, '');
            }

            if (regex.test(item.title)) {
                foundItems.push(item);
            }
            else if (itemName.indexOf(' ') >= 0 || itemName.indexOf('[') === 0 || itemName.indexOf('\\') >= 0) {
                let parts = itemName.replace(/[\[]/g, '').replace(/\\/g, ' ').split(' ');
                if (parts.length) {
                    for (let j = 0; j < parts.length; j++) {
                        let part = parts[j];
                        if (regex.test(part)) {
                            foundItems.push(item);
                            break;
                        }
                    }
                }
            }
        }
        return foundItems;
    }

    static parseHtml(html: string): any {
        let root = document.createElement("div");
        root.innerHTML = html;
        return root.firstChild;
    }

    static hasClass(elem: any, clsName: string): boolean {
        if (elem.classList) {
            return elem.classList.contains(clsName);
        }
        //IE fallback:
        return elem.className.match(new RegExp('(\\s|^)' + clsName + '(\\s|$)')) != null;
    }

    static getAttribute(element: any, attrName: string): string {
        let attr = element.attributes[attrName];
        if (!attr) return undefined;
        return attr.value;
    }

    static htmlEncode(value: string): string {
        let div = document.createElement('div');
        let text = document.createTextNode(value);
        div.appendChild(text);
        return div.innerHTML;
    }

    static addClass(elem: any, clsName: string) {
        if (elem.classList) {
            elem.classList.add(clsName);
            return;
        }
        if (!Utility.hasClass(elem, clsName)) elem.className += " " + clsName;
    }

    static removeClass(elem: any, clsName: string) {
        if (Utility.hasClass(elem, clsName)) {
            if (elem.classList) {
                elem.classList.remove(clsName);
                return;
            }
            let reg = new RegExp('(\\s|^)' + clsName + '(\\s|$)');
            elem.className = elem.className.replace(reg, ' ');
        }
    }

    static getCssPropertyValue(elem: any, propname: string): string {
        let computedStyle;
        if (window.getComputedStyle) {
            computedStyle = window.getComputedStyle(elem, null);
        } else {
            computedStyle = elem.currentStyle;
        }
        return computedStyle.getPropertyValue(propname);
    }

    static isArray(obj: any): boolean {
        return Array.isArray(obj);
    }

    static isString(obj: any): boolean {
        return typeof (obj) === 'string';
    }

    static trim(source: string): string {
        if (!String.prototype.trim) {
            return source.replace(/^\s+|\s+$/g, '');
        }
        return source.trim();
    }

    static ltrim(source: string): string {
        return source.replace(/^\s+/, '');
    }

    static insertAfter(elem: HTMLElement, refElem: HTMLElement) {
        let parent = refElem.parentNode;
        let next = refElem.nextSibling;
        if (next) {
            return parent.insertBefore(elem, next);
        } else {
            return parent.appendChild(elem);
        }
    }
}