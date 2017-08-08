import { IPickerItem } from "./pickeritems/IPickerItem";
import { ISearchPickerOptions } from "./options/ISearchPickerOptions";
export declare class Utility {
    static wrapResultText(source: string, query: string): Node[];
    static filterItems(items: IPickerItem[], query: string, options: ISearchPickerOptions): IPickerItem[];
    static parseHtml(html: string): any;
    static hasClass(elem: any, clsName: string): boolean;
    static getAttribute(element: any, attrName: string): string;
    static htmlEncode(value: string): string;
    static addClass(elem: any, clsName: string): void;
    static removeClass(elem: any, clsName: string): void;
    static getCssPropertyValue(elem: any, propname: string): string;
    static isArray(obj: any): boolean;
    static isString(obj: any): boolean;
    static trim(source: string): string;
    static ltrim(source: string): string;
    static insertAfter(elem: HTMLElement, refElem: HTMLElement): HTMLElement;
}
