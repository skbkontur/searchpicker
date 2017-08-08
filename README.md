# searchpicker

Searchpicker or combo-box dropdown, written in typescript. No dependencies.

## Start local sample

```
npm start
```

## How to use

```
npm i searchpicker-ts --save
```

Initialize picker control to specified container

```
let searchPicker2 = new SearchPicker(document.getElementById('searchpicker-container'), options);
```

### Options

`placeholder: string` - Default `''`

`maxSelectedChoices: number` - amount of choice that user can select. 1 - single choice. Default - unlimited

`minLengthToSearch: number` - minimal text length to start search

`searchInValues: boolean` - instruct default searcher to search text in picker identifiers. Default - false

`resultsLimit: number` - maximum shown results. Default - all results returned by searcher.

`pickerItemFactory?: (item: any) => IPickerItem` - allow to convert source data to picker item for default searcher

`source: any[]` - data for search with default searcher.

`resultRenderer: (item: IPickerItem, query: string) => Node` - allow to override default picker item view.

`noResultsRenderer: (query: string) => Node` - allows to override default view when no results found

`choiceRenderer: (item: IPickerItem, renderClose?:boolean) => Node` - allow to override default choice view

`searcher: ISearcher` - alows add custom logic for result search. For instance: async fetch data from server side.

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

```
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

        fetch("api/search?q" + query)
            .then((results) => {
                onresults(results.map(r => { return {title: r.title, id: r.login} }));
            }, err => {
                onerror(err);
            });

    }

}
```

## Events

You can subscribe for searchpicker events and read current selected values

### choiceAdded

Invokes when user add new choice

```
picker.on("choiceAdded", (item: IPickerItem) => {
   console.log(picker.getChoices());
});
```

### choiceRemoved

Invokes when user remove selected choice

```
picker.on("choiceRemoved", (item: IPickerItem) => {
   console.log(picker.getChoices());
});
```


## Run e2e tests

```
npm run test
```

