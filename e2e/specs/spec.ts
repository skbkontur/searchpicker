import {browser, by, element, protractor} from "protractor";
import {hasClass, sleep} from "../TestHelpers";
import {openPage} from "./TestHelpers";
declare var expect: any;


describe('search picker', () => {


    describe('results', () => {

        beforeAll(() => {
            openPage();
        });

        it('should be displayed on click', () => {
            element(by.css("#searchpicker")).click().then(() => {
                sleep(150);
                expect(element(by.css("#searchpicker .dropdown-menu")).isDisplayed()).toBeTruthy();
            });
        });

        it('should select first result by default', () => {
            expect(hasClass(element.all(by.css("#searchpicker .dropdown-menu li")).get(0), "highlighted")).toBeTruthy();
        });

        it('should move selection down on array down', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.sendKeys(protractor.Key.ARROW_DOWN).then(() => {
                return inputEl.sendKeys(protractor.Key.ARROW_DOWN)
            }).then(() => {
                expect(element(by.css("#searchpicker .dropdown-menu li.highlighted")).getText()).toBe("Imogen Appleby");
            });
        });

        it('should move selection up on array up', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.sendKeys(protractor.Key.ARROW_UP).then(() => {
                expect(element(by.css("#searchpicker .dropdown-menu li.highlighted")).getText()).toBe("Eula Swenson");
            })
        });

        it('should select choice on enter', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.sendKeys(protractor.Key.ENTER).then(() => {
                expect(element(by.css("#searchpicker-result")).getText()).toContain("eswenson1@fda.gov");
            })
        });

        it('should select choice on click', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.click().then(() => {
                sleep(150);
                return element(by.css("#searchpicker li.result[data-id=\"alovekin6@npr.org\"]")).click()
            }).then(() => {
                expect(element(by.css("#searchpicker-result")).getText()).toContain("alovekin6@npr.org");
            })
        });

        it('should select choice on tab', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.click().then(() => {
                sleep(150);
                return inputEl.sendKeys(protractor.Key.ARROW_DOWN)
            }).then(() => {
                return inputEl.sendKeys(protractor.Key.TAB)
            }).then(()=>{
                expect(element(by.css("#searchpicker-result")).getText()).toContain("iappleby2@usgs.gov");
            })
        });

    });

    describe('choices', () => {

        beforeAll(() => {
            let inputEl;
            openPage().then(() => {
                inputEl = element(by.css("#searchpicker li.search-field input"));
                return inputEl.click();
            }).then(() => {
                sleep(100);
                return element(by.css("#searchpicker li.result[data-id=\"dfantonetti0@mashable.com\"]")).click()
            }).then(() => {
                inputEl.click();
                sleep(100);
                return element(by.css("#searchpicker li.result[data-id=\"eclementson4@ucla.edu\"]")).click()
            }).then(() => {
                inputEl.click();
                sleep(100);
                return element(by.css("#searchpicker li.result[data-id=\"eleppington7@pinterest.com\"]")).click()
            })
        });


        it('should select last choice on bksp', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            let selEl = element.all(by.css("#searchpicker ul.choices li.search-choice")).get(-1)

            inputEl.sendKeys(protractor.Key.BACK_SPACE).then(() => {

                expect(element(by.css("#searchpicker ul.choices li.search-choice.search-choice-focus")).isDisplayed()).toBeTruthy();
                expect(hasClass(selEl, "search-choice-focus")).toBeTruthy();

            })
        });

        it('should deselect choices on input focus', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));
            let selEl ;

            inputEl.click().then(() => {
                selEl = element.all(by.css("#searchpicker ul.choices li.search-choice")).get(-1);
                expect(hasClass(selEl, "search-choice-focus")).toBeFalsy();
            });
        });

        it('should select last choice on del', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.sendKeys(protractor.Key.DELETE).then(() => {
                let selEl = element.all(by.css("#searchpicker ul.choices li.search-choice")).get(-1)
                expect(hasClass(selEl, "search-choice-focus")).toBeTruthy();
            })
        });

        it('should delete selected on del', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));
            let choice = element(by.css("#searchpicker ul.choices li.search-choice.search-choice-focus"));
            let cid;

            choice.getAttribute("data-id").then(id => {
                cid = id;
                return inputEl.sendKeys(protractor.Key.DELETE)
            }).then(() => {
                return element(by.css("#searchpicker-result")).getText()
            }).then((text) => {
                expect(text.split(",").indexOf(cid)).toBeLessThan(0);
            })
        });

        it('should select on click', () => {

            let choice = element(by.css("#searchpicker ul.choices li.search-choice[data-id=\"dfantonetti0@mashable.com\"]"));

            choice.click().then(() => {
                expect(hasClass(choice, "search-choice-focus")).toBeTruthy();
            })
        });

        it('should delete selected on bksp', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));
            let choice = element(by.css("#searchpicker ul.choices li.search-choice[data-id=\"dfantonetti0@mashable.com\"]"));

            inputEl.sendKeys(protractor.Key.BACK_SPACE).then(() => {
                return element(by.css("#searchpicker-result")).getText()
            }).then((text) => {
                expect(text.split(",").indexOf("dfantonetti0@mashable.com")).toBeLessThan(0);
            })
        });

    });

    describe('emptiness css class', () => {
        const EMPTY_CLASS = "__empty";

        beforeAll(() => {
            openPage();
        });



        it('should be present on start', () => {
            expect(element(by.css("#searchpicker ul.choices" + "." + EMPTY_CLASS)).isPresent()).toBeTruthy();
        });

        it('should be removed when something is in input', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.sendKeys("test").then(() => {
                expect(element(by.css("#searchpicker ul.choices")).getAttribute('class')).not.toMatch(EMPTY_CLASS);
            })
        });

        it('should be added when input is cleared', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"),protractor.Key.DELETE).then(() => {
                expect(element(by.css("#searchpicker ul.choices")).getAttribute('class')).toMatch(EMPTY_CLASS);
            })
        });

        it('should be removed when something is picked', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));
            inputEl.sendKeys("eul").then(() => {
                browser.sleep(50);
                inputEl.sendKeys(protractor.Key.ENTER).then(()=>{
                    expect(element(by.css("#searchpicker-result")).getText()).toContain("eswenson1@fda.gov");
                    expect(element(by.css("#searchpicker ul.choices")).getAttribute('class')).not.toMatch(EMPTY_CLASS);
                })

            })
        });

        it('should be added when choices are cleared', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.sendKeys(protractor.Key.BACK_SPACE, protractor.Key.BACK_SPACE).then(() => {
                expect(element(by.css("#searchpicker ul.choices")).getAttribute('class')).toMatch(EMPTY_CLASS);
            })
        });
    });

    describe('search', () => {
        beforeAll(() => {
            openPage();
        });

        it('should have no-results view', () => {
            let inputEl = element(by.css("#searchpicker li.search-field input"));

            inputEl.sendKeys("NONEXISTINGTEXTQUERY").then(() => {
                browser.sleep(100);
                expect(element(by.css("#searchpicker .dropdown-menu .no-results")).isDisplayed()).toBeTruthy();
            })
        });
    });

    describe('config', () => {
        beforeAll(() => {
            openPage();
        });

        it('should respect limit results option', () => {
            let inputEl = element(by.css("#searchpicker-top3 li.search-field input"));

            inputEl.sendKeys("A").then(() => {
                browser.sleep(100);
                expect(element.all(by.css("#searchpicker-top3 .dropdown-menu li.result")).count()).toBe(3);
            })
        });

    });

    describe('multiple choices select', () => {
        beforeEach(() => {
            let inputEl;
            openPage().then(() => {
                inputEl = element(by.css("#searchpicker li.search-field input"));
                return inputEl.click();
            }).then(() => {
                sleep(100);
                return element(by.css("#searchpicker li.result[data-id=\"iappleby2@usgs.gov\"]")).click()
            }).then(() => {
                inputEl.click();
                sleep(100);
                return element(by.css("#searchpicker li.result[data-id=\"tcauderlie3@blogs.com\"]")).click()
            }).then(() => {
                inputEl.click();
                sleep(100);
                return element(by.css("#searchpicker li.result[data-id=\"alovekin6@npr.org\"]")).click()
            }).then(()=> {
                inputEl.click();
                sleep(100);
                return element(by.css("#searchpicker li.result[data-id=\"rreubel5@indiatimes.com\"]")).click()
            }).then(()=> {
                inputEl.click();
                sleep(100);
                return element(by.css("#searchpicker li.result[data-id=\"efontin9@disqus.com\"]")).click()
            });
        });

        it('should be supported via Ctrl+Click', () => {
            let choice1 = element(by.css("#searchpicker ul.choices li.search-choice[data-id=\"tcauderlie3@blogs.com\"]")); // 2
            let choice2 = element(by.css("#searchpicker ul.choices li.search-choice[data-id=\"rreubel5@indiatimes.com\"]")); // 4
            let finalChoices = ["tcauderlie3@blogs.com","rreubel5@indiatimes.com"];

            choice1.click().then(()=>{
                browser.actions().mouseMove(choice2).keyDown(protractor.Key.CONTROL).click().keyUp(protractor.Key.CONTROL).perform().then(()=>{
                    let choices = element.all(by.css("#searchpicker ul.choices li.search-choice.search-choice-focus"))

                    expect(choices.count()).toBe(2);

                    choices.each((el)=>{
                        el.getAttribute("data-id").then((attr)=>{
                            expect(finalChoices.indexOf(attr)).toBeGreaterThan(-1);
                        })
                    })
                });
            });
        });

        it('should be supported via Shift+click', () => {
            let choice1 = element(by.css("#searchpicker ul.choices li.search-choice[data-id=\"iappleby2@usgs.gov\"]")); //1
            let choice2 = element(by.css("#searchpicker ul.choices li.search-choice[data-id=\"alovekin6@npr.org\"]")); //3
            let finalChoices = ["iappleby2@usgs.gov","tcauderlie3@blogs.com","alovekin6@npr.org"];

            choice1.click().then(()=>{
                browser.actions().mouseMove(choice2).keyDown(protractor.Key.SHIFT).click().keyUp(protractor.Key.SHIFT).perform().then(()=>{
                    let choices = element.all(by.css("#searchpicker ul.choices li.search-choice.search-choice-focus"));

                    expect(choices.count()).toBe(3);

                    choices.each((el)=>{
                        el.getAttribute("data-id").then((attr)=>{
                            expect(finalChoices.indexOf(attr)).toBeGreaterThan(-1);
                        })
                    })
                });
            });
        });

    });


    describe('selected choices limits', () => {
        beforeAll(() => {
            openPage();
        });

        it('input should not be blocked when below limit', () => {
            let inputEl = element(by.css("#searchpicker-top3 li.search-field input"));
            inputEl.sendKeys("Dap").then(() => {
                sleep(100);
                return element(by.css("#searchpicker-top3 li.result[data-id=\"dfantonetti0@mashable.com\"]")).click()
            }).then(() => {
                inputEl.sendKeys("Ede");
                sleep(100);
                return element(by.css("#searchpicker-top3 li.result[data-id=\"eclementson4@ucla.edu\"]")).click()
            }).then(() => {
                expect(inputEl.isDisplayed()).toBeTruthy();
            });
        });

        it('should block input when limit is reached ', () => {
            let inputEl = element(by.css("#searchpicker-top3 li.search-field input"));
            inputEl.sendKeys("Ezm");
            sleep(100);
            element(by.css("#searchpicker-top3 li.result[data-id=\"eleppington7@pinterest.com\"]")).click().then(()=>{
                expect(inputEl.isDisplayed()).toBeFalsy();
            });

        });

        it('should focus last choice when click on container after limit is reached', () => {
            let container = element(by.css("#searchpicker-top3"));
            let lastChoice = element(by.css("#searchpicker-top3 li.search-choice[data-id=\"eleppington7@pinterest.com\"]"));

            container.click().then(()=>{
                expect(hasClass(lastChoice, "search-choice-focus")).toBeTruthy();
            });
        });

        it('should unblock input when something is removed after limit is reached', () => {
            let inputEl = element(by.css("#searchpicker-top3 li.search-field input"));
            expect(inputEl.isDisplayed()).toBeFalsy();
            let selected = element(by.css("#searchpicker-top3 li.search-choice[data-id=\"eclementson4@ucla.edu\"]"));

            selected.click().then(()=>{
                return selected.sendKeys(protractor.Key.BACK_SPACE);
            }).then(()=>{
                expect(inputEl.isDisplayed()).toBeTruthy();
            });
        });

    });

    describe('results without choices', () => {
        beforeAll(() => {
            openPage();
        });

        it('should provide results dropdown', () => {
            let inputEl = element(by.css("#searchpicker-customfield"));

            inputEl.sendKeys("Bam").then(() => {
                browser.sleep(100);
                expect(element.all(by.css(".search-picker .dropdown-menu li.result")).count()).toBe(2);
            })
        });

        it('should select results from dropdown', () => {
            let inputEl = element(by.css("#searchpicker-customfield"));

            inputEl.sendKeys(protractor.Key.ENTER).then(() => {
                browser.sleep(10);
                expect(element(by.css("#searchpicker-customfield")).getAttribute("value")).toEqual("Bamby Ricciardo\n")
            })
        });

        it('should provide results dropdown after selection', () => {
            let inputEl = element(by.css("#searchpicker-customfield"));

            inputEl.sendKeys("Anto").then(() => {
                browser.sleep(100);
                expect(element.all(by.css(".search-picker .dropdown-menu li.result")).count()).toBe(8);
            })
        });

        it('should select results from dropdown via click', () => {
            let choice = element(by.css(".search-picker  .dropdown-menu li.result[data-id=\"agorhardtha@bigcartel.com\"]"));
            choice.click().then(() => {
                browser.sleep(10);
                expect(element(by.css("#searchpicker-customfield")).getAttribute("value")).toEqual("Bamby Ricciardo\n" +
                    "Antonino Gorhardt\n")
            })
        });


    });


});