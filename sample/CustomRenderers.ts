import {IPickerItem} from "../src/index";

export class CustomRenderers {
    static footerRenderer: (query: string, results:IPickerItem[], data?: any) => Node = (query, results, data) => {
        if(!query) return null;


        let root = document.createElement('div');

        root.style.textAlign = 'center';
        root.style.padding = '10px';
        root.style.fontWeight = 'bold';
        root.style.backgroundColor = '#EEE';

        root.appendChild(document.createTextNode('Some results could be filtered due to query parameters'));

        return root;
    }
}