import {browser} from "protractor";
import {promise} from "selenium-webdriver";

export function openPage(): promise.Promise<void> {
    return browser.get('http://localhost:3000');
}