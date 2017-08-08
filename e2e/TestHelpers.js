"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var until = protractor_1.ExpectedConditions;
function configureBackend(config) {
    protractor_1.browser.driver.executeScript("window.__configureBackend(" + JSON.stringify(config) + ");");
}
exports.configureBackend = configureBackend;
function navigate(page) {
    click(getByTid("navigate-page-" + page));
}
exports.navigate = navigate;
function getByTid(tid, scope) {
    var selector = protractor_1.by.css("[tid=" + tid + "]");
    return scope ? scope.element(selector) : protractor_1.element(selector);
}
exports.getByTid = getByTid;
function getAllByTid(tid, scope) {
    var selector = protractor_1.by.css("[tid=" + tid + "]");
    return scope ? scope.all(selector) : protractor_1.element.all(selector);
}
exports.getAllByTid = getAllByTid;
function expectText(tid, text, scope) {
    var el = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(el.getText()).toEqual(text, "Expect text of element (tid=" + tid + ")");
}
exports.expectText = expectText;
function click(tid, scope) {
    var elementToClick = typeof tid === "string" ? getByTid(tid, scope) : tid;
    //const el = getByTid(tid, scope);
    waitClickable(elementToClick);
    elementToClick.click();
    sleep(20);
}
exports.click = click;
function sleep(timeout) {
    protractor_1.browser.sleep(timeout);
}
exports.sleep = sleep;
function setBrowserWindow(width, height) {
    if (width === void 0) { width = 1920; }
    if (height === void 0) { height = 1080; }
    protractor_1.browser.driver.manage().window().setSize(width, height);
}
exports.setBrowserWindow = setBrowserWindow;
function expectDisplayed(tid, scope) {
    var elementToExpect = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(elementToExpect.isDisplayed()).toBeTruthy();
}
exports.expectDisplayed = expectDisplayed;
function expectAllDisplayed(tid, scope) {
    var elementsToExpect = typeof tid === "string" ? getAllByTid(tid, scope) : tid, displayedElements = elementsToExpect.filter(function (el) {
        return el.isDisplayed();
    });
    expect(displayedElements.count()).toBe(elementsToExpect.count());
}
exports.expectAllDisplayed = expectAllDisplayed;
function expectCountDisplayed(tid, count, scope) {
    var elementsToExpect = typeof tid === "string" ? getAllByTid(tid, scope) : tid, displayedElements = elementsToExpect.filter(function (el) {
        return el.isDisplayed();
    });
    expect(displayedElements.count()).toBe(count);
}
exports.expectCountDisplayed = expectCountDisplayed;
function expectNotDisplayed(tid, scope) {
    var elementToExpect = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(elementToExpect.isDisplayed()).toBeFalsy();
}
exports.expectNotDisplayed = expectNotDisplayed;
function expectPresent(tid, scope) {
    var el = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(el.isPresent()).toBe(true);
}
exports.expectPresent = expectPresent;
function expectNotPresent(tid, scope) {
    var el = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(el.isPresent()).toBe(false);
}
exports.expectNotPresent = expectNotPresent;
function clearInput(tid, inputTag) {
    var elementToClear = typeof tid === "string" ? getByTid(tid) : tid;
    if (inputTag) {
        elementToClear.element(protractor_1.by.tagName(inputTag)).clear();
    }
    else
        elementToClear.clear();
}
exports.clearInput = clearInput;
function focusInput(tid, inputTag) {
    var elementToFill = typeof tid === "string" ? getByTid(tid) : tid;
    if (inputTag) {
        click(elementToFill.element(protractor_1.by.tagName(inputTag)));
    }
    else
        click(elementToFill);
}
exports.focusInput = focusInput;
function fillInput(tid, text, inputTag) {
    var elementToFill = typeof tid === "string" ? getByTid(tid) : tid;
    if (inputTag) {
        elementToFill.element(protractor_1.by.tagName(inputTag)).sendKeys(text);
    }
    else
        elementToFill.sendKeys(text);
}
exports.fillInput = fillInput;
function expectInput(el, text, inputTag) {
    var testedElement = typeof el === "string" ? getByTid(el) : el;
    if (inputTag) {
        expect(testedElement.element(protractor_1.by.tagName(inputTag)).getAttribute("value")).toEqual(text);
    }
    else
        expect(testedElement.getAttribute("value")).toEqual(text);
}
exports.expectInput = expectInput;
function waitForElementPresent(element) {
    var elementToWait = typeof element == "string" ? getByTid(element) : element;
    protractor_1.browser.wait(until.presenceOf(elementToWait), 1000, 'Element taking too long to appear in the DOM');
}
exports.waitForElementPresent = waitForElementPresent;
function waitForElementClickable(element) {
    var elementToWait = typeof element == "string" ? getByTid(element) : element;
    protractor_1.browser.wait(until.elementToBeClickable(elementToWait), 1000, 'Element taking too long to appear in the DOM');
}
exports.waitForElementClickable = waitForElementClickable;
function waitForElementDisplayed(element) {
    var elementToWait = typeof element == "string" ? getByTid(element) : element;
    protractor_1.browser.wait(until.visibilityOf(elementToWait), 1000, 'Element taking too long to appear in the DOM');
}
exports.waitForElementDisplayed = waitForElementDisplayed;
function expectCurrentStateEqual(url) {
    expect(protractor_1.browser.getCurrentUrl()).toMatch(url + "$");
}
exports.expectCurrentStateEqual = expectCurrentStateEqual;
function waitForAppReady() {
    protractor_1.browser.wait(until.browser.driver.executeScript("return document.readyState"), 1000);
    //until.browser.driver.executeScript("return document.readyState");
    //browser.driver.executeScript(`window.__configureBackend(${JSON.stringify(config)});`);
}
exports.waitForAppReady = waitForAppReady;
function ensureState(state) {
    protractor_1.browser.getCurrentUrl().then(function (currentUrl) {
        if (!currentUrl.match(state + "$")) {
            protractor_1.browser.wait(stateChanged(state), 1000).then(function () {
                if (!stateChanged(state)) {
                    protractor_1.browser.get(state);
                }
            });
        }
    });
}
exports.ensureState = ensureState;
function urlChanged(url) {
    return function () {
        return protractor_1.browser.getCurrentUrl().then(function (actualUrl) {
            return url != actualUrl;
        });
    };
}
exports.urlChanged = urlChanged;
function stateChanged(url) {
    return function () {
        return protractor_1.browser.getCurrentUrl().then(function (actualUrl) {
            return actualUrl.match(url + "$");
        });
    };
}
exports.stateChanged = stateChanged;
function highlightElement(el) {
    return protractor_1.browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);", el.getWebElement(), "background-color: red; color: red; border: 1px solid red;").then(function (resp) {
        return el;
    }, function (err) {
        console.log("error is :" + err);
    });
}
exports.highlightElement = highlightElement;
function hideElement(el) {
    return protractor_1.browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);", el.getWebElement(), "display: none;").then(function (resp) {
        return el;
    }, function (err) {
        console.log("error is :" + err);
    });
}
exports.hideElement = hideElement;
function gotoProfile(login) {
    return protractor_1.browser.get("/profile/" + login);
}
exports.gotoProfile = gotoProfile;
function expectChecked(el, index, value) {
    if (value === void 0) { value = true; }
    expect(isChecked(el, index)).toBe(value);
}
exports.expectChecked = expectChecked;
function isChecked(el, index) {
    if (typeof el === "string") {
        return getAllByTid(el).get(index || 0).element(protractor_1.by.tagName("input")).isSelected();
    }
    else {
        return el.get(index || 0).element(protractor_1.by.tagName("input")).isSelected();
    }
}
exports.isChecked = isChecked;
function setChecked(el, index, inputTag) {
    if (inputTag === void 0) { inputTag = "label"; }
    var elementToCheck;
    if (typeof el === "string") {
        elementToCheck = getAllByTid(el).get(index || 0);
    }
    else {
        elementToCheck = el.get(index || 0);
    }
    if (elementToCheck.getTagName() == inputTag) {
        click(elementToCheck);
    }
    else {
        //find input inside
        click(elementToCheck.element(protractor_1.by.tagName(inputTag)));
    }
}
exports.setChecked = setChecked;
function setOptionSelected(el, index) {
    var selectControl;
    if (typeof el === "string") {
        selectControl = getByTid(el);
    }
    else {
        selectControl = el;
    }
    //open select
    click(selectControl);
    //click option
    var options = selectControl.all(protractor_1.by.tagName("option"));
    highlightElement(options.get(index || 0));
    click(options.get(index || 0));
}
exports.setOptionSelected = setOptionSelected;
function stop() {
    protractor_1.browser.driver.wait(function () {
        return false;
    }, 999999);
}
exports.stop = stop;
function waitClickable(el) {
    protractor_1.browser.wait(until.elementToBeClickable(el), 500);
}
exports.waitClickable = waitClickable;
function scrollToElement(tid, alignToTop) {
    var elementToScroll = typeof tid === "string" ? getByTid(tid) : tid;
    protractor_1.browser.driver.executeScript("arguments[0].scrollIntoView(arguments[1]);", elementToScroll.getWebElement(), alignToTop);
    sleep(50);
}
exports.scrollToElement = scrollToElement;
function hasClass(tid, cls) {
    var el = typeof tid === "string" ? getByTid(tid) : tid;
    return el.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
}
exports.hasClass = hasClass;
function killBootloader() {
    protractor_1.browser.driver.executeScript("window.__hideBootloader();");
}
exports.killBootloader = killBootloader;
/*
 ElementFinder.prototype.getByTid = function(tid: string) {
 return this.element(by.css(`[tid=${tid}]`));
 };
 */
