"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
exports.config = {
    baseUrl: 'http://localhost:3000/',
    specs: [
        './specs/*.spec.js',
        './specs/spec.js'
    ],
    exclude: [],
    framework: 'jasmine2',
    allScriptsTimeout: 110000,
    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000
    },
    directConnect: true,
    multiCapabilities: [
        {
            browserName: 'chrome'
        },
    ],
    onPrepare: function () {
        protractor_1.browser.waitForAngularEnabled(false);
    },
    seleniumArgs: ['-Dwebdriver.ie.driver=node_modules/protractor/selenium/IEDriverServer.exe'],
};
