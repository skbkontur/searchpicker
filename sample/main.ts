import {TESTDATA, TESTDATA_LONG} from './testdata'
import {SearchPicker} from "../src";
import {CustomField} from "./CustomField";

document.addEventListener("DOMContentLoaded", function(event) {
    let searchPicker = new SearchPicker(document.getElementById('searchpicker'), {
        placeholder: 'Sample placeholder',
        source: TESTDATA,
        minLengthToSearch: 0
    });
    bindPickerResultOutput(searchPicker);

    let searchPicker2 = new SearchPicker(document.getElementById('searchpicker-singlechoice'), {
        placeholder: 'Only 1 choice',
        source: TESTDATA,
        minLengthToSearch: 0,
        maxSelectedChoices: 1
    });
    bindPickerResultOutput(searchPicker2,'singlechoice');

    let searchPicker3 = new SearchPicker(document.getElementById('searchpicker-unlim'), {
        placeholder: 'Unlimited choices, search from 3 symbols',
        source: TESTDATA,
        minLengthToSearch: 3
    });
    bindPickerResultOutput(searchPicker3,'unlim');


    let searchPicker4 = new SearchPicker(document.getElementById('searchpicker-top3'), {
        placeholder: 'Show only top3 results',
        source: TESTDATA,
        resultsLimit: 3
    });
    bindPickerResultOutput(searchPicker4,'top3');

    let searchPicker5 = new SearchPicker(document.getElementById('searchpicker-cutlong'), {
        placeholder: 'Cut long text',
        source: TESTDATA_LONG,
        minLengthToSearch: 0,
    });
    bindPickerResultOutput(searchPicker5,'cutlong');


    new CustomField("#searchpicker-customfield");
});

function bindPickerResultOutput(picker: SearchPicker, name?: string){
    let resHolder = document.getElementById(name ? 'searchpicker-result-'+name : 'searchpicker-result');

    picker.on("choiceAdded", () => {
        resHolder.innerHTML= picker.getChoices().map(elm=> elm.id).join(",");
    });
    picker.on("choiceRemoved", () => {
        resHolder.innerHTML= picker.getChoices().map(elm=> elm.id).join(",");
    });

}
