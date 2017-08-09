import {IPickerItem} from "./IPickerItem";

export class DefaultPickerItem implements IPickerItem {
    id: any;
    title: string;

    static create(id: any, title: string): DefaultPickerItem {
        const item = new DefaultPickerItem();
        item.title = title;
        item.id = id;
        return item;
    }
}
