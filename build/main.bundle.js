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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _categorySelected = __webpack_require__(1);

var selectedCategoryData = _interopRequireWildcard(_categorySelected);

var _activeElementCarousel = __webpack_require__(3);

var activeElementCarousel = _interopRequireWildcard(_activeElementCarousel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

$(function () {
    var currentSlide = "",
        totalSlides = "",
        chooseCategory = $('#chooseCategorySelect');

    selectedCategoryData.selectedCategoryData();

    $('body').on('click', '.card', function () {
        var activeElement = $(this),
            activeFilter = chooseCategory.val();

        if (activeFilter === "All") {
            currentSlide = $(this).data('all-id');
            totalSlides = $('figure:last-child').data('all-id');
        } else {
            currentSlide = $(this).data('index');
            totalSlides = $('figure:last-child').data('index');
        }

        activeElementCarousel.showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
        $('#showItem').modal('show');
    });

    $('.btn-next').on('click', function (e) {
        e.preventDefault();
        var activeFilter = chooseCategory.val(),
            activeElement = void 0,
            currentSlide = $('.carousel-indicators li.active').index() + 1;
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        currentSlide = currentSlide + 1;

        activeElementCarousel.showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
    });

    $('.btn-prev').on('click', function (e) {
        e.preventDefault();
        var activeFilter = chooseCategory.val(),
            activeElement = void 0,
            currentSlide = $('.carousel-indicators li.active').index() + 1;
        if (currentSlide <= 1) {
            currentSlide = totalSlides + 1;
        }
        currentSlide = currentSlide - 1;

        activeElementCarousel.showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
    });

    $('body').on('click', '.carousel-indicators li', function () {
        var $this = $(this),
            currentSlide = $this.index() + 1,
            activeElement = void 0,
            activeFilter = chooseCategory.val(),
            totalSlides = $('.carousel-indicators li:last-child').index() + 1;

        activeElementCarousel.showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
    });

    $('html').on('click', '.back-top', function () {
        $('html, body').animate({
            scrollTop: '0px'
        }, 500);
    });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectedCategoryData = undefined;

var _checkView = __webpack_require__(2);

var checkView = _interopRequireWildcard(_checkView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var selectedCategoryData = exports.selectedCategoryData = function selectedCategoryData() {
    var jsonURL = "category.json",
        $window = $(window),
        chooseCategory = $('#chooseCategorySelect');

    $.getJSON(jsonURL, function (data) {

        chooseCategory.append('<option value="All">All</option>');

        data.map(function (categories) {
            var availableCategories = categories.category;
            return chooseCategory.append('<option value="' + availableCategories + '">' + availableCategories + '</option>');
        });

        var categorySelected = function categorySelected() {
            var selectedCategory = chooseCategory.val(),
                k = 1;
            $('.album-container').html('');

            data.forEach(function (i) {
                var albumHolder = "",
                    totalItems = i.items;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = totalItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var j = _step.value;

                        if (selectedCategory === "All") {
                            albumHolder += '<figure class="card bounce-up" data-all-id = "' + k + '" data-index= ' + j.id + '><img src= "' + j.imagePath + '"><figcaption><label> ' + j.title + '</label><p class="card-text">' + j.desc + '</p></figcaption></figure>';
                            k += 1;
                        } else if (i.category === selectedCategory) {
                            albumHolder += '<figure class="card bounce-up" data-index= ' + j.id + '><img src= "' + j.imagePath + '"><figcaption><label> ' + j.title + '</label><p class="card-text">' + j.desc + '</p></figcaption></figure>';
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                $('.album-container').append(albumHolder);
            });
        };

        categorySelected();
        $window.on('scroll', function () {
            checkView.checkView();
        });
        $window.trigger('scroll');

        chooseCategory.on('change', function () {
            categorySelected();
            $window.trigger('scroll');
        });
    });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var checkView = exports.checkView = function checkView() {
    var animationElements = $('.album-container figure'),
        $window = $(window),
        windowHeight = $window.height(),
        windowTop = $window.scrollTop(),
        windowBottom = windowHeight + windowTop;

    $.each(animationElements, function () {
        var $element = $(this),
            elementHeight = $element.outerHeight(),
            elementTop = $element.offset().top,
            elementBottom = elementHeight + elementTop;

        //check if current container is within viewport
        if (elementTop <= windowBottom) {
            $element.addClass('in-view');
        } else {
            $element.removeClass('in-view');
        }
    });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var showActiveElement = exports.showActiveElement = function showActiveElement(activeElement, activeFilter, currentSlide, totalSlides) {
    if (activeFilter === "All") {
        activeElement = $('.album-container').find("[data-all-id='" + currentSlide + "']");
    } else {
        activeElement = $('.album-container').find("[data-index='" + currentSlide + "']");
    }

    var imgSrc = activeElement.find('img').attr('src'),
        imgTitle = activeElement.find('figcaption label').text(),
        imgDesc = activeElement.find('figcaption .card-text').text(),
        carouselIndicators = $('.carousel-indicators'),
        selectedItemDesc = void 0;

    selectedItemDesc = '<div class="container"><div class="row active"><div class="col selected-item-image"><img class="img-fluid" src=" ' + imgSrc + '" alt="Image"></div><div class="col selected-image-desc"><h3> ' + imgTitle + ' </h3><p> ' + imgDesc + '</p></div></div></div>';
    $('.modal-body').html('').append(selectedItemDesc);

    $('.selected-item-image img').effect("slide", 500);
    $('.selected-image-desc h3').effect("slide", 500);
    $('.selected-image-desc p').animate({
        left: 0,
        opacity: '+=1'
    }, 500);

    carouselIndicators.html('');

    carouselIndicators.each(function () {
        for (var i = 0; i < totalSlides; i++) {
            $("<li/>").appendTo(this);
        }
    });

    carouselIndicators.find('li:nth-child(' + currentSlide + ')').addClass('active');
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map