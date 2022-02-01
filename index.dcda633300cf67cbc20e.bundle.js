/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/autocompleter/autocomplete.js":
/*!****************************************************!*\
  !*** ./node_modules/autocompleter/autocomplete.js ***!
  \****************************************************/
/***/ (function(module) {

eval("(function (global, factory) {\n   true ? module.exports = factory() :\n  0;\n}(this, (function () { 'use strict';\n\n  /*\r\n   * https://github.com/kraaden/autocomplete\r\n   * Copyright (c) 2016 Denys Krasnoshchok\r\n   * MIT License\r\n   */\r\n  function autocomplete(settings) {\r\n      // just an alias to minimize JS file size\r\n      var doc = document;\r\n      var container = settings.container || doc.createElement(\"div\");\r\n      var containerStyle = container.style;\r\n      var userAgent = navigator.userAgent;\r\n      var mobileFirefox = userAgent.indexOf(\"Firefox\") !== -1 && userAgent.indexOf(\"Mobile\") !== -1;\r\n      var debounceWaitMs = settings.debounceWaitMs || 0;\r\n      var preventSubmit = settings.preventSubmit || false;\r\n      var disableAutoSelect = settings.disableAutoSelect || false;\r\n      // 'keyup' event will not be fired on Mobile Firefox, so we have to use 'input' event instead\r\n      var keyUpEventName = mobileFirefox ? \"input\" : \"keyup\";\r\n      var items = [];\r\n      var inputValue = \"\";\r\n      var minLen = 2;\r\n      var showOnFocus = settings.showOnFocus;\r\n      var selected;\r\n      var keypressCounter = 0;\r\n      var debounceTimer;\r\n      if (settings.minLength !== undefined) {\r\n          minLen = settings.minLength;\r\n      }\r\n      if (!settings.input) {\r\n          throw new Error(\"input undefined\");\r\n      }\r\n      var input = settings.input;\r\n      container.className = \"autocomplete \" + (settings.className || \"\");\r\n      // IOS implementation for fixed positioning has many bugs, so we will use absolute positioning\r\n      containerStyle.position = \"absolute\";\r\n      /**\r\n       * Detach the container from DOM\r\n       */\r\n      function detach() {\r\n          var parent = container.parentNode;\r\n          if (parent) {\r\n              parent.removeChild(container);\r\n          }\r\n      }\r\n      /**\r\n       * Clear debouncing timer if assigned\r\n       */\r\n      function clearDebounceTimer() {\r\n          if (debounceTimer) {\r\n              window.clearTimeout(debounceTimer);\r\n          }\r\n      }\r\n      /**\r\n       * Attach the container to DOM\r\n       */\r\n      function attach() {\r\n          if (!container.parentNode) {\r\n              doc.body.appendChild(container);\r\n          }\r\n      }\r\n      /**\r\n       * Check if container for autocomplete is displayed\r\n       */\r\n      function containerDisplayed() {\r\n          return !!container.parentNode;\r\n      }\r\n      /**\r\n       * Clear autocomplete state and hide container\r\n       */\r\n      function clear() {\r\n          // prevent the update call if there are pending AJAX requests\r\n          keypressCounter++;\r\n          items = [];\r\n          inputValue = \"\";\r\n          selected = undefined;\r\n          detach();\r\n      }\r\n      /**\r\n       * Update autocomplete position\r\n       */\r\n      function updatePosition() {\r\n          if (!containerDisplayed()) {\r\n              return;\r\n          }\r\n          containerStyle.height = \"auto\";\r\n          containerStyle.width = input.offsetWidth + \"px\";\r\n          var maxHeight = 0;\r\n          var inputRect;\r\n          function calc() {\r\n              var docEl = doc.documentElement;\r\n              var clientTop = docEl.clientTop || doc.body.clientTop || 0;\r\n              var clientLeft = docEl.clientLeft || doc.body.clientLeft || 0;\r\n              var scrollTop = window.pageYOffset || docEl.scrollTop;\r\n              var scrollLeft = window.pageXOffset || docEl.scrollLeft;\r\n              inputRect = input.getBoundingClientRect();\r\n              var top = inputRect.top + input.offsetHeight + scrollTop - clientTop;\r\n              var left = inputRect.left + scrollLeft - clientLeft;\r\n              containerStyle.top = top + \"px\";\r\n              containerStyle.left = left + \"px\";\r\n              maxHeight = window.innerHeight - (inputRect.top + input.offsetHeight);\r\n              if (maxHeight < 0) {\r\n                  maxHeight = 0;\r\n              }\r\n              containerStyle.top = top + \"px\";\r\n              containerStyle.bottom = \"\";\r\n              containerStyle.left = left + \"px\";\r\n              containerStyle.maxHeight = maxHeight + \"px\";\r\n          }\r\n          // the calc method must be called twice, otherwise the calculation may be wrong on resize event (chrome browser)\r\n          calc();\r\n          calc();\r\n          if (settings.customize && inputRect) {\r\n              settings.customize(input, inputRect, container, maxHeight);\r\n          }\r\n      }\r\n      /**\r\n       * Redraw the autocomplete div element with suggestions\r\n       */\r\n      function update() {\r\n          // delete all children from autocomplete DOM container\r\n          while (container.firstChild) {\r\n              container.removeChild(container.firstChild);\r\n          }\r\n          // function for rendering autocomplete suggestions\r\n          var render = function (item, currentValue) {\r\n              var itemElement = doc.createElement(\"div\");\r\n              itemElement.textContent = item.label || \"\";\r\n              return itemElement;\r\n          };\r\n          if (settings.render) {\r\n              render = settings.render;\r\n          }\r\n          // function to render autocomplete groups\r\n          var renderGroup = function (groupName, currentValue) {\r\n              var groupDiv = doc.createElement(\"div\");\r\n              groupDiv.textContent = groupName;\r\n              return groupDiv;\r\n          };\r\n          if (settings.renderGroup) {\r\n              renderGroup = settings.renderGroup;\r\n          }\r\n          var fragment = doc.createDocumentFragment();\r\n          var prevGroup = \"#9?$\";\r\n          items.forEach(function (item) {\r\n              if (item.group && item.group !== prevGroup) {\r\n                  prevGroup = item.group;\r\n                  var groupDiv = renderGroup(item.group, inputValue);\r\n                  if (groupDiv) {\r\n                      groupDiv.className += \" group\";\r\n                      fragment.appendChild(groupDiv);\r\n                  }\r\n              }\r\n              var div = render(item, inputValue);\r\n              if (div) {\r\n                  div.addEventListener(\"click\", function (ev) {\r\n                      settings.onSelect(item, input);\r\n                      clear();\r\n                      ev.preventDefault();\r\n                      ev.stopPropagation();\r\n                  });\r\n                  if (item === selected) {\r\n                      div.className += \" selected\";\r\n                  }\r\n                  fragment.appendChild(div);\r\n              }\r\n          });\r\n          container.appendChild(fragment);\r\n          if (items.length < 1) {\r\n              if (settings.emptyMsg) {\r\n                  var empty = doc.createElement(\"div\");\r\n                  empty.className = \"empty\";\r\n                  empty.textContent = settings.emptyMsg;\r\n                  container.appendChild(empty);\r\n              }\r\n              else {\r\n                  clear();\r\n                  return;\r\n              }\r\n          }\r\n          attach();\r\n          updatePosition();\r\n          updateScroll();\r\n      }\r\n      function updateIfDisplayed() {\r\n          if (containerDisplayed()) {\r\n              update();\r\n          }\r\n      }\r\n      function resizeEventHandler() {\r\n          updateIfDisplayed();\r\n      }\r\n      function scrollEventHandler(e) {\r\n          if (e.target !== container) {\r\n              updateIfDisplayed();\r\n          }\r\n          else {\r\n              e.preventDefault();\r\n          }\r\n      }\r\n      function keyupEventHandler(ev) {\r\n          var keyCode = ev.which || ev.keyCode || 0;\r\n          var ignore = [38 /* Up */, 13 /* Enter */, 27 /* Esc */, 39 /* Right */, 37 /* Left */, 16 /* Shift */, 17 /* Ctrl */, 18 /* Alt */, 20 /* CapsLock */, 91 /* WindowsKey */, 9 /* Tab */];\r\n          for (var _i = 0, ignore_1 = ignore; _i < ignore_1.length; _i++) {\r\n              var key = ignore_1[_i];\r\n              if (keyCode === key) {\r\n                  return;\r\n              }\r\n          }\r\n          if (keyCode >= 112 /* F1 */ && keyCode <= 123 /* F12 */) {\r\n              return;\r\n          }\r\n          // the down key is used to open autocomplete\r\n          if (keyCode === 40 /* Down */ && containerDisplayed()) {\r\n              return;\r\n          }\r\n          startFetch(0 /* Keyboard */);\r\n      }\r\n      /**\r\n       * Automatically move scroll bar if selected item is not visible\r\n       */\r\n      function updateScroll() {\r\n          var elements = container.getElementsByClassName(\"selected\");\r\n          if (elements.length > 0) {\r\n              var element = elements[0];\r\n              // make group visible\r\n              var previous = element.previousElementSibling;\r\n              if (previous && previous.className.indexOf(\"group\") !== -1 && !previous.previousElementSibling) {\r\n                  element = previous;\r\n              }\r\n              if (element.offsetTop < container.scrollTop) {\r\n                  container.scrollTop = element.offsetTop;\r\n              }\r\n              else {\r\n                  var selectBottom = element.offsetTop + element.offsetHeight;\r\n                  var containerBottom = container.scrollTop + container.offsetHeight;\r\n                  if (selectBottom > containerBottom) {\r\n                      container.scrollTop += selectBottom - containerBottom;\r\n                  }\r\n              }\r\n          }\r\n      }\r\n      /**\r\n       * Select the previous item in suggestions\r\n       */\r\n      function selectPrev() {\r\n          if (items.length < 1) {\r\n              selected = undefined;\r\n          }\r\n          else {\r\n              if (selected === items[0]) {\r\n                  selected = items[items.length - 1];\r\n              }\r\n              else {\r\n                  for (var i = items.length - 1; i > 0; i--) {\r\n                      if (selected === items[i] || i === 1) {\r\n                          selected = items[i - 1];\r\n                          break;\r\n                      }\r\n                  }\r\n              }\r\n          }\r\n      }\r\n      /**\r\n       * Select the next item in suggestions\r\n       */\r\n      function selectNext() {\r\n          if (items.length < 1) {\r\n              selected = undefined;\r\n          }\r\n          if (!selected || selected === items[items.length - 1]) {\r\n              selected = items[0];\r\n              return;\r\n          }\r\n          for (var i = 0; i < (items.length - 1); i++) {\r\n              if (selected === items[i]) {\r\n                  selected = items[i + 1];\r\n                  break;\r\n              }\r\n          }\r\n      }\r\n      function keydownEventHandler(ev) {\r\n          var keyCode = ev.which || ev.keyCode || 0;\r\n          if (keyCode === 38 /* Up */ || keyCode === 40 /* Down */ || keyCode === 27 /* Esc */) {\r\n              var containerIsDisplayed = containerDisplayed();\r\n              if (keyCode === 27 /* Esc */) {\r\n                  clear();\r\n              }\r\n              else {\r\n                  if (!containerIsDisplayed || items.length < 1) {\r\n                      return;\r\n                  }\r\n                  keyCode === 38 /* Up */\r\n                      ? selectPrev()\r\n                      : selectNext();\r\n                  update();\r\n              }\r\n              ev.preventDefault();\r\n              if (containerIsDisplayed) {\r\n                  ev.stopPropagation();\r\n              }\r\n              return;\r\n          }\r\n          if (keyCode === 13 /* Enter */) {\r\n              if (selected) {\r\n                  settings.onSelect(selected, input);\r\n                  clear();\r\n              }\r\n              if (preventSubmit) {\r\n                  ev.preventDefault();\r\n              }\r\n          }\r\n      }\r\n      function focusEventHandler() {\r\n          if (showOnFocus) {\r\n              startFetch(1 /* Focus */);\r\n          }\r\n      }\r\n      function startFetch(trigger) {\r\n          // If multiple keys were pressed, before we get an update from server,\r\n          // this may cause redrawing autocomplete multiple times after the last key was pressed.\r\n          // To avoid this, the number of times keyboard was pressed will be saved and checked before redraw.\r\n          var savedKeypressCounter = ++keypressCounter;\r\n          var val = input.value;\r\n          if (val.length >= minLen || trigger === 1 /* Focus */) {\r\n              clearDebounceTimer();\r\n              debounceTimer = window.setTimeout(function () {\r\n                  settings.fetch(val, function (elements) {\r\n                      if (keypressCounter === savedKeypressCounter && elements) {\r\n                          items = elements;\r\n                          inputValue = val;\r\n                          selected = (items.length < 1 || disableAutoSelect) ? undefined : items[0];\r\n                          update();\r\n                      }\r\n                  }, trigger);\r\n              }, trigger === 0 /* Keyboard */ ? debounceWaitMs : 0);\r\n          }\r\n          else {\r\n              clear();\r\n          }\r\n      }\r\n      function blurEventHandler() {\r\n          // we need to delay clear, because when we click on an item, blur will be called before click and remove items from DOM\r\n          setTimeout(function () {\r\n              if (doc.activeElement !== input) {\r\n                  clear();\r\n              }\r\n          }, 200);\r\n      }\r\n      /**\r\n       * Fixes #26: on long clicks focus will be lost and onSelect method will not be called\r\n       */\r\n      container.addEventListener(\"mousedown\", function (evt) {\r\n          evt.stopPropagation();\r\n          evt.preventDefault();\r\n      });\r\n      /**\r\n       * Fixes #30: autocomplete closes when scrollbar is clicked in IE\r\n       * See: https://stackoverflow.com/a/9210267/13172349\r\n       */\r\n      container.addEventListener(\"focus\", function () { return input.focus(); });\r\n      /**\r\n       * This function will remove DOM elements and clear event handlers\r\n       */\r\n      function destroy() {\r\n          input.removeEventListener(\"focus\", focusEventHandler);\r\n          input.removeEventListener(\"keydown\", keydownEventHandler);\r\n          input.removeEventListener(keyUpEventName, keyupEventHandler);\r\n          input.removeEventListener(\"blur\", blurEventHandler);\r\n          window.removeEventListener(\"resize\", resizeEventHandler);\r\n          doc.removeEventListener(\"scroll\", scrollEventHandler, true);\r\n          clearDebounceTimer();\r\n          clear();\r\n      }\r\n      // setup event handlers\r\n      input.addEventListener(\"keydown\", keydownEventHandler);\r\n      input.addEventListener(keyUpEventName, keyupEventHandler);\r\n      input.addEventListener(\"blur\", blurEventHandler);\r\n      input.addEventListener(\"focus\", focusEventHandler);\r\n      window.addEventListener(\"resize\", resizeEventHandler);\r\n      doc.addEventListener(\"scroll\", scrollEventHandler, true);\r\n      return {\r\n          destroy: destroy\r\n      };\r\n  }\n\n  return autocomplete;\n\n})));\n//# sourceMappingURL=autocomplete.js.map\n\n\n//# sourceURL=webpack://wordplex/./node_modules/autocompleter/autocomplete.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var json_format_highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! json-format-highlight */ \"./node_modules/json-format-highlight/dist/json-format-highlight.js\");\n/* harmony import */ var json_format_highlight__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json_format_highlight__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/scripts/utils.js\");\n/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! autocompleter */ \"./node_modules/autocompleter/autocomplete.js\");\n/* harmony import */ var autocompleter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(autocompleter__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar countrySelectInput = document.getElementById(\"country-selector-input\");\nvar langSelectInput = document.getElementById(\"lang-selector-input\");\nvar resizeCheckBox = document.getElementById(\"resize-checkbox\");\nvar resizeCheckboxWidth = document.getElementById(\"resize-checkbox-width\");\nvar resizeCheckboxHeight = document.getElementById(\"resize-checkbox-height\");\nvar langCheckbox = document.getElementById(\"lang-checkbox\");\nvar langCheckboxWidth = document.getElementById(\"lang-resize-width\");\nvar langCheckboxHeight = document.getElementById(\"lang-resize-height\");\nvar phoneCheckbox = document.getElementById(\"phone-checkbox\");\nvar phoneCheckboxWidth = document.getElementById(\"phone-width-checkbox\");\nvar phoneCheckboxHeight = document.getElementById(\"phone-height-checkbox\");\nvar phoneInput = document.getElementById(\"phone-input\");\nvar flagImg = document.getElementById(\"flag-img\");\nvar langFlagImg = document.getElementById(\"lang-flag-img\");\nvar phoneImg = document.getElementById(\"phone-img\");\nvar pngBtn = document.getElementById(\"png-btn\");\nvar svgBtn = document.getElementById(\"svg-btn\");\nvar pngLangBtn = document.getElementById(\"png-lang-btn\");\nvar svgLangBtn = document.getElementById(\"svg-lang-btn\");\nvar pngPhoneBtn = document.getElementById(\"png-phone-btn\");\nvar svgPhoneBtn = document.getElementById(\"svg-phone-btn\");\nvar resizeCheck = document.getElementById(\"resize-check\");\nvar resizeWidth = document.getElementById(\"width\");\nvar resizeHeight = document.getElementById(\"height\");\nvar langResizeCheck = document.getElementById(\"lang-resize-check\");\nvar phoneResizeCheck = document.getElementById(\"phone-resize-check\");\nvar langResizeWidth = document.getElementById(\"lang-width\");\nvar langResizeHeight = document.getElementById(\"lang-height\");\nvar phoneResizeWidth = document.getElementById(\"phone-width\");\nvar phoneResizeHeight = document.getElementById(\"phone-height\");\nvar prettyData = document.getElementById(\"pretty-data\");\nvar langPrettyData = document.getElementById(\"lang-pretty-data\");\nvar phonePrettyData = document.getElementById(\"phone-pretty-data\");\nvar backDrop = document.getElementById(\"backdrop\");\nvar mobileNavbar = document.getElementById(\"mobile-navbar\");\nvar burgerBtn = document.getElementById(\"burger-btn\");\nvar url = document.getElementById(\"url\");\nvar countryCode = document.getElementById(\"country-code\");\nvar flagSize = document.getElementById(\"flag-size\");\nvar imgType = document.getElementById(\"img-type\");\nvar langUrl = document.getElementById(\"lang-url\");\nvar langCountryCode = document.getElementById(\"lang-country-code\");\nvar langFlagSize = document.getElementById(\"lang-flag-size\");\nvar phoneUrl = document.getElementById(\"phone-url\");\nvar phoneCountryCode = document.getElementById(\"phone-country-code\");\nvar phoneFlagSize = document.getElementById(\"phone-flag-size\");\nvar langImgType = document.getElementById(\"lang-img-type\");\nvar phoneImgType = document.getElementById(\"phone-img-type\");\nvar inputCloseMark = document.getElementById(\"input-close-mark\");\nvar langInputCloseMark = document.getElementById(\"lang-input-close-mark\");\nvar phoneInputCloseMark = document.getElementById(\"phone-input-close-mark\");\nvar isoArrowIcon = document.getElementById(\"iso-arrow-icon\");\nvar langArrowIcon = document.getElementById(\"lang-arrow-icon\");\nvar copyButton = document.getElementById(\"copy-button\");\nvar copyUrl = document.getElementById(\"copy-url\");\nvar langCopyButton = document.getElementById(\"lang-copy-button\");\nvar langCopyUrl = document.getElementById(\"copy-lang-url\");\nvar phoneCopyButton = document.getElementById(\"phone-copy-button\");\nvar copyPhoneUrl = document.getElementById(\"copy-phone-url\");\nvar selectedLanguage = {};\nvar selectedCountry = {};\nvar isSelectedCountry = true;\nvar isSelectedLanguage = true;\nvar isCountryListOpen = false;\nvar isLangListOpen = false;\n\n(function fetchingLanguages() {\n  fetch(\"https://geo.wordplex.io/v4/langs\").then(function (res) {\n    return res.json();\n  }).then(function (_ref) {\n    var items = _ref.items;\n    autocompleter__WEBPACK_IMPORTED_MODULE_2___default()({\n      input: langSelectInput,\n      fetch: function fetch(text, update) {\n        langSelectInput.value ? langInputCloseMark.style.display = \"block\" : langInputCloseMark.style.display = \"none\";\n        text = text.toLowerCase();\n        var suggestions = items.filter(function (n) {\n          return isSelectedLanguage ? true : n.name.toLowerCase().startsWith(text);\n        }).map(function (item) {\n          return {\n            label: item.name,\n            value: item.iso_2\n          };\n        });\n        update(suggestions);\n      },\n      showOnFocus: true,\n      minLength: 0,\n      emptyMsg: \"No options\",\n      onSelect: function onSelect(item) {\n        langInputCloseMark.style.display = \"block\";\n        isSelectedLanguage = true;\n        langSelectInput.value = item.label;\n        langSelectInput.blur();\n        changeLangFlagHandler(item.label, item.value);\n        selectedLanguage = item;\n      }\n    });\n  });\n})();\n\n(function fetchingCountries() {\n  fetch(\"https://geo.wordplex.io/v4/countries\").then(function (res) {\n    return res.json();\n  }).then(function (_ref2) {\n    var items = _ref2.items;\n    autocompleter__WEBPACK_IMPORTED_MODULE_2___default()({\n      input: countrySelectInput,\n      fetch: function fetch(text, update) {\n        countrySelectInput.value ? inputCloseMark.style.display = \"block\" : inputCloseMark.style.display = \"none\";\n        text = text.toLowerCase();\n        var suggestions = items.filter(function (n) {\n          return isSelectedCountry ? true : n.name.toLowerCase().startsWith(text);\n        }).map(function (item) {\n          return {\n            label: item.name,\n            value: item.alpha2Code\n          };\n        });\n        update(suggestions);\n      },\n      showOnFocus: true,\n      minLength: 0,\n      emptyMsg: \"No options\",\n      onSelect: function onSelect(item) {\n        inputCloseMark.style.display = \"block\";\n        isSelectedCountry = true;\n        countrySelectInput.value = item.label;\n        countrySelectInput.blur();\n        changeIsoFlagHandler(item.label, item.value);\n        selectedCountry = item;\n      }\n    });\n  });\n})();\n\nfunction generatePngHtmlImgTag(widthValue, heightValue, countryName, countryValue) {\n  var imgType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : \"png\";\n  var defaultWidthValue = 200;\n  var defaultCountryValue = \"France\";\n  var currentWidthValue = !!widthValue && resizeCheck.checked ? widthValue : defaultWidthValue;\n  var currentHeightValue = heightValue && resizeCheck.checked ? \"x\".concat(heightValue) : \"\";\n  var src = \"https://wordplex.cloudimg.io/v7w/flag/country/\".concat(countryValue, \"-\").concat(currentWidthValue).concat(currentHeightValue, \".\").concat(imgType);\n  var srcSet = \"https://wordplex.cloudimg.io/v7w/flag/country/\".concat(countryValue, \"-\").concat(currentWidthValue).concat(currentHeightValue, \".\").concat(imgType, \" 2x\");\n\n  if (imgType === \"svg\") {\n    currentWidthValue = \"auto\";\n    src = \"https://wordplex.cloudimg.io/v7w/flag/country/\".concat(countryValue, \".\").concat(imgType);\n    srcSet = \"https://wordplex.cloudimg.io/v7w/flag/country/\".concat(countryValue, \".\").concat(imgType, \" 2x\");\n\n    if (countrySelectInput.value === defaultCountryValue) {\n      currentWidthValue = \"200\";\n      src = \"https://wordplex.cloudimg.io/v7w/flag/country/FR.\".concat(imgType);\n      srcSet = \"https://wordplex.cloudimg.io/v7w/flag/country/FR.\".concat(imgType, \" 2x\");\n    }\n  }\n\n  if (countrySelectInput.value === defaultCountryValue) {\n    src = \"https://wordplex.cloudimg.io/v7w/flag/country/FR-\".concat(currentWidthValue).concat(currentHeightValue, \".\").concat(imgType);\n    srcSet = \"https://wordplex.cloudimg.io/v7w/flag/country/FR-\".concat(currentWidthValue).concat(currentHeightValue, \".\").concat(imgType, \" 2x\");\n    countryName = \"France\";\n  }\n\n  return \"&lt;img\\n  src=\\\"\".concat(src, \"\\\"\\n  srcset=\\\"\").concat(srcSet, \"\\\"\\n  width=\\\"\").concat(currentWidthValue, \"\\\"\\n  height=\\\"\").concat(!!heightValue && resizeCheck.checked ? heightValue : \"auto\", \"\\\"\\n  alt=\\\"\").concat(countryName, \" flag\\\">\");\n}\n\nfunction langHtmlImgTag(widthValue, heightValue, langName, countryValue) {\n  var imgType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : \"png\";\n  var defaultCountryValue = \"French\";\n  var defaultWidthValue = 200;\n  var currentWidthValue = !!widthValue && langResizeCheck.checked ? widthValue : defaultWidthValue;\n  var currentHeightValue = !!heightValue && langResizeCheck.checked ? \"x\".concat(heightValue) : \"\";\n  var src = \"https://wordplex.cloudimg.io/v7w/flag/lang/\".concat(countryValue, \"-\").concat(currentWidthValue).concat(currentHeightValue, \".\").concat(imgType);\n  var srcSet = \"https://wordplex.cloudimg.io/v7w/flag/lang/\".concat(countryValue, \"-\").concat(currentWidthValue).concat(currentHeightValue, \".\").concat(imgType, \" 2x\");\n\n  if (imgType === \"svg\") {\n    currentWidthValue = \"auto\";\n    src = \"https://wordplex.cloudimg.io/v7w/flag/lang/\".concat(countryValue, \".\").concat(imgType);\n    srcSet = \"https://wordplex.cloudimg.io/v7w/flag/lang/\".concat(countryValue, \".\").concat(imgType, \" 2x\");\n\n    if (langSelectInput.value === defaultCountryValue) {\n      currentWidthValue = \"200\";\n      src = \"https://wordplex.cloudimg.io/v7w/flag/lang/fr.\".concat(imgType);\n      srcSet = \"https://wordplex.cloudimg.io/v7w/flag/lang/fr.\".concat(imgType, \" 2x\");\n    }\n  }\n\n  if (langSelectInput.value === defaultCountryValue) {\n    src = \"https://wordplex.cloudimg.io/v7w/flag/lang/fr-\".concat(currentWidthValue).concat(currentHeightValue, \".\").concat(imgType);\n    srcSet = \"https://wordplex.cloudimg.io/v7w/flag/lang/fr-\".concat(currentWidthValue).concat(currentHeightValue, \".\").concat(imgType, \" 2x\");\n    langName = \"French\";\n  }\n\n  return \"&lt;img\\n  src=\\\"\".concat(src, \"\\\"\\n  srcset=\\\"\").concat(srcSet, \"\\\"\\n  width=\\\"\").concat(currentWidthValue, \"\\\"\\n  height=\\\"\").concat(!!heightValue && langResizeCheck.checked ? heightValue : \"auto\", \"\\\"\\n  alt=\\\"\").concat(langName, \" language\\\">\");\n}\n\nfunction phoneHtmlImgTag(widthValue, heightValue, phoneNumber) {\n  var defaultWidthValue = 200;\n  var currentWidthValue = !!widthValue && phoneResizeCheck.checked ? widthValue : defaultWidthValue;\n  var currentHeightValue = !!heightValue && phoneResizeCheck.checked ? \"x\".concat(heightValue) : \"\";\n  return \"&lt; img\\n  src=\\\"https://wordplex.cloudimg.io/v7w/flag/phone/\".concat(phoneNumber, \"-\").concat(currentWidthValue).concat(currentHeightValue, \".png\\\"\\n  srcset= \\\"https://wordplex.cloudimg.io/v7w/flag/phone/\").concat(phoneNumber, \"-\").concat(currentWidthValue).concat(currentHeightValue, \".png 2x\\\"\\n  width=\\\"\").concat(currentWidthValue, \"\\\"\\n  height=\\\"\").concat(!!heightValue && phoneResizeCheck.checked ? heightValue : \"auto\", \"\\\"\\n  alt=\\\"\\\">\");\n}\n\nfunction resizeChecked() {\n  if (resizeCheck.checked) {\n    resizeCheckboxWidth.style.display = \"block\";\n    resizeCheckboxHeight.style.display = \"block\";\n  } else {\n    resizeCheckboxWidth.style.display = \"none\";\n    resizeCheckboxHeight.style.display = \"none\";\n  }\n\n  changeWidthHandler();\n}\n\nfunction langResizeChecked() {\n  if (langResizeCheck.checked) {\n    langCheckboxWidth.style.display = \"block\";\n    langCheckboxHeight.style.display = \"block\";\n  } else {\n    langCheckboxWidth.style.display = \"none\";\n    langCheckboxHeight.style.display = \"none\";\n  }\n\n  langChangeWidthHandler();\n}\n\nfunction phoneResizeChecked() {\n  if (phoneResizeCheck.checked) {\n    phoneCheckboxWidth.style.display = \"block\";\n    phoneCheckboxHeight.style.display = \"block\";\n  } else {\n    phoneCheckboxWidth.style.display = \"none\";\n    phoneCheckboxHeight.style.display = \"none\";\n  }\n\n  phoneChangeWidthHandler();\n}\n\nfunction toggleMobileNavbar() {\n  if (!mobileNavbar.offsetWidth) {\n    mobileNavbar.style.display = \"flex\";\n    backDrop.style.display = \"flex\";\n  } else {\n    mobileNavbar.style.display = \"none\";\n    backDrop.style.display = \"none\";\n  }\n}\n\nfunction keydown(event) {\n  if (event.keyCode === 27) {\n    mobileNavbar.style.display = \"none\";\n    isoArrowIcon.style.transform = \"rotate(0deg)\";\n    langArrowIcon.style.transform = \"rotate(0deg)\";\n  }\n} // country iso event handler\n\n\nfunction changeIsoFlagHandler(countryName, isoValue) {\n  var widthValue = resizeWidth.value;\n  var heightValue = resizeHeight.value;\n  var imageURL = \"https://wordplex.cloudimg.io/v7w/flag/country/\".concat(isoValue, \"/fr-75x50.png\");\n  var highlightOptions = {\n    stringColor: \"#005CCD\"\n  };\n  var imgCode = generatePngHtmlImgTag(widthValue, heightValue, countryName, isoValue);\n  var coloredJsonData = json_format_highlight__WEBPACK_IMPORTED_MODULE_0___default()(imgCode, highlightOptions);\n  url.innerHTML = \"https://wordplex.cloudimg.io/v7w/flag/country/\";\n  countryCode.innerHTML = \"\".concat(isoValue);\n  prettyData.innerHTML = coloredJsonData;\n  flagImg.src = imageURL;\n}\n\nfunction changeWidthHandler() {\n  var widthValue = resizeWidth.value;\n  var heightValue = resizeHeight.value;\n  var defaultWidthValue = 200;\n  var currentWidthValue = !!widthValue && resizeCheck.checked ? widthValue : defaultWidthValue;\n  var currentHeightValue = !!heightValue && resizeCheck.checked ? \"x\".concat(heightValue) : \"\";\n  var highlightOptions = {\n    stringColor: \"#005CCD\"\n  };\n  var countryValue = selectedCountry.value;\n  var countryName = selectedCountry.label;\n  var imgCode = generatePngHtmlImgTag(widthValue, heightValue, countryName, countryValue);\n  var coloredJsonData = json_format_highlight__WEBPACK_IMPORTED_MODULE_0___default()(imgCode, highlightOptions);\n  prettyData.innerHTML = coloredJsonData;\n  flagSize.innerHTML = \"\".concat(currentWidthValue).concat(currentHeightValue);\n}\n\nfunction changePngHandler() {\n  imgType.innerHTML = \"png\";\n  svgBtn.style.backgroundColor = \"#FFFF\";\n  pngBtn.style.backgroundColor = \"#DFEEFF\";\n  resizeCheckBox.style.display = \"block\";\n  resizeCheckboxWidth.style.display = \"block\";\n  resizeCheckboxHeight.style.display = \"block\";\n  changeWidthHandler();\n}\n\nfunction changeSvgHandler() {\n  var countryValue = selectedCountry.value;\n  var countryName = selectedCountry.label;\n  var imgCode = generatePngHtmlImgTag(null, null, countryName, countryValue, \"svg\");\n  var highlightOptions = {\n    stringColor: \"#005CCD\"\n  };\n  var coloredJsonData = json_format_highlight__WEBPACK_IMPORTED_MODULE_0___default()(imgCode, highlightOptions);\n\n  if (countrySelectInput.value === \"France\") {\n    countryCode.innerHTML = \"fr\";\n  } else {\n    countryCode.innerHTML = \"\".concat(countryValue);\n  }\n\n  imgType.innerHTML = \"svg\";\n  svgBtn.style.backgroundColor = \"#DFEEFF\";\n  pngBtn.style.backgroundColor = \"#FFFF\";\n  resizeCheckBox.style.display = \"none\";\n  resizeCheckboxWidth.style.display = \"none\";\n  resizeCheckboxHeight.style.display = \"none\";\n  flagSize.innerHTML = \"200\";\n  prettyData.innerHTML = coloredJsonData;\n}\n\nfunction changeCountryInputHandler(event) {\n  isSelectedCountry = false;\n}\n\nfunction closeMobileNavbarHandler() {\n  mobileNavbar.style.display = \"none\";\n  backDrop.style.display = \"none\";\n}\n\nfunction openCountryListHandler(event) {\n  event.stopPropagation();\n\n  if (isCountryListOpen) {\n    isoArrowIcon.style.transform = \"rotate(0deg)\";\n    isCountryListOpen = false;\n  } else {\n    isoArrowIcon.style.transform = \"rotate(180deg)\";\n    countrySelectInput.select();\n    isCountryListOpen = true;\n  }\n}\n\nfunction clearInputHandler() {\n  countrySelectInput.value = \"\";\n  inputCloseMark.style.display = \"none\";\n}\n\nfunction focusCountryInputHandler(event) {\n  event.stopPropagation();\n  countrySelectInput.select();\n  openCountryListHandler(event);\n}\n\nfunction blurCountryInputHandler(event) {\n  event.stopPropagation();\n  openCountryListHandler(event);\n}\n\nfunction copyCountryFlagLink() {\n  var imgURL = \"\".concat(url.innerHTML).concat(countryCode.innerHTML, \"\\n  -\").concat(flagSize.innerHTML, \".\").concat(imgType.innerHTML);\n  navigator.clipboard.writeText(imgURL); //copy img URL for Iso case\n\n  if (copyButton.innerHTML === \"Copy\") {\n    copyButton.innerHTML = \"copied\";\n    setTimeout(function () {\n      copyButton.innerHTML = \"Copy\";\n    }, 500);\n  }\n} // language event handler\n\n\nfunction changeLangFlagHandler(langName, countryValue) {\n  var widthValue = langResizeWidth.value;\n  var heightValue = langResizeHeight.value;\n  var imageURL = \"https://wordplex.cloudimg.io/v7w/flag/lang/\".concat(countryValue, \"-75x50.png\");\n  var highlightOptions = {\n    stringColor: \"#005CCD\"\n  };\n  var imgCode = langHtmlImgTag(widthValue, heightValue, langName, countryValue);\n  var coloredJsonData = json_format_highlight__WEBPACK_IMPORTED_MODULE_0___default()(imgCode, highlightOptions);\n  langPrettyData.innerHTML = coloredJsonData;\n  langFlagImg.src = imageURL;\n  langUrl.innerHTML = \"https://wordplex.cloudimg.io/v7w/flag/lang/\";\n  langCountryCode.innerHTML = \"\".concat(countryValue);\n}\n\nfunction langChangeWidthHandler() {\n  var widthValue = langResizeWidth.value;\n  var heightValue = langResizeHeight.value;\n  var defaultWidthValue = 200;\n  var currentWidthValue = !!widthValue && langResizeCheck.checked ? widthValue : defaultWidthValue;\n  var currentHeightValue = !!heightValue && langResizeCheck.checked ? \"x\".concat(heightValue) : \"\";\n  var langName = selectedLanguage.label;\n  var langValue = selectedLanguage.value;\n  var highlightOptions = {\n    stringColor: \"#005CCD\"\n  };\n  var imgCode = langHtmlImgTag(widthValue, heightValue, langName, langValue);\n  var coloredJsonData = json_format_highlight__WEBPACK_IMPORTED_MODULE_0___default()(imgCode, highlightOptions);\n  langPrettyData.innerHTML = coloredJsonData;\n  langFlagSize.innerHTML = \"\".concat(currentWidthValue).concat(currentHeightValue);\n}\n\nfunction changeLangPngHandler() {\n  langImgType.innerHTML = \"png\";\n  svgLangBtn.style.backgroundColor = \"#FFFF\";\n  pngLangBtn.style.backgroundColor = \"#DFEEFF\";\n  langCheckbox.style.display = \"block\";\n  langCheckboxWidth.style.display = \"block\";\n  langCheckboxHeight.style.display = \"block\";\n  langChangeWidthHandler();\n}\n\nfunction changeLangSvgHandler() {\n  var langName = selectedLanguage.label;\n  var langValue = selectedLanguage.value;\n  var imgCode = langHtmlImgTag(null, null, langName, langValue, \"svg\");\n  var highlightOptions = {\n    stringColor: \"#005CCD\"\n  };\n  var coloredJsonData = json_format_highlight__WEBPACK_IMPORTED_MODULE_0___default()(imgCode, highlightOptions);\n\n  if (langSelectInput.value === \"French\") {\n    langCountryCode.innerHTML = \"fr\";\n  } else {\n    langCountryCode.innerHTML = \"\".concat(langValue);\n  }\n\n  langPrettyData.innerHTML = coloredJsonData;\n  langImgType.innerHTML = \"svg\";\n  svgLangBtn.style.backgroundColor = \"#DFEEFF\";\n  pngLangBtn.style.backgroundColor = \"#FFFF\";\n  langCheckbox.style.display = \"none\";\n  langCheckboxWidth.style.display = \"none\";\n  langCheckboxHeight.style.display = \"none\";\n  langFlagSize.innerHTML = \"400x240\";\n}\n\nfunction changeLangInputHandler(event) {\n  isSelectedLanguage = false;\n}\n\nfunction openLangListHandler() {\n  if (isLangListOpen) {\n    langArrowIcon.style.transform = \"rotate(0deg)\";\n    isLangListOpen = false;\n  } else {\n    langArrowIcon.style.transform = \"rotate(180deg)\";\n    langSelectInput.select();\n    isLangListOpen = true;\n  }\n}\n\nfunction clearLangInputHandler() {\n  langSelectInput.value = \"\";\n  langInputCloseMark.style.display = \"none\";\n}\n\nfunction focusLangInputHandler(event) {\n  langSelectInput.select();\n  openLangListHandler();\n}\n\nfunction blurLangInputHandler() {\n  openLangListHandler();\n}\n\nfunction langCopyCountryFlagLink() {\n  var imgURL = \"\".concat(langUrl.innerHTML).concat(langCountryCode.innerHTML, \"\\n  -\").concat(langFlagSize.innerHTML, \".\").concat(imgType.innerHTML);\n  navigator.clipboard.writeText(imgURL); //copy img URL for phone case\n\n  if (langCopyButton.innerHTML === \"Copy\") {\n    langCopyButton.innerHTML = \"copied\";\n    setTimeout(function () {\n      langCopyButton.innerHTML = \"Copy\";\n    }, 500);\n  }\n} // phone event handler\n\n\nfunction changePhoneFlagHandler() {\n  var phoneNumber = phoneInput.value;\n  var widthValue = phoneResizeWidth.value;\n  var heightValue = phoneResizeHeight.value;\n  var imgURL = \"https://wordplex.cloudimg.io/v7w/flag/phone/\".concat(phoneNumber, \"-75x50.png\");\n  var highlightOptions = {\n    stringColor: \"#005CCD\"\n  };\n  var imgCode = phoneHtmlImgTag(widthValue, heightValue, phoneNumber);\n  var coloredJsonData = json_format_highlight__WEBPACK_IMPORTED_MODULE_0___default()(imgCode, highlightOptions);\n  phonePrettyData.innerHTML = coloredJsonData;\n  phoneCountryCode.innerHTML = \"\".concat(phoneNumber);\n  phoneImg.src = imgURL;\n}\n\nfunction phoneChangeWidthHandler() {\n  var widthValue = phoneResizeWidth.value;\n  var heightValue = phoneResizeHeight.value;\n  var defaultWidthValue = 200;\n  var currentWidthValue = !!widthValue && phoneResizeCheck.checked ? widthValue : defaultWidthValue;\n  var currentHeightValue = !!heightValue && phoneResizeCheck.checked ? \"x\".concat(heightValue) : \"\";\n  changePhoneFlagHandler();\n  phoneFlagSize.innerHTML = \"\".concat(currentWidthValue).concat(currentHeightValue);\n}\n\nfunction changePhonePngHandler() {\n  phoneImgType.innerHTML = \"png\";\n  svgPhoneBtn.style.backgroundColor = \"#FFFF\";\n  pngPhoneBtn.style.backgroundColor = \"#DFEEFF\";\n  phoneCheckbox.style.display = \"block\";\n  phoneCheckboxWidth.style.display = \"block\";\n  phoneCheckboxHeight.style.display = \"block\";\n  changePhoneFlagHandler();\n}\n\nfunction changePhoneSvgHandler() {\n  var phoneNumber = phoneInput.value;\n  var imgCode = \"&lt; img\\n      src=\\\"https://wordplex.cloudimg.io/v7w/flag/phone/\".concat(phoneNumber, \"-200.svg\\\"\\n      srcset= \\\"https://wordplex.cloudimg.io/v7w/flag/phone/\").concat(phoneNumber, \"-400.svg 2x\\\"\\n      width=\\\"auto\\\"\\n      height=\\\"auto\\\"\\n      alt=\\\"\").concat(phoneNumber, \" flag\\\">\");\n  var highlightOptions = {\n    stringColor: \"#005CCD\"\n  };\n  var coloredJsonData = json_format_highlight__WEBPACK_IMPORTED_MODULE_0___default()(imgCode, highlightOptions);\n  phoneImgType.innerHTML = \"svg\";\n  svgPhoneBtn.style.backgroundColor = \"#DFEEFF\";\n  pngPhoneBtn.style.backgroundColor = \"#FFFF\";\n  phoneCheckbox.style.display = \"none\";\n  phoneCheckboxWidth.style.display = \"none\";\n  phoneCheckboxHeight.style.display = \"none\";\n  phoneCountryCode.innerHTML = \"\".concat(phoneNumber);\n  phoneFlagSize.innerHTML = \"400x240\";\n  phonePrettyData.innerHTML = coloredJsonData;\n  phoneCountryCode.innerHTML = \"\".concat(phoneNumber);\n}\n\nfunction clearPhoneInputHandler() {\n  phoneInput.value = \"\";\n  phoneInputCloseMark.style.display = \"none\";\n}\n\nfunction openPhoneXMarkHandler() {\n  phoneInputCloseMark.style.display = \"block\";\n}\n\nfunction phoneCopyCountryFlagLink() {\n  var imgURL = \"\".concat(phoneUrl.innerHTML).concat(phoneCountryCode.innerHTML, \"\\n  -\").concat(phoneFlagSize.innerHTML, \".\").concat(imgType.innerHTML);\n  navigator.clipboard.writeText(imgURL); //copy img URL for Iso case\n\n  if (phoneCopyButton.innerHTML === \"Copy\") {\n    phoneCopyButton.innerHTML = \"copied\";\n    setTimeout(function () {\n      phoneCopyButton.innerHTML = \"Copy\";\n    }, 500);\n  }\n} //country Iso attach events\n\n\ncountrySelectInput.addEventListener(\"focus\", focusCountryInputHandler);\ncountrySelectInput.addEventListener(\"keydown\", changeCountryInputHandler);\ncountrySelectInput.addEventListener(\"blur\", blurCountryInputHandler);\npngBtn.addEventListener(\"click\", changePngHandler);\nsvgBtn.addEventListener(\"click\", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounce)(changeSvgHandler, 350));\nresizeCheck.addEventListener(\"click\", resizeChecked);\nresizeWidth.addEventListener(\"keydown\", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounce)(changeWidthHandler, 100));\nresizeHeight.addEventListener(\"keydown\", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounce)(changeWidthHandler, 100));\nisoArrowIcon.addEventListener(\"click\", openCountryListHandler);\ninputCloseMark.addEventListener(\"click\", clearInputHandler);\nbackDrop.addEventListener(\"click\", closeMobileNavbarHandler);\nmobileNavbar.addEventListener(\"click\", closeMobileNavbarHandler);\nburgerBtn.addEventListener(\"click\", toggleMobileNavbar);\ncopyUrl.addEventListener(\"click\", copyCountryFlagLink);\nwindow.addEventListener(\"keydown\", keydown); //language attach events\n\nlangSelectInput.addEventListener(\"focus\", focusLangInputHandler);\nlangSelectInput.addEventListener(\"keydown\", changeLangInputHandler);\nlangSelectInput.addEventListener(\"blur\", blurLangInputHandler);\nlangArrowIcon.addEventListener(\"click\", openLangListHandler);\npngLangBtn.addEventListener(\"click\", changeLangPngHandler);\nsvgLangBtn.addEventListener(\"click\", changeLangSvgHandler);\nlangResizeCheck.addEventListener(\"click\", langResizeChecked);\nlangInputCloseMark.addEventListener(\"click\", clearLangInputHandler);\nlangCopyUrl.addEventListener(\"click\", langCopyCountryFlagLink);\nlangResizeWidth.addEventListener(\"keydown\", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounce)(langChangeWidthHandler, 100));\nlangResizeHeight.addEventListener(\"keydown\", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounce)(langChangeWidthHandler, 100)); //phone attach events\n\nphoneResizeCheck.addEventListener(\"click\", phoneResizeChecked);\nphoneInput.addEventListener(\"keydown\", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounce)(changePhoneFlagHandler, 800));\nphoneInput.addEventListener(\"click\", openPhoneXMarkHandler);\npngPhoneBtn.addEventListener(\"click\", changePhonePngHandler);\nsvgPhoneBtn.addEventListener(\"click\", changePhoneSvgHandler);\ncopyPhoneUrl.addEventListener(\"click\", phoneCopyCountryFlagLink);\nphoneResizeWidth.addEventListener(\"keydown\", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounce)(phoneChangeWidthHandler, 300));\nphoneResizeHeight.addEventListener(\"keydown\", (0,_utils__WEBPACK_IMPORTED_MODULE_1__.debounce)(phoneChangeWidthHandler, 300));\nphoneInputCloseMark.addEventListener(\"click\", clearPhoneInputHandler);\n\n//# sourceURL=webpack://wordplex/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"debounce\": () => (/* binding */ debounce)\n/* harmony export */ });\nvar debounce = function debounce(func, delay) {\n  var debounceTimer;\n  return function () {\n    var context = this;\n    var args = arguments;\n    clearTimeout(debounceTimer);\n    debounceTimer = setTimeout(function () {\n      return func.apply(context, args);\n    }, delay);\n  };\n};\n\n//# sourceURL=webpack://wordplex/./src/scripts/utils.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/main.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/worldbackground.jpg */ \"./src/assets/worldbackground.jpg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\r\\n  margin: 0;\\r\\n  padding: 0;\\r\\n  box-sizing: border-box;\\r\\n}\\r\\n\\r\\nbody {\\r\\n  font-family: \\\"Rubik\\\";\\r\\n}\\r\\n\\r\\nhtml {\\r\\n  scroll-behavior: smooth;\\r\\n}\\r\\n\\r\\n.content-wrapper {\\r\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\r\\n  background-color: #002046;\\r\\n  background-repeat: no-repeat;\\r\\n  display: flex;\\r\\n  row-gap: calc(275px - 100px);\\r\\n  flex-direction: column;\\r\\n  background-position: center;\\r\\n  background-size: cover;\\r\\n  height: 750px;\\r\\n  max-width: 1921px;\\r\\n}\\r\\n\\r\\n.content-wrapper .header {\\r\\n  color: white;\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  justify-content: space-between;\\r\\n  padding: 34px 52px;\\r\\n}\\r\\n\\r\\n.content-wrapper .header .backdrop {\\r\\n  position: absolute;\\r\\n  display: none;\\r\\n  height: 100vh;\\r\\n  width: 100%;\\r\\n  top: 0;\\r\\n  left: 0;\\r\\n  z-index: 999;\\r\\n}\\r\\n\\r\\n.content-wrapper .header img.logo {\\r\\n  width: 240px;\\r\\n  height: 32px;\\r\\n}\\r\\n\\r\\n.content-wrapper .header .burger-btn {\\r\\n  display: none;\\r\\n  position: relative;\\r\\n  color: #fff;\\r\\n  background: none;\\r\\n  border: 0;\\r\\n  z-index: 1000;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.content-wrapper .header .fa-bars:before {\\r\\n  content: \\\"\\\\f0c9\\\";\\r\\n  font-size: 21px;\\r\\n  width: 16px;\\r\\n}\\r\\n\\r\\n.content-wrapper .header .mobile-navbar {\\r\\n  display: none;\\r\\n  flex-direction: column;\\r\\n  position: absolute;\\r\\n  right: 20px;\\r\\n  top: 70px;\\r\\n  z-index: 999;\\r\\n  background-color: #00152f;\\r\\n  border-radius: 7px;\\r\\n}\\r\\n\\r\\n.content-wrapper .header .navbar {\\r\\n  font-size: 13px;\\r\\n  font-weight: 400;\\r\\n  line-height: 15px;\\r\\n}\\r\\n\\r\\n.content-wrapper .header .nav-link {\\r\\n  text-decoration: none;\\r\\n  color: white;\\r\\n  margin-right: 50px;\\r\\n}\\r\\n\\r\\n.content-wrapper .navbar .drop-down {\\r\\n  position: relative;\\r\\n  display: inline-block;\\r\\n}\\r\\n\\r\\n.content-wrapper .navbar .drop-down:hover .drop-down-content {\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n.content-wrapper .navbar .drop-down a:hover {\\r\\n  background-color: #ddd;\\r\\n}\\r\\n\\r\\n.content-wrapper .navbar .dropBtn {\\r\\n  color: white;\\r\\n  font-size: 13px;\\r\\n  line-height: 15.5px;\\r\\n  background-color: transparent;\\r\\n  background-repeat: no-repeat;\\r\\n  border: none;\\r\\n  cursor: pointer;\\r\\n  overflow: hidden;\\r\\n  outline: none;\\r\\n}\\r\\n\\r\\n.content-wrapper .navbar .dropBtn img {\\r\\n  padding-bottom: 2px;\\r\\n}\\r\\n\\r\\n.content-wrapper .navbar .drop-down-content {\\r\\n  display: none;\\r\\n  position: absolute;\\r\\n  width: 123px;\\r\\n  top: 8px;\\r\\n  overflow: auto;\\r\\n  background: #f8fafb;\\r\\n  border-radius: 4px;\\r\\n  z-index: 1;\\r\\n  transform: translate3d(-49px, 8px, 0px) !important;\\r\\n}\\r\\n\\r\\n.content-wrapper .drop-down-content:hover .drop-down-content {\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n.content-wrapper .navbar .drop-down-content a {\\r\\n  color: rgba(6, 46, 93, 1);\\r\\n  margin-right: 0;\\r\\n  padding: 9px 10px;\\r\\n  font-size: 13px;\\r\\n  line-height: 15.5px;\\r\\n  text-decoration: none;\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n.content-wrapper .content {\\r\\n  position: relative;\\r\\n  color: #ffffff;\\r\\n  align-items: center;\\r\\n  width: 569.39px;\\r\\n  margin-left: 7%;\\r\\n}\\r\\n\\r\\n.content-wrapper .content::before {\\r\\n  position: absolute;\\r\\n  border-left: 7px solid #462fc5;\\r\\n  content: \\\"\\\";\\r\\n  width: 7px;\\r\\n  height: 131px;\\r\\n  top: 0;\\r\\n}\\r\\n\\r\\n.content-wrapper .content h1 {\\r\\n  font-size: 50px;\\r\\n  line-height: 60px;\\r\\n  font-weight: 500;\\r\\n  margin-left: 5%;\\r\\n  margin-bottom: 32px;\\r\\n}\\r\\n\\r\\n.content-wrapper .content p {\\r\\n  font-size: 18px;\\r\\n  line-height: 26px;\\r\\n  font-weight: 400;\\r\\n  margin-left: 5%;\\r\\n}\\r\\n\\r\\n.validation-wrapper {\\r\\n  padding: 78px 7% 0 7%;\\r\\n  background-color: #f8fafb;\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  position: relative;\\r\\n  z-index: 99;\\r\\n  max-width: 1921px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .description {\\r\\n  z-index: 99;\\r\\n}\\r\\n\\r\\n.validation-wrapper .description h1 {\\r\\n  font-size: 50px;\\r\\n  line-height: 60px;\\r\\n  font-weight: 500;\\r\\n  color: #062e5d;\\r\\n  margin-bottom: 13px;\\r\\n  border-left: 7px solid #462fc5;\\r\\n  padding-left: 25px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .description p {\\r\\n  font-size: 24px;\\r\\n  line-height: 36px;\\r\\n  font-weight: 400;\\r\\n  width: 1203px;\\r\\n  color: #062e5d;\\r\\n  margin-bottom: 91px;\\r\\n  padding-left: 34px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation {\\r\\n  margin-left: 37px;\\r\\n  z-index: 99;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation h1 {\\r\\n  font-size: 24px;\\r\\n  width: 489px;\\r\\n  line-height: 29px;\\r\\n  font-weight: 700;\\r\\n  color: #005ccd;\\r\\n  margin-bottom: 14px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation p {\\r\\n  font-size: 18px;\\r\\n  width: 784.73px;\\r\\n  line-height: 26px;\\r\\n  font-weight: 400;\\r\\n  color: #062e5d;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .iso-text {\\r\\n  margin-top: 27px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .input-group {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  width: 772px;\\r\\n  position: relative;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .country-input {\\r\\n  width: 772px;\\r\\n  height: 50px;\\r\\n  padding-top: 5px;\\r\\n  padding-left: 20px;\\r\\n  margin-top: 6px;\\r\\n  font-size: 18px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  line-height: 36px;\\r\\n  background: hsl(0deg 0% 100%);\\r\\n  box-shadow: 0px 0px 4px rgb(2 79 255 / 30%);\\r\\n  border-radius: 4px;\\r\\n  border: none;\\r\\n}\\r\\n\\r\\n.validation-wrapper .input-group .arrow-icon {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  color: gray;\\r\\n  position: absolute;\\r\\n  top: calc(50% - 19px / 2);\\r\\n  right: 11px;\\r\\n  transition: 0.1s;\\r\\n  height: 25px;\\r\\n  width: 25px;\\r\\n  padding: 0 0 6px 7px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .input-group .arrow-icon:hover {\\r\\n  background-color: rgb(233, 230, 230);\\r\\n  border-radius: 50%;\\r\\n  cursor: pointer;\\r\\n  transition: 0.3s;\\r\\n}\\r\\n\\r\\n.validation-wrapper .input-group .close-icon {\\r\\n  position: absolute;\\r\\n  right: 43px;\\r\\n  height: 25px;\\r\\n  width: 25px;\\r\\n  font-size: 14px;\\r\\n  padding-top: 6px;\\r\\n  padding-left: 7px;\\r\\n  top: calc(50% - (18px / 2));\\r\\n  color: gray;\\r\\n}\\r\\n\\r\\n.validation-wrapper .input-group .close-icon:hover {\\r\\n  background-color: rgb(233, 230, 230);\\r\\n  border-radius: 50%;\\r\\n  cursor: pointer;\\r\\n  transition: 0.3s;\\r\\n}\\r\\n\\r\\n.validation-wrapper .country-input::-webkit-calendar-picker-indicator {\\r\\n  opacity: 0;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .country-selector::-webkit-scrollbar {\\r\\n  display: none;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-input {\\r\\n  width: 772px;\\r\\n  height: 50px;\\r\\n  padding-top: 5px;\\r\\n  padding-left: 20px;\\r\\n  margin-top: 6px;\\r\\n  background: #ffffff;\\r\\n  box-shadow: 0px 0px 4px rgba(2, 79, 255, 0.3);\\r\\n  border-radius: 4px;\\r\\n  border: none;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .submit-btn-with-flag-img {\\r\\n  display: flex;\\r\\n  margin-top: 12px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .png-btn,\\r\\n.validation-wrapper .data-validation .svg-btn {\\r\\n  margin-top: 20px;\\r\\n  font-size: 18px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  line-height: 36px;\\r\\n  cursor: pointer;\\r\\n  border-radius: 4px;\\r\\n  width: 80px;\\r\\n  height: 50px;\\r\\n  color: #033260;\\r\\n  border: 1px solid #dfeeff;\\r\\n  background-color: #ffffff;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .png-btn {\\r\\n  background-color: #dfeeff;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .resize {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  width: 646px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .resize .resize-check {\\r\\n  font-family: \\\"Roboto\\\";\\r\\n  display: flex;\\r\\n  justify-content: space-between;\\r\\n  align-items: center;\\r\\n  width: 115px;\\r\\n  font-size: 12px;\\r\\n  line-height: 14px;\\r\\n  padding-top: 5px;\\r\\n  color: #37414b;\\r\\n  margin-top: 17px;\\r\\n  margin-left: 20px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .resize-width,\\r\\n.validation-wrapper .data-validation .resize-height {\\r\\n  display: none;\\r\\n  margin-left: 20px;\\r\\n  margin-top: 20px;\\r\\n  font-size: 13px;\\r\\n  font-family: \\\"Work Sans\\\";\\r\\n  line-height: 15.25px;\\r\\n  width: 142.89px;\\r\\n  color: #768699;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .resize-height {\\r\\n  margin-left: 0;\\r\\n}\\r\\n\\r\\n.validation-wrapper .resize .width-input {\\r\\n  height: 25px;\\r\\n  width: 53%;\\r\\n  font-size: 13px;\\r\\n  line-height: 15.25px;\\r\\n  margin-left: 8px;\\r\\n  background: #ffffff;\\r\\n  box-shadow: 0px 0px 4px rgba(2, 79, 255, 0.3);\\r\\n  border-radius: 2px;\\r\\n  border: none;\\r\\n  padding-left: 5px;\\r\\n}\\r\\n\\r\\n.width-input::-webkit-outer-spin-button,\\r\\n.width-input::-webkit-inner-spin-button {\\r\\n  -webkit-appearance: none;\\r\\n  margin: 0;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .preview {\\r\\n  margin-top: 40px;\\r\\n  font-weight: 500;\\r\\n  display: flex;\\r\\n  justify-content: space-between;\\r\\n  width: 681px;\\r\\n  height: 36px;\\r\\n  cursor: pointer;\\r\\n  align-items: center;\\r\\n}\\r\\n\\r\\n.validation-wrapper .preview .copy-icon {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  color: #768699;\\r\\n}\\r\\n\\r\\n.validation-wrapper .preview .copy-icon span {\\r\\n  color: #768699;\\r\\n  font-weight: 400;\\r\\n  line-height: 15.25px;\\r\\n  font-family: \\\"Work Sans\\\";\\r\\n  font-size: 13px;\\r\\n  padding-left: 5.87px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-out-with-img {\\r\\n  display: flex;\\r\\n  width: 773px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .validation-out-with-img .validation-output {\\r\\n  display: flex;\\r\\n  align-items: center;\\r\\n  margin-top: 12px;\\r\\n  height: 50px;\\r\\n  width: 772px;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n  border: none;\\r\\n  color: #062e5d;\\r\\n  font-weight: 500;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  background: #ffffff;\\r\\n  box-shadow: 0px 0px 4px rgba(2, 79, 255, 0.3);\\r\\n  border-radius: 4px;\\r\\n  padding-left: 20px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-output p {\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n  text-overflow: ellipsis;\\r\\n  overflow: hidden;\\r\\n  white-space: nowrap;\\r\\n  color: #062e5d;\\r\\n  font-weight: 500;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  width: 593px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-out-with-img img {\\r\\n  margin-left: 20px;\\r\\n  margin-top: 12px;\\r\\n  border-radius: 4px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-output code {\\r\\n  color: #062e5d !important;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n}\\r\\n\\r\\n.validation-wrapper .validation-output .green-output-color {\\r\\n  color: #82be18;\\r\\n}\\r\\n\\r\\n.validation-wrapper .validation-output .blue-output-color {\\r\\n  color: #005ccd;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-output-hint {\\r\\n  display: flex;\\r\\n  margin-top: 19px;\\r\\n  height: 25px;\\r\\n  width: 690px;\\r\\n  position: relative;\\r\\n}\\r\\n\\r\\n.validation-wrapper .validation-output-hint .service-mark {\\r\\n  position: absolute;\\r\\n  border-left: 1px solid hsl(212deg 88% 19%);\\r\\n  width: 1px;\\r\\n  height: 9px;\\r\\n  bottom: 29px;\\r\\n  left: 43px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .validation-output-hint .iso-mark {\\r\\n  position: absolute;\\r\\n  border-left: 1px solid hsl(212deg 88% 19%);\\r\\n  width: 1px;\\r\\n  height: 9px;\\r\\n  bottom: 29px;\\r\\n  left: 442px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .validation-output-hint .lang-iso-mark {\\r\\n  position: absolute;\\r\\n  border-left: 1px solid hsl(212deg 88% 19%);\\r\\n  width: 1px;\\r\\n  height: 9px;\\r\\n  bottom: 29px;\\r\\n  left: 417px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .validation-output-hint .size-mark {\\r\\n  position: absolute;\\r\\n  border-left: 1px solid hsl(212deg 88% 19%);\\r\\n  width: 1px;\\r\\n  height: 9px;\\r\\n  bottom: 29px;\\r\\n  left: 513px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .validation-output-hint .lang-size-mark {\\r\\n  position: absolute;\\r\\n  border-left: 1px solid hsl(212deg 88% 19%);\\r\\n  width: 1px;\\r\\n  height: 9px;\\r\\n  bottom: 29px;\\r\\n  left: 508px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-output-hint p {\\r\\n  font-size: 14px;\\r\\n  line-height: 28px;\\r\\n  color: rgba(118, 134, 153, 1);\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-output-hint p:nth-child(1) {\\r\\n  border: 0;\\r\\n  background: #ffffff;\\r\\n  box-shadow: 2px 2px 4px rgba(2, 79, 255, 0.25);\\r\\n  border-radius: 2px;\\r\\n  width: 92.7px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-output-hint p:nth-child(2) {\\r\\n  border: 0;\\r\\n  margin-left: 205px;\\r\\n  width: 168.2px;\\r\\n  background: #ffffff;\\r\\n  box-shadow: 2px 2px 4px rgba(2, 79, 255, 0.25);\\r\\n  border-radius: 2px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .validation-output-hint p:nth-child(3) {\\r\\n  border: 0;\\r\\n  width: 41.64px;\\r\\n  background: #ffffff;\\r\\n  box-shadow: 2px 2px 4px rgba(2, 79, 255, 0.25);\\r\\n  border-radius: 2px;\\r\\n  margin-left: 26px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .prettyprint {\\r\\n  background: #ffffff;\\r\\n  box-shadow: 2px 4px 15px rgba(2, 79, 255, 0.25);\\r\\n  border-radius: 4px;\\r\\n  margin-top: 20px;\\r\\n  color: #062e5d;\\r\\n  width: 775px;\\r\\n  padding: 20px 20px;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n  margin-bottom: 91px;\\r\\n  height: 298px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .phone-prettyprint {\\r\\n  margin-bottom: 84px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .prettyprint .img-out-link {\\r\\n  display: flex;\\r\\n  margin: -39px;\\r\\n  padding-left: 44px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .prettyprint p {\\r\\n  line-height: 36px !important;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .prettyprint .pretty-cyan-color {\\r\\n  color: hsl(213deg 100% 40%) !important;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .prettyprint .pretty-blue-color {\\r\\n  color: #062e5d !important;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation pre.prettyprint {\\r\\n  line-height: 36px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  font-size: 18px;\\r\\n  font-weight: 500;\\r\\n  overflow: auto;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation pre.prettyprint::-webkit-scrollbar {\\r\\n  display: none;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .prettyprint span {\\r\\n  font-weight: 500;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation .img-output span {\\r\\n  color: #005ccd;\\r\\n  font-weight: 500;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation:nth-child(3) {\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  margin-left: 583px;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation:nth-child(3) h1 {\\r\\n  color: rgba(0, 179, 219, 1);\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation:nth-child(3) .svg-btn {\\r\\n  background-color: #fff;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation:nth-child(3) .png-btn {\\r\\n  background-color: #dfeeff;\\r\\n}\\r\\n\\r\\n.validation-wrapper .data-validation:nth-child(4) h1 {\\r\\n  color: #733de7;\\r\\n}\\r\\n\\r\\n.validation-wrapper .outer-circle-country {\\r\\n  width: 294px;\\r\\n  height: 537px;\\r\\n  top: 375px;\\r\\n  right: 0;\\r\\n  background-color: hsl(212deg 100% 94%);\\r\\n  position: absolute;\\r\\n  border-radius: 282px 0 0 296px;\\r\\n  border: 1px solid hsl(212deg 100% 94%);\\r\\n  z-index: 1;\\r\\n}\\r\\n\\r\\n.validation-wrapper .inner-circle-country {\\r\\n  width: 134px;\\r\\n  height: 253px;\\r\\n  top: 519px;\\r\\n  right: 0;\\r\\n  background-color: hsl(0deg 0% 100%);\\r\\n  position: absolute;\\r\\n  border-radius: 145px 0 0 150px;\\r\\n  border: 1px solid hsl(212deg 100% 94%);\\r\\n  z-index: 1;\\r\\n}\\r\\n\\r\\n.validation-wrapper .outer-circle-lang {\\r\\n  border: 1px solid #daf7fd;\\r\\n  background-color: #daf7fd;\\r\\n  position: absolute;\\r\\n  width: 330px;\\r\\n  height: 330px;\\r\\n  left: -184px;\\r\\n  top: 1181px;\\r\\n  border-radius: 165px;\\r\\n  z-index: 1;\\r\\n}\\r\\n\\r\\n.validation-wrapper .inner-circle-lang {\\r\\n  border: 1px solid #daf7fd;\\r\\n  background-color: #ffffff;\\r\\n  position: absolute;\\r\\n  width: 176px;\\r\\n  height: 176px;\\r\\n  left: -107px;\\r\\n  top: 1258px;\\r\\n  border-radius: 89px;\\r\\n  z-index: 1;\\r\\n}\\r\\n\\r\\n.validation-wrapper .circle-lang {\\r\\n  border: 1px solid hsl(190deg 90% 92%);\\r\\n  background-color: hsl(190deg 90% 92%);\\r\\n  position: absolute;\\r\\n  width: 108px;\\r\\n  height: 108px;\\r\\n  left: 104px;\\r\\n  top: 1489px;\\r\\n  border-radius: 89px;\\r\\n  z-index: 1;\\r\\n}\\r\\n\\r\\n.validation-wrapper .outer-circle-prefix {\\r\\n  position: absolute;\\r\\n  border: 1px solid hsl(247deg 100% 96%);\\r\\n  width: 209px;\\r\\n  height: 383px;\\r\\n  top: 1953px;\\r\\n  right: 0;\\r\\n  border-radius: 201px 0 0 201px;\\r\\n  background-color: hsl(247deg 100% 96%);\\r\\n  z-index: 1;\\r\\n}\\r\\n\\r\\n.validation-wrapper .inner-circle-prefix {\\r\\n  position: absolute;\\r\\n  border: 1px solid hsl(247deg 100% 96%);\\r\\n  width: 75px;\\r\\n  height: 133px;\\r\\n  top: 2083px;\\r\\n  right: 0;\\r\\n  border-radius: 201px 0 0 201px;\\r\\n  background-color: hsl(0deg 0% 100%);\\r\\n  z-index: 1;\\r\\n}\\r\\n\\r\\n.footer {\\r\\n  display: flex;\\r\\n  justify-content: space-between;\\r\\n  background-color: #002046;\\r\\n  color: #fff;\\r\\n  padding: 56px 74px;\\r\\n  font-family: \\\"Roboto\\\";\\r\\n  height: 142px;\\r\\n  max-width: 1921px;\\r\\n}\\r\\n\\r\\n.footer .logo img {\\r\\n  width: 240px;\\r\\n  height: 32px;\\r\\n}\\r\\n\\r\\n.footer .footer-links-wrapper {\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  font-size: 14px;\\r\\n  line-height: 16px;\\r\\n}\\r\\n\\r\\n.footer .footer-links-wrapper .links-wrapper {\\r\\n  margin-bottom: 31px;\\r\\n}\\r\\n\\r\\n.footer .links-wrapper .footer-link {\\r\\n  margin-right: 10px;\\r\\n  cursor: pointer;\\r\\n  text-decoration: none;\\r\\n  color: white;\\r\\n}\\r\\n\\r\\n.footer .links-wrapper .footer-link:last-child {\\r\\n  margin-right: 0;\\r\\n}\\r\\n\\r\\n.footer .footer-links-wrapper .footer-copywrite {\\r\\n  text-align: right;\\r\\n}\\r\\n\\r\\n.autocomplete {\\r\\n  z-index: 999;\\r\\n  background-color: hsl(211deg 100% 97%);\\r\\n  max-height: 300px !important;\\r\\n  overflow-y: auto;\\r\\n  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),\\r\\n    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);\\r\\n  border-radius: 4px;\\r\\n  font-size: 18px;\\r\\n  line-height: 36px;\\r\\n  font-family: \\\"Rubik\\\";\\r\\n  color: rgba(3, 50, 96, 1);\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.autocomplete div {\\r\\n  padding: 10px 0 10px 10px;\\r\\n}\\r\\n\\r\\n.autocomplete div:hover {\\r\\n  border: 0;\\r\\n  background-color: #dce2e9;\\r\\n  border-radius: 2px;\\r\\n}\\r\\n\\r\\n.selected {\\r\\n  border: 0;\\r\\n  background-color: #dce2e9;\\r\\n}\\r\\n\\r\\n@media (min-width: 1960px) {\\r\\n  .content-wrapper {\\r\\n    max-width: 100%;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .header {\\r\\n    margin: 0 auto;\\r\\n    width: 1550px;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .content {\\r\\n    margin: 0 auto;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper {\\r\\n    max-width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .description {\\r\\n    margin: auto;\\r\\n    max-width: 1550px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation {\\r\\n    margin: auto;\\r\\n    max-width: 1550px;\\r\\n    width: unset;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation:nth-child(3) {\\r\\n    margin: auto;\\r\\n    max-width: 1550px;\\r\\n  }\\r\\n\\r\\n  .footer {\\r\\n    max-width: 100%;\\r\\n    justify-content: center;\\r\\n  }\\r\\n\\r\\n  .footer .logo img {\\r\\n    margin-right: 507px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 1550px) {\\r\\n  .validation-wrapper .data-validation:nth-child(3) {\\r\\n    margin-left: 499px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 1340px) {\\r\\n  .validation-wrapper .data-validation:nth-child(3) {\\r\\n    margin-left: 353px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .description p {\\r\\n    width: 824px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 1250px) {\\r\\n  .validation-wrapper .data-validation:nth-child(3) {\\r\\n    margin-left: 271px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 1152px) {\\r\\n  .validation-wrapper .data-validation:nth-child(3) {\\r\\n    margin-left: 123px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 1000px) {\\r\\n  .validation-wrapper .data-validation:nth-child(3) {\\r\\n    margin-left: 37px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 950px) {\\r\\n  .content-wrapper {\\r\\n    padding: 0;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .header {\\r\\n    padding: 34px 2% 0 2%;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .content {\\r\\n    margin-left: 0;\\r\\n    padding: 0 5% 0 5%;\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .content::before {\\r\\n    top: -9px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper {\\r\\n    padding: 78px 5% 0 5%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation {\\r\\n    z-index: 99;\\r\\n    margin-left: 0;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation:nth-child(3) {\\r\\n    margin-left: 0;\\r\\n  }\\r\\n\\r\\n  .footer {\\r\\n    padding: 56px 5% 0 5%;\\r\\n    column-gap: 20px;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 880px) {\\r\\n  .validation-wrapper .description p {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation p {\\r\\n    width: 100%;\\r\\n    overflow: auto;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation p::-webkit-scrollbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation:nth-child(3) {\\r\\n    margin-left: 0;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .input-group {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .input-group img {\\r\\n    position: absolute;\\r\\n    bottom: 18px;\\r\\n    right: 97px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .country-input {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .resize {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .resize .resize-check {\\r\\n    margin-left: 9px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .preview {\\r\\n    margin-top: 40px;\\r\\n    font-weight: 500;\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    width: calc(100% - 90px);\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output {\\r\\n    width: 100%;\\r\\n    padding-left: 2px;\\r\\n    overflow-x: auto;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output p {\\r\\n    font-size: 18px;\\r\\n    line-height: 36px;\\r\\n    white-space: nowrap;\\r\\n    color: #062e5d;\\r\\n    width: 593px;\\r\\n    text-overflow: unset;\\r\\n    padding-left: 10px;\\r\\n    overflow: unset;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(2) {\\r\\n    margin-left: 158px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(3) {\\r\\n    margin-left: 24px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .iso-mark {\\r\\n    left: 413px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .size-mark {\\r\\n    left: 461px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-out-with-img {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output::-webkit-scrollbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .prettyprint {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-input {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper .links-wrapper {\\r\\n    text-align: right;\\r\\n    width: 100%;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 656px) {\\r\\n  .content-wrapper .content {\\r\\n    margin-left: 0;\\r\\n    padding: 0 5% 0 5%;\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation {\\r\\n    width: 100%;\\r\\n    z-index: 99;\\r\\n    margin-left: 0;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .description {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .description p {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation p {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .input-group {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .input-group img {\\r\\n    position: absolute;\\r\\n    bottom: 18px;\\r\\n    right: 39px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .country-input {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .resize {\\r\\n    width: 100%;\\r\\n    max-height: 25px;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: flex-start;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .resize .resize-check {\\r\\n    margin-left: 0;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .resize-width,\\r\\n  .validation-wrapper .data-validation .resize-height {\\r\\n    margin-left: 0;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output {\\r\\n    width: 100%;\\r\\n    padding-left: 2px;\\r\\n    overflow-x: auto;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output p {\\r\\n    width: 0;\\r\\n    display: flex;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output::-webkit-scrollbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .iso-mark {\\r\\n    position: absolute;\\r\\n    border-left: 1px solid hsl(212deg 88% 19%);\\r\\n    width: 1px;\\r\\n    height: 9px;\\r\\n    bottom: 29px;\\r\\n    left: 238px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .size-mark {\\r\\n    position: absolute;\\r\\n    border-left: 1px solid hsl(212deg 88% 19%);\\r\\n    width: 1px;\\r\\n    height: 9px;\\r\\n    bottom: 29px;\\r\\n    left: 320px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .preview {\\r\\n    margin-top: 189px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .png-svg-btn button {\\r\\n    margin-right: 10px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(2) {\\r\\n    margin-left: 18px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(3) {\\r\\n    margin-left: 21px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output {\\r\\n    width: 84%;\\r\\n    padding-left: 2px;\\r\\n    overflow-x: auto;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output p {\\r\\n    width: 0;\\r\\n    display: flex;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint {\\r\\n    width: 485px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(2) {\\r\\n    margin-left: 158px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(3) {\\r\\n    margin-left: 24px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .iso-mark {\\r\\n    left: 413px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .size-mark {\\r\\n    left: 461px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-out-with-img {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output::-webkit-scrollbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .prettyprint {\\r\\n    width: 100%;\\r\\n    overflow: auto;\\r\\n    height: 266px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .prettyprint::-webkit-scrollbar {\\r\\n    height: 10px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .prettyprint::-webkit-scrollbar-track {\\r\\n    background-color: #f1f1f1;\\r\\n    border-radius: 110px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .prettyprint::-webkit-scrollbar-thumb {\\r\\n    background-color: #dfeeff;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper\\r\\n    .data-validation\\r\\n    .prettyprint::-webkit-scrollbar-thumb:hover {\\r\\n    background-color: #7db7fa;\\r\\n  }\\r\\n\\r\\n  .prettyprint span {\\r\\n    word-wrap: unset !important;\\r\\n    white-space: unset !important;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-input {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper .links-wrapper {\\r\\n    margin-left: 0;\\r\\n    width: 100%;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 600px) {\\r\\n  .content-wrapper .content {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .content::before {\\r\\n    height: 196px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .description {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .description p {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation h1 {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation p {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .input-group {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .input-group img {\\r\\n    position: absolute;\\r\\n    bottom: 18px;\\r\\n    right: 39px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .country-input {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .resize {\\r\\n    width: 100%;\\r\\n    max-height: 25px;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .resize-width,\\r\\n  .validation-wrapper .data-validation .resize-height {\\r\\n    margin-left: 39px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .resize-height {\\r\\n    margin-left: 41px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output {\\r\\n    width: 100%;\\r\\n    padding-left: 2px;\\r\\n    overflow-x: auto;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output p {\\r\\n    width: 0;\\r\\n    display: flex;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output::-webkit-scrollbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .iso-mark {\\r\\n    position: absolute;\\r\\n    border-left: 1px solid hsl(212deg 88% 19%);\\r\\n    width: 1px;\\r\\n    height: 9px;\\r\\n    bottom: 29px;\\r\\n    left: 238px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .size-mark {\\r\\n    position: absolute;\\r\\n    border-left: 1px solid hsl(212deg 88% 19%);\\r\\n    width: 1px;\\r\\n    height: 9px;\\r\\n    bottom: 29px;\\r\\n    left: 320px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .preview {\\r\\n    margin-top: 189px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .png-svg-btn button {\\r\\n    margin-right: 10px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(2) {\\r\\n    margin-left: 18px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(3) {\\r\\n    margin-left: 21px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output {\\r\\n    width: 100%;\\r\\n    padding-left: 2px;\\r\\n    overflow-x: auto;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output p {\\r\\n    width: 0;\\r\\n    display: flex;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint {\\r\\n    width: 485px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(2) {\\r\\n    margin-left: 158px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output-hint p:nth-child(3) {\\r\\n    margin-left: 24px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .iso-mark {\\r\\n    left: 413px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .validation-output-hint .size-mark {\\r\\n    left: 461px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-out-with-img {\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-output::-webkit-scrollbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .prettyprint {\\r\\n    width: 100%;\\r\\n    overflow: auto;\\r\\n    height: 266px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .prettyprint::-webkit-scrollbar {\\r\\n    height: 10px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .prettyprint::-webkit-scrollbar-track {\\r\\n    background-color: #f1f1f1;\\r\\n    border-radius: 110px;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .prettyprint::-webkit-scrollbar-thumb {\\r\\n    background-color: #dfeeff;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper\\r\\n    .data-validation\\r\\n    .prettyprint::-webkit-scrollbar-thumb:hover {\\r\\n    background-color: #7db7fa;\\r\\n  }\\r\\n\\r\\n  .prettyprint span {\\r\\n    word-wrap: unset !important;\\r\\n    white-space: unset !important;\\r\\n  }\\r\\n\\r\\n  .validation-wrapper .data-validation .validation-input {\\r\\n    width: 100%;\\r\\n  }\\r\\n}\\r\\n\\r\\n@media (max-width: 575px) {\\r\\n  .content-wrapper .header .burger-btn {\\r\\n    display: block;\\r\\n    width: 51px;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .header .navbar {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .header a {\\r\\n    margin: 0;\\r\\n    padding: 20px;\\r\\n    transition: all 0.1s ease-in-out;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .header .nav-link {\\r\\n    margin-left: 0;\\r\\n    margin-right: 0;\\r\\n    font-size: 13px;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .header .nav-link:first-child {\\r\\n    border-radius: 7px 7px 0 0;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .header .nav-link:last-child {\\r\\n    border-radius: 0 0 7px 7px;\\r\\n  }\\r\\n\\r\\n  .content-wrapper .header .nav-link:hover {\\r\\n    background-color: #002c5f;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper .links-wrapper {\\r\\n    margin: 0;\\r\\n  }\\r\\n\\r\\n  .footer .footer-links-wrapper .footer-copywrite {\\r\\n    text-align: end;\\r\\n    margin-top: 30px;\\r\\n    margin-left: 0;\\r\\n  }\\r\\n\\r\\n  .footer .links-wrapper .footer-link:not(.footer-link:last-of-type) {\\r\\n    margin-right: 4px;\\r\\n  }\\r\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://wordplex/./src/styles/main.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://wordplex/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  }\n\n  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://wordplex/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://wordplex/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/json-format-highlight/dist/json-format-highlight.js":
/*!**************************************************************************!*\
  !*** ./node_modules/json-format-highlight/dist/json-format-highlight.js ***!
  \**************************************************************************/
/***/ (function(module) {

eval("(function (global, factory) {\n\t true ? module.exports = factory() :\n\t0;\n}(this, (function () { 'use strict';\n\nvar defaultColors = {\n  keyColor: 'dimgray',\n  numberColor: 'lightskyblue',\n  stringColor: 'lightcoral',\n  trueColor: 'lightseagreen',\n  falseColor: '#f66578',\n  nullColor: 'cornflowerblue'\n};\n\nvar entityMap = {\n  '&': '&amp;',\n  '<': '&lt;',\n  '>': '&gt;',\n  '\"': '&quot;',\n  \"'\": '&#39;',\n  '`': '&#x60;',\n  '=': '&#x3D;'\n};\n\nfunction escapeHtml(html) {\n  return String(html).replace(/[&<>\"'`=]/g, function (s) {\n    return entityMap[s];\n  });\n}\n\nfunction index (json, colorOptions) {\n  if ( colorOptions === void 0 ) colorOptions = {};\n\n  var valueType = typeof json;\n  if (valueType !== 'string') {\n    json = JSON.stringify(json, null, 2) || valueType;\n  }\n  var colors = Object.assign({}, defaultColors, colorOptions);\n  json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');\n  return json.replace(/(\"(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\\"])*\"(\\s*:)?|\\b(true|false|null)\\b|-?\\d+(?:\\.\\d*)?(?:[eE][+]?\\d+)?)/g, function (match) {\n    var color = colors.numberColor;\n    var style = '';\n    if (/^\"/.test(match)) {\n      if (/:$/.test(match)) {\n        color = colors.keyColor;\n      } else {\n        color = colors.stringColor;\n        match = '\"' + escapeHtml(match.substr(1, match.length - 2)) + '\"';\n        style = 'word-wrap:break-word;white-space:pre-wrap;';\n      }\n    } else {\n      color = /true/.test(match) ? colors.trueColor : /false/.test(match) ? colors.falseColor : /null/.test(match) ? colors.nullColor : color;\n    }\n    return (\"<span style=\\\"\" + style + \"color:\" + color + \"\\\">\" + match + \"</span>\");\n  });\n}\n\nreturn index;\n\n})));\n\n\n//# sourceURL=webpack://wordplex/./node_modules/json-format-highlight/dist/json-format-highlight.js?");

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/main.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\nif (true) {\n  if (!_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals || module.hot.invalidate) {\n    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {\n  if (!a && b || a && !b) {\n    return false;\n  }\n\n  var p;\n\n  for (p in a) {\n    if (isNamedExport && p === \"default\") {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (a[p] !== b[p]) {\n      return false;\n    }\n  }\n\n  for (p in b) {\n    if (isNamedExport && p === \"default\") {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (!a[p]) {\n      return false;\n    }\n  }\n\n  return true;\n};\n    var isNamedExport = !_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals;\n    var oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals;\n\n    module.hot.accept(\n      /*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/main.css\",\n      __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/main.css\");\n(function () {\n        if (!isEqualLocals(oldLocals, isNamedExport ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals, isNamedExport)) {\n                module.hot.invalidate();\n\n                return;\n              }\n\n              oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals;\n\n              update(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }\n    )\n  }\n\n  module.hot.dispose(function() {\n    update();\n  });\n}\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://wordplex/./src/styles/main.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://wordplex/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/assets/worldbackground.jpg":
/*!****************************************!*\
  !*** ./src/assets/worldbackground.jpg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"14e731bed81f27e186c7.jpg\";\n\n//# sourceURL=webpack://wordplex/./src/assets/worldbackground.jpg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("index." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("dcda633300cf67cbc20e")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "wordplex:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatewordplex"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/scripts/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/styles/main.css");
/******/ 	
/******/ })()
;