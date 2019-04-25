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
/*! exports provided: initialize, recordEvent, clearCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recordEvent", function() { return recordEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCache", function() { return clearCache; });
/* harmony import */ var utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/astrnt-http-handler */ "./src/utils/astrnt-http-handler.js");
/* harmony import */ var utils_navigator_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/navigator-helper */ "./src/utils/navigator-helper.js");


var logEnv = 'ASTRNT_LOG_ENV';
var logBaseInfo = 'ASTRNT_BASE_LOG_INFO';
var storageKeys = [logEnv, logBaseInfo];

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

var getEnv = function getEnv() {
  var env = localStorage.getItem(logEnv);
  return env;
};

var getBaseInfo = function getBaseInfo() {
  var info = localStorage.getItem(logBaseInfo);
  return JSON.parse(info);
};

var constructURL = function constructURL() {
  var env = getEnv();
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

var constructInterviewInfo = function constructInterviewInfo(params) {
  var device = Object(utils_navigator_helper__WEBPACK_IMPORTED_MODULE_1__["deviceInfo"])();
  var timeZone = new Date().getTimezoneOffset();
  var logTime = getCurrentDateTime();
  var ua = navigator.userAgent;
  var os = "".concat(device.os, " (").concat(device.osVersion, ")");
  var version = "".concat(device.browser, ", Version ").concat(device.browserVersion, " (").concat(device.browserMajorVersion, ")");
  var recordedParam = getBaseInfo();
  recordedParam.event = params.event || '';
  recordedParam.message = params.message || '';
  recordedParam.os = os;
  recordedParam.version = version;
  recordedParam.imei = ua;
  recordedParam.log_time = logTime;
  recordedParam.time_zone = timeZone;
  return recordedParam;
};

function initialize(env, params) {
  var baseParam = {
    'interviewCode': params.interview_code || '',
    'candidate_id': params.candidate_id || 0,
    'job_id': params.job_id || 0,
    'company_id': params.company_id || 0
  };
  localStorage.setItem(logEnv, env);
  localStorage.setItem(logBaseInfo, JSON.stringify(baseParam));
}
function recordEvent(params) {
  var URL = constructURL();
  var interviewInfo = constructInterviewInfo(params);
  var requestParams = {
    logs: [interviewInfo]
  };
  return Object(utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', URL, requestParams);
}
function clearCache() {
  storageKeys.forEach(function (key) {
    localStorage.removeItem(key);
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvdXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci8uL3NyYy91dGlscy9uYXZpZ2F0b3ItaGVscGVyLmpzIl0sIm5hbWVzIjpbImxvZ0VudiIsImxvZ0Jhc2VJbmZvIiwic3RvcmFnZUtleXMiLCJnZXRDdXJyZW50RGF0ZVRpbWUiLCJkYXRlIiwiRGF0ZSIsImQiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZSIsImdldE1pbnV0ZXMiLCJzZWNvbmQiLCJnZXRTZWNvbmRzIiwibGVuZ3RoIiwicmVzdWx0Iiwiam9pbiIsImdldEVudiIsImVudiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXRCYXNlSW5mbyIsImluZm8iLCJKU09OIiwicGFyc2UiLCJjb25zdHJ1Y3RVUkwiLCJkb21haW5QcmVmaXgiLCJiYXNlVVJMIiwiY29uc3RydWN0SW50ZXJ2aWV3SW5mbyIsInBhcmFtcyIsImRldmljZSIsImRldmljZUluZm8iLCJ0aW1lWm9uZSIsImdldFRpbWV6b25lT2Zmc2V0IiwibG9nVGltZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwib3MiLCJvc1ZlcnNpb24iLCJ2ZXJzaW9uIiwiYnJvd3NlciIsImJyb3dzZXJWZXJzaW9uIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsInJlY29yZGVkUGFyYW0iLCJldmVudCIsIm1lc3NhZ2UiLCJpbWVpIiwibG9nX3RpbWUiLCJ0aW1lX3pvbmUiLCJpbml0aWFsaXplIiwiYmFzZVBhcmFtIiwiaW50ZXJ2aWV3X2NvZGUiLCJjYW5kaWRhdGVfaWQiLCJqb2JfaWQiLCJjb21wYW55X2lkIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInJlY29yZEV2ZW50IiwiVVJMIiwiaW50ZXJ2aWV3SW5mbyIsInJlcXVlc3RQYXJhbXMiLCJsb2dzIiwiaHR0cEhhbmRsZXIiLCJjbGVhckNhY2hlIiwiZm9yRWFjaCIsImtleSIsInJlbW92ZUl0ZW0iLCJtZXRob2QiLCJ1cmwiLCJtaW1lVHlwZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvdmVycmlkZU1pbWVUeXBlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsInRhcmdldCIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VDb2RlIiwic3RhdHVzIiwic2VuZCIsIm5WZXIiLCJhcHBWZXJzaW9uIiwiY29va2llRW5hYmxlZCIsImdldE9TSW5mbyIsImNsaWVudFN0cmluZ3MiLCJzIiwiciIsImlkIiwiY3MiLCJ0ZXN0IiwiZXhlYyIsIm5hbWUiLCJnZXRCcm93c2VySW5mbyIsIm1ham9yVmVyc2lvbiIsInBhcnNlSW50IiwiYXBwTmFtZSIsInBhcnNlRmxvYXQiLCJuYW1lT2Zmc2V0IiwidmVyT2Zmc2V0IiwiaXgiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIiwiaXNOYU4iLCJnZXRTY3JlZW5TaXplIiwic2NyZWVuIiwid2lkdGgiLCJ1bmRlZmluZWQiLCJoZWlnaHQiLCJpc0Nvb2tpZUVuYWJsZWQiLCJkb2N1bWVudCIsImNvb2tpZSIsInNjcmVlblNpemUiLCJtb2JpbGUiLCJjb29raWVzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RCxPQUFPLEdBQUcwRCxjQUFjLEVBQTlCO0FBQ0EsTUFBTXNCLFVBQVUsR0FBR1IsYUFBYSxFQUFoQztBQUNBLE1BQU1TLE1BQU0sR0FBRyw0Q0FBNEMxQixJQUE1QyxDQUFpRFQsSUFBakQsQ0FBZjtBQUVBLFNBQU87QUFDTDJCLFVBQU0sRUFBRU8sVUFESDtBQUVMaEYsV0FBTyxFQUFFQSxPQUFPLENBQUN5RCxJQUZaO0FBR0x4RCxrQkFBYyxFQUFFRCxPQUFPLENBQUNELE9BSG5CO0FBSUxHLHVCQUFtQixFQUFFRixPQUFPLENBQUMyRCxZQUp4QjtBQUtMc0IsVUFBTSxFQUFFQSxNQUxIO0FBTUxwRixNQUFFLEVBQUVBLEVBQUUsQ0FBQzRELElBTkY7QUFPTDNELGFBQVMsRUFBRUQsRUFBRSxDQUFDRSxPQVBUO0FBUUxtRixXQUFPLEVBQUVMO0FBUkosR0FBUDtBQVVELEMiLCJmaWxlIjoiYXN0cm50LXdlYi1sb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImFzdHJudC13ZWItbG9nZ2VyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFzdHJudC13ZWItbG9nZ2VyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFzdHJudC13ZWItbG9nZ2VyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGh0dHBIYW5kbGVyIGZyb20gJ3V0aWxzL2FzdHJudC1odHRwLWhhbmRsZXInXG5pbXBvcnQgeyBkZXZpY2VJbmZvIH0gZnJvbSAndXRpbHMvbmF2aWdhdG9yLWhlbHBlcidcblxuY29uc3QgbG9nRW52ID0gJ0FTVFJOVF9MT0dfRU5WJ1xuY29uc3QgbG9nQmFzZUluZm8gPSAnQVNUUk5UX0JBU0VfTE9HX0lORk8nXG5jb25zdCBzdG9yYWdlS2V5cyA9IFtcbiAgbG9nRW52LFxuICBsb2dCYXNlSW5mb1xuXVxuXG5jb25zdCBnZXRDdXJyZW50RGF0ZVRpbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gIGxldCBkID0gbmV3IERhdGUoZGF0ZSksXG4gICAgbW9udGggPSAnJyArIChkLmdldE1vbnRoKCkgKyAxKSxcbiAgICBkYXkgPSAnJyArIGQuZ2V0RGF0ZSgpLFxuICAgIHllYXIgPSBkLmdldEZ1bGxZZWFyKCksXG4gICAgaG91ciA9IGQuZ2V0SG91cnMoKSxcbiAgICBtaW51dGUgPSBkLmdldE1pbnV0ZXMoKSxcbiAgICBzZWNvbmQgPSBkLmdldFNlY29uZHMoKVxuXG4gIGlmIChtb250aC5sZW5ndGggPCAyKSB7XG4gICAgbW9udGggPSAnMCcgKyBtb250aFxuICB9XG5cbiAgaWYgKGRheS5sZW5ndGggPCAyKSB7XG4gICAgZGF5ID0gJzAnICsgZGF5XG4gIH1cblxuICBob3VyID0gaG91ciAlIDEyO1xuICBob3VyID0gaG91ciA/IGhvdXIgOiAxMjtcbiAgbWludXRlID0gbWludXRlIDwgMTAgPyAnMCcgKyBtaW51dGUgOiBtaW51dGU7XG5cbiAgY29uc3QgcmVzdWx0ID0gYCR7W3llYXIsIG1vbnRoLCBkYXldLmpvaW4oJy0nKX0gJHtob3VyfToke21pbnV0ZX06JHtzZWNvbmR9YFxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmNvbnN0IGdldEVudiA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nRW52KVxuICByZXR1cm4gZW52XG59XG5cbmNvbnN0IGdldEJhc2VJbmZvID0gKCkgPT4ge1xuICBjb25zdCBpbmZvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nQmFzZUluZm8pXG4gIHJldHVybiBKU09OLnBhcnNlKGluZm8pXG59XG5cbmNvbnN0IGNvbnN0cnVjdFVSTCA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gZ2V0RW52KClcbiAgbGV0IGRvbWFpblByZWZpeCA9ICcnXG5cbiAgc3dpdGNoIChlbnYpIHtcbiAgICBjYXNlICdiZXRhJzogY2FzZSAnZGV2JzpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdiZXRhJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdwcm9kdWN0aW9uJzogY2FzZSAnbGl2ZSc6XG4gICAgICBkb21haW5QcmVmaXggPSAnYXBwJ1xuICAgICAgYnJlYWtcbiAgfVxuXG4gIGNvbnN0IGJhc2VVUkwgPSBgaHR0cHM6Ly8ke2RvbWFpblByZWZpeH0uYXN0cm50LmNvYFxuICByZXR1cm4gYCR7YmFzZVVSTH0vYXBpL3YyL2NhbmRpZGF0ZS9sb2dzYFxufVxuXG5jb25zdCBjb25zdHJ1Y3RJbnRlcnZpZXdJbmZvID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBkZXZpY2UgPSBkZXZpY2VJbmZvKClcbiAgY29uc3QgdGltZVpvbmUgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgY29uc3QgbG9nVGltZSA9IGdldEN1cnJlbnREYXRlVGltZSgpXG4gIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICBjb25zdCBvcyA9IGAke2RldmljZS5vc30gKCR7ZGV2aWNlLm9zVmVyc2lvbn0pYFxuICBjb25zdCB2ZXJzaW9uID0gYCR7ZGV2aWNlLmJyb3dzZXJ9LCBWZXJzaW9uICR7ZGV2aWNlLmJyb3dzZXJWZXJzaW9ufSAoJHtkZXZpY2UuYnJvd3Nlck1ham9yVmVyc2lvbn0pYFxuXG4gIGxldCByZWNvcmRlZFBhcmFtID0gZ2V0QmFzZUluZm8oKVxuICByZWNvcmRlZFBhcmFtLmV2ZW50ID0gcGFyYW1zLmV2ZW50IHx8ICcnXG4gIHJlY29yZGVkUGFyYW0ubWVzc2FnZSA9IHBhcmFtcy5tZXNzYWdlIHx8ICcnXG4gIHJlY29yZGVkUGFyYW0ub3MgPSBvc1xuICByZWNvcmRlZFBhcmFtLnZlcnNpb24gPSB2ZXJzaW9uXG4gIHJlY29yZGVkUGFyYW0uaW1laSA9IHVhXG4gIHJlY29yZGVkUGFyYW0ubG9nX3RpbWUgPSBsb2dUaW1lXG4gIHJlY29yZGVkUGFyYW0udGltZV96b25lID0gdGltZVpvbmVcblxuICByZXR1cm4gcmVjb3JkZWRQYXJhbVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShlbnYsIHBhcmFtcykge1xuICBjb25zdCBiYXNlUGFyYW0gPSB7XG4gICAgJ2ludGVydmlld0NvZGUnOiBwYXJhbXMuaW50ZXJ2aWV3X2NvZGUgfHwgJycsXG4gICAgJ2NhbmRpZGF0ZV9pZCc6IHBhcmFtcy5jYW5kaWRhdGVfaWQgfHwgMCxcbiAgICAnam9iX2lkJzogcGFyYW1zLmpvYl9pZCB8fCAwLFxuICAgICdjb21wYW55X2lkJzogcGFyYW1zLmNvbXBhbnlfaWQgfHwgMFxuICB9XG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9nRW52LCBlbnYpXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvZ0Jhc2VJbmZvLCBKU09OLnN0cmluZ2lmeShiYXNlUGFyYW0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkRXZlbnQocGFyYW1zKSB7XG4gIGNvbnN0IFVSTCA9IGNvbnN0cnVjdFVSTCgpXG4gIGNvbnN0IGludGVydmlld0luZm8gPSBjb25zdHJ1Y3RJbnRlcnZpZXdJbmZvKHBhcmFtcylcbiAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IHtcbiAgICBsb2dzOiBbIGludGVydmlld0luZm8gXVxuICB9XG5cbiAgcmV0dXJuIGh0dHBIYW5kbGVyKCdQT1NUJywgVVJMLCByZXF1ZXN0UGFyYW1zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgc3RvcmFnZUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSlcbiAgfSlcbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgKG1ldGhvZCwgdXJsLCBwYXJhbXMsIG1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKVxuXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JylcblxuICAgIGlmIChtaW1lVHlwZSAmJiByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUpIHtcbiAgICAgIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZShtaW1lVHlwZSlcbiAgICB9XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dClcbiAgICAgIGNvbnN0IHJlc3BvbnNlQ29kZSA9IHJlc3BvbnNlLnN0YXR1cyB8fCByZXF1ZXN0LnN0YXR1c1xuXG4gICAgICBpZiAocmVzcG9uc2VDb2RlID49IDIwMCAmJiByZXNwb25zZUNvZGUgPCAzMDApIHtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHJlc3BvbnNlLm1lc3NhZ2UgfHwgcmVzcG9uc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3RQYXJhbXMpXG4gIH0pXG59XG4iLCIvKipcbiAqIHNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE4NzA2ODE4Lzk5Mzg1MzlcbiovXG5cbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuY29uc3QgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uXG5sZXQgY29va2llRW5hYmxlZCA9IG5hdmlnYXRvci5jb29raWVFbmFibGVkXG5cbmNvbnN0IGdldE9TSW5mbyA9ICgpID0+IHtcbiAgbGV0IG9zID0gJy0nXG4gIGxldCBvc1ZlcnNpb24gPSAnLSdcblxuICBjb25zdCBjbGllbnRTdHJpbmdzID0gW1xuICAgIHtzOiAnV2luZG93cyAxMCcsIHI6IC8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOC4xJywgcjogLyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvfSxcbiAgICB7czogJ1dpbmRvd3MgOCcsIHI6IC8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxuICAgIHtzOiAnV2luZG93cyA3JywgcjogLyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpL30sXG4gICAge3M6ICdXaW5kb3dzIFZpc3RhJywgcjogL1dpbmRvd3MgTlQgNi4wL30sXG4gICAge3M6ICdXaW5kb3dzIFNlcnZlciAyMDAzJywgcjogL1dpbmRvd3MgTlQgNS4yL30sXG4gICAge3M6ICdXaW5kb3dzIFhQJywgcjogLyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS99LFxuICAgIHtzOiAnV2luZG93cyAyMDAwJywgcjogLyhXaW5kb3dzIE5UIDUuMHxXaW5kb3dzIDIwMDApL30sXG4gICAge3M6ICdXaW5kb3dzIE1FJywgcjogLyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxuICAgIHtzOiAnV2luZG93cyA5OCcsIHI6IC8oV2luZG93cyA5OHxXaW45OCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOTUnLCByOiAvKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvfSxcbiAgICB7czogJ1dpbmRvd3MgTlQgNC4wJywgcjogLyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxuICAgIHtzOiAnV2luZG93cyBDRScsIHI6IC9XaW5kb3dzIENFL30sXG4gICAge3M6ICdXaW5kb3dzIDMuMTEnLCByOiAvV2luMTYvfSxcbiAgICB7czogJ0FuZHJvaWQnLCByOiAvQW5kcm9pZC99LFxuICAgIHtzOiAnT3BlbiBCU0QnLCByOiAvT3BlbkJTRC99LFxuICAgIHtzOiAnU3VuIE9TJywgcjogL1N1bk9TL30sXG4gICAge3M6ICdMaW51eCcsIHI6IC8oTGludXh8WDExKS99LFxuICAgIHtzOiAnaU9TJywgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS99LFxuICAgIHtzOiAnTWFjIE9TIFgnLCByOiAvTWFjIE9TIFgvfSxcbiAgICB7czogJ01hYyBPUycsIHI6IC8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcbiAgICB7czogJ1FOWCcsIHI6IC9RTlgvfSxcbiAgICB7czogJ1VOSVgnLCByOiAvVU5JWC99LFxuICAgIHtzOiAnQmVPUycsIHI6IC9CZU9TL30sXG4gICAge3M6ICdPUy8yJywgcjogL09TXFwvMi99LFxuICAgIHtzOiAnU2VhcmNoIEJvdCcsIHI6IC8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS99XG4gIF1cblxuICBmb3IgKGxldCBpZCBpbiBjbGllbnRTdHJpbmdzKSB7XG4gICAgbGV0IGNzID0gY2xpZW50U3RyaW5nc1tpZF1cbiAgICBpZiAoY3Muci50ZXN0KHVhKSkge1xuICAgICAgb3MgPSBjcy5zXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXVxuICAgIG9zID0gJ1dpbmRvd3MnXG4gIH1cblxuICBzd2l0Y2ggKG9zKSB7XG4gICAgY2FzZSAnTWFjIE9TIFgnOlxuICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWModWEpWzFdXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnQW5kcm9pZCc6XG4gICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyh1YSlbMV1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdpT1MnOlxuICAgICAgb3NWZXJzaW9uID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMoblZlcilcbiAgICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvblsxXSArICcuJyArIG9zVmVyc2lvblsyXSArICcuJyArIChvc1ZlcnNpb25bM10gfCAwKVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogb3MsXG4gICAgdmVyc2lvbjogb3NWZXJzaW9uXG4gIH1cbn1cblxuY29uc3QgZ2V0QnJvd3NlckluZm8gPSAoKSA9PiB7XG4gIGxldCBtYWpvclZlcnNpb24gPSBwYXJzZUludChuVmVyLCAxMClcbiAgbGV0IGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZVxuICBsZXQgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbilcbiAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXhcblxuICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09wZXJhJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KVxuICAgIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignVmVyc2lvbicpKSAhPT0gLTEpIHtcbiAgICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOClcbiAgICB9XG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09QUicpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ09wZXJhJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNClcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRWRnZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSlcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignTVNJRScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcidcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDUpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0Nocm9tZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0Nocm9tZSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1NhZmFyaScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ1NhZmFyaSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdWZXJzaW9uJykpICE9PSAtMSkge1xuICAgICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICAgIH1cbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRmlyZWZveCcpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0ZpcmVmb3gnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICB9IGVsc2UgaWYgKHVhLmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh1YS5pbmRleE9mKCdydjonKSArIDMpXG4gIH0gZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSB1YS5sYXN0SW5kZXhPZignICcpICsgMSkgPCAodmVyT2Zmc2V0ID0gdWEubGFzdEluZGV4T2YoJy8nKSkpIHtcbiAgICBicm93c2VyID0gdWEuc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldClcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDEpXG4gICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWVcbiAgICB9XG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcnKSkgIT09IC0xKSB7XG4gICAgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KVxuICB9XG5cbiAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignICcpKSAhPT0gLTEpIHtcbiAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpXG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcpJykpICE9PSAtMSkge1xuICAgIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeClcbiAgfVxuXG4gIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KCcnICsgdmVyc2lvbiwgMTApXG4gIGlmIChpc05hTihtYWpvclZlcnNpb24pKSB7XG4gICAgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuVmVyKVxuICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5WZXIsIDEwKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBicm93c2VyIHx8ICcnLFxuICAgIHZlcnNpb246IHZlcnNpb24gfHwgJycsXG4gICAgbWFqb3JWZXJzaW9uOiBtYWpvclZlcnNpb24gfHwgJydcbiAgfVxufVxuXG5jb25zdCBnZXRTY3JlZW5TaXplID0gKCkgPT4ge1xuICBpZiAoIXNjcmVlbi53aWR0aCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGNvbnN0IHdpZHRoID0gKHNjcmVlbi53aWR0aCkgPyBzY3JlZW4ud2lkdGggOiAnJ1xuICBjb25zdCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBzY3JlZW4uaGVpZ2h0IDogJydcblxuICByZXR1cm4gJycgKyB3aWR0aCArICcgeCAnICsgaGVpZ2h0XG59XG5cbmNvbnN0IGlzQ29va2llRW5hYmxlZCA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PT0gJ3VuZGVmaW5lZCcgJiYgIWNvb2tpZUVuYWJsZWQpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSAndGVzdGNvb2tpZSdcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ3Rlc3Rjb29raWUnKSAhPT0gLTFcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV2aWNlSW5mbygpIHtcbiAgY29uc3Qgb3MgPSBnZXRPU0luZm8oKVxuICBjb25zdCBicm93c2VyID0gZ2V0QnJvd3NlckluZm8oKVxuICBjb25zdCBzY3JlZW5TaXplID0gZ2V0U2NyZWVuU2l6ZSgpXG4gIGNvbnN0IG1vYmlsZSA9IC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuVmVyKVxuXG4gIHJldHVybiB7XG4gICAgc2NyZWVuOiBzY3JlZW5TaXplLFxuICAgIGJyb3dzZXI6IGJyb3dzZXIubmFtZSxcbiAgICBicm93c2VyVmVyc2lvbjogYnJvd3Nlci52ZXJzaW9uLFxuICAgIGJyb3dzZXJNYWpvclZlcnNpb246IGJyb3dzZXIubWFqb3JWZXJzaW9uLFxuICAgIG1vYmlsZTogbW9iaWxlLFxuICAgIG9zOiBvcy5uYW1lLFxuICAgIG9zVmVyc2lvbjogb3MudmVyc2lvbixcbiAgICBjb29raWVzOiBpc0Nvb2tpZUVuYWJsZWRcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==