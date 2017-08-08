import { IPickerItem } from "./IPickerItem";
export declare class DefaultPickerItem implements IPickerItem {
    id: any;
    title: string;
    static create(id: any, title: string): DefaultPickerItem;
}
