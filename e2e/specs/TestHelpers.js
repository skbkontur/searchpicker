"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
function openPage() {
    return protractor_1.browser.get('http://localhost:3000/index.html');
}
exports.openPage = openPage;
