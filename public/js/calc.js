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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/calc.js":
/*!******************************!*\
  !*** ./resources/js/calc.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
}); //---Range sync

var calculatorSum = document.getElementById("calculator-sum");
var calculatorReplenishSum = document.getElementById("calculator-replenish-sum");
var calculatorSumRange = document.getElementById("calculator-sum-range");
var calculatorReplenishSumRange = document.getElementById("calculator-replenish-sum-range");
calculatorSum.addEventListener('change', function (e) {
  calculatorSumRange.value = calculatorSum.value;
});
calculatorSumRange.addEventListener('change', function (e) {
  calculatorSum.value = calculatorSumRange.value;
});
calculatorReplenishSum.addEventListener('change', function (e) {
  calculatorReplenishSumRange.value = calculatorReplenishSum.value;
});
calculatorReplenishSumRange.addEventListener('change', function (e) {
  calculatorReplenishSum.value = calculatorReplenishSumRange.value;
});
$(function () {
  $("#calculator-date").datepicker();
}); //---
//---Form sending

$('#calculator-form').submit(function () {
  //  console.log($("#calculator-date")[0].value);
  try {
    var checkNumber = function checkNumber(num) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      try {
        if (isNaN(num)) throw Error("Неверный формат числа");
        if (num < min || num > max) throw Error("Значение находится за границами диапазона " + min + ":" + max);
      } catch (e) {
        return e.message;
      }

      return "no errors";
    };

    var date = new Date($("#calculator-date")[0].value);
    var sum = $("#calculator-sum")[0].value;
    var sumMin = $("#calculator-sum")[0].min;
    var sumMax = $("#calculator-sum")[0].max;
    var time = $("#calculator-time")[0].value;
    var replenish = $("[name=calculator-replenish]")[0].value;
    var replenishSum = $("#calculator-replenish-sum")[0].value;
    var replenishSumMin = $("#calculator-replenish-sum")[0].min;
    var replenishSumMax = $("#calculator-replenish-sum")[0].max;
    var checkResult = "";
    if (!(date instanceof Date && !isNaN(date))) throw Error("Неверный формат даты");
    checkResult = checkNumber(sum, sumMin, sumMax);
    if (checkResult != "no errors") throw Error(checkResult);
    checkResult = checkNumber(time, 1, 5);
    if (checkResult != "no errors") throw Error(checkResult);

    if (replenish != "no" && replenish != "yes") {
      throw Error("Неверный формат переключателя");
    } else {
      checkResult = checkNumber(replenishSum, replenishSumMin, replenishSumMax);
      if (checkResult != "no errors") throw Error(checkResult);
    }
  } catch (e) {
    $('#calculator-result-value').html(e.message);
    return false;
  }

  $.ajax({
    data: $(this).serialize(),
    type: $(this).attr('method'),
    url: $(this).attr('action'),
    success: function success(response) {
      $('#calculator-result-value').html(response + " руб");
    }
  });
  return false;
}); //----

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./resources/js/calc.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/soulyaris/web-dev/laravel-project/iqo-test/resources/js/calc.js */"./resources/js/calc.js");


/***/ })

/******/ });