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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TESTDATA_LONG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TESTDATA; });
var TESTDATA_LONG = [
    {
        "title": "Teacher's room. Sowers of the reasonable, kind, eternal, and other trash",
        "id": "564852"
    },
    {
        "title": "Rehearsal 2 before recording a video for Ulern on \"Software Development Models\"",
        "id": "544221"
    },
    {
        "title": "Master class \"How to effectively interact with lawyers and get a solution to your issue on time\"",
        "id": "112255"
    },
    {
        "title": "Seminar \"Topical issues of electronic document management in Russia\"",
        "id": "845674"
    },
];
var TESTDATA = [{ "id": "dfantonetti0@mashable.com", "title": "Daphene Fantonetti", "color": "#369e42", "dep": "Product Management" },
    { "id": "eswenson1@fda.gov", "title": "Eula Swenson", "color": "#ea0162", "dep": "Support" },
    { "id": "iappleby2@usgs.gov", "title": "Imogen Appleby", "color": "#06814a", "dep": "Sales" },
    { "id": "tcauderlie3@blogs.com", "title": "Tristan Cauderlie", "color": "#12a3fa", "dep": "Accounting" },
    { "id": "eclementson4@ucla.edu", "title": "Ede Clementson", "color": "#fc16ac", "dep": "Research and Development" },
    { "id": "rreubel5@indiatimes.com", "title": "Rossy Reubel", "color": "#dd7423", "dep": "Business Development" },
    { "id": "alovekin6@npr.org", "title": "Alina Lovekin", "color": "#59d6cd", "dep": "Services" },
    { "id": "eleppington7@pinterest.com", "title": "Ezmeralda Leppington", "color": "#9c7cd3", "dep": "Legal" },
    { "id": "vtomankowski8@army.mil", "title": "Vania Tomankowski", "color": "#4e9e0f", "dep": "Marketing" },
    { "id": "efontin9@disqus.com", "title": "Ellyn Fontin", "color": "#cad20b", "dep": "Sales" },
    { "id": "yaylina@shinystat.com", "title": "Yvor Aylin", "color": "#a82d84", "dep": "Accounting" },
    { "id": "ccourtoisb@cpanel.net", "title": "Consalve Courtois", "color": "#e67e2d", "dep": "Research and Development" },
    { "id": "taveriesc@uol.com.br", "title": "Tamas Averies", "color": "#e45ff5", "dep": "Sales" },
    { "id": "ebanishevitzd@ihg.com", "title": "Ephraim Banishevitz", "color": "#7cd37a", "dep": "Sales" },
    { "id": "sgarname@ifeng.com", "title": "Sig Garnam", "color": "#c2d308", "dep": "Research and Development" },
    { "id": "pmincif@craigslist.org", "title": "Pierre Minci", "color": "#c86d8d", "dep": "Engineering" },
    { "id": "aberg@plala.or.jp", "title": "Augustine Ber", "color": "#615567", "dep": "Human Resources" },
    { "id": "aseniourh@chicagotribune.com", "title": "Aggi Seniour", "color": "#60eaf9", "dep": "Services" },
    { "id": "rmarcusseni@umn.edu", "title": "Rosalyn Marcussen", "color": "#9aa6d3", "dep": "Research and Development" },
    { "id": "dlindoresj@ifeng.com", "title": "Dorolice Lindores", "color": "#3f6b38", "dep": "Training" },
    { "id": "mhogsdenk@marriott.com", "title": "Mariellen Hogsden", "color": "#bf467b", "dep": "Engineering" },
    { "id": "rgloucesterl@issuu.com", "title": "Rorke Gloucester", "color": "#253321", "dep": "Engineering" },
    { "id": "nbryerm@domainmarket.com", "title": "Niels Bryer", "color": "#971704", "dep": "Product Management" },
    { "id": "vpoyntzn@bbc.co.uk", "title": "Valdemar Poyntz", "color": "#c3a7b7", "dep": "Accounting" },
    { "id": "wdevineyo@angelfire.com", "title": "Whit Deviney", "color": "#95d555", "dep": "Marketing" },
    { "id": "fritzmanp@mtv.com", "title": "Fairfax Ritzman", "color": "#55b38b", "dep": "Training" },
    { "id": "ctraskq@fc2.com", "title": "Chiquita Trask", "color": "#b85019", "dep": "Services" },
    { "id": "bricciardor@sohu.com", "title": "Bamby Ricciardo", "color": "#e9cb25", "dep": "Engineering" },
    { "id": "asirrells@bravesites.com", "title": "Anton Sirrell", "color": "#983925", "dep": "Accounting" },
    { "id": "wronchkat@netvibes.com", "title": "Winthrop Ronchka", "color": "#8039ef", "dep": "Services" },
    { "id": "egwillymu@ucoz.com", "title": "Eliot Gwillym", "color": "#bfa5e2", "dep": "Research and Development" },
    { "id": "asnoxallv@fc2.com", "title": "Axel Snoxall", "color": "#5a2d19", "dep": "Training" },
    { "id": "porteauxw@cnn.com", "title": "Peder Orteaux", "color": "#939251", "dep": "Training" },
    { "id": "fswinx@facebook.com", "title": "Fulton Swin", "color": "#dabad3", "dep": "Product Management" },
    { "id": "ofomichyovy@soundcloud.com", "title": "Olin Fomichyov", "color": "#f78c7f", "dep": "Services" },
    { "id": "mtantiz@eepurl.com", "title": "Maynord Tanti", "color": "#0f5172", "dep": "Business Development" },
    { "id": "amonroe10@discovery.com", "title": "Andra Monroe", "color": "#59fac8", "dep": "Services" },
    { "id": "lknuckles11@auda.org.au", "title": "Leland Knuckles", "color": "#ef9c92", "dep": "Business Development" },
    { "id": "mcammack12@businesswire.com", "title": "Marjie Cammack", "color": "#0304ee", "dep": "Training" },
    { "id": "gkay13@devhub.com", "title": "Gay Kay", "color": "#88e0cb", "dep": "Research and Development" },
    { "id": "aarcase14@booking.com", "title": "Afton Arcase", "color": "#6834c7", "dep": "Support" },
    { "id": "gwattins15@artisteer.com", "title": "Garvy Wattins", "color": "#82bbb4", "dep": "Sales" },
    { "id": "istrode16@unicef.org", "title": "Ilka Strode", "color": "#ffbb2b", "dep": "Support" },
    { "id": "ppleasants17@dedecms.com", "title": "Perceval Pleasants", "color": "#7b5d93", "dep": "Sales" },
    { "id": "rbrandolini18@ox.ac.uk", "title": "Randi Brandolini", "color": "#28066b", "dep": "Engineering" },
    { "id": "hyoakley19@foxnews.com", "title": "Hartwell Yoakley", "color": "#8c98e4", "dep": "Research and Development" },
    { "id": "ashuker1a@over-blog.com", "title": "Albertine Shuker", "color": "#c1c325", "dep": "Legal" },
    { "id": "cmallatratt1b@adobe.com", "title": "Claudio Mallatratt", "color": "#a0ca73", "dep": "Sales" },
    { "id": "rferreras1c@un.org", "title": "Roobbie Ferreras", "color": "#f7cc59", "dep": "Support" },
    { "id": "njahn1d@oaic.gov.au", "title": "Nicolina Jahn", "color": "#abe93d", "dep": "Engineering" },
    { "id": "kmearing1e@mediafire.com", "title": "Karolina Mearing", "color": "#8216e3", "dep": "Research and Development" },
    { "id": "gjoinson1f@theatlantic.com", "title": "Gayle Joinson", "color": "#b49072", "dep": "Marketing" },
    { "id": "lokeaveny1g@bbb.org", "title": "Llewellyn O'Keaveny", "color": "#8f29d1", "dep": "Business Development" },
    { "id": "cedwardson1h@gizmodo.com", "title": "Carilyn Edwardson", "color": "#9a666d", "dep": "Services" },
    { "id": "cblezard1i@flavors.me", "title": "Carmelina Blezard", "color": "#99da77", "dep": "Engineering" },
    { "id": "lduke1j@bbb.org", "title": "Lyell Duke", "color": "#1fc680", "dep": "Services" },
    { "id": "jride1k@rambler.ru", "title": "Joann Ride", "color": "#b120e9", "dep": "Training" },
    { "id": "mruddell1l@xing.com", "title": "Marvin Ruddell", "color": "#8610c2", "dep": "Legal" },
    { "id": "hlafay1m@nhs.uk", "title": "Haily Lafay", "color": "#237a4e", "dep": "Training" },
    { "id": "kortega1n@ihg.com", "title": "Kania Ortega", "color": "#98af7a", "dep": "Legal" },
    { "id": "ppellamont1o@wufoo.com", "title": "Phedra Pellamont", "color": "#09ba4d", "dep": "Business Development" },
    { "id": "sprantoni1p@webmd.com", "title": "Sullivan Prantoni", "color": "#179d7c", "dep": "Legal" },
    { "id": "vmc1q@dailymotion.com", "title": "Vivyanne Mc Andrew", "color": "#2da3ce", "dep": "Business Development" },
    { "id": "lanfusso1r@wordpress.com", "title": "Lizette Anfusso", "color": "#6f2d96", "dep": "Training" },
    { "id": "aspeight1s@hubpages.com", "title": "Ashlen Speight", "color": "#f3d3c8", "dep": "Accounting" },
    { "id": "osouthcomb1t@epa.gov", "title": "Osbert Southcomb", "color": "#7a214c", "dep": "Services" },
    { "id": "gbriat1u@noaa.gov", "title": "Gibb Briat", "color": "#f34eb2", "dep": "Product Management" },
    { "id": "rbishell1v@alexa.com", "title": "Randie Bishell", "color": "#c70857", "dep": "Marketing" },
    { "id": "wroache1w@twitpic.com", "title": "Whitney Roache", "color": "#ae98a0", "dep": "Legal" },
    { "id": "eenefer1x@sun.com", "title": "Emmey Enefer", "color": "#e910f1", "dep": "Support" },
    { "id": "mlaneham1y@craigslist.org", "title": "Madelle Laneham", "color": "#564214", "dep": "Services" },
    { "id": "lkenney1z@biglobe.ne.jp", "title": "Lin Kenney", "color": "#940e7d", "dep": "Business Development" },
    { "id": "oosichev20@bizjournals.com", "title": "Owen Osichev", "color": "#007169", "dep": "Sales" },
    { "id": "vle21@unblog.fr", "title": "Vanessa Le Cornu", "color": "#daa97a", "dep": "Business Development" },
    { "id": "toakman22@mashable.com", "title": "Terry Oakman", "color": "#ca5b18", "dep": "Product Management" },
    { "id": "apeckitt23@bbb.org", "title": "Amory Peckitt", "color": "#68489f", "dep": "Product Management" },
    { "id": "bcrysell24@google.com.hk", "title": "Britni Crysell", "color": "#eded98", "dep": "Human Resources" },
    { "id": "fwortley25@toplist.cz", "title": "Frederique Wortley", "color": "#b18e6a", "dep": "Business Development" },
    { "id": "caleksich26@hugedomains.com", "title": "Clari Aleksich", "color": "#fca197", "dep": "Human Resources" },
    { "id": "mbreslau27@hatena.ne.jp", "title": "Moria Breslau", "color": "#9fd43d", "dep": "Marketing" },
    { "id": "ymatissoff28@homestead.com", "title": "Yehudit Matissoff", "color": "#ddd327", "dep": "Support" },
    { "id": "sfraney29@paginegialle.it", "title": "Staci Franey", "color": "#2177e4", "dep": "Legal" },
    { "id": "rbilam2a@blogspot.com", "title": "Rivy Bilam", "color": "#3752ed", "dep": "Engineering" },
    { "id": "glewinton2b@bluehost.com", "title": "Garald Lewinton", "color": "#083a77", "dep": "Support" },
    { "id": "nreolfi2c@globo.com", "title": "Ninette Reolfi", "color": "#ea7bf3", "dep": "Human Resources" },
    { "id": "cgoold2d@tumblr.com", "title": "Cynthie Goold", "color": "#221810", "dep": "Product Management" },
    { "id": "gbotham2e@sphinn.com", "title": "Georas Botham", "color": "#af5c26", "dep": "Legal" },
    { "id": "mfarrey2f@hc360.com", "title": "Maison Farrey", "color": "#1ec293", "dep": "Sales" },
    { "id": "bfilippazzo2g@1688.com", "title": "Beale Filippazzo", "color": "#d58e85", "dep": "Sales" },
    { "id": "kballeine2h@apache.org", "title": "Kathe Balleine", "color": "#9c2b4f", "dep": "Human Resources" },
    { "id": "zbromilow2i@timesonline.co.uk", "title": "Zachary Bromilow", "color": "#39fa64", "dep": "Human Resources" },
    { "id": "dastupenas2j@simplemachines.org", "title": "Drake Astupenas", "color": "#8884a2", "dep": "Legal" },
    { "id": "cbestiman2k@unc.edu", "title": "Clem Bestiman", "color": "#c8861e", "dep": "Support" },
    { "id": "hcleaver2l@w3.org", "title": "Heidie Cleaver", "color": "#8ea125", "dep": "Training" },
    { "id": "ecount2m@guardian.co.uk", "title": "Eden Count", "color": "#224b20", "dep": "Engineering" },
    { "id": "ahassett2n@senate.gov", "title": "Alyda Hassett", "color": "#becb02", "dep": "Legal" },
    { "id": "nmatuszyk2o@parallels.com", "title": "Norine Matuszyk", "color": "#132ad3", "dep": "Legal" },
    { "id": "zgisby2p@opera.com", "title": "Zorah Gisby", "color": "#4e08ac", "dep": "Human Resources" },
    { "id": "vtantum2q@java.com", "title": "Violetta Tantum", "color": "#335ba4", "dep": "Business Development" },
    { "id": "hburth2r@geocities.com", "title": "Hilton Burth", "color": "#29b3d6", "dep": "Legal" },
    { "id": "dhutchison2s@cafepress.com", "title": "Dorie Hutchison", "color": "#ef89a8", "dep": "Accounting" },
    { "id": "bhaddacks2t@posterous.com", "title": "Biron Haddacks", "color": "#62e479", "dep": "Support" },
    { "id": "pcapaldo2u@independent.co.uk", "title": "Padriac Capaldo", "color": "#fd5ade", "dep": "Services" },
    { "id": "pbennetto2v@jalbum.net", "title": "Pietrek Bennetto", "color": "#7e0570", "dep": "Support" },
    { "id": "hedgington2w@soup.io", "title": "Hilly Edgington", "color": "#ac26d4", "dep": "Support" },
    { "id": "kpanchin2x@smh.com.au", "title": "Karena Panchin", "color": "#a0d23c", "dep": "Legal" },
    { "id": "cclaworth2y@wordpress.com", "title": "Colas Claworth", "color": "#1a1e4f", "dep": "Sales" },
    { "id": "sfuggle2z@delicious.com", "title": "Sonya Fuggle", "color": "#5a2776", "dep": "Engineering" },
    { "id": "jstucke30@usnews.com", "title": "Jerrie Stucke", "color": "#9cf697", "dep": "Engineering" },
    { "id": "krickeard31@ycombinator.com", "title": "Keelia Rickeard", "color": "#c0c2dd", "dep": "Support" },
    { "id": "amathevet32@answers.com", "title": "Angelika Mathevet", "color": "#f782c4", "dep": "Training" },
    { "id": "rbuscombe33@eventbrite.com", "title": "Randene Buscombe", "color": "#221f84", "dep": "Business Development" },
    { "id": "cstudders34@berkeley.edu", "title": "Chastity Studders", "color": "#c6f189", "dep": "Training" },
    { "id": "kbowen35@rediff.com", "title": "Karyn Bowen", "color": "#9b3227", "dep": "Legal" },
    { "id": "jmacknight36@statcounter.com", "title": "Jere MacKnight", "color": "#f40261", "dep": "Sales" },
    { "id": "awitz37@accuweather.com", "title": "Alford Witz", "color": "#787027", "dep": "Sales" },
    { "id": "abrownfield38@google.nl", "title": "Alyosha Brownfield", "color": "#69cbce", "dep": "Accounting" },
    { "id": "mcroot39@smh.com.au", "title": "Maddalena Croot", "color": "#e69878", "dep": "Accounting" },
    { "id": "tcaldes3a@etsy.com", "title": "Tommi Caldes", "color": "#a4e84c", "dep": "Product Management" },
    { "id": "lmaty3b@gnu.org", "title": "Lorens Maty", "color": "#8d15b0", "dep": "Sales" },
    { "id": "rocooney3c@archive.org", "title": "Reamonn O'Cooney", "color": "#1c8057", "dep": "Product Management" },
    { "id": "eadriano3d@biblegateway.com", "title": "Efren Adriano", "color": "#c1ec42", "dep": "Business Development" },
    { "id": "tdiver3e@dropbox.com", "title": "Torrey Diver", "color": "#e55f1e", "dep": "Product Management" },
    { "id": "wslocumb3f@ameblo.jp", "title": "Webster Slocumb", "color": "#087192", "dep": "Support" },
    { "id": "pmerwede3g@sciencedaily.com", "title": "Pietrek Merwede", "color": "#724d98", "dep": "Business Development" },
    { "id": "pjewsbury3h@ucoz.ru", "title": "Philippe Jewsbury", "color": "#f01bb4", "dep": "Business Development" },
    { "id": "gpohl3i@github.io", "title": "Gary Pohl", "color": "#3026d1", "dep": "Research and Development" },
    { "id": "ypearmain3j@alexa.com", "title": "Yolane Pearmain", "color": "#bc17cd", "dep": "Legal" },
    { "id": "mbortolini3k@tinypic.com", "title": "Mommy Bortolini", "color": "#3bbf70", "dep": "Training" },
    { "id": "smorcombe3l@gnu.org", "title": "Suzanne Morcombe", "color": "#7dc232", "dep": "Research and Development" },
    { "id": "jgiblin3m@reuters.com", "title": "Jillana Giblin", "color": "#ae1e62", "dep": "Marketing" },
    { "id": "gcheetham3n@ehow.com", "title": "Gardiner Cheetham", "color": "#01b404", "dep": "Legal" },
    { "id": "gcoupland3o@comsenz.com", "title": "Gayel Coupland", "color": "#5704f9", "dep": "Engineering" },
    { "id": "cswift3p@sciencedirect.com", "title": "Cortney Swift", "color": "#5d9a1f", "dep": "Services" },
    { "id": "jmalins3q@yolasite.com", "title": "Jasen Malins", "color": "#9d19c5", "dep": "Business Development" },
    { "id": "rdykas3r@t-online.de", "title": "Ros Dykas", "color": "#5b3672", "dep": "Support" },
    { "id": "mwimlett3s@hhs.gov", "title": "Matty Wimlett", "color": "#e314be", "dep": "Human Resources" },
    { "id": "hpersian3t@webnode.com", "title": "Helena Persian", "color": "#6376dc", "dep": "Accounting" },
    { "id": "arayhill3u@sogou.com", "title": "Austen Rayhill", "color": "#27cddc", "dep": "Services" },
    { "id": "gburrass3v@xing.com", "title": "Gordie Burrass", "color": "#03f45b", "dep": "Business Development" },
    { "id": "talker3w@ow.ly", "title": "Tad Alker", "color": "#a26f91", "dep": "Accounting" },
    { "id": "kmegarry3x@princeton.edu", "title": "Kathe Megarry", "color": "#e00daf", "dep": "Support" },
    { "id": "ppether3y@youtu.be", "title": "Patty Pether", "color": "#af1b16", "dep": "Product Management" },
    { "id": "borfeur3z@bigcartel.com", "title": "Betteanne Orfeur", "color": "#966094", "dep": "Research and Development" },
    { "id": "gfruchter40@noaa.gov", "title": "Gare Fruchter", "color": "#2d3102", "dep": "Research and Development" },
    { "id": "mmargaret41@pen.io", "title": "Maura Margaret", "color": "#916ed8", "dep": "Sales" },
    { "id": "sgerdes42@census.gov", "title": "Silvie Gerdes", "color": "#82fdde", "dep": "Marketing" },
    { "id": "espiaggia43@nymag.com", "title": "Ervin Spiaggia", "color": "#eb0f8c", "dep": "Sales" },
    { "id": "btreagus44@zimbio.com", "title": "Bogey Treagus", "color": "#94725d", "dep": "Accounting" },
    { "id": "hholborn45@imdb.com", "title": "Helaine Holborn", "color": "#d0d31e", "dep": "Product Management" },
    { "id": "lpickover46@altervista.org", "title": "Lyn Pickover", "color": "#808178", "dep": "Engineering" },
    { "id": "iadamowicz47@ibm.com", "title": "Isobel Adamowicz", "color": "#c8a2c4", "dep": "Marketing" },
    { "id": "aradcliffe48@usda.gov", "title": "Aldridge Radcliffe", "color": "#1a8d4e", "dep": "Business Development" },
    { "id": "lkunath49@fc2.com", "title": "Laure Kunath", "color": "#16ea03", "dep": "Human Resources" },
    { "id": "pblench4a@loc.gov", "title": "Philippe Blench", "color": "#6e83ee", "dep": "Services" },
    { "id": "wpilbury4b@geocities.com", "title": "Wally Pilbury", "color": "#23bf11", "dep": "Research and Development" },
    { "id": "gcalcutt4c@virginia.edu", "title": "Gavra Calcutt", "color": "#3a7ec0", "dep": "Legal" },
    { "id": "rmanion4d@springer.com", "title": "Rafa Manion", "color": "#98e97a", "dep": "Marketing" },
    { "id": "lcolbertson4e@zimbio.com", "title": "Lalo Colbertson", "color": "#75c2e9", "dep": "Product Management" },
    { "id": "kdupre4f@creativecommons.org", "title": "Keenan Dupre", "color": "#1cce2f", "dep": "Product Management" },
    { "id": "claird4g@prweb.com", "title": "Charity Laird", "color": "#b97c94", "dep": "Training" },
    { "id": "tpankettman4h@google.co.uk", "title": "Troy Pankettman", "color": "#2aea65", "dep": "Sales" },
    { "id": "jstronough4i@printfriendly.com", "title": "Javier Stronough", "color": "#5419e5", "dep": "Support" },
    { "id": "kscadden4j@twitpic.com", "title": "Klarrisa Scadden", "color": "#bf14ad", "dep": "Engineering" },
    { "id": "herbe4k@google.com.au", "title": "Halsey Erbe", "color": "#6c97ce", "dep": "Engineering" },
    { "id": "adellatorre4l@senate.gov", "title": "Alanna Dellatorre", "color": "#b47cb8", "dep": "Research and Development" },
    { "id": "sdodgshon4m@gnu.org", "title": "Sauncho Dodgshon", "color": "#8e0612", "dep": "Marketing" },
    { "id": "jhogben4n@ow.ly", "title": "Jacqueline Hogben", "color": "#de907d", "dep": "Business Development" },
    { "id": "nhanshawe4o@accuweather.com", "title": "Nappie Hanshawe", "color": "#0f2e53", "dep": "Research and Development" },
    { "id": "fscutts4p@taobao.com", "title": "Fawne Scutts", "color": "#c645c0", "dep": "Business Development" },
    { "id": "sfisbburne4q@google.nl", "title": "Shae Fisbburne", "color": "#a20543", "dep": "Marketing" },
    { "id": "tewebank4r@etsy.com", "title": "Torre Ewebank", "color": "#8165e9", "dep": "Product Management" },
    { "id": "dbelfit4s@dell.com", "title": "Deane Belfit", "color": "#5194f6", "dep": "Sales" },
    { "id": "flicas4t@creativecommons.org", "title": "Fidelia Licas", "color": "#2490cc", "dep": "Legal" },
    { "id": "afriett4u@princeton.edu", "title": "Atlante Friett", "color": "#ee4a4f", "dep": "Support" },
    { "id": "cpencott4v@people.com.cn", "title": "Christoffer Pencott", "color": "#30c994", "dep": "Sales" },
    { "id": "awagstaff4w@jimdo.com", "title": "Antonino Wagstaff", "color": "#17c737", "dep": "Research and Development" },
    { "id": "duman4x@moonfruit.com", "title": "Dorotea Uman", "color": "#140ce1", "dep": "Training" },
    { "id": "dcraigs4y@dyndns.org", "title": "Delcine Craigs", "color": "#9fa8ff", "dep": "Engineering" },
    { "id": "ejedrzejewsky4z@cornell.edu", "title": "Emmett Jedrzejewsky", "color": "#850ed3", "dep": "Sales" },
    { "id": "nbeardmore50@wisc.edu", "title": "Nelson Beardmore", "color": "#2ded89", "dep": "Product Management" },
    { "id": "cmccourtie51@illinois.edu", "title": "Carlie McCourtie", "color": "#c2d6c0", "dep": "Services" },
    { "id": "mdary52@wordpress.com", "title": "Merle Dary", "color": "#5e73df", "dep": "Training" },
    { "id": "cohalligan53@technorati.com", "title": "Cedric O'Halligan", "color": "#9f9393", "dep": "Support" },
    { "id": "jgundry54@bigcartel.com", "title": "Jessi Gundry", "color": "#4e8d89", "dep": "Support" },
    { "id": "ospoor55@examiner.com", "title": "Oralee Spoor", "color": "#624a68", "dep": "Marketing" },
    { "id": "gratt56@hao123.com", "title": "Gareth Ratt", "color": "#4158ad", "dep": "Support" },
    { "id": "gbeedell57@hibu.com", "title": "Grace Beedell", "color": "#bb493f", "dep": "Human Resources" },
    { "id": "bduesberry58@eepurl.com", "title": "Barney Duesberry", "color": "#19e9fc", "dep": "Product Management" },
    { "id": "arossey59@example.com", "title": "Aldrich Rossey", "color": "#f55aa3", "dep": "Training" },
    { "id": "fhaney5a@barnesandnoble.com", "title": "Flor Haney", "color": "#07e2e0", "dep": "Engineering" },
    { "id": "dship5b@lycos.com", "title": "Domini Ship", "color": "#c6cf33", "dep": "Human Resources" },
    { "id": "selvish5c@google.fr", "title": "Sarena Elvish", "color": "#54abd3", "dep": "Sales" },
    { "id": "mwhiffen5d@i2i.jp", "title": "Maurits Whiffen", "color": "#5d6c19", "dep": "Engineering" },
    { "id": "bsanders5e@meetup.com", "title": "Brynna Sanders", "color": "#f298a1", "dep": "Legal" },
    { "id": "mwestfrimley5f@blog.com", "title": "Madelin West-Frimley", "color": "#b0b22b", "dep": "Services" },
    { "id": "bkearns5g@samsung.com", "title": "Benny Kearns", "color": "#e2cba2", "dep": "Engineering" },
    { "id": "mmeininking5h@wp.com", "title": "Maxy Meininking", "color": "#4025b3", "dep": "Engineering" },
    { "id": "alittell5i@alibaba.com", "title": "Ardine Littell", "color": "#3f9643", "dep": "Research and Development" },
    { "id": "hbrunotti5j@howstuffworks.com", "title": "Hedi Brunotti", "color": "#e95ae5", "dep": "Product Management" },
    { "id": "gseavers5k@posterous.com", "title": "Gardner Seavers", "color": "#0d0a86", "dep": "Training" },
    { "id": "oorts5l@japanpost.jp", "title": "Orton Orts", "color": "#51800f", "dep": "Legal" },
    { "id": "iwoolward5m@blogtalkradio.com", "title": "Idalina Woolward", "color": "#38f172", "dep": "Accounting" },
    { "id": "lrenals5n@wsj.com", "title": "Lorrin Renals", "color": "#47d4f1", "dep": "Engineering" },
    { "id": "aarnao5o@gov.uk", "title": "Arny Arnao", "color": "#35d089", "dep": "Sales" },
    { "id": "smacleod5p@scribd.com", "title": "Saundra MacLeod", "color": "#081776", "dep": "Human Resources" },
    { "id": "lvashchenko5q@blog.com", "title": "Lark Vashchenko", "color": "#6f1df3", "dep": "Sales" },
    { "id": "dsibylla5r@123-reg.co.uk", "title": "Doralynne Sibylla", "color": "#6db346", "dep": "Research and Development" },
    { "id": "dshillaker5s@domainmarket.com", "title": "Donna Shillaker", "color": "#de2660", "dep": "Services" },
    { "id": "cbruhnke5t@behance.net", "title": "Corie Bruhnke", "color": "#3be253", "dep": "Training" },
    { "id": "acaillou5u@spiegel.de", "title": "Adelind Caillou", "color": "#8a2c38", "dep": "Accounting" },
    { "id": "dcaton5v@squidoo.com", "title": "Darby Caton", "color": "#65fb61", "dep": "Accounting" },
    { "id": "ftibb5w@gravatar.com", "title": "Filide Tibb", "color": "#d1b28f", "dep": "Sales" },
    { "id": "idunsmore5x@home.pl", "title": "Inge Dunsmore", "color": "#daf82a", "dep": "Sales" },
    { "id": "swallett5y@mail.ru", "title": "Sadella Wallett", "color": "#ae6901", "dep": "Business Development" },
    { "id": "wohanley5z@omniture.com", "title": "Wendye O'Hanley", "color": "#a79966", "dep": "Research and Development" },
    { "id": "nmattosoff60@hugedomains.com", "title": "Neville Mattosoff", "color": "#540e4c", "dep": "Marketing" },
    { "id": "eedison61@dailymotion.com", "title": "Eleen Edison", "color": "#9c8467", "dep": "Marketing" },
    { "id": "rl62@nature.com", "title": "Roxine L' Estrange", "color": "#bf782a", "dep": "Research and Development" },
    { "id": "djohncey63@i2i.jp", "title": "Denver Johncey", "color": "#c3eae4", "dep": "Support" },
    { "id": "ddigan64@pcworld.com", "title": "Dorelia Digan", "color": "#252032", "dep": "Marketing" },
    { "id": "mtorvey65@mozilla.com", "title": "Morris Torvey", "color": "#44c898", "dep": "Training" },
    { "id": "ctorn66@addthis.com", "title": "Corty Torn", "color": "#1ac3a6", "dep": "Legal" },
    { "id": "bfoister67@exblog.jp", "title": "Burton Foister", "color": "#42d0ea", "dep": "Marketing" },
    { "id": "smorde68@fc2.com", "title": "Salmon Morde", "color": "#a407d3", "dep": "Marketing" },
    { "id": "mmccowan69@constantcontact.com", "title": "Mattie McCowan", "color": "#d93d0a", "dep": "Accounting" },
    { "id": "yparnaby6a@japanpost.jp", "title": "Yasmin Parnaby", "color": "#8ebb21", "dep": "Human Resources" },
    { "id": "cbracknell6b@squarespace.com", "title": "Chloe Bracknell", "color": "#616721", "dep": "Legal" },
    { "id": "dowbrick6c@youtube.com", "title": "Durand Owbrick", "color": "#f3f2d2", "dep": "Product Management" },
    { "id": "mbunstone6d@google.ca", "title": "Morey Bunstone", "color": "#7abb45", "dep": "Training" },
    { "id": "eheaford6e@ft.com", "title": "Edita Heaford", "color": "#2e3e1a", "dep": "Accounting" },
    { "id": "lolliffe6f@discuz.net", "title": "Lynelle Olliffe", "color": "#1dd966", "dep": "Research and Development" },
    { "id": "aoleszcuk6g@meetup.com", "title": "Agustin Oleszcuk", "color": "#7cfb9c", "dep": "Accounting" },
    { "id": "lsouthworth6h@digg.com", "title": "Laurella Southworth", "color": "#3fa7e8", "dep": "Product Management" },
    { "id": "cacutt6i@mac.com", "title": "Clint Acutt", "color": "#5ecb9d", "dep": "Product Management" },
    { "id": "docorren6j@dmoz.org", "title": "Deanna O'Corren", "color": "#de3cb6", "dep": "Human Resources" },
    { "id": "tsoall6k@csmonitor.com", "title": "Torrance Soall", "color": "#2823c2", "dep": "Research and Development" },
    { "id": "rpoulden6l@clickbank.net", "title": "Raul Poulden", "color": "#08873b", "dep": "Services" },
    { "id": "wshevlane6m@merriam-webster.com", "title": "Wye Shevlane", "color": "#86dea4", "dep": "Services" },
    { "id": "liglesiaz6n@opera.com", "title": "Livy Iglesiaz", "color": "#cec950", "dep": "Accounting" },
    { "id": "nolivia6o@craigslist.org", "title": "Noemi Olivia", "color": "#625df4", "dep": "Product Management" },
    { "id": "jsealeaf6p@harvard.edu", "title": "Joletta Sealeaf", "color": "#4cd981", "dep": "Sales" },
    { "id": "dgroll6q@deliciousdays.com", "title": "Dietrich Groll", "color": "#98e0c6", "dep": "Marketing" },
    { "id": "ybeert6r@alibaba.com", "title": "Yolanthe Beert", "color": "#7e819f", "dep": "Engineering" },
    { "id": "mommundsen6s@digg.com", "title": "Margeaux Ommundsen", "color": "#1a738f", "dep": "Training" },
    { "id": "gdowzell6t@guardian.co.uk", "title": "Gabriel Dowzell", "color": "#e5793c", "dep": "Research and Development" },
    { "id": "mdolohunty6u@pbs.org", "title": "Milo Dolohunty", "color": "#0986ff", "dep": "Accounting" },
    { "id": "gbourbon6v@g.co", "title": "Griselda Bourbon", "color": "#fa9413", "dep": "Engineering" },
    { "id": "henrich6w@cmu.edu", "title": "Hildy Enrich", "color": "#bc9753", "dep": "Human Resources" },
    { "id": "rkelberer6x@intel.com", "title": "Raymund Kelberer", "color": "#243607", "dep": "Sales" },
    { "id": "ilofting6y@behance.net", "title": "Ilene Lofting", "color": "#b29d12", "dep": "Legal" },
    { "id": "bmaxstead6z@sourceforge.net", "title": "Benedicta Maxstead", "color": "#e777d4", "dep": "Product Management" },
    { "id": "ddallyn70@sogou.com", "title": "Dody Dallyn", "color": "#7b3db0", "dep": "Marketing" },
    { "id": "mgidley71@fema.gov", "title": "Merwin Gidley", "color": "#0e7bb1", "dep": "Accounting" },
    { "id": "elagne72@scientificamerican.com", "title": "Ellette Lagne", "color": "#1e5f64", "dep": "Research and Development" },
    { "id": "eashby73@bbc.co.uk", "title": "Edith Ashby", "color": "#2a8005", "dep": "Legal" },
    { "id": "ocollick74@economist.com", "title": "Orlan Collick", "color": "#d0b319", "dep": "Accounting" },
    { "id": "ncrutchley75@nih.gov", "title": "Nelly Crutchley", "color": "#dee0ad", "dep": "Engineering" },
    { "id": "sheadech76@bigcartel.com", "title": "Sheryl Headech", "color": "#1f42ca", "dep": "Services" },
    { "id": "sleathe77@zimbio.com", "title": "Sallyann Leathe", "color": "#fe67ea", "dep": "Product Management" },
    { "id": "adanihelka78@miitbeian.gov.cn", "title": "Amby Danihelka", "color": "#2058bd", "dep": "Support" },
    { "id": "mlowater79@biglobe.ne.jp", "title": "Maurene Lowater", "color": "#f58476", "dep": "Legal" },
    { "id": "fkabsch7a@discovery.com", "title": "Filia Kabsch", "color": "#1e4a64", "dep": "Human Resources" },
    { "id": "rsueter7b@seattletimes.com", "title": "Rance Sueter", "color": "#47cfd7", "dep": "Research and Development" },
    { "id": "kmapam7c@photobucket.com", "title": "Kittie Mapam", "color": "#41a72b", "dep": "Support" },
    { "id": "qmacari7d@moonfruit.com", "title": "Quintus Macari", "color": "#343ece", "dep": "Business Development" },
    { "id": "iromei7e@tiny.cc", "title": "Issi Romei", "color": "#cb6e3e", "dep": "Marketing" },
    { "id": "astearns7f@umn.edu", "title": "Archy Stearns", "color": "#ed359c", "dep": "Business Development" },
    { "id": "rgould7g@nifty.com", "title": "Randal Gould", "color": "#511ec1", "dep": "Marketing" },
    { "id": "cmalkie7h@amazon.com", "title": "Clarine Malkie", "color": "#15f599", "dep": "Human Resources" },
    { "id": "ncantor7i@jiathis.com", "title": "Ninon Cantor", "color": "#601e99", "dep": "Business Development" },
    { "id": "stansill7j@toplist.cz", "title": "Shanta Tansill", "color": "#55e9f5", "dep": "Support" },
    { "id": "mbangs7k@google.fr", "title": "Mick Bangs", "color": "#f4c0c3", "dep": "Research and Development" },
    { "id": "igallone7l@fema.gov", "title": "Ignaz Gallone", "color": "#6993d8", "dep": "Services" },
    { "id": "dblum7m@ca.gov", "title": "Donalt Blum", "color": "#08b23f", "dep": "Business Development" },
    { "id": "mcaveau7n@xing.com", "title": "Miranda Caveau", "color": "#03f6e8", "dep": "Research and Development" },
    { "id": "dknutsen7o@opensource.org", "title": "Dotti Knutsen", "color": "#eb5b2f", "dep": "Sales" },
    { "id": "aswyersexey7p@netscape.com", "title": "Arty Swyer-Sexey", "color": "#3ed48a", "dep": "Accounting" },
    { "id": "jmoston7q@com.com", "title": "Jeth Moston", "color": "#c171d7", "dep": "Support" },
    { "id": "mcosson7r@goo.gl", "title": "Marja Cosson", "color": "#e568ef", "dep": "Training" },
    { "id": "ddunley7s@simplemachines.org", "title": "Dora Dunley", "color": "#3aed00", "dep": "Legal" },
    { "id": "bgavagan7t@jalbum.net", "title": "Brinna Gavagan", "color": "#2d228b", "dep": "Human Resources" },
    { "id": "chaddick7u@epa.gov", "title": "Cornelia Haddick", "color": "#657e07", "dep": "Engineering" },
    { "id": "wplane7v@addthis.com", "title": "Waylen Plane", "color": "#4b1b89", "dep": "Business Development" },
    { "id": "msimony7w@washington.edu", "title": "Modesta Simony", "color": "#446986", "dep": "Marketing" },
    { "id": "blannin7x@trellian.com", "title": "Babs Lannin", "color": "#358625", "dep": "Legal" },
    { "id": "tramey7y@miitbeian.gov.cn", "title": "Thaddeus Ramey", "color": "#6a3d41", "dep": "Sales" },
    { "id": "lstefanovic7z@booking.com", "title": "Loise Stefanovic", "color": "#e4f459", "dep": "Legal" },
    { "id": "dyukhnin80@geocities.jp", "title": "Dyane Yukhnin", "color": "#69ac7d", "dep": "Training" },
    { "id": "pdunlop81@vk.com", "title": "Pen Dunlop", "color": "#4b71ff", "dep": "Accounting" },
    { "id": "mredmain82@cmu.edu", "title": "Malchy Redmain", "color": "#023008", "dep": "Product Management" },
    { "id": "ksetchfield83@nps.gov", "title": "Kelbee Setchfield", "color": "#41148e", "dep": "Engineering" },
    { "id": "bfereday84@trellian.com", "title": "Brianna Fereday", "color": "#439e51", "dep": "Product Management" },
    { "id": "afacer85@census.gov", "title": "Alanson Facer", "color": "#654a7e", "dep": "Sales" },
    { "id": "cczajkowski86@canalblog.com", "title": "Charo Czajkowski", "color": "#678a37", "dep": "Marketing" },
    { "id": "atarrier87@purevolume.com", "title": "Astra Tarrier", "color": "#131e91", "dep": "Engineering" },
    { "id": "oboerder88@utexas.edu", "title": "Olympia Boerder", "color": "#fc59c1", "dep": "Research and Development" },
    { "id": "cbuick89@macromedia.com", "title": "Carter Buick", "color": "#1488ad", "dep": "Business Development" },
    { "id": "sbaine8a@webmd.com", "title": "Stirling Baine", "color": "#fe8426", "dep": "Business Development" },
    { "id": "dhassent8b@macromedia.com", "title": "Donny Hassent", "color": "#43fb2b", "dep": "Sales" },
    { "id": "zwhatley8c@cnn.com", "title": "Zebulen Whatley", "color": "#97d303", "dep": "Sales" },
    { "id": "mpiner8d@bloglovin.com", "title": "Mayer Piner", "color": "#fe7fa3", "dep": "Services" },
    { "id": "cdoust8e@howstuffworks.com", "title": "Che Doust", "color": "#60c851", "dep": "Services" },
    { "id": "vmocher8f@usnews.com", "title": "Vannie Mocher", "color": "#a5567a", "dep": "Research and Development" },
    { "id": "itipple8g@sfgate.com", "title": "Isidoro Tipple", "color": "#71929a", "dep": "Human Resources" },
    { "id": "celwill8h@bandcamp.com", "title": "Christy Elwill", "color": "#4e116d", "dep": "Research and Development" },
    { "id": "mbruhn8i@addthis.com", "title": "Myrah Bruhn", "color": "#b12b87", "dep": "Marketing" },
    { "id": "styhurst8j@a8.net", "title": "Sarine Tyhurst", "color": "#797744", "dep": "Legal" },
    { "id": "jkildahl8k@marketwatch.com", "title": "Jade Kildahl", "color": "#4b9899", "dep": "Engineering" },
    { "id": "cbouts8l@businesswire.com", "title": "Cross Bouts", "color": "#a0dfa3", "dep": "Marketing" },
    { "id": "mbisley8m@mozilla.com", "title": "Marcelia Bisley", "color": "#d1b465", "dep": "Sales" },
    { "id": "swarlowe8n@altervista.org", "title": "Sonya Warlowe", "color": "#8a9d49", "dep": "Legal" },
    { "id": "fupward8o@ycombinator.com", "title": "Fiann Upward", "color": "#7ad7c7", "dep": "Research and Development" },
    { "id": "tmcowis8p@taobao.com", "title": "Thorvald M'cowis", "color": "#b58d8b", "dep": "Sales" },
    { "id": "dnore8q@ibm.com", "title": "Delphinia Nore", "color": "#271779", "dep": "Engineering" },
    { "id": "fdiem8r@answers.com", "title": "Francklin Diem", "color": "#e20857", "dep": "Support" },
    { "id": "dmatieu8s@theguardian.com", "title": "Dido Matieu", "color": "#0386b0", "dep": "Product Management" },
    { "id": "mdymott8t@blog.com", "title": "Monti Dymott", "color": "#42a3b1", "dep": "Human Resources" },
    { "id": "ksargeant8u@usatoday.com", "title": "Kerby Sargeant", "color": "#eaa6ae", "dep": "Research and Development" },
    { "id": "iratchford8v@ox.ac.uk", "title": "Ingeberg Ratchford", "color": "#62ecd6", "dep": "Marketing" },
    { "id": "wagus8w@purevolume.com", "title": "Willow Agus", "color": "#c50009", "dep": "Legal" },
    { "id": "ryurchenko8x@who.int", "title": "Rivalee Yurchenko", "color": "#af8d90", "dep": "Product Management" },
    { "id": "fcoolahan8y@blogspot.com", "title": "Fabe Coolahan", "color": "#e7af16", "dep": "Accounting" },
    { "id": "efilson8z@soundcloud.com", "title": "Euell Filson", "color": "#78ac4b", "dep": "Product Management" },
    { "id": "wdilliston90@t-online.de", "title": "Woodie Dilliston", "color": "#9efcf8", "dep": "Human Resources" },
    { "id": "fduffus91@house.gov", "title": "Francesco Duffus", "color": "#d1e2d4", "dep": "Marketing" },
    { "id": "aohara92@gmpg.org", "title": "Aldon O'Hara", "color": "#92b22b", "dep": "Legal" },
    { "id": "abalas93@adobe.com", "title": "Aldon Balas", "color": "#f61509", "dep": "Training" },
    { "id": "rmartschke94@engadget.com", "title": "Reena Martschke", "color": "#302aef", "dep": "Product Management" },
    { "id": "khurry95@google.pl", "title": "Kristian Hurry", "color": "#36ca59", "dep": "Engineering" },
    { "id": "pfilipczynski96@barnesandnoble.com", "title": "Patin Filipczynski", "color": "#31266e", "dep": "Business Development" },
    { "id": "talabaster97@google.com.br", "title": "Tillie Alabaster", "color": "#e8df15", "dep": "Training" },
    { "id": "edyerson98@timesonline.co.uk", "title": "Ellsworth Dyerson", "color": "#dec2fc", "dep": "Research and Development" },
    { "id": "vhenaughan99@google.de", "title": "Verina Henaughan", "color": "#d23c06", "dep": "Business Development" },
    { "id": "awelton9a@yolasite.com", "title": "Ansley Welton", "color": "#3bbe1c", "dep": "Services" },
    { "id": "adevanney9b@xrea.com", "title": "Aldrich Devanney", "color": "#2e0e40", "dep": "Support" },
    { "id": "scroughan9c@dion.ne.jp", "title": "Starr Croughan", "color": "#05eca4", "dep": "Product Management" },
    { "id": "jschrir9d@upenn.edu", "title": "Jennifer Schrir", "color": "#2c0f86", "dep": "Sales" },
    { "id": "gfardoe9e@princeton.edu", "title": "Ginger Fardoe", "color": "#b89151", "dep": "Support" },
    { "id": "mflinn9f@hugedomains.com", "title": "Moritz Flinn", "color": "#471660", "dep": "Business Development" },
    { "id": "dmaclaverty9g@illinois.edu", "title": "Dan MacLaverty", "color": "#9db8a4", "dep": "Business Development" },
    { "id": "bfarlham9h@4shared.com", "title": "Bradley Farlham", "color": "#86bed8", "dep": "Human Resources" },
    { "id": "tgoldstraw9i@cpanel.net", "title": "Trumaine Goldstraw", "color": "#61e6af", "dep": "Training" },
    { "id": "acornau9j@prnewswire.com", "title": "Aurie Cornau", "color": "#e7ad3c", "dep": "Research and Development" },
    { "id": "ppovele9k@amazon.co.uk", "title": "Patty Povele", "color": "#56ad6f", "dep": "Accounting" },
    { "id": "ahaggath9l@ox.ac.uk", "title": "Antonia Haggath", "color": "#425d20", "dep": "Sales" },
    { "id": "cde9m@de.vu", "title": "Calley De Malchar", "color": "#cf1754", "dep": "Support" },
    { "id": "achandler9n@apache.org", "title": "Alvie Chandler", "color": "#14afca", "dep": "Marketing" },
    { "id": "deveril9o@alexa.com", "title": "Deloris Everil", "color": "#8a33df", "dep": "Business Development" },
    { "id": "nshepherdson9p@reference.com", "title": "Nalani Shepherdson", "color": "#0cb51f", "dep": "Services" },
    { "id": "pmarco9q@npr.org", "title": "Pansy Marco", "color": "#c145e7", "dep": "Legal" },
    { "id": "gpafford9r@biblegateway.com", "title": "Glennie Pafford", "color": "#2afa05", "dep": "Services" },
    { "id": "rhabbeshaw9s@usgs.gov", "title": "Roi Habbeshaw", "color": "#9959f3", "dep": "Support" },
    { "id": "mfransoni9t@joomla.org", "title": "Maire Fransoni", "color": "#ea7a29", "dep": "Training" },
    { "id": "cle9u@people.com.cn", "title": "Colas Le Franc", "color": "#02c30f", "dep": "Accounting" },
    { "id": "lepp9v@furl.net", "title": "Lemmy Epp", "color": "#94c73e", "dep": "Research and Development" },
    { "id": "jwalklott9w@soundcloud.com", "title": "Josh Walklott", "color": "#81cf6a", "dep": "Services" },
    { "id": "ccolchett9x@archive.org", "title": "Crichton Colchett", "color": "#eaa25b", "dep": "Accounting" },
    { "id": "cchurly9y@bing.com", "title": "Carleton Churly", "color": "#b62055", "dep": "Legal" },
    { "id": "clawleff9z@mlb.com", "title": "Cami Lawleff", "color": "#d7747e", "dep": "Engineering" },
    { "id": "plintina0@sciencedaily.com", "title": "Pavla Lintin", "color": "#582efc", "dep": "Product Management" },
    { "id": "cwakerleya1@dot.gov", "title": "Calida Wakerley", "color": "#5bfa30", "dep": "Product Management" },
    { "id": "vsanbrooka2@howstuffworks.com", "title": "Vonni Sanbrook", "color": "#ee9391", "dep": "Marketing" },
    { "id": "mberthomiera3@skype.com", "title": "Maximo Berthomier", "color": "#924f70", "dep": "Support" },
    { "id": "hwadwella4@prlog.org", "title": "Hanan Wadwell", "color": "#ebc2bf", "dep": "Training" },
    { "id": "mtoffettoa5@state.tx.us", "title": "Moria Toffetto", "color": "#19be2a", "dep": "Marketing" },
    { "id": "echeatlea6@japanpost.jp", "title": "Edee Cheatle", "color": "#fb73ef", "dep": "Legal" },
    { "id": "mbowersa7@go.com", "title": "Mella Bowers", "color": "#8da66b", "dep": "Product Management" },
    { "id": "bfenneya8@techcrunch.com", "title": "Byron Fenney", "color": "#d97be5", "dep": "Sales" },
    { "id": "edevonporta9@nps.gov", "title": "Edik Devonport", "color": "#0572db", "dep": "Sales" },
    { "id": "rdismoreaa@printfriendly.com", "title": "Rodrick Dismore", "color": "#d37414", "dep": "Human Resources" },
    { "id": "sbrugmannab@pagesperso-orange.fr", "title": "Sascha Brugmann", "color": "#e7672b", "dep": "Legal" },
    { "id": "rcovellac@reverbnation.com", "title": "Ronald Covell", "color": "#e30ee0", "dep": "Human Resources" },
    { "id": "mploughwrightad@ezinearticles.com", "title": "Muhammad Ploughwright", "color": "#7f04e9", "dep": "Accounting" },
    { "id": "dmountlowae@about.com", "title": "Dian Mountlow", "color": "#f081fe", "dep": "Business Development" },
    { "id": "ofullunaf@howstuffworks.com", "title": "Ophelie Fullun", "color": "#41bcae", "dep": "Services" },
    { "id": "rchrestienag@wikipedia.org", "title": "Rosemarie Chrestien", "color": "#59e315", "dep": "Engineering" },
    { "id": "ssermanah@ted.com", "title": "Shirl Serman", "color": "#fffdd4", "dep": "Support" },
    { "id": "fmatityahuai@loc.gov", "title": "Fedora Matityahu", "color": "#795069", "dep": "Sales" },
    { "id": "iphalpaj@newyorker.com", "title": "Iormina Phalp", "color": "#77aa7f", "dep": "Engineering" },
    { "id": "jvinckak@nsw.gov.au", "title": "Julian Vinck", "color": "#636e83", "dep": "Support" },
    { "id": "fgarronal@wufoo.com", "title": "Faustine Garron", "color": "#81f9df", "dep": "Legal" },
    { "id": "klitterickam@house.gov", "title": "Krystle Litterick", "color": "#21a64f", "dep": "Accounting" },
    { "id": "fportugalan@symantec.com", "title": "Falkner Portugal", "color": "#cb03ec", "dep": "Engineering" },
    { "id": "mwakelamao@thetimes.co.uk", "title": "Monro Wakelam", "color": "#c3c8d0", "dep": "Sales" },
    { "id": "veakeap@nytimes.com", "title": "Vincenty Eake", "color": "#e5c489", "dep": "Legal" },
    { "id": "pdebneyaq@ameblo.jp", "title": "Pebrook Debney", "color": "#91ebe3", "dep": "Support" },
    { "id": "emounsiear@bizjournals.com", "title": "Emogene Mounsie", "color": "#be4bc6", "dep": "Sales" },
    { "id": "wsteelsas@amazon.co.uk", "title": "Wallis Steels", "color": "#763bd1", "dep": "Business Development" },
    { "id": "bcharrierat@histats.com", "title": "Berkly Charrier", "color": "#ec96ce", "dep": "Training" },
    { "id": "bbrownjohnau@opera.com", "title": "Bobby Brownjohn", "color": "#7a45b1", "dep": "Training" },
    { "id": "bdavydochav@addthis.com", "title": "Bryon Davydoch", "color": "#628927", "dep": "Legal" },
    { "id": "ccornuauaw@symantec.com", "title": "Carolee Cornuau", "color": "#4f5c8c", "dep": "Business Development" },
    { "id": "pdorlingax@howstuffworks.com", "title": "Petr Dorling", "color": "#810d9b", "dep": "Legal" },
    { "id": "emannaghay@1688.com", "title": "Ema Mannagh", "color": "#1b58ca", "dep": "Accounting" },
    { "id": "jfulbrookaz@amazon.com", "title": "Jobey Fulbrook", "color": "#c11595", "dep": "Legal" },
    { "id": "ftornb0@utexas.edu", "title": "Francesco Torn", "color": "#e28772", "dep": "Engineering" },
    { "id": "sdessentb1@moonfruit.com", "title": "Shane Dessent", "color": "#9c4f9a", "dep": "Sales" },
    { "id": "cmacanellyeb2@so-net.ne.jp", "title": "Clemmie MacAnellye", "color": "#78b7af", "dep": "Sales" },
    { "id": "jfieldsendb3@vkontakte.ru", "title": "Jarrid Fieldsend", "color": "#6c7563", "dep": "Engineering" },
    { "id": "rdunckleeb4@nydailynews.com", "title": "Ronny Duncklee", "color": "#7ad434", "dep": "Sales" },
    { "id": "csergantb5@cdc.gov", "title": "Collie Sergant", "color": "#b01a9a", "dep": "Business Development" },
    { "id": "jstevenb6@arstechnica.com", "title": "Johnathon Steven", "color": "#ceadbe", "dep": "Sales" },
    { "id": "ihrynczykb7@epa.gov", "title": "Isidor Hrynczyk", "color": "#421e8a", "dep": "Training" },
    { "id": "msoutenb8@yahoo.com", "title": "Mia Souten", "color": "#607ebd", "dep": "Training" },
    { "id": "ecamposb9@china.com.cn", "title": "Ephrayim Campos", "color": "#212b0b", "dep": "Legal" },
    { "id": "jalexsandrevba@nasa.gov", "title": "Janeta Alexsandrev", "color": "#9d4e4b", "dep": "Legal" },
    { "id": "kgianninibb@amazon.co.uk", "title": "Kippy Giannini", "color": "#fb5932", "dep": "Training" },
    { "id": "mschultesbc@vistaprint.com", "title": "Melamie Schultes", "color": "#582997", "dep": "Support" },
    { "id": "kbeattiebd@163.com", "title": "Katharyn Beattie", "color": "#5a36db", "dep": "Accounting" },
    { "id": "sfarobe@engadget.com", "title": "Stormie Faro", "color": "#bc70e3", "dep": "Support" },
    { "id": "ekingcottbf@ucla.edu", "title": "Elke Kingcott", "color": "#cf8cbd", "dep": "Legal" },
    { "id": "sdeeringbg@irs.gov", "title": "Sarita Deering", "color": "#8ec6e1", "dep": "Legal" },
    { "id": "cdanilinbh@issuu.com", "title": "Christalle Danilin", "color": "#cfd764", "dep": "Services" },
    { "id": "kkunabi@washington.edu", "title": "Kennan Kuna", "color": "#7482d9", "dep": "Engineering" },
    { "id": "rlorentzenbj@home.pl", "title": "Reinaldos Lorentzen", "color": "#72f603", "dep": "Research and Development" },
    { "id": "sshentonbk@bandcamp.com", "title": "Sherline Shenton", "color": "#ac0396", "dep": "Human Resources" },
    { "id": "amarplebl@ucoz.ru", "title": "Alejandrina Marple", "color": "#678003", "dep": "Human Resources" },
    { "id": "wlinsteadbm@adobe.com", "title": "Wolf Linstead", "color": "#e228e8", "dep": "Research and Development" },
    { "id": "rtutherbn@cdbaby.com", "title": "Roberta Tuther", "color": "#6c84d4", "dep": "Services" },
    { "id": "lplumridegebo@epa.gov", "title": "Loni Plumridege", "color": "#2a75b6", "dep": "Legal" },
    { "id": "jcottembp@state.gov", "title": "Jeddy Cottem", "color": "#db0a59", "dep": "Human Resources" },
    { "id": "mhamillbq@usnews.com", "title": "Mufi Hamill", "color": "#a3b594", "dep": "Accounting" },
    { "id": "owillcockbr@google.com.br", "title": "Ora Willcock", "color": "#90f56c", "dep": "Research and Development" },
    { "id": "vdomenybs@icq.com", "title": "Verla Domeny", "color": "#d59df1", "dep": "Services" },
    { "id": "lliepinsbt@scribd.com", "title": "Lorri Liepins", "color": "#34201a", "dep": "Sales" },
    { "id": "jbaildonbu@pbs.org", "title": "Jerald Baildon", "color": "#1770fc", "dep": "Sales" },
    { "id": "oyakovichbv@homestead.com", "title": "Otha Yakovich", "color": "#f18ecd", "dep": "Business Development" },
    { "id": "pracherbw@infoseek.co.jp", "title": "Pollyanna Racher", "color": "#43ed6a", "dep": "Legal" },
    { "id": "kallombx@istockphoto.com", "title": "Kameko Allom", "color": "#a4c80a", "dep": "Engineering" },
    { "id": "kmeeby@narod.ru", "title": "Kacy Mee", "color": "#f045f2", "dep": "Human Resources" },
    { "id": "dgrayhambz@noaa.gov", "title": "Durant Grayham", "color": "#3cf6ca", "dep": "Product Management" },
    { "id": "wcalvertc0@issuu.com", "title": "Walker Calvert", "color": "#fbfc86", "dep": "Engineering" },
    { "id": "nwillavizec1@myspace.com", "title": "Neddy Willavize", "color": "#211946", "dep": "Legal" },
    { "id": "skahnc2@dyndns.org", "title": "Saidee Kahn", "color": "#614c0d", "dep": "Sales" },
    { "id": "aeiversc3@bbb.org", "title": "Ania Eivers", "color": "#ad42fd", "dep": "Accounting" },
    { "id": "amccaigc4@washingtonpost.com", "title": "Anatole McCaig", "color": "#106d3c", "dep": "Accounting" },
    { "id": "mjakovc5@google.co.jp", "title": "Maxim Jakov", "color": "#d3b18f", "dep": "Product Management" },
    { "id": "ablumfieldc6@rambler.ru", "title": "Alastair Blumfield", "color": "#72dce6", "dep": "Marketing" },
    { "id": "slashfordc7@mapquest.com", "title": "Syd Lashford", "color": "#a6f430", "dep": "Support" },
    { "id": "eharcasec8@behance.net", "title": "Elysee Harcase", "color": "#4cbfc9", "dep": "Legal" },
    { "id": "ebergstrandc9@dmoz.org", "title": "Elise Bergstrand", "color": "#a3aa2a", "dep": "Product Management" },
    { "id": "tsommertonca@geocities.jp", "title": "Tedra Sommerton", "color": "#5654b1", "dep": "Training" },
    { "id": "jedglercb@cbslocal.com", "title": "Janela Edgler", "color": "#ff0e49", "dep": "Sales" },
    { "id": "cbanasiakcc@cargocollective.com", "title": "Constantino Banasiak", "color": "#3a3adb", "dep": "Support" },
    { "id": "ekantorcd@unc.edu", "title": "Englebert Kantor", "color": "#c3b57c", "dep": "Human Resources" },
    { "id": "hbirminghamce@tmall.com", "title": "Horatius Birmingham", "color": "#ff8cdc", "dep": "Training" },
    { "id": "pludlemcf@simplemachines.org", "title": "Pavlov Ludlem", "color": "#1bef0d", "dep": "Research and Development" },
    { "id": "rskinncg@weebly.com", "title": "Reamonn Skinn", "color": "#9e5d09", "dep": "Legal" },
    { "id": "cceschinich@tumblr.com", "title": "Cortie Ceschini", "color": "#314918", "dep": "Training" },
    { "id": "lantaoci@netscape.com", "title": "Lion Antao", "color": "#3aac63", "dep": "Sales" },
    { "id": "mkillerbycj@youtu.be", "title": "Marietta Killerby", "color": "#88ad52", "dep": "Marketing" },
    { "id": "akleszinskick@sohu.com", "title": "Ashlee Kleszinski", "color": "#be75d4", "dep": "Marketing" },
    { "id": "hyashnovcl@soup.io", "title": "Harper Yashnov", "color": "#acfa34", "dep": "Legal" },
    { "id": "klipgenscm@cyberchimps.com", "title": "Kattie Lipgens", "color": "#3ab72d", "dep": "Services" },
    { "id": "roduilleaincn@youtu.be", "title": "Rubia O'Duilleain", "color": "#347e25", "dep": "Research and Development" },
    { "id": "bharkenco@tripadvisor.com", "title": "Brit Harken", "color": "#20bb7e", "dep": "Services" },
    { "id": "gabelsoncp@flickr.com", "title": "Gwen Abelson", "color": "#b2e496", "dep": "Research and Development" },
    { "id": "hfurphycq@quantcast.com", "title": "Herby Furphy", "color": "#834ce9", "dep": "Marketing" },
    { "id": "eharrinsoncr@jalbum.net", "title": "Estrella Harrinson", "color": "#487b87", "dep": "Training" },
    { "id": "wlunacs@senate.gov", "title": "Willie Luna", "color": "#ae141a", "dep": "Research and Development" },
    { "id": "bbradshawct@craigslist.org", "title": "Birch Bradshaw", "color": "#e0e58f", "dep": "Product Management" },
    { "id": "rbyrkmyrcu@prnewswire.com", "title": "Rea Byrkmyr", "color": "#8d1933", "dep": "Product Management" },
    { "id": "lbroszkiewiczcv@cbslocal.com", "title": "Lishe Broszkiewicz", "color": "#8b8173", "dep": "Support" },
    { "id": "wbruincw@mit.edu", "title": "Walt Bruin", "color": "#24fa94", "dep": "Marketing" },
    { "id": "lrommecx@photobucket.com", "title": "Luca Romme", "color": "#c0f708", "dep": "Research and Development" },
    { "id": "tpassiecy@deviantart.com", "title": "Torin Passie", "color": "#7e540a", "dep": "Research and Development" },
    { "id": "rwessingcz@diigo.com", "title": "Rasla Wessing", "color": "#aa97ca", "dep": "Product Management" },
    { "id": "cbissd0@wunderground.com", "title": "Chaunce Biss", "color": "#8533be", "dep": "Product Management" },
    { "id": "jloreyd1@wikispaces.com", "title": "Janelle Lorey", "color": "#bfc5e0", "dep": "Training" },
    { "id": "dblewd2@cnn.com", "title": "Dottie Blew", "color": "#7910ec", "dep": "Accounting" },
    { "id": "hbougourdd3@huffingtonpost.com", "title": "Hamil Bougourd", "color": "#9dc10c", "dep": "Research and Development" },
    { "id": "shapgoodd4@noaa.gov", "title": "Shanan Hapgood", "color": "#26375e", "dep": "Business Development" },
    { "id": "gdauberd5@answers.com", "title": "Gordan Dauber", "color": "#23226a", "dep": "Business Development" },
    { "id": "candrolettid6@imgur.com", "title": "Carline Androletti", "color": "#3e7889", "dep": "Support" },
    { "id": "ablazad7@blogspot.com", "title": "Angelina Blaza", "color": "#954e59", "dep": "Sales" },
    { "id": "amacconachyd8@deviantart.com", "title": "Ari Macconachy", "color": "#40c0bf", "dep": "Training" },
    { "id": "ktimlind9@nytimes.com", "title": "Katrine Timlin", "color": "#6ed8c1", "dep": "Engineering" },
    { "id": "lclevelyda@odnoklassniki.ru", "title": "Lilli Clevely", "color": "#b8a081", "dep": "Accounting" },
    { "id": "smalehamdb@edublogs.org", "title": "Siouxie Maleham", "color": "#83dea3", "dep": "Accounting" },
    { "id": "wwrendc@sourceforge.net", "title": "Wendye Wren", "color": "#84187c", "dep": "Legal" },
    { "id": "jgoodselldd@pinterest.com", "title": "Jehu Goodsell", "color": "#16f275", "dep": "Legal" },
    { "id": "dwendoverde@dedecms.com", "title": "Drucill Wendover", "color": "#b77b72", "dep": "Legal" },
    { "id": "lbreadf@constantcontact.com", "title": "Lovell Brea", "color": "#35bdf5", "dep": "Accounting" },
    { "id": "ereichertdg@altervista.org", "title": "Eran Reichert", "color": "#9181cf", "dep": "Product Management" },
    { "id": "hmarushakdh@sfgate.com", "title": "Harrie Marushak", "color": "#311b4c", "dep": "Support" },
    { "id": "polivetidi@mit.edu", "title": "Peirce Oliveti", "color": "#f58100", "dep": "Engineering" },
    { "id": "sayrtondj@dyndns.org", "title": "Sheeree Ayrton", "color": "#bc7431", "dep": "Human Resources" },
    { "id": "mkeigdk@narod.ru", "title": "Margalo Keig", "color": "#fd0a58", "dep": "Sales" },
    { "id": "dtrowilldl@lulu.com", "title": "Davide Trowill", "color": "#44a031", "dep": "Sales" },
    { "id": "mprintdm@tripadvisor.com", "title": "Marcy Print", "color": "#c79e68", "dep": "Legal" },
    { "id": "dgilhespydn@irs.gov", "title": "Donni Gilhespy", "color": "#9314dd", "dep": "Marketing" },
    { "id": "mwedderburndo@census.gov", "title": "Margarete Wedderburn", "color": "#120b89", "dep": "Product Management" },
    { "id": "bwrigleydp@cbslocal.com", "title": "Burgess Wrigley", "color": "#086e5b", "dep": "Human Resources" },
    { "id": "ibreslaudq@a8.net", "title": "Ingeborg Breslau", "color": "#0fd8a8", "dep": "Product Management" },
    { "id": "eproomdr@mapy.cz", "title": "Elizabeth Proom", "color": "#67b033", "dep": "Legal" },
    { "id": "bnawtonds@issuu.com", "title": "Bayard Nawton", "color": "#c1fd96", "dep": "Business Development" },
    { "id": "tdonaghydt@newsvine.com", "title": "Tadio Donaghy", "color": "#5cb68f", "dep": "Engineering" },
    { "id": "wmougetdu@zdnet.com", "title": "Webster Mouget", "color": "#7b8d29", "dep": "Business Development" },
    { "id": "pmonteauxdv@kickstarter.com", "title": "Pierson Monteaux", "color": "#fa9f1b", "dep": "Training" },
    { "id": "lplumtreedw@boston.com", "title": "Lesley Plumtree", "color": "#2cb53b", "dep": "Business Development" },
    { "id": "mmowlesdx@pcworld.com", "title": "Mignonne Mowles", "color": "#d1984e", "dep": "Marketing" },
    { "id": "kdanidy@dedecms.com", "title": "Kaleb Dani", "color": "#58762c", "dep": "Legal" },
    { "id": "pbartosiakdz@pbs.org", "title": "Papagena Bartosiak", "color": "#2778ab", "dep": "Support" },
    { "id": "estotte0@squarespace.com", "title": "Elaine Stott", "color": "#f11201", "dep": "Training" },
    { "id": "cjosifovitze1@businesswire.com", "title": "Clair Josifovitz", "color": "#c47d9f", "dep": "Human Resources" },
    { "id": "mgiraudouxe2@boston.com", "title": "Minny Giraudoux", "color": "#ecbc7e", "dep": "Marketing" },
    { "id": "jhinckese3@umich.edu", "title": "Joletta Hinckes", "color": "#dd3b6d", "dep": "Business Development" },
    { "id": "ndeedese4@zdnet.com", "title": "Nessa Deedes", "color": "#f716e0", "dep": "Human Resources" },
    { "id": "aacee5@paypal.com", "title": "Andres Ace", "color": "#6e5262", "dep": "Services" },
    { "id": "cdudsone6@discuz.net", "title": "Cole Dudson", "color": "#b0ed06", "dep": "Sales" },
    { "id": "skyddee7@wired.com", "title": "Stephenie Kydde", "color": "#4dd25f", "dep": "Legal" },
    { "id": "lgoadbiee8@china.com.cn", "title": "Loree Goadbie", "color": "#1d65db", "dep": "Marketing" },
    { "id": "dailmere9@hao123.com", "title": "Donetta Ailmer", "color": "#9d0dad", "dep": "Support" },
    { "id": "kironmongerea@comcast.net", "title": "Kristen Ironmonger", "color": "#eed45e", "dep": "Research and Development" },
    { "id": "afridlingtoneb@google.ru", "title": "Annadiana Fridlington", "color": "#66e5f5", "dep": "Business Development" },
    { "id": "csybryec@clickbank.net", "title": "Candide Sybry", "color": "#c65f52", "dep": "Sales" },
    { "id": "mhartleburyed@discuz.net", "title": "Mommy Hartlebury", "color": "#0c99a2", "dep": "Product Management" },
    { "id": "dgoingee@arizona.edu", "title": "Davie Going", "color": "#a2959c", "dep": "Support" },
    { "id": "jspenceleyef@sina.com.cn", "title": "Jaquelyn Spenceley", "color": "#fa3244", "dep": "Human Resources" },
    { "id": "agozzardeg@studiopress.com", "title": "Alic Gozzard", "color": "#296095", "dep": "Services" },
    { "id": "aconeneh@umich.edu", "title": "Amos Conen", "color": "#10f1d7", "dep": "Accounting" },
    { "id": "mcarpenterei@sun.com", "title": "Monique Carpenter", "color": "#8596d6", "dep": "Accounting" },
    { "id": "hreinbachej@stanford.edu", "title": "Haroun Reinbach", "color": "#5460ed", "dep": "Marketing" },
    { "id": "sverdyek@sfgate.com", "title": "Sol Verdy", "color": "#57ed5c", "dep": "Training" },
    { "id": "mberkael@sakura.ne.jp", "title": "Maxie Berka", "color": "#8ae6cf", "dep": "Sales" },
    { "id": "wyoudem@tiny.cc", "title": "Wilhelm Youd", "color": "#07e54c", "dep": "Product Management" },
    { "id": "vmeenehanen@opera.com", "title": "Virginia Meenehan", "color": "#6c33d1", "dep": "Training" },
    { "id": "jbeeeo@senate.gov", "title": "Jereme Bee", "color": "#1ae236", "dep": "Services" },
    { "id": "erevanep@craigslist.org", "title": "Emogene Revan", "color": "#6cd0ed", "dep": "Marketing" },
    { "id": "dvannuchieq@mozilla.org", "title": "Drucy Vannuchi", "color": "#a995ea", "dep": "Product Management" },
    { "id": "mpavlitscheker@ucsd.edu", "title": "Mab Pavlitschek", "color": "#afe76d", "dep": "Engineering" },
    { "id": "aellershawes@dropbox.com", "title": "Adriana Ellershaw", "color": "#bb4f63", "dep": "Research and Development" },
    { "id": "mrosternet@ibm.com", "title": "Micheil Rostern", "color": "#6179b1", "dep": "Engineering" },
    { "id": "mmogereu@feedburner.com", "title": "Meriel Moger", "color": "#e7782e", "dep": "Support" },
    { "id": "btrinemanev@typepad.com", "title": "Bernard Trineman", "color": "#3537ac", "dep": "Support" },
    { "id": "avoadenew@paypal.com", "title": "Allys Voaden", "color": "#6322e2", "dep": "Legal" },
    { "id": "gsuggettex@pen.io", "title": "Ginevra Suggett", "color": "#117577", "dep": "Services" },
    { "id": "aduetschensey@1688.com", "title": "Andria Duetschens", "color": "#1faae2", "dep": "Engineering" },
    { "id": "slapreez@tuttocitta.it", "title": "Sim Lapre", "color": "#a48cc5", "dep": "Human Resources" },
    { "id": "cantonikovf0@is.gd", "title": "Chet Antonikov", "color": "#9ec6f5", "dep": "Support" },
    { "id": "socheltreef1@who.int", "title": "Serene Ocheltree", "color": "#832cbc", "dep": "Services" },
    { "id": "lmorrishf2@dailymotion.com", "title": "Leeann Morrish", "color": "#e7f90e", "dep": "Services" },
    { "id": "lorvissf3@ihg.com", "title": "Lorianna Orviss", "color": "#1deedc", "dep": "Sales" },
    { "id": "pnatalief4@chron.com", "title": "Phillip Natalie", "color": "#471e60", "dep": "Engineering" },
    { "id": "egaterf5@prnewswire.com", "title": "Elena Gater", "color": "#ad0ffc", "dep": "Product Management" },
    { "id": "ejuanesf6@google.com.br", "title": "Enrico Juanes", "color": "#f56cbd", "dep": "Business Development" },
    { "id": "agiannazzof7@yellowpages.com", "title": "Allayne Giannazzo", "color": "#01934a", "dep": "Support" },
    { "id": "mwedonf8@mozilla.com", "title": "Minnie Wedon", "color": "#ab25ad", "dep": "Research and Development" },
    { "id": "knorcockf9@sohu.com", "title": "Kelly Norcock", "color": "#f91af1", "dep": "Product Management" },
    { "id": "amashalfa@icio.us", "title": "Angele Mashal", "color": "#2ee7d0", "dep": "Legal" },
    { "id": "mpoagfb@digg.com", "title": "Marcelo Poag", "color": "#667a3b", "dep": "Marketing" },
    { "id": "onovikfc@cyberchimps.com", "title": "Odie Novik", "color": "#5b6d85", "dep": "Training" },
    { "id": "hbristoefd@unc.edu", "title": "Horace Bristoe", "color": "#6656b6", "dep": "Sales" },
    { "id": "etesimonfe@unicef.org", "title": "Emory Tesimon", "color": "#9a8182", "dep": "Product Management" },
    { "id": "crooksbyff@go.com", "title": "Clemmy Rooksby", "color": "#3202ca", "dep": "Engineering" },
    { "id": "hferandezfg@amazon.de", "title": "Heda Ferandez", "color": "#8c5bd1", "dep": "Research and Development" },
    { "id": "mcurrierfh@npr.org", "title": "Margeaux Currier", "color": "#516077", "dep": "Research and Development" },
    { "id": "cscutterfi@google.cn", "title": "Chucho Scutter", "color": "#78817b", "dep": "Sales" },
    { "id": "wberensfj@unc.edu", "title": "Wat Berens", "color": "#ffb1da", "dep": "Training" },
    { "id": "bcameronfk@abc.net.au", "title": "Brinna Cameron", "color": "#9bc5e7", "dep": "Legal" },
    { "id": "ralbertfl@wufoo.com", "title": "Rosa Albert", "color": "#8593fd", "dep": "Research and Development" },
    { "id": "abeckmannfm@posterous.com", "title": "Al Beckmann", "color": "#6c836f", "dep": "Training" },
    { "id": "vsustonfn@china.com.cn", "title": "Virgie Suston", "color": "#dc83a2", "dep": "Support" },
    { "id": "mshoebridgefo@t.co", "title": "Marita Shoebridge", "color": "#4f83b3", "dep": "Support" },
    { "id": "jsoamesfp@drupal.org", "title": "Jaquelyn Soames", "color": "#b214a5", "dep": "Support" },
    { "id": "ltuplinfq@msn.com", "title": "Leah Tuplin", "color": "#57e0ea", "dep": "Business Development" },
    { "id": "akopmannfr@cmu.edu", "title": "Auroora Kopmann", "color": "#43cb1f", "dep": "Services" },
    { "id": "jcattonnetfs@shinystat.com", "title": "Johna Cattonnet", "color": "#0d5716", "dep": "Product Management" },
    { "id": "gpowisft@digg.com", "title": "Giusto Powis", "color": "#4b0a2b", "dep": "Support" },
    { "id": "tdanshinfu@geocities.com", "title": "Theadora Danshin", "color": "#3f6343", "dep": "Human Resources" },
    { "id": "dlandellsfv@ebay.com", "title": "Delinda Landells", "color": "#cd95a2", "dep": "Sales" },
    { "id": "ccriagfw@discovery.com", "title": "Chick Criag", "color": "#1c26a3", "dep": "Training" },
    { "id": "gberninifx@goo.gl", "title": "Gonzalo Bernini", "color": "#c8846f", "dep": "Support" },
    { "id": "idomeniconefy@github.io", "title": "Ike Domenicone", "color": "#6c8590", "dep": "Training" },
    { "id": "bsoughtonfz@freewebs.com", "title": "Bradan Soughton", "color": "#a758b3", "dep": "Support" },
    { "id": "xmildenhallg0@barnesandnoble.com", "title": "Xylina Mildenhall", "color": "#e6ee5a", "dep": "Services" },
    { "id": "mtweedleg1@nifty.com", "title": "Maybelle Tweedle", "color": "#9cb0de", "dep": "Product Management" },
    { "id": "ebodleg2@aol.com", "title": "Erhard Bodle", "color": "#5a96f0", "dep": "Accounting" },
    { "id": "dreynoldg3@answers.com", "title": "Dru Reynold", "color": "#01c7fd", "dep": "Marketing" },
    { "id": "acholmondeleyg4@odnoklassniki.ru", "title": "Angie Cholmondeley", "color": "#7c1e6c", "dep": "Training" },
    { "id": "wcolumg5@washington.edu", "title": "Wells Colum", "color": "#da2636", "dep": "Product Management" },
    { "id": "apring6@miibeian.gov.cn", "title": "Alford Prin", "color": "#ceff81", "dep": "Sales" },
    { "id": "eexrollg7@usgs.gov", "title": "Ellette Exroll", "color": "#7d32db", "dep": "Research and Development" },
    { "id": "cearleg8@ftc.gov", "title": "Calla Earle", "color": "#66f578", "dep": "Training" },
    { "id": "olemmanbieg9@bigcartel.com", "title": "Olympe Lemmanbie", "color": "#03ffa5", "dep": "Engineering" },
    { "id": "rmurrhardtga@fema.gov", "title": "Rheta Murrhardt", "color": "#56d40f", "dep": "Sales" },
    { "id": "jgascoinegb@sbwire.com", "title": "Jamaal Gascoine", "color": "#9cc79a", "dep": "Sales" },
    { "id": "comoylangc@guardian.co.uk", "title": "Caro O'Moylan", "color": "#8f8960", "dep": "Accounting" },
    { "id": "egildersgd@zimbio.com", "title": "Elicia Gilders", "color": "#785aff", "dep": "Business Development" },
    { "id": "jdelge@loc.gov", "title": "Jenda Del Checolo", "color": "#6cf32f", "dep": "Research and Development" },
    { "id": "aklimashevichgf@indiatimes.com", "title": "Arda Klimashevich", "color": "#f63e4f", "dep": "Human Resources" },
    { "id": "bagneaugg@twitter.com", "title": "Babs Agneau", "color": "#cf7d3c", "dep": "Support" },
    { "id": "ppriestleygh@usa.gov", "title": "Pate Priestley", "color": "#5b0b03", "dep": "Product Management" },
    { "id": "mdurangi@wired.com", "title": "Morly Duran", "color": "#32efb5", "dep": "Business Development" },
    { "id": "fmcmickangj@ning.com", "title": "Floria McMickan", "color": "#c7adc5", "dep": "Services" },
    { "id": "gtirongk@scribd.com", "title": "Gaby Tiron", "color": "#d635f6", "dep": "Business Development" },
    { "id": "edonoghuegl@purevolume.com", "title": "Effie Donoghue", "color": "#2ea796", "dep": "Training" },
    { "id": "rchaslegm@businessinsider.com", "title": "Robina Chasle", "color": "#55733c", "dep": "Sales" },
    { "id": "nlosseljonggn@google.com.au", "title": "Nicolai Losseljong", "color": "#5f3114", "dep": "Services" },
    { "id": "ccoomergo@ovh.net", "title": "Carroll Coomer", "color": "#0905b2", "dep": "Product Management" },
    { "id": "ecansfieldgp@fema.gov", "title": "Elbertina Cansfield", "color": "#cb1030", "dep": "Human Resources" },
    { "id": "bnorthovergq@blinklist.com", "title": "Bell Northover", "color": "#49f497", "dep": "Business Development" },
    { "id": "mteidemangr@bbc.co.uk", "title": "Madeline Teideman", "color": "#784b13", "dep": "Product Management" },
    { "id": "avoasgs@privacy.gov.au", "title": "Alfonso Voas", "color": "#5206f2", "dep": "Business Development" },
    { "id": "cszymanzykgt@oracle.com", "title": "Catarina Szymanzyk", "color": "#562704", "dep": "Legal" },
    { "id": "rlockneygu@youku.com", "title": "Rosie Lockney", "color": "#c993e9", "dep": "Accounting" },
    { "id": "dburrassgv@smugmug.com", "title": "Dix Burrass", "color": "#3d3fed", "dep": "Support" },
    { "id": "blamonbygw@businessweek.com", "title": "Bartolomeo Lamonby", "color": "#706202", "dep": "Engineering" },
    { "id": "neliazgx@flickr.com", "title": "Nicolais Eliaz", "color": "#13d66c", "dep": "Product Management" },
    { "id": "cchattengy@com.com", "title": "Cornall Chatten", "color": "#bdb611", "dep": "Product Management" },
    { "id": "oacedogz@who.int", "title": "Orelee Acedo", "color": "#c0a625", "dep": "Marketing" },
    { "id": "madriaensh0@dagondesign.com", "title": "Mozelle Adriaens", "color": "#a033da", "dep": "Legal" },
    { "id": "kheamush1@ovh.net", "title": "Kiley Heamus", "color": "#0387e5", "dep": "Business Development" },
    { "id": "bcarbryh2@umn.edu", "title": "Boycey Carbry", "color": "#a074f8", "dep": "Support" },
    { "id": "srennekeh3@cdbaby.com", "title": "Say Renneke", "color": "#9dcbb5", "dep": "Training" },
    { "id": "vallonbyh4@si.edu", "title": "Venita Allonby", "color": "#01a525", "dep": "Human Resources" },
    { "id": "tlukeh5@wsj.com", "title": "Thomasine Luke", "color": "#a35713", "dep": "Engineering" },
    { "id": "aninnish6@toplist.cz", "title": "Ajay Ninnis", "color": "#ec116b", "dep": "Accounting" },
    { "id": "scottellh7@squidoo.com", "title": "Sidonnie Cottell", "color": "#ab4cf5", "dep": "Research and Development" },
    { "id": "dledekerh8@elegantthemes.com", "title": "Doro Ledeker", "color": "#a9e15f", "dep": "Training" },
    { "id": "mlagdenh9@sciencedirect.com", "title": "Melesa Lagden", "color": "#dc0014", "dep": "Support" },
    { "id": "agorhardtha@bigcartel.com", "title": "Antonino Gorhardt", "color": "#82dfce", "dep": "Training" },
    { "id": "cridetthb@imageshack.us", "title": "Carlie Ridett", "color": "#e13e63", "dep": "Human Resources" },
    { "id": "bjorgehc@trellian.com", "title": "Beverie Jorge", "color": "#4f586e", "dep": "Sales" },
    { "id": "vcarneyhd@go.com", "title": "Vicki Carney", "color": "#7f4a7f", "dep": "Research and Development" },
    { "id": "asetchellhe@digg.com", "title": "Alaric Setchell", "color": "#d0c42b", "dep": "Product Management" },
    { "id": "wstuttmanhf@google.fr", "title": "Welch Stuttman", "color": "#16b25f", "dep": "Human Resources" },
    { "id": "kfortmanhg@google.pl", "title": "Katharyn Fortman", "color": "#a53fae", "dep": "Support" },
    { "id": "gmelrosehh@bbc.co.uk", "title": "Glen Melrose", "color": "#063e2d", "dep": "Services" },
    { "id": "qpautothi@ocn.ne.jp", "title": "Quint Pautot", "color": "#dddccd", "dep": "Accounting" },
    { "id": "dbartholomieuhj@mac.com", "title": "Dynah Bartholomieu", "color": "#6f796d", "dep": "Business Development" },
    { "id": "sdymidowiczhk@wiley.com", "title": "Salomo Dymidowicz", "color": "#5cc8be", "dep": "Business Development" },
    { "id": "wparsonagehl@toplist.cz", "title": "Wanda Parsonage", "color": "#9f8048", "dep": "Engineering" },
    { "id": "rjohnceyhm@unblog.fr", "title": "Rowena Johncey", "color": "#482488", "dep": "Research and Development" },
    { "id": "mstuddardhn@addthis.com", "title": "Marlie Studdard", "color": "#96b0db", "dep": "Support" },
    { "id": "tduranteho@cocolog-nifty.com", "title": "Taddeo Durante", "color": "#1d179f", "dep": "Business Development" },
    { "id": "bcleverlyhp@mlb.com", "title": "Brietta Cleverly", "color": "#60555d", "dep": "Research and Development" },
    { "id": "eoutridgehq@spiegel.de", "title": "Emelina Outridge", "color": "#1fac7a", "dep": "Research and Development" },
    { "id": "fmeiklamhr@ebay.com", "title": "Filberto Meiklam", "color": "#dd2f66", "dep": "Support" },
    { "id": "ccharlesworthhs@forbes.com", "title": "Carla Charlesworth", "color": "#1262a2", "dep": "Product Management" },
    { "id": "fvsanelliht@nifty.com", "title": "Fredelia Vsanelli", "color": "#500f70", "dep": "Research and Development" },
    { "id": "cmaddenhu@1und1.de", "title": "Cassius Madden", "color": "#022e81", "dep": "Human Resources" },
    { "id": "wantonomolihv@businessweek.com", "title": "Waylen Antonomoli", "color": "#2cd190", "dep": "Product Management" },
    { "id": "vmarkushkinhw@cdc.gov", "title": "Vivie Markushkin", "color": "#3296c7", "dep": "Product Management" },
    { "id": "wbrimhx@meetup.com", "title": "Wallie Brim", "color": "#682212", "dep": "Services" },
    { "id": "rsmeethhy@nytimes.com", "title": "Richardo Smeeth", "color": "#32fbfb", "dep": "Marketing" },
    { "id": "pmollerhz@mtv.com", "title": "Phillis Moller", "color": "#ffe8d3", "dep": "Research and Development" },
    { "id": "rsynani0@usatoday.com", "title": "Rosmunda Synan", "color": "#7709ed", "dep": "Research and Development" },
    { "id": "dtorrei1@angelfire.com", "title": "Dunc Torre", "color": "#55562e", "dep": "Human Resources" },
    { "id": "ghousbeyi2@surveymonkey.com", "title": "Gerrard Housbey", "color": "#7282e2", "dep": "Training" },
    { "id": "rtitheridgei3@vkontakte.ru", "title": "Rogers Titheridge", "color": "#2f3afa", "dep": "Product Management" },
    { "id": "amcilraithi4@utexas.edu", "title": "Allistir McIlraith", "color": "#9b81eb", "dep": "Marketing" },
    { "id": "rbroomhalli5@europa.eu", "title": "Ricki Broomhall", "color": "#b03ada", "dep": "Business Development" },
    { "id": "sguieli6@va.gov", "title": "Sergent Guiel", "color": "#71941e", "dep": "Engineering" },
    { "id": "cseamansi7@nyu.edu", "title": "Cordy Seamans", "color": "#0f8734", "dep": "Marketing" },
    { "id": "ntintoi8@example.com", "title": "Nettie Tinto", "color": "#20ff28", "dep": "Support" },
    { "id": "asilverstonei9@techcrunch.com", "title": "Arabel Silverstone", "color": "#4b8f01", "dep": "Services" },
    { "id": "bcoultishia@ft.com", "title": "Berni Coultish", "color": "#f4598e", "dep": "Engineering" },
    { "id": "dcraneyib@latimes.com", "title": "Doyle Craney", "color": "#6be7ef", "dep": "Legal" },
    { "id": "cdowzellic@youku.com", "title": "Chaddie Dowzell", "color": "#2eb91a", "dep": "Accounting" },
    { "id": "esafhillid@theguardian.com", "title": "Eada Safhill", "color": "#7161d5", "dep": "Training" },
    { "id": "mmannieie@cloudflare.com", "title": "Merle Mannie", "color": "#658154", "dep": "Services" },
    { "id": "hkrysztowczykif@comcast.net", "title": "Henryetta Krysztowczyk", "color": "#c5af06", "dep": "Sales" },
    { "id": "mhanleyig@php.net", "title": "Morris Hanley", "color": "#8cef6f", "dep": "Business Development" },
    { "id": "mduffillih@indiegogo.com", "title": "Martyn Duffill", "color": "#9ba6ec", "dep": "Product Management" },
    { "id": "obruinsmaii@nasa.gov", "title": "Odo Bruinsma", "color": "#6c22fd", "dep": "Human Resources" },
    { "id": "dtobinij@cnbc.com", "title": "Dominick Tobin", "color": "#4ef7c2", "dep": "Business Development" },
    { "id": "mcridgeik@mapy.cz", "title": "Mattie Cridge", "color": "#33133c", "dep": "Support" },
    { "id": "rchristopheil@twitpic.com", "title": "Rebeka Christophe", "color": "#52b620", "dep": "Accounting" },
    { "id": "ihavelineim@yellowbook.com", "title": "Idalia Haveline", "color": "#352458", "dep": "Legal" },
    { "id": "vferebeein@state.gov", "title": "Vince Ferebee", "color": "#83a38b", "dep": "Training" },
    { "id": "mskellyio@tinypic.com", "title": "Myrtle Skelly", "color": "#5604e9", "dep": "Training" },
    { "id": "mmathewip@youtu.be", "title": "Mathew Mathew", "color": "#5ab965", "dep": "Business Development" },
    { "id": "gnorthiq@umich.edu", "title": "Gerhard North", "color": "#0d77da", "dep": "Sales" },
    { "id": "emazellair@adobe.com", "title": "Estell Mazella", "color": "#1eb42a", "dep": "Business Development" },
    { "id": "jsimonetonis@yandex.ru", "title": "Jacobo Simoneton", "color": "#88ef04", "dep": "Training" },
    { "id": "gblakeit@ftc.gov", "title": "Gran Blake", "color": "#b36cc6", "dep": "Sales" },
    { "id": "ckobkeiu@delicious.com", "title": "Corina Kobke", "color": "#fa1dd3", "dep": "Training" },
    { "id": "bmacrorieiv@eepurl.com", "title": "Benedict MacRorie", "color": "#621636", "dep": "Accounting" },
    { "id": "cferrieiw@domainmarket.com", "title": "Cammie Ferrie", "color": "#274732", "dep": "Services" },
    { "id": "spinnegarix@techcrunch.com", "title": "Shannon Pinnegar", "color": "#ab1803", "dep": "Marketing" },
    { "id": "dcanavaniy@lycos.com", "title": "Deeanne Canavan", "color": "#5d6c28", "dep": "Research and Development" },
    { "id": "nhiziriz@opera.com", "title": "Nikos Hizir", "color": "#ba3ea2", "dep": "Legal" },
    { "id": "mdurnoj0@51.la", "title": "Mady Durno", "color": "#13a85b", "dep": "Training" },
    { "id": "rmcgaughayj1@marketwatch.com", "title": "Ralph McGaughay", "color": "#3031b8", "dep": "Human Resources" },
    { "id": "lgajewskij2@sohu.com", "title": "Lizzie Gajewski", "color": "#8d9220", "dep": "Sales" },
    { "id": "zlanphierj3@networkadvertising.org", "title": "Zola Lanphier", "color": "#aa8a00", "dep": "Accounting" },
    { "id": "kmacaulayj4@tumblr.com", "title": "Kristi MacAulay", "color": "#885a12", "dep": "Sales" },
    { "id": "tmckinnonj5@apache.org", "title": "Tamas McKinnon", "color": "#403ec7", "dep": "Support" },
    { "id": "cdrewj6@github.com", "title": "Cristobal Drew", "color": "#d5a65d", "dep": "Marketing" },
    { "id": "mcollingj7@privacy.gov.au", "title": "Meredithe Colling", "color": "#3d9bb8", "dep": "Human Resources" },
    { "id": "madkinj8@yahoo.com", "title": "Maegan Adkin", "color": "#175d1f", "dep": "Business Development" },
    { "id": "cgrievsonj9@amazon.co.uk", "title": "Cheston Grievson", "color": "#90f328", "dep": "Accounting" },
    { "id": "mweyja@miitbeian.gov.cn", "title": "Marie Wey", "color": "#83943b", "dep": "Legal" },
    { "id": "wdonaldsonjb@mac.com", "title": "Wendall Donaldson", "color": "#f08730", "dep": "Human Resources" },
    { "id": "kbracchijc@blog.com", "title": "Karyl Bracchi", "color": "#9e544c", "dep": "Legal" },
    { "id": "rbeachemjd@wired.com", "title": "Robinetta Beachem", "color": "#90a046", "dep": "Product Management" },
    { "id": "rbenerje@constantcontact.com", "title": "Romola Bener", "color": "#e46c4c", "dep": "Legal" },
    { "id": "tlimmerjf@parallels.com", "title": "Teresa Limmer", "color": "#1979a2", "dep": "Product Management" },
    { "id": "dargentjg@clickbank.net", "title": "Danielle Argent", "color": "#ec6939", "dep": "Accounting" },
    { "id": "thearsonjh@pagesperso-orange.fr", "title": "Thorsten Hearson", "color": "#cb6473", "dep": "Business Development" },
    { "id": "pbrellinji@europa.eu", "title": "Pru Brellin", "color": "#99243e", "dep": "Sales" },
    { "id": "jsnarttjj@technorati.com", "title": "Jarrad Snartt", "color": "#575cbd", "dep": "Training" },
    { "id": "steasdalemarkiejk@pbs.org", "title": "Sherye Teasdale-Markie", "color": "#eb6294", "dep": "Product Management" },
    { "id": "tbagehotjl@phpbb.com", "title": "Tabatha Bagehot", "color": "#f12b0f", "dep": "Business Development" },
    { "id": "imquhanjm@cyberchimps.com", "title": "Ibbie M'Quhan", "color": "#a55663", "dep": "Engineering" },
    { "id": "whowgatejn@bigcartel.com", "title": "Westley Howgate", "color": "#29a54a", "dep": "Accounting" },
    { "id": "wpellewjo@bloomberg.com", "title": "Winston Pellew", "color": "#2b5a11", "dep": "Product Management" },
    { "id": "dwithnalljp@state.tx.us", "title": "Delaney Withnall", "color": "#180ae8", "dep": "Research and Development" },
    { "id": "aharesjq@4shared.com", "title": "Ailey Hares", "color": "#1ea698", "dep": "Marketing" },
    { "id": "fklaessonjr@dropbox.com", "title": "Flore Klaesson", "color": "#336604", "dep": "Support" },
    { "id": "khymersjs@issuu.com", "title": "Kev Hymers", "color": "#c9963a", "dep": "Human Resources" },
    { "id": "cdunbobbinjt@guardian.co.uk", "title": "Cathyleen Dunbobbin", "color": "#c60115", "dep": "Legal" },
    { "id": "lcayetteju@umn.edu", "title": "Laurent Cayette", "color": "#9e74d3", "dep": "Training" },
    { "id": "cvaunjv@ebay.co.uk", "title": "Candi Vaun", "color": "#cd9b18", "dep": "Services" },
    { "id": "obowartjw@tinyurl.com", "title": "Orton Bowart", "color": "#4ab30d", "dep": "Legal" },
    { "id": "mworlockjx@simplemachines.org", "title": "Margi Worlock", "color": "#d4a4a4", "dep": "Product Management" },
    { "id": "rmutlowjy@nymag.com", "title": "Rhea Mutlow", "color": "#0383f9", "dep": "Services" },
    { "id": "ytugmanjz@woothemes.com", "title": "Yves Tugman", "color": "#a2c688", "dep": "Human Resources" },
    { "id": "ggasperok0@friendfeed.com", "title": "Gertrudis Gaspero", "color": "#a7aedc", "dep": "Services" },
    { "id": "nsouthcottk1@storify.com", "title": "Nalani Southcott", "color": "#f86872", "dep": "Business Development" },
    { "id": "cmurneyk2@time.com", "title": "Cello Murney", "color": "#ab493a", "dep": "Services" },
    { "id": "hgrottyk3@cmu.edu", "title": "Haroun Grotty", "color": "#7db58d", "dep": "Research and Development" },
    { "id": "lwyliek4@blogger.com", "title": "Lin Wylie", "color": "#7f8186", "dep": "Services" },
    { "id": "jbraganzak5@themeforest.net", "title": "Jean Braganza", "color": "#a22587", "dep": "Product Management" },
    { "id": "khorbathk6@ox.ac.uk", "title": "Kin Horbath", "color": "#02ad34", "dep": "Accounting" },
    { "id": "mlembkek7@bandcamp.com", "title": "Martelle Lembke", "color": "#53d997", "dep": "Engineering" },
    { "id": "malfk8@cisco.com", "title": "Montgomery Alf", "color": "#589aa3", "dep": "Engineering" },
    { "id": "loveryk9@tuttocitta.it", "title": "Laney Overy", "color": "#ca2d1d", "dep": "Business Development" },
    { "id": "tlillowka@salon.com", "title": "Trixi Lillow", "color": "#a0c90c", "dep": "Sales" },
    { "id": "mtolankb@msu.edu", "title": "Mattie Tolan", "color": "#db53fc", "dep": "Human Resources" },
    { "id": "aiddendenkc@si.edu", "title": "Alameda Iddenden", "color": "#2c09c7", "dep": "Business Development" },
    { "id": "lspornerkd@netscape.com", "title": "Lynnet Sporner", "color": "#79182c", "dep": "Research and Development" },
    { "id": "dbowrake@webeden.co.uk", "title": "Dalston Bowra", "color": "#c9ff49", "dep": "Services" },
    { "id": "ipratikf@rediff.com", "title": "Irina Prati", "color": "#cc50f3", "dep": "Accounting" },
    { "id": "msaysekg@dell.com", "title": "Malinde Sayse", "color": "#aaec24", "dep": "Research and Development" },
    { "id": "mearengeykh@nifty.com", "title": "Merle Earengey", "color": "#be8825", "dep": "Research and Development" },
    { "id": "cvoiseyki@bbb.org", "title": "Cody Voisey", "color": "#517ead", "dep": "Sales" },
    { "id": "edarchkj@typepad.com", "title": "Etan Darch", "color": "#33f84b", "dep": "Accounting" },
    { "id": "lvankk@wikimedia.org", "title": "Lurette Van Dijk", "color": "#6022ff", "dep": "Sales" },
    { "id": "kmurrockkl@epa.gov", "title": "Kata Murrock", "color": "#437d7b", "dep": "Training" },
    { "id": "vchallinerkm@weibo.com", "title": "Violette Challiner", "color": "#0507a6", "dep": "Human Resources" },
    { "id": "zgersonkn@free.fr", "title": "Zacharia Gerson", "color": "#9233f8", "dep": "Training" },
    { "id": "castupenasko@alexa.com", "title": "Con Astupenas", "color": "#93bb12", "dep": "Engineering" },
    { "id": "kpurchasekp@purevolume.com", "title": "Kris Purchase", "color": "#10811c", "dep": "Sales" },
    { "id": "mcoyekq@ow.ly", "title": "Margit Coye", "color": "#777f31", "dep": "Human Resources" },
    { "id": "ltocquevillekr@booking.com", "title": "Lishe Tocqueville", "color": "#bed04e", "dep": "Engineering" },
    { "id": "cleyborneks@youtu.be", "title": "Carina Leyborne", "color": "#7b1539", "dep": "Accounting" },
    { "id": "ibrittlekt@tuttocitta.it", "title": "Irma Brittle", "color": "#96a6ee", "dep": "Sales" },
    { "id": "mhacquelku@earthlink.net", "title": "Merwyn Hacquel", "color": "#b360c9", "dep": "Legal" },
    { "id": "srushekv@simplemachines.org", "title": "Stacy Rushe", "color": "#eb033f", "dep": "Human Resources" },
    { "id": "cpotierkw@unblog.fr", "title": "Christy Potier", "color": "#15f230", "dep": "Engineering" },
    { "id": "ddonankx@washington.edu", "title": "Dottie Donan", "color": "#006eaa", "dep": "Legal" },
    { "id": "sfrankcombeky@dell.com", "title": "Sileas Frankcombe", "color": "#f4a607", "dep": "Services" },
    { "id": "snellekz@goo.ne.jp", "title": "Sandye Nelle", "color": "#0063f8", "dep": "Accounting" },
    { "id": "abingalll0@springer.com", "title": "Alyssa Bingall", "color": "#ddd5d8", "dep": "Services" },
    { "id": "mmacanelleyl1@amazon.co.jp", "title": "Minne MacAnelley", "color": "#a05857", "dep": "Services" },
    { "id": "klockl2@ameblo.jp", "title": "Kelsy Lock", "color": "#805484", "dep": "Business Development" },
    { "id": "byaldenl3@who.int", "title": "Berny Yalden", "color": "#ca517f", "dep": "Marketing" },
    { "id": "rlinggoodl4@squidoo.com", "title": "Rustie Linggood", "color": "#8dc68c", "dep": "Legal" },
    { "id": "hpeel5@marriott.com", "title": "Helen Pee", "color": "#b6e01d", "dep": "Marketing" },
    { "id": "cballantinel6@bloglovin.com", "title": "Christie Ballantine", "color": "#1c5ea2", "dep": "Sales" },
    { "id": "rbessl7@imgur.com", "title": "Reece Bess", "color": "#d6424c", "dep": "Accounting" },
    { "id": "zjocklel8@theglobeandmail.com", "title": "Zelda Jockle", "color": "#e21562", "dep": "Engineering" },
    { "id": "sgoshawkel9@acquirethisname.com", "title": "Shirline Goshawke", "color": "#9fa04a", "dep": "Sales" },
    { "id": "ddykela@fc2.com", "title": "Duky Dyke", "color": "#42090a", "dep": "Business Development" },
    { "id": "pmccaughanlb@linkedin.com", "title": "Perry McCaughan", "color": "#7896d8", "dep": "Support" },
    { "id": "csillicklc@domainmarket.com", "title": "Claybourne Sillick", "color": "#6d0a62", "dep": "Support" },
    { "id": "ywinsladeld@prweb.com", "title": "Yasmeen Winslade", "color": "#74a507", "dep": "Marketing" },
    { "id": "mkenwrickle@unicef.org", "title": "Madelon Kenwrick", "color": "#9a14b1", "dep": "Sales" },
    { "id": "jcrippeslf@epa.gov", "title": "Jessa Crippes", "color": "#1eed6b", "dep": "Product Management" },
    { "id": "fcoglelg@stanford.edu", "title": "Frants Cogle", "color": "#c25891", "dep": "Engineering" },
    { "id": "gbaggelleylh@unblog.fr", "title": "Gothart Baggelley", "color": "#64bc13", "dep": "Product Management" },
    { "id": "dsabattierli@usgs.gov", "title": "Daven Sabattier", "color": "#1a801c", "dep": "Product Management" },
    { "id": "asellerlj@yelp.com", "title": "Ashil Seller", "color": "#62058a", "dep": "Sales" },
    { "id": "rmcilrathlk@usa.gov", "title": "Roze McIlrath", "color": "#b61d86", "dep": "Accounting" },
    { "id": "dprattell@php.net", "title": "Duke Pratte", "color": "#44c1dc", "dep": "Business Development" },
    { "id": "cshermanlm@rediff.com", "title": "Cicily Sherman", "color": "#8f589e", "dep": "Marketing" },
    { "id": "maltamiranoln@slideshare.net", "title": "Meghann Altamirano", "color": "#cad108", "dep": "Engineering" },
    { "id": "jroysonlo@thetimes.co.uk", "title": "Jasper Royson", "color": "#18291e", "dep": "Human Resources" },
    { "id": "pwitchallslp@webs.com", "title": "Paxon Witchalls", "color": "#25fbac", "dep": "Services" },
    { "id": "glappinglq@sohu.com", "title": "Georgetta Lapping", "color": "#bcfa8f", "dep": "Support" },
    { "id": "asmizlr@shareasale.com", "title": "Abdel Smiz", "color": "#ce2aaa", "dep": "Product Management" },
    { "id": "mkewls@cyberchimps.com", "title": "Murial Kew", "color": "#7f7bcc", "dep": "Marketing" },
    { "id": "odagnanlt@cafepress.com", "title": "Oswell Dagnan", "color": "#cc3dc4", "dep": "Research and Development" },
    { "id": "ctarbornlu@domainmarket.com", "title": "Cristina Tarborn", "color": "#a53581", "dep": "Human Resources" },
    { "id": "bhagerghamlv@privacy.gov.au", "title": "Bobbee Hagergham", "color": "#33a46d", "dep": "Support" },
    { "id": "pfitkinlw@ebay.co.uk", "title": "Peder Fitkin", "color": "#eec082", "dep": "Business Development" },
    { "id": "chullyerlx@cornell.edu", "title": "Corly Hullyer", "color": "#468ea0", "dep": "Human Resources" },
    { "id": "mstuddersly@360.cn", "title": "Merla Studders", "color": "#c7483f", "dep": "Sales" },
    { "id": "pchandlarlz@independent.co.uk", "title": "Perry Chandlar", "color": "#d02bd6", "dep": "Business Development" },
    { "id": "mtroakm0@bandcamp.com", "title": "Mireille Troak", "color": "#34d2c0", "dep": "Engineering" },
    { "id": "krockcliffem1@addtoany.com", "title": "Kevin Rockcliffe", "color": "#a91f3f", "dep": "Research and Development" },
    { "id": "hmacswaydem2@amazon.de", "title": "Herc MacSwayde", "color": "#986b66", "dep": "Legal" },
    { "id": "nruzicm3@canalblog.com", "title": "Nicolais Ruzic", "color": "#fe6829", "dep": "Business Development" },
    { "id": "dcundm4@ehow.com", "title": "Dorena Cund", "color": "#d526ca", "dep": "Services" },
    { "id": "iberridgem5@miitbeian.gov.cn", "title": "Irvine Berridge", "color": "#50899d", "dep": "Legal" },
    { "id": "zgingerm6@discovery.com", "title": "Zelig Ginger", "color": "#12b121", "dep": "Business Development" },
    { "id": "lgrobm7@about.com", "title": "Lancelot Grob", "color": "#2d50b4", "dep": "Business Development" },
    { "id": "mspancockm8@spiegel.de", "title": "Midge Spancock", "color": "#eb972b", "dep": "Support" },
    { "id": "asimmgenm9@skyrock.com", "title": "Alvan Simmgen", "color": "#add02d", "dep": "Marketing" },
    { "id": "kkeninghamma@theglobeandmail.com", "title": "Kirbie Keningham", "color": "#cc2ff9", "dep": "Human Resources" },
    { "id": "mhamblettmb@cpanel.net", "title": "Morrie Hamblett", "color": "#29ecdb", "dep": "Accounting" },
    { "id": "mrokemc@who.int", "title": "Magdalena Roke", "color": "#d0afc0", "dep": "Support" },
    { "id": "hvostmd@printfriendly.com", "title": "Hunt Vost", "color": "#990f6b", "dep": "Marketing" },
    { "id": "rbonallackme@patch.com", "title": "Rowland Bonallack", "color": "#204beb", "dep": "Human Resources" },
    { "id": "jclacksonmf@purevolume.com", "title": "Jefferey Clackson", "color": "#9b9c87", "dep": "Sales" },
    { "id": "dclaxtonmg@pbs.org", "title": "Dorree Claxton", "color": "#5f1eda", "dep": "Sales" },
    { "id": "khaberghammh@thetimes.co.uk", "title": "Kori Habergham", "color": "#2416ab", "dep": "Accounting" },
    { "id": "kgaddesmi@ask.com", "title": "Kelci Gaddes", "color": "#88c946", "dep": "Business Development" },
    { "id": "abarnissmj@is.gd", "title": "Aleen Barniss", "color": "#9a2cb3", "dep": "Training" },
    { "id": "fsandercroftmk@home.pl", "title": "Fanny Sandercroft", "color": "#665d09", "dep": "Accounting" },
    { "id": "dfilipml@twitpic.com", "title": "Dorian Filip", "color": "#3febfe", "dep": "Product Management" },
    { "id": "jdragoemm@theatlantic.com", "title": "Jaye Dragoe", "color": "#ce23a5", "dep": "Marketing" },
    { "id": "wlongmoremn@examiner.com", "title": "Wilfrid Longmore", "color": "#5e8e95", "dep": "Services" },
    { "id": "lcossemmo@nasa.gov", "title": "Lanita Cossem", "color": "#d9a729", "dep": "Support" },
    { "id": "dvalentimmp@angelfire.com", "title": "Danita Valentim", "color": "#b54d4b", "dep": "Services" },
    { "id": "smalenoirmq@noaa.gov", "title": "Sophronia Malenoir", "color": "#ca879c", "dep": "Research and Development" },
    { "id": "bgirlingmr@chron.com", "title": "Berny Girling", "color": "#cedb3c", "dep": "Marketing" },
    { "id": "mchaffynms@live.com", "title": "Minna Chaffyn", "color": "#8e5520", "dep": "Training" },
    { "id": "coffellmt@mlb.com", "title": "Christabel Offell", "color": "#13a8af", "dep": "Legal" },
    { "id": "vgeatermu@msu.edu", "title": "Vernon Geater", "color": "#19cb81", "dep": "Human Resources" },
    { "id": "chazlewoodmv@timesonline.co.uk", "title": "Carlynne Hazlewood", "color": "#a751ef", "dep": "Business Development" },
    { "id": "apoulsonmw@desdev.cn", "title": "Alanah Poulson", "color": "#09899d", "dep": "Marketing" },
    { "id": "mdoddemeademx@hexun.com", "title": "Marya Doddemeade", "color": "#8ded03", "dep": "Engineering" },
    { "id": "swilcocksmy@php.net", "title": "Sonny Wilcocks", "color": "#77708e", "dep": "Marketing" },
    { "id": "jsteersmz@github.io", "title": "Jesselyn Steers", "color": "#88f395", "dep": "Business Development" },
    { "id": "tcapeyn0@craigslist.org", "title": "Trenton Capey", "color": "#5cd58d", "dep": "Services" },
    { "id": "aattriden1@youku.com", "title": "Alonso Attride", "color": "#0e2d95", "dep": "Business Development" },
    { "id": "tobradainn2@paginegialle.it", "title": "Theresita O'Bradain", "color": "#aa49ea", "dep": "Legal" },
    { "id": "gdowdan3@ucoz.ru", "title": "Georges Dowda", "color": "#c32232", "dep": "Sales" },
    { "id": "irablenn4@prweb.com", "title": "Ines Rablen", "color": "#c64dc4", "dep": "Accounting" },
    { "id": "aogavinn5@netlog.com", "title": "Ashlen O'Gavin", "color": "#2101e7", "dep": "Training" },
    { "id": "mdumbartonn6@europa.eu", "title": "Mathilde Dumbarton", "color": "#1d8965", "dep": "Services" },
    { "id": "esewilln7@seesaa.net", "title": "Elnar Sewill", "color": "#bd834a", "dep": "Marketing" },
    { "id": "nmurtelln8@comcast.net", "title": "Noella Murtell", "color": "#b01d7d", "dep": "Marketing" },
    { "id": "tantognazzin9@vimeo.com", "title": "Trever Antognazzi", "color": "#231d1f", "dep": "Engineering" },
    { "id": "mmceniryna@va.gov", "title": "Mariann McEniry", "color": "#8046f9", "dep": "Human Resources" },
    { "id": "clatimernb@foxnews.com", "title": "Clo Latimer", "color": "#2f594e", "dep": "Human Resources" },
    { "id": "fwalickinc@epa.gov", "title": "Florrie Walicki", "color": "#979ec5", "dep": "Training" },
    { "id": "rcallawaynd@tumblr.com", "title": "Rancell Callaway", "color": "#02aedc", "dep": "Marketing" },
    { "id": "sdolmanne@icq.com", "title": "Samantha Dolman", "color": "#a99384", "dep": "Business Development" },
    { "id": "urustonnf@cargocollective.com", "title": "Umeko Ruston", "color": "#44d9cb", "dep": "Business Development" },
    { "id": "tkellingtonng@businessinsider.com", "title": "Thedrick Kellington", "color": "#75e7a8", "dep": "Accounting" },
    { "id": "sbebisnh@wix.com", "title": "Scarlett Bebis", "color": "#9514a0", "dep": "Business Development" },
    { "id": "nsturgeonni@about.me", "title": "Noah Sturgeon", "color": "#0124e0", "dep": "Services" },
    { "id": "ddalyielnj@wp.com", "title": "Darell Dalyiel", "color": "#afc471", "dep": "Accounting" },
    { "id": "rbeverleynk@delicious.com", "title": "Redd Beverley", "color": "#1ae7f7", "dep": "Business Development" },
    { "id": "bwycliffnl@gnu.org", "title": "Birgit Wycliff", "color": "#ce6eca", "dep": "Accounting" },
    { "id": "mgreenwoodnm@godaddy.com", "title": "Marjie Greenwood", "color": "#eead7b", "dep": "Sales" },
    { "id": "pamayann@pen.io", "title": "Petronella Amaya", "color": "#1640a8", "dep": "Services" },
    { "id": "eschapirono@people.com.cn", "title": "Egbert Schapiro", "color": "#872347", "dep": "Human Resources" },
    { "id": "ccoomernp@google.de", "title": "Christiano Coomer", "color": "#77466b", "dep": "Marketing" },
    { "id": "ldeeveynq@ebay.com", "title": "Lowell Deevey", "color": "#9d016a", "dep": "Legal" },
    { "id": "csewardsnr@godaddy.com", "title": "Catharina Sewards", "color": "#1abb4e", "dep": "Support" },
    { "id": "bdumkens@theglobeandmail.com", "title": "Brina Dumke", "color": "#b98dcd", "dep": "Legal" },
    { "id": "hbafordnt@adobe.com", "title": "Harriott Baford", "color": "#ff1150", "dep": "Services" },
    { "id": "aisakovnu@vk.com", "title": "Annalise Isakov", "color": "#884e79", "dep": "Engineering" },
    { "id": "lgherardinv@pbs.org", "title": "Lothaire Gherardi", "color": "#921fea", "dep": "Research and Development" },
    { "id": "dshillidaynw@vistaprint.com", "title": "Duff Shilliday", "color": "#57048e", "dep": "Human Resources" },
    { "id": "erathmellnx@woothemes.com", "title": "Elaine Rathmell", "color": "#c07c04", "dep": "Legal" },
    { "id": "cbrussellny@altervista.org", "title": "Constance Brussell", "color": "#1b79dc", "dep": "Product Management" },
    { "id": "brimesnz@illinois.edu", "title": "Britte Rimes", "color": "#6e6a5f", "dep": "Engineering" },
    { "id": "esartono0@cnbc.com", "title": "Elvina Sarton", "color": "#51fce4", "dep": "Research and Development" },
    { "id": "bghidettio1@deliciousdays.com", "title": "Bary Ghidetti", "color": "#5e0a32", "dep": "Human Resources" },
    { "id": "abriano2@theglobeandmail.com", "title": "Amalle Brian", "color": "#a8be0c", "dep": "Sales" },
    { "id": "mhaimeo3@ning.com", "title": "Mira Haime", "color": "#9fec08", "dep": "Product Management" },
    { "id": "molvero4@shinystat.com", "title": "Margaux Olver", "color": "#4c5ae4", "dep": "Legal" },
    { "id": "jwellbelovedo5@infoseek.co.jp", "title": "Joan Wellbeloved", "color": "#ad6926", "dep": "Services" },
    { "id": "edeo6@go.com", "title": "Enoch de Lloyd", "color": "#e59d5f", "dep": "Human Resources" },
    { "id": "cjosowitzo7@indiatimes.com", "title": "Constantine Josowitz", "color": "#7a65f1", "dep": "Accounting" },
    { "id": "kpetreczo8@nhs.uk", "title": "Kassie Petrecz", "color": "#5b37ba", "dep": "Research and Development" },
    { "id": "hlintillo9@digg.com", "title": "Hayden Lintill", "color": "#54da89", "dep": "Sales" },
    { "id": "dderbyshireoa@feedburner.com", "title": "Devy Derbyshire", "color": "#545937", "dep": "Training" },
    { "id": "kthoumassonob@msn.com", "title": "Kari Thoumasson", "color": "#abf7cd", "dep": "Marketing" },
    { "id": "sbrooksoc@ucla.edu", "title": "Shara Brooks", "color": "#df72c2", "dep": "Support" },
    { "id": "bbiddlestoneod@symantec.com", "title": "Barb Biddlestone", "color": "#777621", "dep": "Product Management" },
    { "id": "ghattooe@squarespace.com", "title": "Gwendolin Hatto", "color": "#80aca8", "dep": "Product Management" },
    { "id": "gbeamesof@hostgator.com", "title": "Gerrard Beames", "color": "#72adcb", "dep": "Marketing" },
    { "id": "bwallsamog@gov.uk", "title": "Binny Wallsam", "color": "#875713", "dep": "Product Management" },
    { "id": "mregardsoeoh@walmart.com", "title": "Mikkel Regardsoe", "color": "#2e31fc", "dep": "Engineering" },
    { "id": "tcapstackoi@cafepress.com", "title": "Tawsha Capstack", "color": "#e1bde2", "dep": "Marketing" },
    { "id": "nmilleryoj@fema.gov", "title": "Nanine Millery", "color": "#b5a8b9", "dep": "Marketing" },
    { "id": "dblackborowok@github.io", "title": "Donall Blackborow", "color": "#81ab4b", "dep": "Research and Development" },
    { "id": "ljahnkeol@infoseek.co.jp", "title": "Lamond Jahnke", "color": "#c75fa5", "dep": "Engineering" },
    { "id": "npappsom@sbwire.com", "title": "Nessi Papps", "color": "#6abd79", "dep": "Training" },
    { "id": "fnilleson@angelfire.com", "title": "Florrie Nilles", "color": "#46eb28", "dep": "Product Management" },
    { "id": "vpratleyoo@hexun.com", "title": "Vin Pratley", "color": "#6662d6", "dep": "Marketing" },
    { "id": "tpahlssonop@ustream.tv", "title": "Tish Pahlsson", "color": "#1763db", "dep": "Support" },
    { "id": "rhalseoq@omniture.com", "title": "Ruthie Halse", "color": "#24cab7", "dep": "Accounting" },
    { "id": "jvallentinor@theatlantic.com", "title": "Jaine Vallentin", "color": "#f3dac7", "dep": "Product Management" },
    { "id": "vnottinghamos@unc.edu", "title": "Violante Nottingham", "color": "#9e09a0", "dep": "Human Resources" },
    { "id": "aoakdenot@stumbleupon.com", "title": "Alexandre Oakden", "color": "#763cc5", "dep": "Human Resources" },
    { "id": "cchestersou@columbia.edu", "title": "Carce Chesters", "color": "#b8e4a4", "dep": "Engineering" },
    { "id": "bschollickov@gizmodo.com", "title": "Bancroft Schollick", "color": "#f57647", "dep": "Engineering" },
    { "id": "cthirlwellow@illinois.edu", "title": "Charita Thirlwell", "color": "#76862c", "dep": "Business Development" },
    { "id": "zsimkovitzox@ameblo.jp", "title": "Zoe Simkovitz", "color": "#3928dd", "dep": "Product Management" },
    { "id": "lblissittoy@narod.ru", "title": "Lucais Blissitt", "color": "#f5b184", "dep": "Sales" },
    { "id": "hpeeteoz@geocities.com", "title": "Hermione Peete", "color": "#cf94a1", "dep": "Engineering" },
    { "id": "hgiffkinsp0@nasa.gov", "title": "Hillard Giffkins", "color": "#1fee58", "dep": "Sales" },
    { "id": "mkrollep1@psu.edu", "title": "Mamie Krolle", "color": "#2e25b8", "dep": "Training" },
    { "id": "rcrocumbep2@geocities.jp", "title": "Rosemarie Crocumbe", "color": "#4a2814", "dep": "Business Development" },
    { "id": "selmhirstp3@amazon.co.uk", "title": "Shannon Elmhirst", "color": "#83d714", "dep": "Support" },
    { "id": "aofearguisep4@miitbeian.gov.cn", "title": "Angelo O'Fearguise", "color": "#4627b5", "dep": "Accounting" },
    { "id": "bdibbinp5@over-blog.com", "title": "Borg Dibbin", "color": "#88a2cb", "dep": "Services" },
    { "id": "lmeasomp6@blog.com", "title": "Lissie Measom", "color": "#a7e4d1", "dep": "Business Development" },
    { "id": "bdriuttip7@domainmarket.com", "title": "Becki Driutti", "color": "#66b129", "dep": "Legal" },
    { "id": "mmcgivenp8@hhs.gov", "title": "Maurits McGiven", "color": "#b67a5b", "dep": "Sales" },
    { "id": "etwiggerp9@aboutads.info", "title": "Elsinore Twigger", "color": "#c10cfb", "dep": "Support" },
    { "id": "jwandenpa@army.mil", "title": "Janaya Wanden", "color": "#e032fc", "dep": "Engineering" },
    { "id": "amocklerpb@51.la", "title": "Ashly Mockler", "color": "#6d7158", "dep": "Research and Development" },
    { "id": "ediehnpc@ezinearticles.com", "title": "Evelina Diehn", "color": "#d9d91e", "dep": "Training" },
    { "id": "eedgerpd@auda.org.au", "title": "Emlen Edger", "color": "#1d5ca7", "dep": "Support" },
    { "id": "jchalfainpe@engadget.com", "title": "Jacklyn Chalfain", "color": "#091fbc", "dep": "Training" },
    { "id": "spenningtonpf@bbc.co.uk", "title": "Suki Pennington", "color": "#381724", "dep": "Business Development" },
    { "id": "afairfootpg@naver.com", "title": "Aron Fairfoot", "color": "#601e24", "dep": "Legal" },
    { "id": "lfrancesconeph@furl.net", "title": "Lyndsay Francescone", "color": "#a6affb", "dep": "Accounting" },
    { "id": "rteerspi@buzzfeed.com", "title": "Rafaello Teers", "color": "#f2e39c", "dep": "Accounting" },
    { "id": "utroakpj@g.co", "title": "Ursola Troak", "color": "#5c8b19", "dep": "Business Development" },
    { "id": "elawlandpk@sciencedaily.com", "title": "Erna Lawland", "color": "#125e01", "dep": "Human Resources" },
    { "id": "jaleevypl@tripod.com", "title": "Jodee Aleevy", "color": "#29c3fe", "dep": "Accounting" },
    { "id": "tmeiklepm@istockphoto.com", "title": "Titus Meikle", "color": "#4a87c8", "dep": "Product Management" },
    { "id": "ashotboultepn@theatlantic.com", "title": "Anastassia Shotboulte", "color": "#c3c2fb", "dep": "Product Management" },
    { "id": "breckpo@state.gov", "title": "Berte Reck", "color": "#26bb56", "dep": "Sales" },
    { "id": "efeighrypp@baidu.com", "title": "Edy Feighry", "color": "#66b2bb", "dep": "Product Management" },
    { "id": "clilleycroppq@w3.org", "title": "Cody Lilleycrop", "color": "#c6942d", "dep": "Research and Development" },
    { "id": "fcornhillpr@cdc.gov", "title": "Frank cornhill", "color": "#1b2d4b", "dep": "Business Development" },
    { "id": "nchessorps@symantec.com", "title": "Nolly Chessor", "color": "#78f65a", "dep": "Marketing" },
    { "id": "esparrowpt@yahoo.co.jp", "title": "Emelina Sparrow", "color": "#295b9d", "dep": "Marketing" },
    { "id": "kstollenhofpu@meetup.com", "title": "Kelvin Stollenhof", "color": "#87720f", "dep": "Training" },
    { "id": "bbourrelpv@hao123.com", "title": "Bellina Bourrel", "color": "#8cbab0", "dep": "Services" },
    { "id": "prizzardopw@indiatimes.com", "title": "Phip Rizzardo", "color": "#0e7788", "dep": "Support" },
    { "id": "doduilleainpx@goo.gl", "title": "Donni O'Duilleain", "color": "#6f3f38", "dep": "Legal" },
    { "id": "tgreensidepy@canalblog.com", "title": "Tammie Greenside", "color": "#b00c44", "dep": "Legal" },
    { "id": "sskulletpz@google.co.uk", "title": "Steffie Skullet", "color": "#bad643", "dep": "Support" },
    { "id": "hbrabenderq0@indiegogo.com", "title": "Hobie Brabender", "color": "#bdec00", "dep": "Accounting" },
    { "id": "ldenhamq1@tinyurl.com", "title": "Leshia Denham", "color": "#19a692", "dep": "Sales" },
    { "id": "kpaskellq2@wisc.edu", "title": "Karil Paskell", "color": "#a871e3", "dep": "Engineering" },
    { "id": "cdavidoffq3@tiny.cc", "title": "Cesar Davidoff", "color": "#be498b", "dep": "Research and Development" },
    { "id": "jfikeq4@is.gd", "title": "Jamil Fike", "color": "#4cc751", "dep": "Training" },
    { "id": "wsharplesq5@newyorker.com", "title": "Willis Sharples", "color": "#53445c", "dep": "Sales" },
    { "id": "jfippq6@gmpg.org", "title": "Judye Fipp", "color": "#384cea", "dep": "Research and Development" },
    { "id": "bmattersonq7@cyberchimps.com", "title": "Barbaraanne Matterson", "color": "#77e097", "dep": "Engineering" },
    { "id": "clanchburyq8@nature.com", "title": "Christos Lanchbury", "color": "#c01015", "dep": "Human Resources" },
    { "id": "akanterq9@quantcast.com", "title": "Allianora Kanter", "color": "#660b64", "dep": "Research and Development" },
    { "id": "spiscottiqa@bizjournals.com", "title": "Sondra Piscotti", "color": "#5e1b26", "dep": "Support" },
    { "id": "ddyhouseqb@youtu.be", "title": "Daron Dyhouse", "color": "#d4bec0", "dep": "Legal" },
    { "id": "cborgeqc@salon.com", "title": "Creighton Borge", "color": "#89b99c", "dep": "Product Management" },
    { "id": "rbletsorqd@about.me", "title": "Rory Bletsor", "color": "#99bd88", "dep": "Product Management" },
    { "id": "mbaldenqe@purevolume.com", "title": "Micky Balden", "color": "#cfa57e", "dep": "Legal" },
    { "id": "slealeqf@auda.org.au", "title": "Sophia Leale", "color": "#b953e8", "dep": "Business Development" },
    { "id": "jgrowcockqg@cbc.ca", "title": "Jammie Growcock", "color": "#f6ec26", "dep": "Legal" },
    { "id": "dtrowleqh@godaddy.com", "title": "Dewitt Trowle", "color": "#96b726", "dep": "Training" },
    { "id": "bcossellqi@chronoengine.com", "title": "Bea Cossell", "color": "#0fdf8b", "dep": "Human Resources" },
    { "id": "mmeadersqj@auda.org.au", "title": "Marillin Meaders", "color": "#eb8d3f", "dep": "Sales" },
    { "id": "jbodyqk@statcounter.com", "title": "Jena Body", "color": "#d5566a", "dep": "Research and Development" },
    { "id": "psteinhammerql@merriam-webster.com", "title": "Paule Steinhammer", "color": "#b3ce18", "dep": "Marketing" },
    { "id": "bpaulettiqm@google.fr", "title": "Bridie Pauletti", "color": "#9819cb", "dep": "Training" },
    { "id": "arudwellqn@mediafire.com", "title": "Annette Rudwell", "color": "#71fe49", "dep": "Engineering" },
    { "id": "iclemensonqo@multiply.com", "title": "Ingamar Clemenson", "color": "#8295f9", "dep": "Product Management" },
    { "id": "qbenjefieldqp@liveinternet.ru", "title": "Quentin Benjefield", "color": "#a2b8d8", "dep": "Accounting" },
    { "id": "chessingqq@ucoz.ru", "title": "Carolus Hessing", "color": "#829e23", "dep": "Accounting" },
    { "id": "evanneqr@mit.edu", "title": "Ediva Vanne", "color": "#fddf30", "dep": "Research and Development" },
    { "id": "ikordaqs@smh.com.au", "title": "Isaac Korda", "color": "#b7a571", "dep": "Services" },
    { "id": "dthrussellqt@disqus.com", "title": "Dannel Thrussell", "color": "#d31b0c", "dep": "Sales" },
    { "id": "acalafatoqu@lulu.com", "title": "Antoinette Calafato", "color": "#8782f0", "dep": "Services" },
    { "id": "sbechleyqv@dropbox.com", "title": "Saundra Bechley", "color": "#cb7e67", "dep": "Services" },
    { "id": "pacuttqw@virginia.edu", "title": "Patrica Acutt", "color": "#87c256", "dep": "Training" },
    { "id": "ctannqx@taobao.com", "title": "Cleve Tann", "color": "#a50431", "dep": "Research and Development" },
    { "id": "ldormerqy@nymag.com", "title": "Lauretta Dormer", "color": "#bfe546", "dep": "Human Resources" },
    { "id": "srogersonqz@narod.ru", "title": "Sauveur Rogerson", "color": "#9afc2a", "dep": "Marketing" },
    { "id": "jginnallyr0@weibo.com", "title": "Jay Ginnally", "color": "#cf864c", "dep": "Marketing" },
    { "id": "llambourner1@apple.com", "title": "Locke Lambourne", "color": "#929c02", "dep": "Product Management" },
    { "id": "galsterr2@barnesandnoble.com", "title": "Gennifer Alster", "color": "#980ab4", "dep": "Engineering" },
    { "id": "rcostellr3@bluehost.com", "title": "Rafaela Costell", "color": "#da4f42", "dep": "Services" },
    { "id": "tkerwoodr4@squarespace.com", "title": "Tiler Kerwood", "color": "#1e51ff", "dep": "Services" },
    { "id": "fizatr5@stumbleupon.com", "title": "Frederik Izat", "color": "#5a1263", "dep": "Sales" },
    { "id": "sbricknerr6@buzzfeed.com", "title": "Stanislas Brickner", "color": "#e46596", "dep": "Business Development" },
    { "id": "ccoarserr7@booking.com", "title": "Cathrine Coarser", "color": "#61c5c6", "dep": "Services" },
    { "id": "rphipsonr8@e-recht24.de", "title": "Rockey Phipson", "color": "#9e2fe9", "dep": "Research and Development" },
    { "id": "smayr9@bloglovin.com", "title": "Sherilyn May", "color": "#1437fa", "dep": "Engineering" },
    { "id": "lnutkinsra@people.com.cn", "title": "Letizia Nutkins", "color": "#1b91e4", "dep": "Sales" },
    { "id": "saustwickrb@upenn.edu", "title": "Symon Austwick", "color": "#db399e", "dep": "Legal" },
    { "id": "smartynovrc@ucoz.ru", "title": "Stu Martynov", "color": "#e65075", "dep": "Human Resources" },
    { "id": "clundrd@mashable.com", "title": "Constantin Lund", "color": "#3d124e", "dep": "Accounting" },
    { "id": "rdeknevetre@ycombinator.com", "title": "Radcliffe deKnevet", "color": "#85222d", "dep": "Research and Development" },
    { "id": "gbanasiakrf@aboutads.info", "title": "Gottfried Banasiak", "color": "#8cfc6c", "dep": "Research and Development" },
    { "id": "jnetleyrg@google.ru", "title": "Josephina Netley", "color": "#f3d740", "dep": "Marketing" },
    { "id": "zaimericrh@about.me", "title": "Zolly Aimeric", "color": "#03a6b9", "dep": "Research and Development" },
    { "id": "akunnekeri@tiny.cc", "title": "Alyssa Kunneke", "color": "#10039e", "dep": "Legal" },
    { "id": "mmerrettrj@dell.com", "title": "Merrilee Merrett", "color": "#020352", "dep": "Services" },
    { "id": "hboostrk@answers.com", "title": "Harris Boost", "color": "#4f56d4", "dep": "Accounting" },
    { "id": "pstrephanrl@pagesperso-orange.fr", "title": "Patrick Strephan", "color": "#43b474", "dep": "Marketing" },
    { "id": "mjertzrm@oaic.gov.au", "title": "Marcie Jertz", "color": "#8bf8a2", "dep": "Human Resources" },
    { "id": "nstoffelsrn@icq.com", "title": "Nadya Stoffels", "color": "#4f1ebc", "dep": "Business Development" },
    { "id": "afalkusro@reddit.com", "title": "Aridatha Falkus", "color": "#ba4692", "dep": "Business Development" },
    { "id": "dfeatleyrp@seattletimes.com", "title": "Dena Featley", "color": "#8bf3d3", "dep": "Legal" },
    { "id": "gcoklyrq@hc360.com", "title": "Gwenora Cokly", "color": "#2766a6", "dep": "Accounting" },
    { "id": "wbampfordrr@census.gov", "title": "Westley Bampford", "color": "#2ba89c", "dep": "Human Resources" }];


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__testdata__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CustomField__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CustomRenderers__ = __webpack_require__(12);




document.addEventListener("DOMContentLoaded", function (event) {
    var searchPicker = new __WEBPACK_IMPORTED_MODULE_1__src__["SearchPicker"](document.getElementById('searchpicker'), {
        placeholder: 'Sample placeholder',
        source: __WEBPACK_IMPORTED_MODULE_0__testdata__["a" /* TESTDATA */],
        minLengthToSearch: 0
    });
    bindPickerResultOutput(searchPicker);
    var searchPicker2 = new __WEBPACK_IMPORTED_MODULE_1__src__["SearchPicker"](document.getElementById('searchpicker-singlechoice'), {
        placeholder: 'Only 1 choice',
        source: __WEBPACK_IMPORTED_MODULE_0__testdata__["a" /* TESTDATA */],
        minLengthToSearch: 0,
        maxSelectedChoices: 1
    });
    bindPickerResultOutput(searchPicker2, 'singlechoice');
    var searchPicker3 = new __WEBPACK_IMPORTED_MODULE_1__src__["SearchPicker"](document.getElementById('searchpicker-unlim'), {
        placeholder: 'Unlimited choices, search from 3 symbols',
        source: __WEBPACK_IMPORTED_MODULE_0__testdata__["a" /* TESTDATA */],
        minLengthToSearch: 3
    });
    bindPickerResultOutput(searchPicker3, 'unlim');
    var searchPicker4 = new __WEBPACK_IMPORTED_MODULE_1__src__["SearchPicker"](document.getElementById('searchpicker-top3'), {
        placeholder: 'Show only top3 results',
        source: __WEBPACK_IMPORTED_MODULE_0__testdata__["a" /* TESTDATA */],
        resultsLimit: 3,
        maxSelectedChoices: 3
    });
    bindPickerResultOutput(searchPicker4, 'top3');
    var searchPicker5 = new __WEBPACK_IMPORTED_MODULE_1__src__["SearchPicker"](document.getElementById('searchpicker-cutlong'), {
        placeholder: 'Cut long text',
        source: __WEBPACK_IMPORTED_MODULE_0__testdata__["b" /* TESTDATA_LONG */],
        minLengthToSearch: 0,
    });
    bindPickerResultOutput(searchPicker5, 'cutlong');
    var searchPicker6 = new __WEBPACK_IMPORTED_MODULE_1__src__["SearchPicker"](document.getElementById('searchpicker-footer'), {
        placeholder: 'Footer',
        source: __WEBPACK_IMPORTED_MODULE_0__testdata__["a" /* TESTDATA */],
        minLengthToSearch: 0,
        resultsLimit: 3,
        resultFooterRenderer: __WEBPACK_IMPORTED_MODULE_3__CustomRenderers__["a" /* CustomRenderers */].footerRenderer
    });
    bindPickerResultOutput(searchPicker6, 'footer');
    new __WEBPACK_IMPORTED_MODULE_2__CustomField__["a" /* CustomField */]("#searchpicker-customfield");
});
function bindPickerResultOutput(picker, name) {
    var resHolder = document.getElementById(name ? 'searchpicker-result-' + name : 'searchpicker-result');
    picker.on("choiceAdded", function () {
        resHolder.innerHTML = picker.getChoices().map(function (elm) { return elm.id; }).join(",");
    });
    picker.on("choiceRemoved", function () {
        resHolder.innerHTML = picker.getChoices().map(function (elm) { return elm.id; }).join(",");
    });
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomField; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_options_DefaultSearchPickerOptions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__testdata__ = __webpack_require__(9);



var CustomField = (function () {
    function CustomField(elementLocator) {
        var _this = this;
        this.elem = document.querySelector(elementLocator);
        if (this.elem) {
            var defaults = new __WEBPACK_IMPORTED_MODULE_1__src_options_DefaultSearchPickerOptions__["a" /* DefaultSearchPickerOptions */]();
            defaults.source = __WEBPACK_IMPORTED_MODULE_2__testdata__["a" /* TESTDATA */];
            this.searchPickerResults = new __WEBPACK_IMPORTED_MODULE_0__src__["SearchPickerResults"](this.elem, defaults);
            this.elem.addEventListener("input", function (e) {
                if (e.target == document.activeElement) {
                    _this.searchPickerResults.search(_this.elem.value.split("\n").pop());
                }
            });
            this.searchPickerResults.on("resultSelected", function (result) {
                var temp = _this.elem.value.split("\n");
                temp.pop();
                _this.elem.value = temp.join("\n") + (temp.length ? "\n" : "") + result.title + "\n";
            });
            this.elem.addEventListener("keydown", function (evt) {
                var kc = evt.keyCode;
                switch (kc) {
                    case 13:
                        if (_this.searchPickerResults.isShown) {
                            _this.searchPickerResults.selectHighlighted('enter');
                            _this.searchPickerResults.hide();
                            evt.preventDefault();
                        }
                        break;
                    case 38:
                        _this.searchPickerResults.moveSelectedUp();
                        evt.preventDefault();
                        break;
                    case 40:
                        _this.searchPickerResults.moveSelectedDown();
                        evt.preventDefault();
                        break;
                }
            });
        }
        else {
            console.error("No element found to create CustomField Searchpicker");
        }
    }
    return CustomField;
}());



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomRenderers; });
var CustomRenderers = (function () {
    function CustomRenderers() {
    }
    CustomRenderers.footerRenderer = function (query, results, data) {
        if (!query)
            return null;
        var root = document.createElement('div');
        root.style.textAlign = 'center';
        root.style.padding = '10px';
        root.style.fontWeight = 'bold';
        root.style.backgroundColor = '#EEE';
        root.appendChild(document.createTextNode('Some results could be filtered due to query parameters'));
        return root;
    };
    return CustomRenderers;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map