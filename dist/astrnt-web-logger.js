(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("astrnt-web-logger", [], factory);
	else if(typeof exports === 'object')
		exports["astrnt-web-logger"] = factory();
	else
		root["astrnt-web-logger"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: recordEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recordEvent", function() { return recordEvent; });
/* harmony import */ var utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/astrnt-http-handler */ "./src/utils/astrnt-http-handler.js");
/* harmony import */ var utils_navigator_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/navigator-helper */ "./src/utils/navigator-helper.js");



var getCurrentDateTime = function getCurrentDateTime() {
  var date = new Date();
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  }

  hour = hour % 12;
  hour = hour ? hour : 12;
  minute = minute < 10 ? '0' + minute : minute;
  var result = "".concat([year, month, day].join('-'), " ").concat(hour, ":").concat(minute, ":").concat(second);
  return result;
};

var constructRequestParams = function constructRequestParams(params) {
  var device = Object(utils_navigator_helper__WEBPACK_IMPORTED_MODULE_1__["deviceInfo"])();
  var timeZone = new Date().getTimezoneOffset();
  var logTime = getCurrentDateTime();
  var ua = navigator.userAgent;
  var os = "".concat(device.os, " (").concat(device.osVersion, ")");
  var version = "".concat(device.browser, ", Version ").concat(device.browserVersion, " (").concat(device.browserMajorVersion, ")");
  return {
    logs: {
      'interview_code': params.interview_code || '',
      'candidate_id': params.candidate_id || 0,
      'job_id': params.job_id || 0,
      'company_id': params.company_id || 0,
      'event': params.event || '',
      'message': params.message || '',
      'os': os,
      'version': version,
      'imei': ua,
      'log_time': logTime,
      'time_zone': timeZone
    }
  };
};

var constructURL = function constructURL(env) {
  var domainPrefix = '';

  switch (env) {
    case 'beta':
    case 'dev':
      domainPrefix = 'beta';
      break;

    case 'production':
    case 'live':
      domainPrefix = 'app';
      break;
  }

  var baseURL = "https://".concat(domainPrefix, ".astrnt.co");
  return "".concat(baseURL, "/api/v2/candidate/logs");
};

function recordEvent(env, params) {
  var URL = constructURL(env);
  var requestParams = constructRequestParams(params);
  return Object(utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', URL, requestParams);
}

/***/ }),

/***/ "./src/utils/astrnt-http-handler.js":
/*!******************************************!*\
  !*** ./src/utils/astrnt-http-handler.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (method, url, params) {
  var mimeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'application/json';
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

    if (mimeType && request.overrideMimeType) {
      request.overrideMimeType(mimeType);
    }

    request.addEventListener('load', function (evt) {
      var target = evt.target;
      var response = JSON.parse(target.responseText);
      var responseCode = response.status || request.status;

      if (responseCode >= 200 && responseCode < 300) {
        resolve(response.message || response);
      } else {
        reject(response.message || response);
      }
    });
    var requestParams = JSON.stringify(params);
    request.send(requestParams);
  });
});

/***/ }),

/***/ "./src/utils/navigator-helper.js":
/*!***************************************!*\
  !*** ./src/utils/navigator-helper.js ***!
  \***************************************/
/*! exports provided: deviceInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceInfo", function() { return deviceInfo; });
/**
 * source: https://stackoverflow.com/a/18706818/9938539
*/
var ua = navigator.userAgent;
var nVer = navigator.appVersion;
var cookieEnabled = navigator.cookieEnabled;

var getOSInfo = function getOSInfo() {
  var os = '-';
  var osVersion = '-';
  var clientStrings = [{
    s: 'Windows 10',
    r: /(Windows 10.0|Windows NT 10.0)/
  }, {
    s: 'Windows 8.1',
    r: /(Windows 8.1|Windows NT 6.3)/
  }, {
    s: 'Windows 8',
    r: /(Windows 8|Windows NT 6.2)/
  }, {
    s: 'Windows 7',
    r: /(Windows 7|Windows NT 6.1)/
  }, {
    s: 'Windows Vista',
    r: /Windows NT 6.0/
  }, {
    s: 'Windows Server 2003',
    r: /Windows NT 5.2/
  }, {
    s: 'Windows XP',
    r: /(Windows NT 5.1|Windows XP)/
  }, {
    s: 'Windows 2000',
    r: /(Windows NT 5.0|Windows 2000)/
  }, {
    s: 'Windows ME',
    r: /(Win 9x 4.90|Windows ME)/
  }, {
    s: 'Windows 98',
    r: /(Windows 98|Win98)/
  }, {
    s: 'Windows 95',
    r: /(Windows 95|Win95|Windows_95)/
  }, {
    s: 'Windows NT 4.0',
    r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
  }, {
    s: 'Windows CE',
    r: /Windows CE/
  }, {
    s: 'Windows 3.11',
    r: /Win16/
  }, {
    s: 'Android',
    r: /Android/
  }, {
    s: 'Open BSD',
    r: /OpenBSD/
  }, {
    s: 'Sun OS',
    r: /SunOS/
  }, {
    s: 'Linux',
    r: /(Linux|X11)/
  }, {
    s: 'iOS',
    r: /(iPhone|iPad|iPod)/
  }, {
    s: 'Mac OS X',
    r: /Mac OS X/
  }, {
    s: 'Mac OS',
    r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
  }, {
    s: 'QNX',
    r: /QNX/
  }, {
    s: 'UNIX',
    r: /UNIX/
  }, {
    s: 'BeOS',
    r: /BeOS/
  }, {
    s: 'OS/2',
    r: /OS\/2/
  }, {
    s: 'Search Bot',
    r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
  }];

  for (var id in clientStrings) {
    var cs = clientStrings[id];

    if (cs.r.test(ua)) {
      os = cs.s;
      break;
    }
  }

  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = 'Windows';
  }

  switch (os) {
    case 'Mac OS X':
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(ua)[1];
      break;

    case 'Android':
      osVersion = /Android ([\.\_\d]+)/.exec(ua)[1];
      break;

    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
      break;
  }

  return {
    name: os,
    version: osVersion
  };
};

var getBrowserInfo = function getBrowserInfo() {
  var majorVersion = parseInt(nVer, 10);
  var browser = navigator.appName;
  var version = '' + parseFloat(navigator.appVersion);
  var nameOffset, verOffset, ix;

  if ((verOffset = ua.indexOf('Opera')) !== -1) {
    browser = 'Opera';
    version = ua.substring(verOffset + 6);

    if ((verOffset = ua.indexOf('Version')) !== -1) {
      version = ua.substring(verOffset + 8);
    }
  } else if ((verOffset = ua.indexOf('OPR')) !== -1) {
    browser = 'Opera';
    version = ua.substring(verOffset + 4);
  } else if ((verOffset = ua.indexOf('Edge')) !== -1) {
    browser = 'Microsoft Edge';
    version = ua.substring(verOffset + 5);
  } else if ((verOffset = ua.indexOf('MSIE')) !== -1) {
    browser = 'Microsoft Internet Explorer';
    version = ua.substring(verOffset + 5);
  } else if ((verOffset = ua.indexOf('Chrome')) !== -1) {
    browser = 'Chrome';
    version = ua.substring(verOffset + 7);
  } else if ((verOffset = ua.indexOf('Safari')) !== -1) {
    browser = 'Safari';
    version = ua.substring(verOffset + 7);

    if ((verOffset = ua.indexOf('Version')) !== -1) {
      version = ua.substring(verOffset + 8);
    }
  } else if ((verOffset = ua.indexOf('Firefox')) !== -1) {
    browser = 'Firefox';
    version = ua.substring(verOffset + 8);
  } else if (ua.indexOf('Trident/') !== -1) {
    browser = 'Microsoft Internet Explorer';
    version = ua.substring(ua.indexOf('rv:') + 3);
  } else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
    browser = ua.substring(nameOffset, verOffset);
    version = ua.substring(verOffset + 1);

    if (browser.toLowerCase() === browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }

  if ((ix = version.indexOf('')) !== -1) {
    version = version.substring(0, ix);
  }

  if ((ix = version.indexOf(' ')) !== -1) {
    version = version.substring(0, ix);
  }

  if ((ix = version.indexOf(')')) !== -1) {
    version = version.substring(0, ix);
  }

  majorVersion = parseInt('' + version, 10);

  if (isNaN(majorVersion)) {
    version = '' + parseFloat(nVer);
    majorVersion = parseInt(nVer, 10);
  }

  return {
    name: browser || '',
    version: version || '',
    majorVersion: majorVersion || ''
  };
};

var getScreenSize = function getScreenSize() {
  if (!screen.width) {
    return undefined;
  }

  var width = screen.width ? screen.width : '';
  var height = screen.height ? screen.height : '';
  return '' + width + ' x ' + height;
};

var isCookieEnabled = function isCookieEnabled() {
  if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
    document.cookie = 'testcookie';
    return document.cookie.indexOf('testcookie') !== -1;
  }

  return false;
};

function deviceInfo() {
  var os = getOSInfo();
  var browser = getBrowserInfo();
  var screenSize = getScreenSize();
  var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
  return {
    screen: screenSize,
    browser: browser.name,
    browserVersion: browser.version,
    browserMajorVersion: browser.majorVersion,
    mobile: mobile,
    os: os.name,
    osVersion: os.version,
    cookies: isCookieEnabled
  };
}

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvdXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci8uL3NyYy91dGlscy9uYXZpZ2F0b3ItaGVscGVyLmpzIl0sIm5hbWVzIjpbImdldEN1cnJlbnREYXRlVGltZSIsImRhdGUiLCJEYXRlIiwiZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJsZW5ndGgiLCJyZXN1bHQiLCJqb2luIiwiY29uc3RydWN0UmVxdWVzdFBhcmFtcyIsInBhcmFtcyIsImRldmljZSIsImRldmljZUluZm8iLCJ0aW1lWm9uZSIsImdldFRpbWV6b25lT2Zmc2V0IiwibG9nVGltZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwib3MiLCJvc1ZlcnNpb24iLCJ2ZXJzaW9uIiwiYnJvd3NlciIsImJyb3dzZXJWZXJzaW9uIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsImxvZ3MiLCJpbnRlcnZpZXdfY29kZSIsImNhbmRpZGF0ZV9pZCIsImpvYl9pZCIsImNvbXBhbnlfaWQiLCJldmVudCIsIm1lc3NhZ2UiLCJjb25zdHJ1Y3RVUkwiLCJlbnYiLCJkb21haW5QcmVmaXgiLCJiYXNlVVJMIiwicmVjb3JkRXZlbnQiLCJVUkwiLCJyZXF1ZXN0UGFyYW1zIiwiaHR0cEhhbmRsZXIiLCJtZXRob2QiLCJ1cmwiLCJtaW1lVHlwZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvdmVycmlkZU1pbWVUeXBlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsInRhcmdldCIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VDb2RlIiwic3RhdHVzIiwic3RyaW5naWZ5Iiwic2VuZCIsIm5WZXIiLCJhcHBWZXJzaW9uIiwiY29va2llRW5hYmxlZCIsImdldE9TSW5mbyIsImNsaWVudFN0cmluZ3MiLCJzIiwiciIsImlkIiwiY3MiLCJ0ZXN0IiwiZXhlYyIsIm5hbWUiLCJnZXRCcm93c2VySW5mbyIsIm1ham9yVmVyc2lvbiIsInBhcnNlSW50IiwiYXBwTmFtZSIsInBhcnNlRmxvYXQiLCJuYW1lT2Zmc2V0IiwidmVyT2Zmc2V0IiwiaXgiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIiwiaXNOYU4iLCJnZXRTY3JlZW5TaXplIiwic2NyZWVuIiwid2lkdGgiLCJ1bmRlZmluZWQiLCJoZWlnaHQiLCJpc0Nvb2tpZUVuYWJsZWQiLCJkb2N1bWVudCIsImNvb2tpZSIsInNjcmVlblNpemUiLCJtb2JpbGUiLCJjb29raWVzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxr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QUFFQSxNQUxIO0FBTUw5RSxNQUFFLEVBQUVBLEVBQUUsQ0FBQ3NELElBTkY7QUFPTHJELGFBQVMsRUFBRUQsRUFBRSxDQUFDRSxPQVBUO0FBUUw2RSxXQUFPLEVBQUVMO0FBUkosR0FBUDtBQVVELEMiLCJmaWxlIjoiYXN0cm50LXdlYi1sb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImFzdHJudC13ZWItbG9nZ2VyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFzdHJudC13ZWItbG9nZ2VyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFzdHJudC13ZWItbG9nZ2VyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGh0dHBIYW5kbGVyIGZyb20gJ3V0aWxzL2FzdHJudC1odHRwLWhhbmRsZXInXG5pbXBvcnQgeyBkZXZpY2VJbmZvIH0gZnJvbSAndXRpbHMvbmF2aWdhdG9yLWhlbHBlcidcblxuY29uc3QgZ2V0Q3VycmVudERhdGVUaW1lID0gKCkgPT4ge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICBsZXQgZCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIG1vbnRoID0gJycgKyAoZC5nZXRNb250aCgpICsgMSksXG4gICAgZGF5ID0gJycgKyBkLmdldERhdGUoKSxcbiAgICB5ZWFyID0gZC5nZXRGdWxsWWVhcigpLFxuICAgIGhvdXIgPSBkLmdldEhvdXJzKCksXG4gICAgbWludXRlID0gZC5nZXRNaW51dGVzKCksXG4gICAgc2Vjb25kID0gZC5nZXRTZWNvbmRzKClcblxuICBpZiAobW9udGgubGVuZ3RoIDwgMikge1xuICAgIG1vbnRoID0gJzAnICsgbW9udGhcbiAgfVxuXG4gIGlmIChkYXkubGVuZ3RoIDwgMikge1xuICAgIGRheSA9ICcwJyArIGRheVxuICB9XG5cbiAgaG91ciA9IGhvdXIgJSAxMjtcbiAgaG91ciA9IGhvdXIgPyBob3VyIDogMTI7XG4gIG1pbnV0ZSA9IG1pbnV0ZSA8IDEwID8gJzAnICsgbWludXRlIDogbWludXRlO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGAke1t5ZWFyLCBtb250aCwgZGF5XS5qb2luKCctJyl9ICR7aG91cn06JHttaW51dGV9OiR7c2Vjb25kfWBcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5jb25zdCBjb25zdHJ1Y3RSZXF1ZXN0UGFyYW1zID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBkZXZpY2UgPSBkZXZpY2VJbmZvKClcbiAgY29uc3QgdGltZVpvbmUgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgY29uc3QgbG9nVGltZSA9IGdldEN1cnJlbnREYXRlVGltZSgpXG4gIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICBjb25zdCBvcyA9IGAke2RldmljZS5vc30gKCR7ZGV2aWNlLm9zVmVyc2lvbn0pYFxuICBjb25zdCB2ZXJzaW9uID0gYCR7ZGV2aWNlLmJyb3dzZXJ9LCBWZXJzaW9uICR7ZGV2aWNlLmJyb3dzZXJWZXJzaW9ufSAoJHtkZXZpY2UuYnJvd3Nlck1ham9yVmVyc2lvbn0pYFxuXG4gIHJldHVybiB7XG4gICAgbG9nczoge1xuICAgICAgJ2ludGVydmlld19jb2RlJzogcGFyYW1zLmludGVydmlld19jb2RlIHx8ICcnLFxuICAgICAgJ2NhbmRpZGF0ZV9pZCc6IHBhcmFtcy5jYW5kaWRhdGVfaWQgfHwgMCxcbiAgICAgICdqb2JfaWQnOiBwYXJhbXMuam9iX2lkIHx8IDAsXG4gICAgICAnY29tcGFueV9pZCc6IHBhcmFtcy5jb21wYW55X2lkIHx8IDAsXG4gICAgICAnZXZlbnQnOiBwYXJhbXMuZXZlbnQgfHwgJycsXG4gICAgICAnbWVzc2FnZSc6IHBhcmFtcy5tZXNzYWdlIHx8ICcnLFxuICAgICAgJ29zJzogb3MsXG4gICAgICAndmVyc2lvbic6IHZlcnNpb24sXG4gICAgICAnaW1laSc6IHVhLFxuICAgICAgJ2xvZ190aW1lJzogbG9nVGltZSxcbiAgICAgICd0aW1lX3pvbmUnOiB0aW1lWm9uZVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBjb25zdHJ1Y3RVUkwgPSAoZW52KSA9PiB7XG4gIGxldCBkb21haW5QcmVmaXggPSAnJ1xuXG4gIHN3aXRjaCAoZW52KSB7XG4gICAgY2FzZSAnYmV0YSc6IGNhc2UgJ2Rldic6XG4gICAgICBkb21haW5QcmVmaXggPSAnYmV0YSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncHJvZHVjdGlvbic6IGNhc2UgJ2xpdmUnOlxuICAgICAgZG9tYWluUHJlZml4ID0gJ2FwcCdcbiAgICAgIGJyZWFrXG4gIH1cblxuICBjb25zdCBiYXNlVVJMID0gYGh0dHBzOi8vJHtkb21haW5QcmVmaXh9LmFzdHJudC5jb2BcbiAgcmV0dXJuIGAke2Jhc2VVUkx9L2FwaS92Mi9jYW5kaWRhdGUvbG9nc2Bcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY29yZEV2ZW50KGVudiwgcGFyYW1zKSB7XG4gIGNvbnN0IFVSTCA9IGNvbnN0cnVjdFVSTChlbnYpXG4gIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSBjb25zdHJ1Y3RSZXF1ZXN0UGFyYW1zKHBhcmFtcylcblxuICByZXR1cm4gaHR0cEhhbmRsZXIoJ1BPU1QnLCBVUkwsIHJlcXVlc3RQYXJhbXMpXG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IChtZXRob2QsIHVybCwgcGFyYW1zLCBtaW1lVHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgdHJ1ZSlcblxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpXG5cbiAgICBpZiAobWltZVR5cGUgJiYgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKSB7XG4gICAgICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUobWltZVR5cGUpXG4gICAgfVxuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpXG4gICAgICBjb25zdCByZXNwb25zZUNvZGUgPSByZXNwb25zZS5zdGF0dXMgfHwgcmVxdWVzdC5zdGF0dXNcblxuICAgICAgaWYgKHJlc3BvbnNlQ29kZSA+PSAyMDAgJiYgcmVzcG9uc2VDb2RlIDwgMzAwKSB7XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UubWVzc2FnZSB8fCByZXNwb25zZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZXF1ZXN0UGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0UGFyYW1zKVxuICB9KVxufVxuIiwiLyoqXG4gKiBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xODcwNjgxOC85OTM4NTM5XG4qL1xuXG5jb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbmNvbnN0IG5WZXIgPSBuYXZpZ2F0b3IuYXBwVmVyc2lvblxubGV0IGNvb2tpZUVuYWJsZWQgPSBuYXZpZ2F0b3IuY29va2llRW5hYmxlZFxuXG5jb25zdCBnZXRPU0luZm8gPSAoKSA9PiB7XG4gIGxldCBvcyA9ICctJ1xuICBsZXQgb3NWZXJzaW9uID0gJy0nXG5cbiAgY29uc3QgY2xpZW50U3RyaW5ncyA9IFtcbiAgICB7czogJ1dpbmRvd3MgMTAnLCByOiAvKFdpbmRvd3MgMTAuMHxXaW5kb3dzIE5UIDEwLjApL30sXG4gICAge3M6ICdXaW5kb3dzIDguMScsIHI6IC8oV2luZG93cyA4LjF8V2luZG93cyBOVCA2LjMpL30sXG4gICAge3M6ICdXaW5kb3dzIDgnLCByOiAvKFdpbmRvd3MgOHxXaW5kb3dzIE5UIDYuMikvfSxcbiAgICB7czogJ1dpbmRvd3MgNycsIHI6IC8oV2luZG93cyA3fFdpbmRvd3MgTlQgNi4xKS99LFxuICAgIHtzOiAnV2luZG93cyBWaXN0YScsIHI6IC9XaW5kb3dzIE5UIDYuMC99LFxuICAgIHtzOiAnV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6IC9XaW5kb3dzIE5UIDUuMi99LFxuICAgIHtzOiAnV2luZG93cyBYUCcsIHI6IC8oV2luZG93cyBOVCA1LjF8V2luZG93cyBYUCkvfSxcbiAgICB7czogJ1dpbmRvd3MgMjAwMCcsIHI6IC8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS99LFxuICAgIHtzOiAnV2luZG93cyBNRScsIHI6IC8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvfSxcbiAgICB7czogJ1dpbmRvd3MgOTgnLCByOiAvKFdpbmRvd3MgOTh8V2luOTgpL30sXG4gICAge3M6ICdXaW5kb3dzIDk1JywgcjogLyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpL30sXG4gICAge3M6ICdXaW5kb3dzIE5UIDQuMCcsIHI6IC8oV2luZG93cyBOVCA0LjB8V2luTlQ0LjB8V2luTlR8V2luZG93cyBOVCkvfSxcbiAgICB7czogJ1dpbmRvd3MgQ0UnLCByOiAvV2luZG93cyBDRS99LFxuICAgIHtzOiAnV2luZG93cyAzLjExJywgcjogL1dpbjE2L30sXG4gICAge3M6ICdBbmRyb2lkJywgcjogL0FuZHJvaWQvfSxcbiAgICB7czogJ09wZW4gQlNEJywgcjogL09wZW5CU0QvfSxcbiAgICB7czogJ1N1biBPUycsIHI6IC9TdW5PUy99LFxuICAgIHtzOiAnTGludXgnLCByOiAvKExpbnV4fFgxMSkvfSxcbiAgICB7czogJ2lPUycsIHI6IC8oaVBob25lfGlQYWR8aVBvZCkvfSxcbiAgICB7czogJ01hYyBPUyBYJywgcjogL01hYyBPUyBYL30sXG4gICAge3M6ICdNYWMgT1MnLCByOiAvKE1hY1BQQ3xNYWNJbnRlbHxNYWNfUG93ZXJQQ3xNYWNpbnRvc2gpL30sXG4gICAge3M6ICdRTlgnLCByOiAvUU5YL30sXG4gICAge3M6ICdVTklYJywgcjogL1VOSVgvfSxcbiAgICB7czogJ0JlT1MnLCByOiAvQmVPUy99LFxuICAgIHtzOiAnT1MvMicsIHI6IC9PU1xcLzIvfSxcbiAgICB7czogJ1NlYXJjaCBCb3QnLCByOiAvKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvfVxuICBdXG5cbiAgZm9yIChsZXQgaWQgaW4gY2xpZW50U3RyaW5ncykge1xuICAgIGxldCBjcyA9IGNsaWVudFN0cmluZ3NbaWRdXG4gICAgaWYgKGNzLnIudGVzdCh1YSkpIHtcbiAgICAgIG9zID0gY3Muc1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XG4gICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV1cbiAgICBvcyA9ICdXaW5kb3dzJ1xuICB9XG5cbiAgc3dpdGNoIChvcykge1xuICAgIGNhc2UgJ01hYyBPUyBYJzpcbiAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTBbXFwuXFxfXFxkXSspLy5leGVjKHVhKVsxXVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ0FuZHJvaWQnOlxuICAgICAgb3NWZXJzaW9uID0gL0FuZHJvaWQgKFtcXC5cXF9cXGRdKykvLmV4ZWModWEpWzFdXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnaU9TJzpcbiAgICAgIG9zVmVyc2lvbiA9IC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/Ly5leGVjKG5WZXIpXG4gICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb25bMV0gKyAnLicgKyBvc1ZlcnNpb25bMl0gKyAnLicgKyAob3NWZXJzaW9uWzNdIHwgMClcbiAgICAgIGJyZWFrXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG9zLFxuICAgIHZlcnNpb246IG9zVmVyc2lvblxuICB9XG59XG5cbmNvbnN0IGdldEJyb3dzZXJJbmZvID0gKCkgPT4ge1xuICBsZXQgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoblZlciwgMTApXG4gIGxldCBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWVcbiAgbGV0IHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pXG4gIGxldCBuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQsIGl4XG5cbiAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdPcGVyYScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ09wZXJhJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNilcbiAgICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1ZlcnNpb24nKSkgIT09IC0xKSB7XG4gICAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpXG4gICAgfVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdPUFInKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdPcGVyYSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDQpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0VkZ2UnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgRWRnZSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDUpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ01TSUUnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdDaHJvbWUnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdDaHJvbWUnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdTYWZhcmknKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdTYWZhcmknXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KVxuICAgIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignVmVyc2lvbicpKSAhPT0gLTEpIHtcbiAgICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOClcbiAgICB9XG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdGaXJlZm94J1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOClcbiAgfSBlbHNlIGlmICh1YS5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodWEuaW5kZXhPZigncnY6JykgKyAzKVxuICB9IGVsc2UgaWYgKChuYW1lT2Zmc2V0ID0gdWEubGFzdEluZGV4T2YoJyAnKSArIDEpIDwgKHZlck9mZnNldCA9IHVhLmxhc3RJbmRleE9mKCcvJykpKSB7XG4gICAgYnJvd3NlciA9IHVhLnN1YnN0cmluZyhuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQpXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKVxuICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT09IGJyb3dzZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lXG4gICAgfVxuICB9XG5cbiAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignJykpICE9PSAtMSkge1xuICAgIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeClcbiAgfVxuXG4gIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyAnKSkgIT09IC0xKSB7XG4gICAgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KVxuICB9XG5cbiAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignKScpKSAhPT0gLTEpIHtcbiAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpXG4gIH1cblxuICBtYWpvclZlcnNpb24gPSBwYXJzZUludCgnJyArIHZlcnNpb24sIDEwKVxuICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xuICAgIHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQoblZlcilcbiAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludChuVmVyLCAxMClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogYnJvd3NlciB8fCAnJyxcbiAgICB2ZXJzaW9uOiB2ZXJzaW9uIHx8ICcnLFxuICAgIG1ham9yVmVyc2lvbjogbWFqb3JWZXJzaW9uIHx8ICcnXG4gIH1cbn1cblxuY29uc3QgZ2V0U2NyZWVuU2l6ZSA9ICgpID0+IHtcbiAgaWYgKCFzY3JlZW4ud2lkdGgpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICBjb25zdCB3aWR0aCA9IChzY3JlZW4ud2lkdGgpID8gc2NyZWVuLndpZHRoIDogJydcbiAgY29uc3QgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gc2NyZWVuLmhlaWdodCA6ICcnXG5cbiAgcmV0dXJuICcnICsgd2lkdGggKyAnIHggJyArIGhlaWdodFxufVxuXG5jb25zdCBpc0Nvb2tpZUVuYWJsZWQgPSAoKSA9PiB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQgPT09ICd1bmRlZmluZWQnICYmICFjb29raWVFbmFibGVkKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0gJ3Rlc3Rjb29raWUnXG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCd0ZXN0Y29va2llJykgIT09IC0xXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldmljZUluZm8oKSB7XG4gIGNvbnN0IG9zID0gZ2V0T1NJbmZvKClcbiAgY29uc3QgYnJvd3NlciA9IGdldEJyb3dzZXJJbmZvKClcbiAgY29uc3Qgc2NyZWVuU2l6ZSA9IGdldFNjcmVlblNpemUoKVxuICBjb25zdCBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcilcblxuICByZXR1cm4ge1xuICAgIHNjcmVlbjogc2NyZWVuU2l6ZSxcbiAgICBicm93c2VyOiBicm93c2VyLm5hbWUsXG4gICAgYnJvd3NlclZlcnNpb246IGJyb3dzZXIudmVyc2lvbixcbiAgICBicm93c2VyTWFqb3JWZXJzaW9uOiBicm93c2VyLm1ham9yVmVyc2lvbixcbiAgICBtb2JpbGU6IG1vYmlsZSxcbiAgICBvczogb3MubmFtZSxcbiAgICBvc1ZlcnNpb246IG9zLnZlcnNpb24sXG4gICAgY29va2llczogaXNDb29raWVFbmFibGVkXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=