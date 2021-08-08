/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/***/ (() => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*show and hide passwords*/
$('.password-field-container').focusin(function () {
  $(this).css({
    'outline-width': '0',
    'box-shadow': '0 0 5px rgba(81, 203, 238, 1)',
    'border': '1px solid rgba(81, 203, 238, 1)'
  });
});
$('.password-field-container').focusout(function () {
  $(this).addClass('border');
  $(this).css({
    'box-shadow': '0 0 0 transparent'
  });
});
$(".fa-eye").click(function (event) {
  $(event.target).closest(".password-field-container").children("input").attr("type", "password");
  $(event.target).closest(".password-field-container").children(".fa-eye-slash").show();
  $(event.target).closest(".password-field-container").children(".fa-eye").hide();
});
$(".fa-eye-slash").click(function (event) {
  $(event.target).closest(".password-field-container").children("input").attr("type", "text");
  $(event.target).closest(".password-field-container").children(".fa-eye").show();
  $(event.target).closest(".password-field-container").children(".fa-eye-slash").hide();
}); //flash messages

var perfEntries = performance.getEntriesByType("navigation");

for (var i = 0; i < perfEntries.length; i++) {
  if (perfEntries[i].type === "back_forward") {
    // if user has reach the page via the back button...
    //...delete the contents of the flash container
    $("#flash-success-message").attr("val", "");
    $("#flash-error-message").attr("val", "");
    $("#flash-sweet-alert").attr("val", "");
  }
}

var success_msg = $("#flash-success-message").attr("val");
var error_msg = $("#flash-error-message").attr("val");
var sweetAlert_msg = $("#flash-sweet-alert").attr("val");

if (success_msg) {
  new Noty({
    text: success_msg,
    type: "success",
    theme: "relax",
    timeout: 600,
    animation: {
      open: "animate__animated animate__headShake",
      close: "animate__animated animate__headShake"
    }
  }).show();
} else if (error_msg) {
  new Noty({
    text: error_msg,
    type: "error",
    theme: "relax",
    timeout: 600,
    animation: {
      open: "animate__animated animate__headShake",
      close: "animate__animated animate__headShake"
    }
  }).show();
}

if (sweetAlert_msg) {
  swal({
    title: "",
    text: sweetAlert_msg,
    icon: "success"
  });
} //AJAX req for adding item to the cart


$(".add-item-link").click(function (event) {
  event.preventDefault();
  var link = $(this).attr("href");
  $.ajax({
    method: "GET",
    url: link,
    success: function success(data) {
      if (!data.loggedIn) {
        displayFlashMessage(null, "Login To Order!");
        return;
      }

      displayFlashMessage(data.message);
      var curr = $(".cart-total-qty").text();
      if (curr == '') curr = 0;
      curr++;
      $(".cart-total-qty").text(curr);
    },
    error: function error(err) {
      console.log(err);
      return;
    }
  });
}); //update quantity and remove item ..cart
//increasing the qty by 1

$(".fa-plus").click(function (event) {
  var _this = this;

  var id = $(this).closest("li").attr("id");
  axios.get('/cart/increase-qty', {
    params: {
      id: id
    }
  }).then(function (info) {
    // console.log(info);
    var cart = info.data.cart;
    var pizza = info.data.pizza;
    var index = info.data.index;
    $(_this).closest("li").find(".item-qty").html(cart.Items[index].Quantity);
    $(_this).closest("li").find(".item-price").html("&#x20B9;".concat(cart.Items[index].Quantity * cart.Items[index].Pizza.Price));
    $(".cart-total-amt").html("&#x20B9;".concat(cart.TotalPrice));
    $(".cart-total-qty").html(cart.TotalQuantity);
    var val = $(_this).closest("li").find(".item-qty").text();

    if (val == 2) {
      $(_this).closest("li").find(".fa-trash-alt").parent("div").addClass("hidden");
      $(_this).closest("li").find(".fa-minus").parent("div").removeClass("hidden");
    }
  });
}); //decreasing the quantity by 1

$(".fa-minus").click(function (event) {
  var _this2 = this;

  var id = $(this).closest("li").attr("id");
  axios.get('/cart/decrease-qty', {
    params: {
      id: id
    }
  }).then(function (info) {
    // console.log(info);
    var cart = info.data.cart;
    var pizza = info.data.pizza;
    var index = info.data.index;
    $(_this2).closest("li").find(".item-qty").html(cart.Items[index].Quantity);
    $(_this2).closest("li").find(".item-price").html("&#x20B9;".concat(cart.Items[index].Quantity * cart.Items[index].Pizza.Price));
    $(".cart-total-amt").html("&#x20B9;".concat(cart.TotalPrice));
    $(".cart-total-qty").html(cart.TotalQuantity);
    var val = $(_this2).closest("li").find(".item-qty").text();

    if (val == 1) {
      $(_this2).closest("li").find(".fa-minus").parent("div").addClass("hidden");
      $(_this2).closest("li").find(".fa-trash-alt").parent("div").removeClass("hidden");
    }
  });
}); //removing the item

$(".fa-trash-alt").click(function (event) {
  var _this3 = this;

  var id = $(this).closest("li").attr("id");
  axios.get("/cart/remove", {
    params: {
      id: id
    }
  }).then(function (info) {
    var cart = info.data.cart;
    $(_this3).closest("li").remove();
    $(".cart-total-amt").html("&#x20B9;".concat(cart.TotalPrice));
    $(".cart-total-qty").html(cart.TotalQuantity);

    if (cart.TotalPrice == 0) {
      location.reload();
    }
  });
});

var displayFlashMessage = function displayFlashMessage(success_msg, error_msg) {
  if (success_msg) {
    new Noty({
      text: success_msg,
      type: "success",
      theme: "relax",
      timeout: 400,
      animation: {
        open: "animate__animated animate__headShake",
        close: "animate__animated animate__headShake"
      }
    }).show();
  } else if (error_msg) {
    new Noty({
      text: error_msg,
      type: "error",
      theme: "relax",
      timeout: 400,
      animation: {
        open: "animate__animated animate__headShake",
        close: "animate__animated animate__headShake"
      }
    }).show();
  }
}; //order-status form
//adding the selected attribute to the option as per the curr order status


var statusForms = $('.order-status-form');

var _iterator = _createForOfIteratorHelper(statusForms.toArray()),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var form = _step.value;
    var initialStatus = $(form).find('select').data('initial-status');
    $(form).find("option[value=".concat(initialStatus, "]")).attr('selected', true);
  } //changing the order-status on change

} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

function orderStatusFormEvent() {
  $(".order-status-form select").on("change", function (event) {
    // $('#order-status-form').submit();
    var newStatus = $(this).val();
    var orderId = $(this).attr("id");
    axios.post("/admin/update-order-status/?orderId=".concat(orderId, "&newStatus=").concat(newStatus)).then(function (info) {});

    if (newStatus == 'delivered') {
      $(this).closest('tr').remove();
    }
  });
}

orderStatusFormEvent(); //if the user is logged in, join the room real-time

var loggedIn = $("input[name='login-status']").val();

if (loggedIn) {
  var socket = io('http://localhost:1000', {
    transports: ['websocket', 'polling', 'flashsocket']
  });
  socket.on("connect", function () {
    socket.emit("join_room");
  });
  socket.on('newOrder', function (data) {
    var newOrder = newOrderMarkup(data.newOrder, data.time); // console.log("new order revd");

    $('#admin-orders table tr:first').after(newOrder);
    orderStatusFormEvent();
  });
}

function newOrderMarkup(order, time) {
  var returnString = "<tr>\n    <td class=\"border-2 px-4 py-2.5\">\n        <p class=\"mb-2\">".concat(order._id, "</p>\n        <ul>");

  var _iterator2 = _createForOfIteratorHelper(order.Items),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      item = _step2.value;
      returnString += "<li>\n            <span>".concat(item.Pizza.Name, "</span>\n            <span>- ").concat(item.Quantity, " </span>\n        </li>\n        ");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  returnString += "</ul>\n\n        </td>\n\n        <td class=\"border-2 text-center py-2.5\">".concat(order.User.Name, "</td>\n        <td class=\"border-2 text-center py-2.5\">").concat(order.Phone, "</td>\n        <td class=\"border-2 text-center py-2.5\">").concat(order.Address, "</td>\n\n        <td class=\"border-2 text-center py-2.5\">\n\n            <form action=\"/admin/order-status\" method=\"post\" class=\"order-status-form\">\n                <select name=\"Status\" id=").concat(order._id, " data-initial-status=").concat(order.Status, " class=\"form-select\">\n                    <option value=\"placed\">Placed</option>\n                    <option value=\"confirmed\">Confirmed</option>\n                    <option value=\"prepared\">Prepared</option>\n                    <option value=\"out-for-delivery\">Out For Delivery</option>\n                    <option value=\"delivered\">Delivered</option>\n                </select>\n            </form>\n\n        </td>\n\n        <td class=\"border-2 text-center py-2.5\"> &#8377;").concat(order.TotalPrice, " <span class=\"uppercase ml-3\">").concat(order.PaymentType, "</span></td>\n        <td class=\"border-2 text-center py-2.5\"> &nbsp; ").concat(time, " </td>\n    </tr>\n\n    ");
  return returnString;
}

/***/ }),

/***/ "./assets/scss/app.scss":
/*!******************************!*\
  !*** ./assets/scss/app.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/js/app": 0,
/******/ 			"public/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunky"] = self["webpackChunky"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/css/app"], () => (__webpack_require__("./assets/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/css/app"], () => (__webpack_require__("./assets/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;