/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utility; });
var Utility = (function () {
    function Utility() {
    }
    Utility.wrapResultText = function (source, query) {
        var nodes = [];
        var startpos;
        var zregex = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
        if (query.length) {
            startpos = source.search(zregex);
            if (startpos < 0) {
                nodes.push(document.createTextNode(source));
            }
            else {
                nodes.push(document.createTextNode(source.substr(0, startpos)));
                var em = document.createElement('em');
                em.appendChild(document.createTextNode(source.substr(0, startpos + query.length).substr(startpos)));
                nodes.push(em);
                nodes.push(document.createTextNode(source.substr(startpos + query.length)));
            }
        }
        else {
            nodes.push(document.createTextNode(source));
        }
        return nodes;
    };
    Utility.filterItems = function (items, query, options) {
        query = Utility.ltrim(query); //trim input query
        var regex = new RegExp('^' + query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
        var ref = items.slice(0);
        var foundItems = [];
        for (var i = 0; i < ref.length; i++) {
            var item = ref[i];
            var itemName = item.title;
            if (options.searchInValues) {
                itemName += ' ' + item.id.replace(/^\w+\\/g, '');
            }
            if (regex.test(item.title)) {
                foundItems.push(item);
            }
            else if (itemName.indexOf(' ') >= 0 || itemName.indexOf('[') === 0 || itemName.indexOf('\\') >= 0) {
                var parts = itemName.replace(/[\[]/g, '').replace(/\\/g, ' ').split(' ');
                if (parts.length) {
                    for (var j = 0; j < parts.length; j++) {
                        var part = parts[j];
                        if (regex.test(part)) {
                            foundItems.push(item);
                            break;
                        }
                    }
                }
            }
        }
        return foundItems;
    };
    Utility.parseHtml = function (html) {
        var root = document.createElement("div");
        root.innerHTML = html;
        return root.firstChild;
    };
    Utility.hasClass = function (elem, clsName) {
        if (elem.classList) {
            return elem.classList.contains(clsName);
        }
        //IE fallback:
        return elem.className.match(new RegExp('(\\s|^)' + clsName + '(\\s|$)')) != null;
    };
    Utility.getAttribute = function (element, attrName) {
        var attr = element.attributes[attrName];
        if (!attr)
            return undefined;
        return attr.value;
    };
    Utility.htmlEncode = function (value) {
        var div = document.createElement('div');
        var text = document.createTextNode(value);
        div.appendChild(text);
        return div.innerHTML;
    };
    Utility.addClass = function (elem, clsName) {
        if (elem.classList) {
            elem.classList.add(clsName);
            return;
        }
        if (!Utility.hasClass(elem, clsName))
            elem.className += " " + clsName;
    };
    Utility.removeClass = function (elem, clsName) {
        if (Utility.hasClass(elem, clsName)) {
            if (elem.classList) {
                elem.classList.remove(clsName);
                return;
            }
            var reg = new RegExp('(\\s|^)' + clsName + '(\\s|$)');
            elem.className = elem.className.replace(reg, ' ');
        }
    };
    Utility.getCssPropertyValue = function (elem, propname) {
        var computedStyle;
        if (window.getComputedStyle) {
            computedStyle = window.getComputedStyle(elem, null);
        }
        else {
            computedStyle = elem.currentStyle;
        }
        return computedStyle.getPropertyValue(propname);
    };
    Utility.isArray = function (obj) {
        return Array.isArray(obj);
    };
    Utility.isString = function (obj) {
        return typeof (obj) === 'string';
    };
    Utility.trim = function (source) {
        if (!String.prototype.trim) {
            return source.replace(/^\s+|\s+$/g, '');
        }
        return source.trim();
    };
    Utility.ltrim = function (source) {
        return source.replace(/^\s+/, '');
    };
    Utility.insertAfter = function (elem, refElem) {
        var parent = refElem.parentNode;
        var next = refElem.nextSibling;
        if (next) {
            return parent.insertBefore(elem, next);
        }
        else {
            return parent.appendChild(elem);
        }
    };
    return Utility;
}());



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventObject; });
var EventObject = (function () {
    function EventObject() {
        this.events = {};
    }
    EventObject.prototype.$notifyEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                this.events[eventName][i].apply(this, args);
            }
        }
    };
    EventObject.prototype.on = function (eventName, cb) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(cb);
    };
    return EventObject;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultSearchPickerOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pickeritems_DefaultPickerItem__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__searchers_DefaultSearcher__ = __webpack_require__(7);



var DefaultSearchPickerOptions = (function () {
    function DefaultSearchPickerOptions() {
        this.source = [];
        this.placeholder = '';
        this.maxSelectedChoices = 0;
        this.minLengthToSearch = 1;
        this.searchInValues = false;
        //Представление элемента
        this.pickerItemFactory = function (item) {
            return __WEBPACK_IMPORTED_MODULE_0__pickeritems_DefaultPickerItem__["a" /* DefaultPickerItem */].create(item.id, item.title);
        };
        this.resultRenderer = function (item, query) {
            var root = document.createElement('a');
            root.setAttribute('href', '#');
            var textNodes = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].wrapResultText(item.title, query);
            for (var i = 0; i < textNodes.length; i++) {
                root.appendChild(textNodes[i]);
            }
            return root;
        };
        this.noResultsRenderer = function (query) {
            return document.createTextNode('No results found for "' + __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].htmlEncode(query) + '"');
        };
        this.choiceRenderer = function (item, renderClose) {
            var choice = document.createElement('span');
            choice.appendChild(document.createTextNode(item.title));
            if (renderClose) {
                var close_1 = document.createElement('a');
                close_1.href = 'javascript: void(0);';
                close_1.className = 'search-choice-close';
                choice.appendChild(close_1);
            }
            return choice;
        };
        this.searcher = new __WEBPACK_IMPORTED_MODULE_2__searchers_DefaultSearcher__["a" /* DefaultSearcher */]();
        this.resultFooterRenderer = null;
    }
    return DefaultSearchPickerOptions;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPickerChoices; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventObject__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SearchPickerChoices = (function (_super) {
    __extends(SearchPickerChoices, _super);
    function SearchPickerChoices(container, options) {
        var _this = _super.call(this) || this;
        _this.container = container;
        _this.options = options;
        _this.selected = [];
        _this.keepActive = false;
        _this.isActive = false;
        _this.pendingBackstroke = [];
        _this.sizerElm = document.getElementById('__srchpicker-sizer');
        if (_this.sizerElm) {
            _this.sizerElmText = _this.sizerElm.childNodes[0];
        }
        _this.setup();
        return _this;
    }
    SearchPickerChoices.prototype.addChoice = function (item) {
        var id = this.selected.push(item) - 1;
        //insert new choice item into DOM
        this.container.insertBefore(this.$renderChoice(item, id), this.inputJsElmWrap);
        this.setSearchText('');
        this.scaleSearchField();
    };
    SearchPickerChoices.prototype.removeChoice = function (item) {
        for (var i = 0; i < this.selected.length; i++) {
            if (this.selected[i].id === item.id) {
                this.selected.splice(i, 1);
                this.removeChoiceElement(item.id.toString());
                this.scaleSearchField();
                this.$notifyEvent('choiceRemoved', item);
                return;
            }
        }
    };
    SearchPickerChoices.prototype.removeAll = function () {
        var length = this.selected.length;
        for (var i = 0; i < length; i++) {
            this.removeChoice(this.selected[0]);
        }
    };
    SearchPickerChoices.prototype.getSearchText = function () {
        return this.inputElm.value;
    };
    SearchPickerChoices.prototype.setSearchText = function (val) {
        this.inputElm.value = val;
    };
    SearchPickerChoices.prototype.focus = function () {
        if (!this.canSelectMoreChoices())
            return;
        this.onFocus();
        this.inputElm.focus();
    };
    SearchPickerChoices.prototype.getHeight = function () {
        return this.container.offsetHeight;
    };
    SearchPickerChoices.prototype.canSelectMoreChoices = function () {
        if (this.options.maxSelectedChoices <= 0)
            return true;
        return this.selected.length < this.options.maxSelectedChoices;
    };
    SearchPickerChoices.prototype.setAutocompleteText = function (text) {
        if (!this.shouldUpdateAutoComplete) {
            return;
        }
        if (text && this.inputElm.value.length) {
            this.removeAutocompleteText();
            var selStart = this.inputElm.value.length, inputValue = this.escapeRegexp(this.inputElm.value);
            if (text.toUpperCase().search(inputValue.toUpperCase()) === 0) {
                this.inputElm.value = text;
            }
            else {
                this.inputElm.value += " (" + text + ")";
            }
            var selEnd = this.inputElm.value.length;
            this.inputElm.setSelectionRange(selStart, selEnd);
        }
        this.scaleSearchField();
    };
    SearchPickerChoices.prototype.removeAutocompleteText = function () {
        if (this.inputElm.selectionStart) {
            this.inputElm.value = this.inputElm.value.substring(0, this.inputElm.selectionStart);
        }
    };
    SearchPickerChoices.prototype.escapeRegexp = function (text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
    SearchPickerChoices.prototype.setup = function () {
        this.applyTemplate();
        this.bindEvents();
        this.scaleSearchField();
    };
    SearchPickerChoices.prototype.scaleSearchField = function () {
        if (!this.canSelectMoreChoices()) {
            this.inputElm.style.display = 'none';
            this.keepActive = false;
            this.onBlur();
            return;
        }
        var placeholderText = this.selected.length > 0 ? '' : this.options.placeholder;
        this.inputElm.placeholder = placeholderText;
        this.ensureSizerElement();
        this.sizerElmText.nodeValue = this.inputElm.value || placeholderText;
        var w = this.sizerElm.offsetWidth + 20;
        this.inputElm.style.width = w + 'px';
        if (this.inputElm.style.display !== 'block')
            this.inputElm.style.display = 'block';
    };
    SearchPickerChoices.prototype.ensureSizerElement = function () {
        if (!this.sizerElm) {
            var div = document.createElement('div');
            var styleBlock = "position:absolute; left: -1000px; top: -1000px;";
            var styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
            for (var i = 0; i < styles.length; i++) {
                var style = styles[i];
                styleBlock += style + ":" + __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].getCssPropertyValue(this.inputElm, style) + ";";
            }
            div.id = '__srchpicker-sizer';
            div.style.cssText = styleBlock;
            this.sizerElmText = document.createTextNode('');
            div.appendChild(this.sizerElmText);
            document.body.appendChild(div);
            this.sizerElm = div;
        }
    };
    SearchPickerChoices.prototype.bindEvents = function () {
        var _this = this;
        this.container.onclick = function () {
            _this.onClick();
        };
        this.inputElm.onblur = function () {
            _this.onBlur();
        };
        this.inputElm.onfocus = function () {
            _this.onFocus();
        };
        this.inputElm.onkeyup = function (e) {
            _this.onKeyUp(e);
        };
        this.inputElm.oninput = function (e) {
            // IE 11 может выбросить событие input при установке плейсхолдера в элемент
            if (document.activeElement !== e.target) {
                return;
            }
            _this.onInput(e);
        };
        this.inputElm.onkeydown = function (e) {
            _this.onKeyDown(e);
        };
    };
    SearchPickerChoices.prototype.onClick = function () {
        if (!this.canSelectMoreChoices())
            return;
        if (this.options.minLengthToSearch == 0 && this.isActive) {
            this.clearBackstroke();
            this.$notifyEvent('search', this.getSearchText());
        }
    };
    SearchPickerChoices.prototype.onKeyUp = function (evt) {
        switch (evt.keyCode) {
            case 46:
            case 8:
                if (this.backstrokeLength < 1 && this.selected.length > 0) {
                    this.keydownBackstroke();
                }
                else if (!this.pendingBackstroke.length && this.canSelectMoreChoices()) {
                    this.clearHilightedChoice();
                    //this.$notifyEvent('search', this.getSearchText());
                }
                this.scaleSearchField();
                break;
            case 13:
                if (this.inputElm.value) {
                    evt.preventDefault();
                }
                this.$notifyEvent('enter', evt);
                break;
            case 27:
                this.$notifyEvent('escape', evt);
                break;
            case 9:
            case 38:
            case 40:
            case 16:
            case 17:
            case 224: // mac
            case 91:
            case 92:
            default:
                break;
        }
    };
    SearchPickerChoices.prototype.onInput = function (evt) {
        this.shouldUpdateAutoComplete = this.prevInputTextLength <= this.inputElm.value.length;
        this.prevInputTextLength = this.inputElm.value.length;
        if (this.canSelectMoreChoices()) {
            this.clearBackstroke();
            this.scaleSearchField();
            this.$notifyEvent('search', this.getSearchText());
        }
    };
    SearchPickerChoices.prototype.onKeyDown = function (evt) {
        switch (evt.keyCode) {
            case 46:
            case 8://backspace & del
                this.backstrokeLength = this.inputElm.value.length;
                break;
            case 9:
                this.$notifyEvent('tab', evt);
                break;
            case 13:
            case 16:
            case 17:
                if (this.inputElm.value) {
                    evt.preventDefault();
                }
                break;
            case 38:
                evt.preventDefault();
                this.shouldUpdateAutoComplete = true;
                this.$notifyEvent('arrowUp', evt);
                break;
            case 40:
                evt.preventDefault();
                this.shouldUpdateAutoComplete = true;
                this.$notifyEvent('arrowDown', evt);
                break;
            case 35: // left, right, home, end
            case 36:
            case 37:
            case 39:
                // возможный сброс выделения с текста автодополнения
                if (this.inputElm.selectionStart !== this.inputElm.selectionEnd) {
                    this.onInput(evt);
                }
                break;
            default:
                if (!this.canSelectMoreChoices()) {
                    evt.preventDefault();
                }
                else {
                    this.scaleSearchField();
                    //перебрасываем набор текста в инпут
                    if (document.activeElement !== this.inputElm) {
                        this.inputElm.focus();
                        this.onFocus();
                    }
                }
                break;
        }
    };
    SearchPickerChoices.prototype.onRemoveChoiceClick = function (choice) {
        var id = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].getAttribute(choice, 'data-id');
        var item = this.getSelectedChoiceById(id);
        if (item != null)
            this.removeChoice(item);
    };
    SearchPickerChoices.prototype.clearHilightedChoice = function () {
        if (this.highlightedChoice) {
            __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].removeClass(this.highlightedChoice, 'highlighted');
            this.highlightedChoice = null;
        }
    };
    SearchPickerChoices.prototype.clearBackstroke = function () {
        if (this.pendingBackstroke.length) {
            for (var _i = 0, _a = this.pendingBackstroke; _i < _a.length; _i++) {
                var li = _a[_i];
                __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].removeClass(li, 'search-choice-focus');
            }
            this.pendingBackstroke = [];
        }
    };
    SearchPickerChoices.prototype.keydownBackstroke = function () {
        if (this.pendingBackstroke.length) {
            for (var _i = 0, _a = this.pendingBackstroke; _i < _a.length; _i++) {
                var li = _a[_i];
                var id = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].getAttribute(li, 'data-id');
                var selectedItem = this.getSelectedChoiceById(id);
                if (selectedItem != null) {
                    this.removeChoice(selectedItem);
                    //li.blur();
                }
            }
            this.clearBackstroke();
            //this.$notifyEvent('blur')
            //this.inputElm.focus();
        }
        else {
            var items = this.container.getElementsByTagName("li");
            var lastChoice = null;
            for (var i = 0; i < items.length; i++) {
                if (__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].hasClass(items[i], 'search-choice'))
                    lastChoice = items[i];
            }
            this.pendingBackstroke[0] = lastChoice;
            if (this.pendingBackstroke[0] != null)
                __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].addClass(this.pendingBackstroke[0], "search-choice-focus");
        }
    };
    SearchPickerChoices.prototype.onBlur = function () {
        var _this = this;
        this.inFocus = false;
        if (!this.isActive)
            return;
        setTimeout(function () {
            if (!_this.keepActive) {
                __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].removeClass(_this.container, 'active'); // active in ul root elem
                _this.isActive = false;
                _this.clearBackstroke();
                _this.$notifyEvent('blur');
            }
        }, 10);
    };
    SearchPickerChoices.prototype.onFocus = function () {
        var _this = this;
        this.inFocus = true;
        if (this.isActive)
            return;
        __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].addClass(this.container, 'active'); // active in ul root elem
        this.isActive = true;
        setTimeout(function () {
            if (_this.inFocus && document.activeElement === _this.inputElm)
                _this.$notifyEvent('focus');
        }, 10);
    };
    SearchPickerChoices.prototype.removeChoiceElement = function (id) {
        var choices = this.container.getElementsByTagName('li');
        for (var i = 0; i < choices.length; i++) {
            if (__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].hasClass(choices[i], 'search-choice')
                && __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].getAttribute(choices[i], 'data-id') === id) {
                choices[i].parentElement.removeChild(choices[i]);
                return;
            }
        }
    };
    SearchPickerChoices.prototype.applyTemplate = function () {
        this.inputJsElmWrap = document.createElement('li');
        this.inputJsElmWrap.className = 'search-field';
        this.inputElm = document.createElement('input');
        this.inputElm.type = 'text';
        this.inputElm.placeholder = this.options.placeholder;
        this.inputElm.autocomplete = 'off';
        this.inputJsElmWrap.appendChild(this.inputElm);
        this.container.appendChild(this.inputJsElmWrap);
    };
    SearchPickerChoices.prototype.$renderChoice = function (item, index) {
        var _this = this;
        var choice = document.createElement('li');
        choice.tabIndex = 0; //important to receive keyboard events
        choice.className = 'search-choice';
        choice.setAttribute('data-id', item.id.toString());
        if (this.options.maxSelectedChoices == 1) {
            __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].addClass(choice, "sole-choice");
        }
        choice.onclick = function (e) {
            if (__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].hasClass(e.target, 'search-choice-close')) {
                _this.onRemoveChoiceClick(choice);
                return;
            }
            __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].addClass(choice, "search-choice-focus");
            if (e.metaKey || e.ctrlKey) {
                __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].addClass(choice, "search-choice-focus");
                _this.pendingBackstroke.push(choice);
            }
            else if (e.shiftKey) {
                var newChoices = _this.getChoicesRange(choice, _this.pendingBackstroke[_this.pendingBackstroke.length - 1]);
                for (var _i = 0, newChoices_1 = newChoices; _i < newChoices_1.length; _i++) {
                    var ch = newChoices_1[_i];
                    __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].addClass(ch, "search-choice-focus");
                    _this.pendingBackstroke.push(ch);
                }
            }
            else {
                _this.pendingBackstroke.forEach(function (el) {
                    if (el !== choice) {
                        __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].removeClass(el, "search-choice-focus");
                    }
                });
                _this.pendingBackstroke = [choice];
            }
            //e.preventDefault();
            e.stopPropagation();
            if (_this.inputElm.style.display !== "none") {
                _this.inputElm.focus();
            }
        };
        choice.onkeyup = function (e) {
            _this.onKeyUp(e);
        };
        choice.onkeydown = function (e) {
            _this.onKeyDown(e);
        };
        choice.onblur = function (e) {
            _this.onBlur();
        };
        choice.onfocus = function (e) {
            _this.onFocus();
        };
        choice.appendChild(this.options.choiceRenderer(item, this.options.maxSelectedChoices == 1));
        return choice;
    };
    SearchPickerChoices.prototype.getSelectedChoiceById = function (id) {
        for (var i = 0; i < this.selected.length; i++) {
            if (this.selected[i].id.toString() === id)
                return this.selected[i];
        }
        return null;
    };
    SearchPickerChoices.prototype.getChoicesRange = function (choice1, choice2) {
        var nodesToAdd = [], inInterval = false;
        for (var k = 0, e = this.container.childNodes.item(0); k < this.container.childNodes.length; ++k) {
            if (e === choice1 || e === choice2) {
                nodesToAdd.push(e);
                inInterval = !inInterval;
                if (!inInterval)
                    break;
            }
            else if (inInterval && __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* Utility */].hasClass(e, "search-choice")) {
                nodesToAdd.push(e);
            }
            e = e.nextSibling;
        }
        return nodesToAdd;
    };
    return SearchPickerChoices;
}(__WEBPACK_IMPORTED_MODULE_0__EventObject__["a" /* EventObject */]));



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPickerResults; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventObject__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SearchPickerResults = (function (_super) {
    __extends(SearchPickerResults, _super);
    function SearchPickerResults(sourceElm, options) {
        var _this = _super.call(this) || this;
        _this.sourceElm = sourceElm;
        _this.options = options;
        _this.hideOnEmptyResults = false;
        _this.selectFirstOnDefault = true;
        _this.isShown = false;
        _this.trackSelectedItems = true;
        _this.items = [];
        _this.itemsToHide = [];
        _this.selectedObj = {};
        _this.lastSearchQuery = null;
        _this.processSearchResponses = true;
        _this.setupHtml();
        _this.bindEvents();
        _this.highlightedIndex = _this.getDefaultHighlightedIndex();
        return _this;
    }
    SearchPickerResults.prototype.hide = function () {
        if (!this.isShown)
            return;
        this.dropdownElm.style.display = 'none';
        this.isShown = false;
    };
    SearchPickerResults.prototype.show = function () {
        if (this.isShown)
            return;
        this.dropdownElm.style.display = 'block';
        this.isShown = true;
        this.invalidateActiveResultByIndex();
    };
    SearchPickerResults.prototype.search = function (query) {
        if (this.lastSearchQuery === query) {
            if (this.hideOnEmptyResults && this.items.length === 0)
                this.hide();
            else
                this.show();
            return;
        }
        this.searchInternal(query);
    };
    SearchPickerResults.prototype.repositionResults = function () {
        this.setTop(this.sourceElm.offsetHeight);
    };
    SearchPickerResults.prototype.moveSelectedDown = function () {
        if (!this.isShown)
            return;
        this.highlightedIndex++;
        if (this.highlightedIndex > this.items.length - 1) {
            this.highlightedIndex = this.items.length - 1;
        }
        this.invalidateActiveResultByIndex();
    };
    SearchPickerResults.prototype.moveSelectedUp = function () {
        if (!this.isShown)
            return;
        this.highlightedIndex--;
        if (this.highlightedIndex <= this.getDefaultHighlightedIndex()) {
            this.highlightedIndex = this.getDefaultHighlightedIndex();
        }
        this.invalidateActiveResultByIndex();
    };
    SearchPickerResults.prototype.selectHighlighted = function (selectedVia) {
        if (!this.highlightedEl)
            return;
        var id = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].getAttribute(this.highlightedEl, 'data-id');
        var item = this.getItemById(id);
        if (item != null)
            this.$notifyEvent('resultSelected', item, selectedVia);
        this.setProcessSearchResponses(false);
    };
    SearchPickerResults.prototype.setTop = function (top) {
        if (top <= 0)
            top = 0;
        this.dropdownElm.style.top = top + 'px';
    };
    SearchPickerResults.prototype.addSelectedResult = function (result) {
        if (!this.trackSelectedItems)
            return; //option disabled
        if (!this.selectedObj[result.id]) {
            this.selectedObj[result.id] = true;
            this.invalidateSelectedResults();
            this.clearHighlighted();
        }
    };
    SearchPickerResults.prototype.removeSelectedResult = function (item) {
        if (!this.trackSelectedItems)
            return; //option disabled
        if (!this.isSelected(item.id.toString()))
            return;
        delete this.selectedObj[item.id.toString()];
        this.invalidateSelectedResults();
    };
    SearchPickerResults.prototype.updateOptions = function (options) {
        this.options = options;
    };
    SearchPickerResults.prototype.addToBlacklist = function (items) {
        if (!items) {
            return;
        }
        var toAdd;
        if (!Array.isArray(items)) {
            toAdd = [items];
        }
        else {
            toAdd = items;
        }
        this.itemsToHide = this.itemsToHide.concat(toAdd);
        if (toAdd.length) {
            this.invalidateSelectedResults();
        }
    };
    SearchPickerResults.prototype.removeFromBlacklist = function (items) {
        if (!items) {
            return;
        }
        var toRemove;
        if (!Array.isArray(items)) {
            toRemove = [items];
        }
        else {
            toRemove = items;
        }
        if (toRemove.length) {
            for (var _i = 0, toRemove_1 = toRemove; _i < toRemove_1.length; _i++) {
                var i = toRemove_1[_i];
                for (var b = this.itemsToHide.length - 1; b >= 0; b--) {
                    if (i.id === this.itemsToHide[b].id) {
                        this.itemsToHide.splice(b, 1);
                    }
                }
            }
            this.invalidateSelectedResults();
        }
    };
    SearchPickerResults.prototype.getHighlighted = function () {
        if (this.highlightedEl) {
            var hi = this.getItemById(this.highlightedEl.getAttribute("data-id"));
            if (hi) {
                return hi;
            }
        }
    };
    /* устанавливаем флаг, что не нужно обрабатывать результаты поиска
        (напр.  из-зп того что поле сейчас пустое) */
    SearchPickerResults.prototype.setProcessSearchResponses = function (process) {
        this.processSearchResponses = process;
    };
    SearchPickerResults.prototype.isSelected = function (id) {
        return typeof (this.selectedObj[id]) !== 'undefined';
    };
    SearchPickerResults.prototype.searchInternal = function (query) {
        var _this = this;
        this.lastSearchQuery = query;
        this.setProcessSearchResponses(true);
        return this.options.searcher.search(query, this.options, function (items, data) {
            if (query !== _this.lastSearchQuery || !_this.processSearchResponses) {
                return;
            }
            _this.resultsElm.innerHTML = '';
            _this.items = items;
            var hasResults = false;
            if (items.length) {
                for (var i = 0; i < items.length; i++) {
                    //блеклист
                    if (_this.itemsToHide.indexOf(items[i]) > -1 || _this.isSelected(items[i].id)) {
                        continue;
                    }
                    //лимит на показываемые результаты
                    if (_this.options.resultsLimit && i >= _this.options.resultsLimit) {
                        break;
                    }
                    var result = _this.$buildResult(items[i], query);
                    if (result != null) {
                        _this.resultsElm.appendChild(result);
                        hasResults = true;
                    }
                }
            }
            _this.clearHighlighted();
            if (!hasResults) {
                if (_this.hideOnEmptyResults) {
                    _this.hide();
                    return;
                }
                else {
                    _this.resultsElm.appendChild(_this.$buildNoResults(query));
                }
            }
            if (_this.options.resultFooterRenderer) {
                var footer = _this.$buildResultsFooter(query, items, data);
                if (footer != null) {
                    _this.resultsElm.appendChild(footer);
                }
            }
            _this.show();
        }, function (message) {
            _this.resultsElm.appendChild(_this.$buildErrorResult(message));
        });
    };
    SearchPickerResults.prototype.setupHtml = function () {
        this.dropdownElm = document.createElement('div');
        this.dropdownElm.className = 'dropdown';
        __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].insertAfter(this.dropdownElm, this.sourceElm);
        this.resultsElm = this.$template();
        this.dropdownElm.style.left = '0';
        this.dropdownElm.style.display = 'none';
        this.dropdownElm.appendChild(this.resultsElm);
    };
    SearchPickerResults.prototype.bindEvents = function () {
        var _this = this;
        this.dropdownElm.onclick = function (e) {
            var result = e.target;
            while (result != null) {
                if (__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].hasClass(result, 'result'))
                    break;
                result = result['parentElement'];
            }
            if (!result || __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].hasClass(result, 'disabled'))
                return false;
            var id = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].getAttribute(result, 'data-id');
            var item = _this.getItemById(id);
            if (item != null)
                _this.$notifyEvent('resultSelected', item, 'click');
            return false;
        };
    };
    SearchPickerResults.prototype.$buildResult = function (item, query, data) {
        var result = document.createElement('li');
        result.className = 'result';
        var idStr = item.id.toString();
        result.setAttribute('data-id', idStr);
        if (this.isSelected(idStr))
            result.className += ' disabled';
        result.appendChild(this.options.resultRenderer(item, query));
        return result;
    };
    SearchPickerResults.prototype.$buildResultsFooter = function (query, results, data) {
        var footer = document.createElement('div');
        footer.className = 'result-footer';
        if (this.options.resultFooterRenderer) {
            var footerContent = this.options.resultFooterRenderer(query, results, data);
            if (footerContent) {
                footer.appendChild(footerContent);
            }
            else {
                return null;
            }
        }
        return footer;
    };
    SearchPickerResults.prototype.clearHighlighted = function () {
        this.highlightedIndex = this.getDefaultHighlightedIndex();
        //this.highlightedEl = null;
        this.invalidateActiveResultByIndex();
    };
    SearchPickerResults.prototype.$buildNoResults = function (query) {
        var noResult = document.createElement('li');
        noResult.className = 'no-results';
        noResult.appendChild(this.options.noResultsRenderer(query));
        return noResult;
    };
    SearchPickerResults.prototype.$buildErrorResult = function (message) {
        var errorResult = document.createElement('li');
        errorResult.className = 'no-results';
        errorResult.appendChild(document.createTextNode(message));
        return errorResult;
    };
    SearchPickerResults.prototype.$template = function () {
        var ul = document.createElement('ul');
        ul.className = 'dropdown-menu';
        return ul;
    };
    SearchPickerResults.prototype.getItemById = function (id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id.toString() === id)
                return this.items[i];
        }
        return null;
    };
    SearchPickerResults.prototype.invalidateSelectedResults = function () {
        var _this = this;
        this.$foreachResult(function (result) {
            var id = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].getAttribute(result, 'data-id');
            if (_this.isSelected(id) || _this.itemsToHide.some(function (item) { return item.id === id; })) {
                __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].removeClass(result, 'highlighted');
                __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].addClass(result, 'disabled');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].removeClass(result, 'disabled');
            }
            return true;
        });
    };
    SearchPickerResults.prototype.invalidateActiveResultByIndex = function () {
        var _this = this;
        var hoverRemoved = false, elemFound = false;
        var index = 0;
        var beforeId = this.highlightedEl ? this.highlightedEl.getAttribute("data-id") : -1;
        this.highlightedEl = null;
        this.$foreachResult(function (result) {
            if (__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].hasClass(result, 'disabled') || __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].hasClass(result, 'no-results'))
                return true; //continue
            if (!elemFound && index === _this.highlightedIndex) {
                _this.highlightedEl = result;
                elemFound = true;
            }
            else if (!hoverRemoved && __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].hasClass(result, 'highlighted')) {
                __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].removeClass(result, 'highlighted');
                hoverRemoved = true;
            }
            if (elemFound && hoverRemoved)
                return false; //break
            index++;
            return true; //continue
        });
        var afterId = this.highlightedEl ? this.highlightedEl.getAttribute("data-id") : -1;
        this.$notifyEvent("highlight", {
            item: afterId ? this.getItemById(afterId) : undefined,
            hasChanged: beforeId !== afterId
        });
        this.repositionResults();
        if (this.highlightedEl) {
            __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].addClass(this.highlightedEl, 'highlighted');
            this.invalidateActiveResultVisible(this.highlightedEl);
        }
    };
    SearchPickerResults.prototype.invalidateActiveResult = function () {
        var _this = this;
        if (!this.highlightedEl)
            return;
        var hoverRemoved = false, itemFound = false;
        var index = 0;
        this.$foreachResult(function (result) {
            if (__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].hasClass(result, 'disabled'))
                return true;
            if (!itemFound && _this.highlightedEl === result) {
                _this.highlightedIndex = index;
                itemFound = true;
            }
            else if (!hoverRemoved && __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].hasClass(result, 'highlighted')) {
                __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].removeClass(result, 'highlighted');
                hoverRemoved = true;
            }
            if (itemFound && hoverRemoved)
                return false; //break;
            index++;
            return true; //continue
        });
        __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].addClass(this.highlightedEl, 'highlighted');
    };
    SearchPickerResults.prototype.$foreachResult = function (cb) {
        var liCollection = this.resultsElm.childNodes;
        for (var i = 0; i < liCollection.length; i++) {
            if (!cb(liCollection[i]))
                break;
        }
    };
    SearchPickerResults.prototype.invalidateActiveResultVisible = function (el) {
        var resultsJsObj = this.resultsElm;
        var maxHeight = parseInt(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].getCssPropertyValue(resultsJsObj, 'maxHeight') || "190px", 10);
        var scrollTop = resultsJsObj.scrollTop;
        var visibleBottom = maxHeight + scrollTop;
        var elTop = el.offsetTop;
        var elBottom = elTop + el.offsetHeight;
        if (elBottom >= visibleBottom) {
            resultsJsObj.scrollTop = scrollTop + (elBottom - visibleBottom);
        }
        else if (el.offsetTop < scrollTop) {
            resultsJsObj.scrollTop = el.offsetTop;
        }
    };
    SearchPickerResults.prototype.getDefaultHighlightedIndex = function () {
        return this.selectFirstOnDefault ? 0 : -1;
    };
    return SearchPickerResults;
}(__WEBPACK_IMPORTED_MODULE_1__EventObject__["a" /* EventObject */]));



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__options_DefaultSearchPickerOptions__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultSearchPickerOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__options_DefaultSearchPickerOptions__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventObject__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "EventObject", function() { return __WEBPACK_IMPORTED_MODULE_1__EventObject__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SearchPicker__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPicker", function() { return __WEBPACK_IMPORTED_MODULE_2__SearchPicker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SearchPickerChoices__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPickerChoices", function() { return __WEBPACK_IMPORTED_MODULE_3__SearchPickerChoices__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SearchPickerResults__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPickerResults", function() { return __WEBPACK_IMPORTED_MODULE_4__SearchPickerResults__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Utils__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Utility", function() { return __WEBPACK_IMPORTED_MODULE_5__Utils__["a"]; });








/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultPickerItem; });
var DefaultPickerItem = (function () {
    function DefaultPickerItem() {
    }
    DefaultPickerItem.create = function (id, title) {
        var item = new DefaultPickerItem();
        item.title = title;
        item.id = id;
        return item;
    };
    return DefaultPickerItem;
}());



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultSearcher; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(0);

var DefaultSearcher = (function () {
    function DefaultSearcher() {
        this.pickerItems = null;
        this.foundItems = [];
    }
    DefaultSearcher.prototype.search = function (query, options, onresults, onerror) {
        var _this = this;
        if (this.tmrId)
            clearTimeout(this.tmrId);
        this.tmrId = setTimeout(function () {
            if (!_this.pickerItems)
                _this.pickerItems = $map(options.source, options);
            _this.foundItems = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* Utility */].filterItems(_this.pickerItems, query, options);
            _this.tmrId = null;
            onresults(_this.foundItems);
        }, 50);
    };
    return DefaultSearcher;
}());

function $map(source, options) {
    var result = [];
    for (var i = 0; i < source.length; i++) {
        result.push(options.pickerItemFactory(source[i]));
    }
    return result;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPicker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventObject__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SearchPickerChoices__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SearchPickerResults__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__options_DefaultSearchPickerOptions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Utils__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var SearchPicker = (function (_super) {
    __extends(SearchPicker, _super);
    function SearchPicker(container, options) {
        var _this = _super.call(this) || this;
        _this.container = container;
        _this.pickerItems = [];
        _this.searchTmrId = null;
        _this.options = _this.extendOptions(new __WEBPACK_IMPORTED_MODULE_3__options_DefaultSearchPickerOptions__["a" /* DefaultSearchPickerOptions */](), options);
        _this.setupHtml();
        _this.bindEvents();
        return _this;
    }
    SearchPicker.prototype.getChoices = function () {
        return this.choices.selected;
    };
    SearchPicker.prototype.clearChoices = function () {
        this.choices.removeAll();
    };
    SearchPicker.prototype.addChoice = function (item) {
        this.choices.addChoice(item);
        this.results.addSelectedResult(item);
    };
    SearchPicker.prototype.removeChoice = function (item) {
        this.choices.removeChoice(item);
        this.results.removeSelectedResult(item);
    };
    SearchPicker.prototype.updateSource = function (source) {
        this.options.source = source;
        this.results.updateOptions(this.options);
    };
    SearchPicker.prototype.focus = function () {
        this.choices.focus();
    };
    SearchPicker.prototype.setupHtml = function () {
        __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* Utility */].addClass(this.container, 'container');
        this.applyTemplate();
        this.choices = new __WEBPACK_IMPORTED_MODULE_1__SearchPickerChoices__["a" /* SearchPickerChoices */](this.choicesElm, this.options);
        this.results = new __WEBPACK_IMPORTED_MODULE_2__SearchPickerResults__["a" /* SearchPickerResults */](this.choicesElm, this.options);
    };
    SearchPicker.prototype.bindEvents = function () {
        var _this = this;
        this.container.onclick = function () { return _this.onClick(); };
        this.container.onmouseleave = function () {
            _this.choices.keepActive = false;
        };
        this.container.onmouseenter = function () {
            _this.choices.keepActive = true;
        };
        this.choices.on('search', function (text) {
            _this.onSearch(text);
        });
        this.choices.on('blur', function () {
            _this.inFocus = false;
            _this.results.hide();
        });
        this.choices.on('focus', function () {
            _this.inFocus = true;
            _this.onSearch(_this.choices.getSearchText());
        });
        this.choices.on('escape', function () {
            _this.onEscape();
        });
        this.choices.on('tab', function (e) {
            _this.onSelect(e, 'tab');
        });
        this.choices.on('enter', function (e) {
            _this.onSelect(e, 'enter');
        });
        this.choices.on('arrowDown', function () { return _this.results.moveSelectedDown(); });
        this.choices.on('arrowUp', function () { return _this.results.moveSelectedUp(); });
        this.choices.on('choiceRemoved', function (item) { return _this.onChoiceRemoved(item); });
        this.results.on('resultSelected', function (result) { return _this.onResultSelected(result); });
        this.results.on('highlight', function (_a) {
            var item = _a.item, changed = _a.changed;
            if (item) {
                _this.choices.setAutocompleteText(item.title);
            }
        });
    };
    SearchPicker.prototype.onSearch = function (text) {
        if (text.length < this.options.minLengthToSearch || !this.choices.canSelectMoreChoices()) {
            this.results.hide();
            //случай, когда приходит устаревший поиск уже при пустом/недостаточно длинном поле
            this.results.setProcessSearchResponses(false);
        }
        else if (this.inFocus) {
            this.results.search(text);
            this.results.setProcessSearchResponses(true);
        }
    };
    SearchPicker.prototype.onChoiceRemoved = function (item) {
        this.results.removeSelectedResult(item);
        this.$notifyEvent('choiceRemoved', item);
        this.results.setTop(this.choices.getHeight());
    };
    SearchPicker.prototype.onClick = function () {
        this.choices.focus();
    };
    SearchPicker.prototype.onEscape = function () {
        this.results.hide();
    };
    SearchPicker.prototype.onSelect = function (e, selectedVia) {
        if (!this.results.isShown)
            return;
        e.preventDefault();
        this.results.selectHighlighted(selectedVia);
    };
    SearchPicker.prototype.onResultSelected = function (result) {
        this.choices.addChoice(result);
        this.results.hide();
        this.results.addSelectedResult(result);
        this.results.setTop(this.choices.getHeight());
        this.$notifyEvent('choiceAdded', result);
    };
    SearchPicker.prototype.applyTemplate = function () {
        this.choicesElm = document.createElement('ul');
        this.choicesElm.setAttribute("tabindex", 0);
        this.choicesElm.className = 'choices form-control';
        if (this.options.maxSelectedChoices === 1) {
            __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* Utility */].addClass(this.choicesElm, "sole-choice");
        }
        this.container.appendChild(this.choicesElm);
    };
    SearchPicker.prototype.extendOptions = function (def, user) {
        var result = {};
        for (var prop in user) {
            result[prop] = user[prop];
        }
        for (var prop in def) {
            if (typeof (user[prop]) == 'undefined')
                result[prop] = def[prop];
        }
        return result;
    };
    return SearchPicker;
}(__WEBPACK_IMPORTED_MODULE_0__EventObject__["a" /* EventObject */]));



/***/ })
/******/ ]);
//# sourceMappingURL=searchpicker.js.map