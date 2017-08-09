# searchpicker

Searchpicker or combo-box dropdown with multiple choices support, written in typescript. No dependencies.

[Demo page](http://tech.skbkontur.ru/searchpicker-ts/)

## How to install

``` shell
npm i searchpicker --save
```

## Start local sample

``` shell
npm start
```

Server stared at `http://localhost:8080`

## How to use

Initialize picker control to specified container in your app:

``` typescript
import {SearchPicker} from 'searchpicker';

const picker = new SearchPicker(document.getElementById('searchpicker-container'), options);
```

### Options

`placeholder: string` - Default `''`

`maxSelectedChoices: number` - amount of choices that user can select. 1 - single choice. Default - unlimited

`minLengthToSearch: number` - minimal text length in field length to start search from

`searchInValues: boolean` - instruct default searcher to search text in picker identifiers. Default - false

`resultsLimit: number` - maximum shown results. Default - all results returned by searcher.

`pickerItemFactory?: (item: any) => IPickerItem` - allow to convert source data to picker item for default searcher

`source: any[]` - data for search with default searcher.

`resultRenderer: (item: IPickerItem, query: string) => Node` - allow to override default picker item view.

`noResultsRenderer: (query: string) => Node` - allows to override default view when no results found

`choiceRenderer: (item: IPickerItem, renderClose?:boolean) => Node` - allow to override default choice view

`searcher: ISearcher` - allows to add custom logic for result search. For instance: async fetch data from server side.

### ISearcher

``` typescript
export interface ISearcher {
    /**
     * Search data
     * @param {string} query                                user query
     * @param {ISearchPickerOptions} options                current searchpicker options
     * @param {(items: IPickerItem[]) => void} onresults    callback with result
     * @param {(message: string) => void} onerror           callback with search error
     */
    search(query: string
        , options: ISearchPickerOptions
        , onresults: (items: IPickerItem[]) => void
        , onerror?: (message: string) => void);
}
```

Sample of custom data searcher

``` typescript
export class BackendSearcher implements ISearcher {

    private pickerItems: IPickerItem[] = null;
    private lastSearchText: string;
    private foundItems: IPickerItem[] = [];
    private tmrId: number;

    search(query: string
        , options: ISearchPickerOptions
        , onresults: (items: IPickerItem[]) => void
        , onerror?: (message: string) => void) {

        if (this.tmrId)
            clearTimeout(this.tmrId);

        // fetch data from server
        fetch("api/search?q=" + query)
            .then((results) => {
                onresults(results.map(r => { return {title: r.title, id: r.login} }));
            }, err => {
                onerror(err);
            });

    }

}
```

## Events

You can subscribe for picker events and read current selected values

### choiceAdded

Invokes when user add new choice

``` typescript
const picker = new SearchPicker(...);

picker.on("choiceAdded", (item: IPickerItem) => {
   console.log(picker.getChoices());
});
```

### choiceRemoved

Invokes when user remove selected choice

``` typescript
const picker = new SearchPicker(...);

picker.on("choiceRemoved", (item: IPickerItem) => {
   console.log(picker.getChoices());
});
```

## Run e2e tests

```
npm run test
```

## Build library

``` shell
npm run build:lib
```