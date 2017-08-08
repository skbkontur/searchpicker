import {browser, element, by, ElementArrayFinder, ElementFinder, ExpectedConditions} from "protractor";
import {promise as wdpromise} from "selenium-webdriver";

declare const expect: any;
const until = ExpectedConditions;

export function configureBackend(config: any) {
    browser.driver.executeScript(`window.__configureBackend(${JSON.stringify(config)});`);
}

export function navigate(page: string) {
    click(getByTid(`navigate-page-${page}`));
}
export function getByTid(tid: string, scope?: ElementFinder): ElementFinder {
    const selector = by.css(`[tid=${tid}]`);
    return scope ? scope.element(selector) : element(selector);
}
export function getAllByTid(tid: string, scope?: ElementFinder): ElementArrayFinder {
    const selector = by.css(`[tid=${tid}]`);
    return scope ? scope.all(selector) : element.all(selector);
}
export function expectText(tid: string | ElementFinder, text: string, scope?: ElementFinder) {
    let el = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(el.getText()).toEqual(text, `Expect text of element (tid=${tid})`);
}
export function click(tid: string | ElementFinder, scope?: ElementFinder) {
    let elementToClick = typeof tid === "string" ? getByTid(tid, scope) : tid;
    //const el = getByTid(tid, scope);
    waitClickable(elementToClick);
    elementToClick.click();
    sleep(20);
}

export function sleep(timeout: number) {
    browser.sleep(timeout);
}




export function setBrowserWindow(width = 1920, height = 1080) {
    browser.driver.manage().window().setSize(width, height);
}


export function expectDisplayed(tid: string | ElementFinder, scope?: ElementFinder) {
    let elementToExpect: ElementFinder = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(elementToExpect.isDisplayed()).toBeTruthy();
}

export function expectAllDisplayed(tid: string | ElementArrayFinder, scope?: ElementFinder) {
    let elementsToExpect: ElementArrayFinder = typeof tid === "string" ? getAllByTid(tid, scope) : tid,
        displayedElements = elementsToExpect.filter(function (el) {
            return el.isDisplayed();
        });

    expect(displayedElements.count()).toBe(elementsToExpect.count());
}

export function expectCountDisplayed(tid: string | ElementArrayFinder, count: number, scope?: ElementFinder) {
    let elementsToExpect: ElementArrayFinder = typeof tid === "string" ? getAllByTid(tid, scope) : tid,
        displayedElements = elementsToExpect.filter(function (el) {
            return el.isDisplayed();
        });

    expect(displayedElements.count()).toBe(count);
}

export function expectNotDisplayed(tid: string | ElementFinder, scope?: ElementFinder) {
    let elementToExpect: ElementFinder = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(elementToExpect.isDisplayed()).toBeFalsy();
}

export function expectPresent(tid: string | ElementFinder, scope?: ElementFinder) {
    let el = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(el.isPresent()).toBe(true);
}

export function expectNotPresent(tid: string | ElementFinder, scope?: ElementFinder) {
    let el = typeof tid === "string" ? getByTid(tid, scope) : tid;
    expect(el.isPresent()).toBe(false);
}

export function clearInput(tid: string | ElementFinder, inputTag?: string) {
    let elementToClear = typeof tid === "string" ? getByTid(tid) : tid;
    if (inputTag) {
        elementToClear.element(by.tagName(inputTag)).clear();
    } else  elementToClear.clear();
}

export function focusInput(tid: string | ElementFinder, inputTag?: string) {
    let elementToFill = typeof tid === "string" ? getByTid(tid) : tid;
    if (inputTag) {
        click(elementToFill.element(by.tagName(inputTag)));
    } else  click(elementToFill);
}
export function fillInput(tid: string | ElementFinder, text: string, inputTag?: string) {
    let elementToFill = typeof tid === "string" ? getByTid(tid) : tid;
    if (inputTag) {
        elementToFill.element(by.tagName(inputTag)).sendKeys(text);
    } else  elementToFill.sendKeys(text);
}
export function expectInput(el: string | ElementFinder, text: string, inputTag?: string) {
    let testedElement = typeof el === "string" ? getByTid(el) : el;

    if (inputTag) {
        expect(testedElement.element(by.tagName(inputTag)).getAttribute("value")).toEqual(text);
    } else expect(testedElement.getAttribute("value")).toEqual(text);
}

export function waitForElementPresent(element: string | ElementFinder) {
    let elementToWait = typeof element == "string" ? getByTid(element as string) : element;
    browser.wait(until.presenceOf(elementToWait) as any, 1000, 'Element taking too long to appear in the DOM');
}

export function waitForElementClickable(element: string | ElementFinder) {
    let elementToWait = typeof element == "string" ? getByTid(element as string) : element;
    browser.wait(until.elementToBeClickable(elementToWait) as any, 1000, 'Element taking too long to appear in the DOM');
}

export function waitForElementDisplayed(element: string | ElementFinder) {
    let elementToWait = typeof element == "string" ? getByTid(element as string) : element;
    browser.wait(until.visibilityOf(elementToWait) as any, 1000, 'Element taking too long to appear in the DOM');
}

export function expectCurrentStateEqual(url: string) {
    expect(browser.getCurrentUrl()).toMatch(url + "$");
}

export function waitForAppReady() {
    browser.wait(until.browser.driver.executeScript("return document.readyState"), 1000);
    //until.browser.driver.executeScript("return document.readyState");
    //browser.driver.executeScript(`window.__configureBackend(${JSON.stringify(config)});`);
}

export function ensureState(state: string) {
    browser.getCurrentUrl().then((currentUrl) => {
        if (!currentUrl.match(state + "$")) {
            browser.wait(stateChanged(state), 1000).then(() => {
                if (!stateChanged(state)) {
                    browser.get(state);
                }
            });
        }
    });
}

export function urlChanged(url) {
    return function () {
        return browser.getCurrentUrl().then(function (actualUrl) {
            return url != actualUrl;
        });
    };
}

export function stateChanged(url) {
    return function () {
        return browser.getCurrentUrl().then(function (actualUrl) {
            return actualUrl.match(url + "$");
        });
    };
}

export function highlightElement(el: ElementFinder) {
    return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);", el.getWebElement(), "background-color: red; color: red; border: 1px solid red;").then(function (resp) {
        return el;
    }, function (err) {
        console.log("error is :" + err);
    });
}

export function hideElement(el: ElementFinder) {
    return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);", el.getWebElement(), "display: none;").then(function (resp) {
        return el;
    }, function (err) {
        console.log("error is :" + err);
    });
}

export function gotoProfile(login?: string): wdpromise.Promise<any> {
    return browser.get("/profile/" + login);
}


export function expectChecked(el: string | ElementArrayFinder, index?: number, value: boolean = true) {
    expect(isChecked(el, index)).toBe(value);
}
export function isChecked(el: string | ElementArrayFinder, index?: number) {
    if (typeof el === "string") {
        return getAllByTid(el).get(index || 0).element(by.tagName("input")).isSelected();
    } else {
        return el.get(index || 0).element(by.tagName("input")).isSelected();
    }
}
export function setChecked(el: string | ElementArrayFinder, index?: number, inputTag: string = "label") {
    let elementToCheck;
    if (typeof el === "string") {
        elementToCheck = getAllByTid(el).get(index || 0);
    } else {
        elementToCheck = el.get(index || 0);
    }

    if (elementToCheck.getTagName() == inputTag) {
        click(elementToCheck);
    } else {
        //find input inside
        click(elementToCheck.element(by.tagName(inputTag)));
    }
}
export function setOptionSelected(el: string | ElementFinder, index?: number) {
    let selectControl: ElementFinder;
    if (typeof el === "string") {
        selectControl = getByTid(el);
    } else {
        selectControl = el;
    }

    //open select
    click(selectControl);

    //click option
    let options = selectControl.all(by.tagName("option"));
    highlightElement(options.get(index || 0));
    click(options.get(index || 0));
}
export function stop() {
    browser.driver.wait(() => {
        return false;
    }, 999999);
}

export function waitClickable(el: ElementFinder) {
    browser.wait(until.elementToBeClickable(el) as any, 500);
}

export function scrollToElement(tid: string | ElementFinder, alignToTop?: false) {
    let elementToScroll = typeof tid === "string" ? getByTid(tid) : tid;
    browser.driver.executeScript(`arguments[0].scrollIntoView(arguments[1]);`, elementToScroll.getWebElement(), alignToTop);
    sleep(50);
}

export function hasClass(tid: string | ElementFinder, cls: string) {
    let el = typeof tid === "string" ? getByTid(tid) : tid;
    return el.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
}

export function killBootloader() {
    browser.driver.executeScript(`window.__hideBootloader();`);
}

/*
 ElementFinder.prototype.getByTid = function(tid: string) {
 return this.element(by.css(`[tid=${tid}]`));
 };
 */
