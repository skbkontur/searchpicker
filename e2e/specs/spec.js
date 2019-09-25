"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var TestHelpers_1 = require("../TestHelpers");
var TestHelpers_2 = require("./TestHelpers");
describe('search picker', function () {
    describe('results', function () {
        beforeAll(function () {
            TestHelpers_2.openPage();
        });
        it('should be displayed on click', function () {
            protractor_1.element(protractor_1.by.css("#searchpicker")).click().then(function () {
                TestHelpers_1.sleep(150);
                expect(protractor_1.element(protractor_1.by.css("#searchpicker .dropdown-menu")).isDisplayed()).toBeTruthy();
            });
        });
        it('should select first result by default', function () {
            expect(TestHelpers_1.hasClass(protractor_1.element.all(protractor_1.by.css("#searchpicker .dropdown-menu li")).get(0), "highlighted")).toBeTruthy();
        });
        it('should move selection down on array down', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys(protractor_1.protractor.Key.ARROW_DOWN).then(function () {
                return inputEl.sendKeys(protractor_1.protractor.Key.ARROW_DOWN);
            }).then(function () {
                expect(protractor_1.element(protractor_1.by.css("#searchpicker .dropdown-menu li.highlighted")).getText()).toBe("Imogen Appleby");
            });
        });
        it('should move selection up on array up', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys(protractor_1.protractor.Key.ARROW_UP).then(function () {
                expect(protractor_1.element(protractor_1.by.css("#searchpicker .dropdown-menu li.highlighted")).getText()).toBe("Eula Swenson");
            });
        });
        it('should select choice on enter', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys(protractor_1.protractor.Key.ENTER).then(function () {
                expect(protractor_1.element(protractor_1.by.css("#searchpicker-result")).getText()).toContain("eswenson1@fda.gov");
            });
        });
        it('should select choice on click', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.click().then(function () {
                TestHelpers_1.sleep(150);
                return protractor_1.element(protractor_1.by.css("#searchpicker li.result[data-id=\"alovekin6@npr.org\"]")).click();
            }).then(function () {
                expect(protractor_1.element(protractor_1.by.css("#searchpicker-result")).getText()).toContain("alovekin6@npr.org");
            });
        });
        it('should select choice on tab', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.click().then(function () {
                TestHelpers_1.sleep(150);
                return inputEl.sendKeys(protractor_1.protractor.Key.ARROW_DOWN);
            }).then(function () {
                return inputEl.sendKeys(protractor_1.protractor.Key.TAB);
            }).then(function () {
                expect(protractor_1.element(protractor_1.by.css("#searchpicker-result")).getText()).toContain("iappleby2@usgs.gov");
            });
        });
    });
    describe('choices', function () {
        beforeAll(function () {
            var inputEl;
            TestHelpers_2.openPage().then(function () {
                inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
                return inputEl.click();
            }).then(function () {
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker li.result[data-id=\"dfantonetti0@mashable.com\"]")).click();
            }).then(function () {
                inputEl.click();
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker li.result[data-id=\"eclementson4@ucla.edu\"]")).click();
            }).then(function () {
                inputEl.click();
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker li.result[data-id=\"eleppington7@pinterest.com\"]")).click();
            });
        });
        it('should select last choice on bksp', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            var selEl = protractor_1.element.all(protractor_1.by.css("#searchpicker ul.choices li.search-choice")).get(-1);
            inputEl.sendKeys(protractor_1.protractor.Key.BACK_SPACE).then(function () {
                expect(protractor_1.element(protractor_1.by.css("#searchpicker ul.choices li.search-choice.search-choice-focus")).isDisplayed()).toBeTruthy();
                expect(TestHelpers_1.hasClass(selEl, "search-choice-focus")).toBeTruthy();
            });
        });
        it('should deselect choices on input focus', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            var selEl;
            inputEl.click().then(function () {
                selEl = protractor_1.element.all(protractor_1.by.css("#searchpicker ul.choices li.search-choice")).get(-1);
                expect(TestHelpers_1.hasClass(selEl, "search-choice-focus")).toBeFalsy();
            });
        });
        it('should select last choice on del', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys(protractor_1.protractor.Key.DELETE).then(function () {
                var selEl = protractor_1.element.all(protractor_1.by.css("#searchpicker ul.choices li.search-choice")).get(-1);
                expect(TestHelpers_1.hasClass(selEl, "search-choice-focus")).toBeTruthy();
            });
        });
        it('should delete selected on del', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            var choice = protractor_1.element(protractor_1.by.css("#searchpicker ul.choices li.search-choice.search-choice-focus"));
            var cid;
            choice.getAttribute("data-id").then(function (id) {
                cid = id;
                return inputEl.sendKeys(protractor_1.protractor.Key.DELETE);
            }).then(function () {
                return protractor_1.element(protractor_1.by.css("#searchpicker-result")).getText();
            }).then(function (text) {
                expect(text.split(",").indexOf(cid)).toBeLessThan(0);
            });
        });
        it('should select on click', function () {
            var choice = protractor_1.element(protractor_1.by.css("#searchpicker ul.choices li.search-choice[data-id=\"dfantonetti0@mashable.com\"]"));
            choice.click().then(function () {
                expect(TestHelpers_1.hasClass(choice, "search-choice-focus")).toBeTruthy();
            });
        });
        it('should delete selected on bksp', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            var choice = protractor_1.element(protractor_1.by.css("#searchpicker ul.choices li.search-choice[data-id=\"dfantonetti0@mashable.com\"]"));
            inputEl.sendKeys(protractor_1.protractor.Key.BACK_SPACE).then(function () {
                return protractor_1.element(protractor_1.by.css("#searchpicker-result")).getText();
            }).then(function (text) {
                expect(text.split(",").indexOf("dfantonetti0@mashable.com")).toBeLessThan(0);
            });
        });
    });
    describe('emptiness css class', function () {
        var EMPTY_CLASS = "__empty";
        beforeAll(function () {
            TestHelpers_2.openPage();
        });
        it('should be present on start', function () {
            expect(protractor_1.element(protractor_1.by.css("#searchpicker ul.choices" + "." + EMPTY_CLASS)).isPresent()).toBeTruthy();
        });
        it('should be removed when something is in input', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys("test").then(function () {
                expect(protractor_1.element(protractor_1.by.css("#searchpicker ul.choices")).getAttribute('class')).not.toMatch(EMPTY_CLASS);
            });
        });
        it('should be added when input is cleared', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys(protractor_1.protractor.Key.chord(protractor_1.protractor.Key.CONTROL, "a"), protractor_1.protractor.Key.DELETE).then(function () {
                expect(protractor_1.element(protractor_1.by.css("#searchpicker ul.choices")).getAttribute('class')).toMatch(EMPTY_CLASS);
            });
        });
        it('should be removed when something is picked', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys("eul").then(function () {
                protractor_1.browser.sleep(50);
                inputEl.sendKeys(protractor_1.protractor.Key.ENTER).then(function () {
                    expect(protractor_1.element(protractor_1.by.css("#searchpicker-result")).getText()).toContain("eswenson1@fda.gov");
                    expect(protractor_1.element(protractor_1.by.css("#searchpicker ul.choices")).getAttribute('class')).not.toMatch(EMPTY_CLASS);
                });
            });
        });
        it('should be added when choices are cleared', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys(protractor_1.protractor.Key.BACK_SPACE, protractor_1.protractor.Key.BACK_SPACE).then(function () {
                expect(protractor_1.element(protractor_1.by.css("#searchpicker ul.choices")).getAttribute('class')).toMatch(EMPTY_CLASS);
            });
        });
    });
    describe('search', function () {
        beforeAll(function () {
            TestHelpers_2.openPage();
        });
        it('should have no-results view', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys("NONEXISTINGTEXTQUERY").then(function () {
                protractor_1.browser.sleep(100);
                expect(protractor_1.element(protractor_1.by.css("#searchpicker .dropdown-menu .no-results")).isDisplayed()).toBeTruthy();
            });
        });
    });
    describe('config', function () {
        beforeAll(function () {
            TestHelpers_2.openPage();
        });
        it('should respect limit results option', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker-top3 li.search-field input"));
            inputEl.sendKeys("A").then(function () {
                protractor_1.browser.sleep(100);
                expect(protractor_1.element.all(protractor_1.by.css("#searchpicker-top3 .dropdown-menu li.result")).count()).toBe(3);
            });
        });
    });
    describe('multiple choices select', function () {
        beforeEach(function () {
            var inputEl;
            TestHelpers_2.openPage().then(function () {
                inputEl = protractor_1.element(protractor_1.by.css("#searchpicker li.search-field input"));
                return inputEl.click();
            }).then(function () {
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker li.result[data-id=\"iappleby2@usgs.gov\"]")).click();
            }).then(function () {
                inputEl.click();
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker li.result[data-id=\"tcauderlie3@blogs.com\"]")).click();
            }).then(function () {
                inputEl.click();
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker li.result[data-id=\"alovekin6@npr.org\"]")).click();
            }).then(function () {
                inputEl.click();
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker li.result[data-id=\"rreubel5@indiatimes.com\"]")).click();
            }).then(function () {
                inputEl.click();
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker li.result[data-id=\"efontin9@disqus.com\"]")).click();
            });
        });
        it('should be supported via Ctrl+Click', function () {
            var choice1 = protractor_1.element(protractor_1.by.css("#searchpicker ul.choices li.search-choice[data-id=\"tcauderlie3@blogs.com\"]")); // 2
            var choice2 = protractor_1.element(protractor_1.by.css("#searchpicker ul.choices li.search-choice[data-id=\"rreubel5@indiatimes.com\"]")); // 4
            var finalChoices = ["tcauderlie3@blogs.com", "rreubel5@indiatimes.com"];
            choice1.click().then(function () {
                protractor_1.browser.actions().mouseMove(choice2).keyDown(protractor_1.protractor.Key.CONTROL).click().keyUp(protractor_1.protractor.Key.CONTROL).perform().then(function () {
                    var choices = protractor_1.element.all(protractor_1.by.css("#searchpicker ul.choices li.search-choice.search-choice-focus"));
                    expect(choices.count()).toBe(2);
                    choices.each(function (el) {
                        el.getAttribute("data-id").then(function (attr) {
                            expect(finalChoices.indexOf(attr)).toBeGreaterThan(-1);
                        });
                    });
                });
            });
        });
        it('should be supported via Shift+click', function () {
            var choice1 = protractor_1.element(protractor_1.by.css("#searchpicker ul.choices li.search-choice[data-id=\"iappleby2@usgs.gov\"]")); //1
            var choice2 = protractor_1.element(protractor_1.by.css("#searchpicker ul.choices li.search-choice[data-id=\"alovekin6@npr.org\"]")); //3
            var finalChoices = ["iappleby2@usgs.gov", "tcauderlie3@blogs.com", "alovekin6@npr.org"];
            choice1.click().then(function () {
                protractor_1.browser.actions().mouseMove(choice2).keyDown(protractor_1.protractor.Key.SHIFT).click().keyUp(protractor_1.protractor.Key.SHIFT).perform().then(function () {
                    var choices = protractor_1.element.all(protractor_1.by.css("#searchpicker ul.choices li.search-choice.search-choice-focus"));
                    expect(choices.count()).toBe(3);
                    choices.each(function (el) {
                        el.getAttribute("data-id").then(function (attr) {
                            expect(finalChoices.indexOf(attr)).toBeGreaterThan(-1);
                        });
                    });
                });
            });
        });
    });
    describe('selected choices limits', function () {
        beforeAll(function () {
            TestHelpers_2.openPage();
        });
        it('input should not be blocked when below limit', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker-top3 li.search-field input"));
            inputEl.sendKeys("Dap").then(function () {
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker-top3 li.result[data-id=\"dfantonetti0@mashable.com\"]")).click();
            }).then(function () {
                inputEl.sendKeys("Ede");
                TestHelpers_1.sleep(100);
                return protractor_1.element(protractor_1.by.css("#searchpicker-top3 li.result[data-id=\"eclementson4@ucla.edu\"]")).click();
            }).then(function () {
                expect(inputEl.isDisplayed()).toBeTruthy();
            });
        });
        it('should block input when limit is reached ', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker-top3 li.search-field input"));
            inputEl.sendKeys("Ezm");
            TestHelpers_1.sleep(100);
            protractor_1.element(protractor_1.by.css("#searchpicker-top3 li.result[data-id=\"eleppington7@pinterest.com\"]")).click().then(function () {
                expect(inputEl.isDisplayed()).toBeFalsy();
            });
        });
        it('should focus last choice when click on container after limit is reached', function () {
            var container = protractor_1.element(protractor_1.by.css("#searchpicker-top3"));
            var lastChoice = protractor_1.element(protractor_1.by.css("#searchpicker-top3 li.search-choice[data-id=\"eleppington7@pinterest.com\"]"));
            container.click().then(function () {
                expect(TestHelpers_1.hasClass(lastChoice, "search-choice-focus")).toBeTruthy();
            });
        });
        it('should unblock input when something is removed after limit is reached', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker-top3 li.search-field input"));
            expect(inputEl.isDisplayed()).toBeFalsy();
            var selected = protractor_1.element(protractor_1.by.css("#searchpicker-top3 li.search-choice[data-id=\"eclementson4@ucla.edu\"]"));
            selected.click().then(function () {
                return selected.sendKeys(protractor_1.protractor.Key.BACK_SPACE);
            }).then(function () {
                expect(inputEl.isDisplayed()).toBeTruthy();
            });
        });
    });
    describe('results without choices', function () {
        beforeAll(function () {
            TestHelpers_2.openPage();
        });
        it('should provide results dropdown', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker-customfield"));
            inputEl.sendKeys("Bam").then(function () {
                protractor_1.browser.sleep(100);
                expect(protractor_1.element.all(protractor_1.by.css(".search-picker .dropdown-menu li.result")).count()).toBe(2);
            });
        });
        it('should select results from dropdown', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker-customfield"));
            inputEl.sendKeys(protractor_1.protractor.Key.ENTER).then(function () {
                protractor_1.browser.sleep(10);
                expect(protractor_1.element(protractor_1.by.css("#searchpicker-customfield")).getAttribute("value")).toEqual("Bamby Ricciardo\n");
            });
        });
        it('should provide results dropdown after selection', function () {
            var inputEl = protractor_1.element(protractor_1.by.css("#searchpicker-customfield"));
            inputEl.sendKeys("Anto").then(function () {
                protractor_1.browser.sleep(100);
                expect(protractor_1.element.all(protractor_1.by.css(".search-picker .dropdown-menu li.result")).count()).toBe(8);
            });
        });
        it('should select results from dropdown via click', function () {
            var choice = protractor_1.element(protractor_1.by.css(".search-picker  .dropdown-menu li.result[data-id=\"agorhardtha@bigcartel.com\"]"));
            choice.click().then(function () {
                protractor_1.browser.sleep(10);
                expect(protractor_1.element(protractor_1.by.css("#searchpicker-customfield")).getAttribute("value")).toEqual("Bamby Ricciardo\n" +
                    "Antonino Gorhardt\n");
            });
        });
    });
});
