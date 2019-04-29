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
/*! exports provided: initialize, recordEvent, sendSavedEvents, clearCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recordEvent", function() { return recordEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendSavedEvents", function() { return sendSavedEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCache", function() { return clearCache; });
/* harmony import */ var utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/astrnt-http-handler */ "./src/utils/astrnt-http-handler.js");
/* harmony import */ var utils_navigator_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/navigator-helper */ "./src/utils/navigator-helper.js");
/* harmony import */ var utils_date_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/date-utils */ "./src/utils/date-utils.js");



var logEnv = 'ASTRNT_LOG_ENV';
var logBaseInfo = 'ASTRNT_BASE_LOG_INFO';
var logInfos = 'ASTRNT_LOG_INFOS';
var storageKeys = [logEnv, logBaseInfo, logInfos];

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
  var timeZone = utils_date_utils__WEBPACK_IMPORTED_MODULE_2__["getTimezone"]();
  var logTime = utils_date_utils__WEBPACK_IMPORTED_MODULE_2__["getCurrentDateTime"]();
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

var sendEvent = function sendEvent(params) {
  var URL = constructURL();
  var logInfo = constructInterviewInfo(params);
  var requestParams = {
    logs: [logInfo]
  };
  return Object(utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', URL, requestParams);
};

var storeEvent = function storeEvent(params) {
  var logItems = localStorage.getItem(logInfos);
  var storedLogs;

  if (!logItems) {
    storedLogs = [];
  } else {
    storedLogs = JSON.parse(logItems);
    localStorage.removeItem(logInfos);
  }

  var interviewInfo = constructInterviewInfo(params);
  storedLogs.push(interviewInfo);
  localStorage.setItem(JSON.stringify(storedLogs));
  return Promise.resolve(interviewInfo);
};

function initialize(env, params) {
  var onError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var onUnhandledRejection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var baseParam = {
    'interviewCode': params.interview_code || '',
    'candidate_id': params.candidate_id || 0,
    'job_id': params.job_id || 0,
    'company_id': params.company_id || 0
  };
  localStorage.setItem(logEnv, env);
  localStorage.setItem(logBaseInfo, JSON.stringify(baseParam));
  window.addEventListener('error', function (errEvt) {
    onError(errEvt.error);
    return false;
  });
  window.addEventListener('unhandledrejection', function (errEvt) {
    onUnhandledRejection(errEvt.reason);
  });
}
function recordEvent(params) {
  switch (params.status) {
    case 'online':
      return sendEvent(params);

    case 'offline':
      return storeEvent(params);
  }

  return Promise.resolve('No event to send');
}
function sendSavedEvents() {
  var logItems = localStorage.getItem(logInfos);

  if (!logItems) {
    return Promise.resolve();
  }

  var URL = constructURL();
  var requestParams = {
    logs: JSON.parse(logItems)
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

/***/ "./src/utils/date-utils.js":
/*!*********************************!*\
  !*** ./src/utils/date-utils.js ***!
  \*********************************/
/*! exports provided: getTimezone, getCurrentDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimezone", function() { return getTimezone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentDateTime", function() { return getCurrentDateTime; });
var getTimezone = function getTimezone() {
  var currentTime = new Date();
  var currentTimezone = currentTime.getTimezoneOffset();
  return currentTimezone / 60 * -1;
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvdXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci8uL3NyYy91dGlscy9kYXRlLXV0aWxzLmpzIiwid2VicGFjazovL2FzdHJudC13ZWItbG9nZ2VyLy4vc3JjL3V0aWxzL25hdmlnYXRvci1oZWxwZXIuanMiXSwibmFtZXMiOlsibG9nRW52IiwibG9nQmFzZUluZm8iLCJsb2dJbmZvcyIsInN0b3JhZ2VLZXlzIiwiZ2V0RW52IiwiZW52IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldEJhc2VJbmZvIiwiaW5mbyIsIkpTT04iLCJwYXJzZSIsImNvbnN0cnVjdFVSTCIsImRvbWFpblByZWZpeCIsImJhc2VVUkwiLCJjb25zdHJ1Y3RJbnRlcnZpZXdJbmZvIiwicGFyYW1zIiwiZGV2aWNlIiwiZGV2aWNlSW5mbyIsInRpbWVab25lIiwiRGF0ZVV0aWxzIiwibG9nVGltZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwib3MiLCJvc1ZlcnNpb24iLCJ2ZXJzaW9uIiwiYnJvd3NlciIsImJyb3dzZXJWZXJzaW9uIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsInJlY29yZGVkUGFyYW0iLCJldmVudCIsIm1lc3NhZ2UiLCJpbWVpIiwibG9nX3RpbWUiLCJ0aW1lX3pvbmUiLCJzZW5kRXZlbnQiLCJVUkwiLCJsb2dJbmZvIiwicmVxdWVzdFBhcmFtcyIsImxvZ3MiLCJodHRwSGFuZGxlciIsInN0b3JlRXZlbnQiLCJsb2dJdGVtcyIsInN0b3JlZExvZ3MiLCJyZW1vdmVJdGVtIiwiaW50ZXJ2aWV3SW5mbyIsInB1c2giLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJpbml0aWFsaXplIiwib25FcnJvciIsIm9uVW5oYW5kbGVkUmVqZWN0aW9uIiwiYmFzZVBhcmFtIiwiaW50ZXJ2aWV3X2NvZGUiLCJjYW5kaWRhdGVfaWQiLCJqb2JfaWQiLCJjb21wYW55X2lkIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVyckV2dCIsImVycm9yIiwicmVhc29uIiwicmVjb3JkRXZlbnQiLCJzdGF0dXMiLCJzZW5kU2F2ZWRFdmVudHMiLCJjbGVhckNhY2hlIiwiZm9yRWFjaCIsImtleSIsIm1ldGhvZCIsInVybCIsIm1pbWVUeXBlIiwicmVqZWN0IiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvdmVycmlkZU1pbWVUeXBlIiwiZXZ0IiwidGFyZ2V0IiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZUNvZGUiLCJzZW5kIiwiZ2V0VGltZXpvbmUiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJjdXJyZW50VGltZXpvbmUiLCJnZXRUaW1lem9uZU9mZnNldCIsImdldEN1cnJlbnREYXRlVGltZSIsImRhdGUiLCJkIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsImxlbmd0aCIsInJlc3VsdCIsImpvaW4iLCJuVmVyIiwiYXBwVmVyc2lvbiIsImNvb2tpZUVuYWJsZWQiLCJnZXRPU0luZm8iLCJjbGllbnRTdHJpbmdzIiwicyIsInIiLCJpZCIsImNzIiwidGVzdCIsImV4ZWMiLCJuYW1lIiwiZ2V0QnJvd3NlckluZm8iLCJtYWpvclZlcnNpb24iLCJwYXJzZUludCIsImFwcE5hbWUiLCJwYXJzZUZsb2F0IiwibmFtZU9mZnNldCIsInZlck9mZnNldCIsIml4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsImlzTmFOIiwiZ2V0U2NyZWVuU2l6ZSIsInNjcmVlbiIsIndpZHRoIiwidW5kZWZpbmVkIiwiaGVpZ2h0IiwiaXNDb29raWVFbmFibGVkIiwiZG9jdW1lbnQiLCJjb29raWUiLCJzY3JlZW5TaXplIiwibW9iaWxlIiwiY29va2llcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLE1BQU0sR0FBRyxnQkFBZjtBQUNBLElBQU1DLFdBQVcsR0FBRyxzQkFBcEI7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QU8sS0FBUDtBQUNELENBUEQ7O0FBU08sU0FBU2hILFVBQVQsR0FBc0I7QUFDM0IsTUFBTU8sRUFBRSxHQUFHd0YsU0FBUyxFQUFwQjtBQUNBLE1BQU1yRixPQUFPLEdBQUc4RixjQUFjLEVBQTlCO0FBQ0EsTUFBTXNCLFVBQVUsR0FBR1IsYUFBYSxFQUFoQztBQUNBLE1BQU1TLE1BQU0sR0FBRyw0Q0FBNEMxQixJQUE1QyxDQUFpRFQsSUFBakQsQ0FBZjtBQUVBLFNBQU87QUFDTDJCLFVBQU0sRUFBRU8sVUFESDtBQUVMcEgsV0FBTyxFQUFFQSxPQUFPLENBQUM2RixJQUZaO0FBR0w1RixrQkFBYyxFQUFFRCxPQUFPLENBQUNELE9BSG5CO0FBSUxHLHVCQUFtQixFQUFFRixPQUFPLENBQUMrRixZQUp4QjtBQUtMc0IsVUFBTSxFQUFFQSxNQUxIO0FBTUx4SCxNQUFFLEVBQUVBLEVBQUUsQ0FBQ2dHLElBTkY7QUFPTC9GLGFBQVMsRUFBRUQsRUFBRSxDQUFDRSxPQVBUO0FBUUx1SCxXQUFPLEVBQUVMO0FBUkosR0FBUDtBQVVELEMiLCJmaWxlIjoiYXN0cm50LXdlYi1sb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImFzdHJudC13ZWItbG9nZ2VyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFzdHJudC13ZWItbG9nZ2VyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFzdHJudC13ZWItbG9nZ2VyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGh0dHBIYW5kbGVyIGZyb20gJ3V0aWxzL2FzdHJudC1odHRwLWhhbmRsZXInXG5pbXBvcnQgeyBkZXZpY2VJbmZvIH0gZnJvbSAndXRpbHMvbmF2aWdhdG9yLWhlbHBlcidcbmltcG9ydCAqIGFzIERhdGVVdGlscyBmcm9tICd1dGlscy9kYXRlLXV0aWxzJ1xuXG5jb25zdCBsb2dFbnYgPSAnQVNUUk5UX0xPR19FTlYnXG5jb25zdCBsb2dCYXNlSW5mbyA9ICdBU1RSTlRfQkFTRV9MT0dfSU5GTydcbmNvbnN0IGxvZ0luZm9zID0gJ0FTVFJOVF9MT0dfSU5GT1MnXG5jb25zdCBzdG9yYWdlS2V5cyA9IFtcbiAgbG9nRW52LFxuICBsb2dCYXNlSW5mbyxcbiAgbG9nSW5mb3Ncbl1cblxuY29uc3QgZ2V0RW52ID0gKCkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dFbnYpXG4gIHJldHVybiBlbnZcbn1cblxuY29uc3QgZ2V0QmFzZUluZm8gPSAoKSA9PiB7XG4gIGNvbnN0IGluZm8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dCYXNlSW5mbylcbiAgcmV0dXJuIEpTT04ucGFyc2UoaW5mbylcbn1cblxuY29uc3QgY29uc3RydWN0VVJMID0gKCkgPT4ge1xuICBjb25zdCBlbnYgPSBnZXRFbnYoKVxuICBsZXQgZG9tYWluUHJlZml4ID0gJydcblxuICBzd2l0Y2ggKGVudikge1xuICAgIGNhc2UgJ2JldGEnOiBjYXNlICdkZXYnOlxuICAgICAgZG9tYWluUHJlZml4ID0gJ2JldGEnXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3Byb2R1Y3Rpb24nOiBjYXNlICdsaXZlJzpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdhcHAnXG4gICAgICBicmVha1xuICB9XG5cbiAgY29uc3QgYmFzZVVSTCA9IGBodHRwczovLyR7ZG9tYWluUHJlZml4fS5hc3RybnQuY29gXG4gIHJldHVybiBgJHtiYXNlVVJMfS9hcGkvdjIvY2FuZGlkYXRlL2xvZ3NgXG59XG5cbmNvbnN0IGNvbnN0cnVjdEludGVydmlld0luZm8gPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGRldmljZSA9IGRldmljZUluZm8oKVxuICBjb25zdCB0aW1lWm9uZSA9IERhdGVVdGlscy5nZXRUaW1lem9uZSgpXG4gIGNvbnN0IGxvZ1RpbWUgPSBEYXRlVXRpbHMuZ2V0Q3VycmVudERhdGVUaW1lKClcbiAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG4gIGNvbnN0IG9zID0gYCR7ZGV2aWNlLm9zfSAoJHtkZXZpY2Uub3NWZXJzaW9ufSlgXG4gIGNvbnN0IHZlcnNpb24gPSBgJHtkZXZpY2UuYnJvd3Nlcn0sIFZlcnNpb24gJHtkZXZpY2UuYnJvd3NlclZlcnNpb259ICgke2RldmljZS5icm93c2VyTWFqb3JWZXJzaW9ufSlgXG5cbiAgbGV0IHJlY29yZGVkUGFyYW0gPSBnZXRCYXNlSW5mbygpXG4gIHJlY29yZGVkUGFyYW0uZXZlbnQgPSBwYXJhbXMuZXZlbnQgfHwgJydcbiAgcmVjb3JkZWRQYXJhbS5tZXNzYWdlID0gcGFyYW1zLm1lc3NhZ2UgfHwgJydcbiAgcmVjb3JkZWRQYXJhbS5vcyA9IG9zXG4gIHJlY29yZGVkUGFyYW0udmVyc2lvbiA9IHZlcnNpb25cbiAgcmVjb3JkZWRQYXJhbS5pbWVpID0gdWFcbiAgcmVjb3JkZWRQYXJhbS5sb2dfdGltZSA9IGxvZ1RpbWVcbiAgcmVjb3JkZWRQYXJhbS50aW1lX3pvbmUgPSB0aW1lWm9uZVxuXG4gIHJldHVybiByZWNvcmRlZFBhcmFtXG59XG5cbmNvbnN0IHNlbmRFdmVudCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgVVJMID0gY29uc3RydWN0VVJMKClcbiAgY29uc3QgbG9nSW5mbyA9IGNvbnN0cnVjdEludGVydmlld0luZm8ocGFyYW1zKVxuICBjb25zdCByZXF1ZXN0UGFyYW1zID0ge1xuICAgIGxvZ3M6IFsgbG9nSW5mbyBdXG4gIH1cblxuICByZXR1cm4gaHR0cEhhbmRsZXIoJ1BPU1QnLCBVUkwsIHJlcXVlc3RQYXJhbXMpXG59XG5cbmNvbnN0IHN0b3JlRXZlbnQgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGxvZ0l0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nSW5mb3MpXG5cbiAgbGV0IHN0b3JlZExvZ3NcbiAgaWYgKCFsb2dJdGVtcykge1xuICAgIHN0b3JlZExvZ3MgPSBbXVxuICB9IGVsc2Uge1xuICAgIHN0b3JlZExvZ3MgPSBKU09OLnBhcnNlKGxvZ0l0ZW1zKVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvZ0luZm9zKVxuICB9XG5cbiAgY29uc3QgaW50ZXJ2aWV3SW5mbyA9IGNvbnN0cnVjdEludGVydmlld0luZm8ocGFyYW1zKVxuICBzdG9yZWRMb2dzLnB1c2goaW50ZXJ2aWV3SW5mbylcblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShKU09OLnN0cmluZ2lmeShzdG9yZWRMb2dzKSlcblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGludGVydmlld0luZm8pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKGVudiwgcGFyYW1zLCBvbkVycm9yID0gKCkgPT4ge30sIG9uVW5oYW5kbGVkUmVqZWN0aW9uID0gKCkgPT4ge30pIHtcbiAgY29uc3QgYmFzZVBhcmFtID0ge1xuICAgICdpbnRlcnZpZXdDb2RlJzogcGFyYW1zLmludGVydmlld19jb2RlIHx8ICcnLFxuICAgICdjYW5kaWRhdGVfaWQnOiBwYXJhbXMuY2FuZGlkYXRlX2lkIHx8IDAsXG4gICAgJ2pvYl9pZCc6IHBhcmFtcy5qb2JfaWQgfHwgMCxcbiAgICAnY29tcGFueV9pZCc6IHBhcmFtcy5jb21wYW55X2lkIHx8IDBcbiAgfVxuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvZ0VudiwgZW52KVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dCYXNlSW5mbywgSlNPTi5zdHJpbmdpZnkoYmFzZVBhcmFtKSlcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyRXZ0KSA9PiB7XG4gICAgb25FcnJvcihlcnJFdnQuZXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VuaGFuZGxlZHJlamVjdGlvbicsIChlcnJFdnQpID0+IHtcbiAgICBvblVuaGFuZGxlZFJlamVjdGlvbihlcnJFdnQucmVhc29uKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkRXZlbnQocGFyYW1zKSB7XG4gIHN3aXRjaCAocGFyYW1zLnN0YXR1cykge1xuICAgIGNhc2UgJ29ubGluZSc6XG4gICAgICByZXR1cm4gc2VuZEV2ZW50KHBhcmFtcylcblxuICAgIGNhc2UgJ29mZmxpbmUnOlxuICAgICAgcmV0dXJuIHN0b3JlRXZlbnQocGFyYW1zKVxuICB9XG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnTm8gZXZlbnQgdG8gc2VuZCcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZW5kU2F2ZWRFdmVudHMoKSB7XG4gIGNvbnN0IGxvZ0l0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nSW5mb3MpXG4gIGlmICghbG9nSXRlbXMpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgfVxuXG4gIGNvbnN0IFVSTCA9IGNvbnN0cnVjdFVSTCgpXG4gIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XG4gICAgbG9nczogSlNPTi5wYXJzZShsb2dJdGVtcylcbiAgfVxuXG4gIHJldHVybiBodHRwSGFuZGxlcignUE9TVCcsIFVSTCwgcmVxdWVzdFBhcmFtcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gIHN0b3JhZ2VLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH0pXG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IChtZXRob2QsIHVybCwgcGFyYW1zLCBtaW1lVHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgdHJ1ZSlcblxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpXG5cbiAgICBpZiAobWltZVR5cGUgJiYgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKSB7XG4gICAgICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUobWltZVR5cGUpXG4gICAgfVxuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpXG4gICAgICBjb25zdCByZXNwb25zZUNvZGUgPSByZXNwb25zZS5zdGF0dXMgfHwgcmVxdWVzdC5zdGF0dXNcblxuICAgICAgaWYgKHJlc3BvbnNlQ29kZSA+PSAyMDAgJiYgcmVzcG9uc2VDb2RlIDwgMzAwKSB7XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UubWVzc2FnZSB8fCByZXNwb25zZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZXF1ZXN0UGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0UGFyYW1zKVxuICB9KVxufVxuIiwiXG5leHBvcnQgY29uc3QgZ2V0VGltZXpvbmUgPSAoKSA9PiB7XG4gIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKClcbiAgdmFyIGN1cnJlbnRUaW1lem9uZSA9IGN1cnJlbnRUaW1lLmdldFRpbWV6b25lT2Zmc2V0KClcblxuICByZXR1cm4gKGN1cnJlbnRUaW1lem9uZSAvIDYwKSAqIC0xXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50RGF0ZVRpbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gIGxldCBkID0gbmV3IERhdGUoZGF0ZSksXG4gICAgbW9udGggPSAnJyArIChkLmdldE1vbnRoKCkgKyAxKSxcbiAgICBkYXkgPSAnJyArIGQuZ2V0RGF0ZSgpLFxuICAgIHllYXIgPSBkLmdldEZ1bGxZZWFyKCksXG4gICAgaG91ciA9IGQuZ2V0SG91cnMoKSxcbiAgICBtaW51dGUgPSBkLmdldE1pbnV0ZXMoKSxcbiAgICBzZWNvbmQgPSBkLmdldFNlY29uZHMoKVxuXG4gIGlmIChtb250aC5sZW5ndGggPCAyKSB7XG4gICAgbW9udGggPSAnMCcgKyBtb250aFxuICB9XG5cbiAgaWYgKGRheS5sZW5ndGggPCAyKSB7XG4gICAgZGF5ID0gJzAnICsgZGF5XG4gIH1cblxuICBob3VyID0gaG91ciAlIDEyO1xuICBob3VyID0gaG91ciA/IGhvdXIgOiAxMjtcbiAgbWludXRlID0gbWludXRlIDwgMTAgPyAnMCcgKyBtaW51dGUgOiBtaW51dGU7XG5cbiAgY29uc3QgcmVzdWx0ID0gYCR7W3llYXIsIG1vbnRoLCBkYXldLmpvaW4oJy0nKX0gJHtob3VyfToke21pbnV0ZX06JHtzZWNvbmR9YFxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKipcbiAqIHNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE4NzA2ODE4Lzk5Mzg1MzlcbiovXG5cbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuY29uc3QgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uXG5sZXQgY29va2llRW5hYmxlZCA9IG5hdmlnYXRvci5jb29raWVFbmFibGVkXG5cbmNvbnN0IGdldE9TSW5mbyA9ICgpID0+IHtcbiAgbGV0IG9zID0gJy0nXG4gIGxldCBvc1ZlcnNpb24gPSAnLSdcblxuICBjb25zdCBjbGllbnRTdHJpbmdzID0gW1xuICAgIHtzOiAnV2luZG93cyAxMCcsIHI6IC8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOC4xJywgcjogLyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvfSxcbiAgICB7czogJ1dpbmRvd3MgOCcsIHI6IC8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxuICAgIHtzOiAnV2luZG93cyA3JywgcjogLyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpL30sXG4gICAge3M6ICdXaW5kb3dzIFZpc3RhJywgcjogL1dpbmRvd3MgTlQgNi4wL30sXG4gICAge3M6ICdXaW5kb3dzIFNlcnZlciAyMDAzJywgcjogL1dpbmRvd3MgTlQgNS4yL30sXG4gICAge3M6ICdXaW5kb3dzIFhQJywgcjogLyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS99LFxuICAgIHtzOiAnV2luZG93cyAyMDAwJywgcjogLyhXaW5kb3dzIE5UIDUuMHxXaW5kb3dzIDIwMDApL30sXG4gICAge3M6ICdXaW5kb3dzIE1FJywgcjogLyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxuICAgIHtzOiAnV2luZG93cyA5OCcsIHI6IC8oV2luZG93cyA5OHxXaW45OCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOTUnLCByOiAvKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvfSxcbiAgICB7czogJ1dpbmRvd3MgTlQgNC4wJywgcjogLyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxuICAgIHtzOiAnV2luZG93cyBDRScsIHI6IC9XaW5kb3dzIENFL30sXG4gICAge3M6ICdXaW5kb3dzIDMuMTEnLCByOiAvV2luMTYvfSxcbiAgICB7czogJ0FuZHJvaWQnLCByOiAvQW5kcm9pZC99LFxuICAgIHtzOiAnT3BlbiBCU0QnLCByOiAvT3BlbkJTRC99LFxuICAgIHtzOiAnU3VuIE9TJywgcjogL1N1bk9TL30sXG4gICAge3M6ICdMaW51eCcsIHI6IC8oTGludXh8WDExKS99LFxuICAgIHtzOiAnaU9TJywgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS99LFxuICAgIHtzOiAnTWFjIE9TIFgnLCByOiAvTWFjIE9TIFgvfSxcbiAgICB7czogJ01hYyBPUycsIHI6IC8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcbiAgICB7czogJ1FOWCcsIHI6IC9RTlgvfSxcbiAgICB7czogJ1VOSVgnLCByOiAvVU5JWC99LFxuICAgIHtzOiAnQmVPUycsIHI6IC9CZU9TL30sXG4gICAge3M6ICdPUy8yJywgcjogL09TXFwvMi99LFxuICAgIHtzOiAnU2VhcmNoIEJvdCcsIHI6IC8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS99XG4gIF1cblxuICBmb3IgKGxldCBpZCBpbiBjbGllbnRTdHJpbmdzKSB7XG4gICAgbGV0IGNzID0gY2xpZW50U3RyaW5nc1tpZF1cbiAgICBpZiAoY3Muci50ZXN0KHVhKSkge1xuICAgICAgb3MgPSBjcy5zXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXVxuICAgIG9zID0gJ1dpbmRvd3MnXG4gIH1cblxuICBzd2l0Y2ggKG9zKSB7XG4gICAgY2FzZSAnTWFjIE9TIFgnOlxuICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWModWEpWzFdXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnQW5kcm9pZCc6XG4gICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyh1YSlbMV1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdpT1MnOlxuICAgICAgb3NWZXJzaW9uID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMoblZlcilcbiAgICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvblsxXSArICcuJyArIG9zVmVyc2lvblsyXSArICcuJyArIChvc1ZlcnNpb25bM10gfCAwKVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogb3MsXG4gICAgdmVyc2lvbjogb3NWZXJzaW9uXG4gIH1cbn1cblxuY29uc3QgZ2V0QnJvd3NlckluZm8gPSAoKSA9PiB7XG4gIGxldCBtYWpvclZlcnNpb24gPSBwYXJzZUludChuVmVyLCAxMClcbiAgbGV0IGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZVxuICBsZXQgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbilcbiAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXhcblxuICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09wZXJhJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KVxuICAgIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignVmVyc2lvbicpKSAhPT0gLTEpIHtcbiAgICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOClcbiAgICB9XG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09QUicpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ09wZXJhJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNClcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRWRnZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSlcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignTVNJRScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcidcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDUpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0Nocm9tZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0Nocm9tZSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1NhZmFyaScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ1NhZmFyaSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdWZXJzaW9uJykpICE9PSAtMSkge1xuICAgICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICAgIH1cbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRmlyZWZveCcpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0ZpcmVmb3gnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICB9IGVsc2UgaWYgKHVhLmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh1YS5pbmRleE9mKCdydjonKSArIDMpXG4gIH0gZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSB1YS5sYXN0SW5kZXhPZignICcpICsgMSkgPCAodmVyT2Zmc2V0ID0gdWEubGFzdEluZGV4T2YoJy8nKSkpIHtcbiAgICBicm93c2VyID0gdWEuc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldClcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDEpXG4gICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWVcbiAgICB9XG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcnKSkgIT09IC0xKSB7XG4gICAgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KVxuICB9XG5cbiAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignICcpKSAhPT0gLTEpIHtcbiAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpXG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcpJykpICE9PSAtMSkge1xuICAgIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeClcbiAgfVxuXG4gIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KCcnICsgdmVyc2lvbiwgMTApXG4gIGlmIChpc05hTihtYWpvclZlcnNpb24pKSB7XG4gICAgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuVmVyKVxuICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5WZXIsIDEwKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBicm93c2VyIHx8ICcnLFxuICAgIHZlcnNpb246IHZlcnNpb24gfHwgJycsXG4gICAgbWFqb3JWZXJzaW9uOiBtYWpvclZlcnNpb24gfHwgJydcbiAgfVxufVxuXG5jb25zdCBnZXRTY3JlZW5TaXplID0gKCkgPT4ge1xuICBpZiAoIXNjcmVlbi53aWR0aCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGNvbnN0IHdpZHRoID0gKHNjcmVlbi53aWR0aCkgPyBzY3JlZW4ud2lkdGggOiAnJ1xuICBjb25zdCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBzY3JlZW4uaGVpZ2h0IDogJydcblxuICByZXR1cm4gJycgKyB3aWR0aCArICcgeCAnICsgaGVpZ2h0XG59XG5cbmNvbnN0IGlzQ29va2llRW5hYmxlZCA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PT0gJ3VuZGVmaW5lZCcgJiYgIWNvb2tpZUVuYWJsZWQpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSAndGVzdGNvb2tpZSdcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ3Rlc3Rjb29raWUnKSAhPT0gLTFcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV2aWNlSW5mbygpIHtcbiAgY29uc3Qgb3MgPSBnZXRPU0luZm8oKVxuICBjb25zdCBicm93c2VyID0gZ2V0QnJvd3NlckluZm8oKVxuICBjb25zdCBzY3JlZW5TaXplID0gZ2V0U2NyZWVuU2l6ZSgpXG4gIGNvbnN0IG1vYmlsZSA9IC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuVmVyKVxuXG4gIHJldHVybiB7XG4gICAgc2NyZWVuOiBzY3JlZW5TaXplLFxuICAgIGJyb3dzZXI6IGJyb3dzZXIubmFtZSxcbiAgICBicm93c2VyVmVyc2lvbjogYnJvd3Nlci52ZXJzaW9uLFxuICAgIGJyb3dzZXJNYWpvclZlcnNpb246IGJyb3dzZXIubWFqb3JWZXJzaW9uLFxuICAgIG1vYmlsZTogbW9iaWxlLFxuICAgIG9zOiBvcy5uYW1lLFxuICAgIG9zVmVyc2lvbjogb3MudmVyc2lvbixcbiAgICBjb29raWVzOiBpc0Nvb2tpZUVuYWJsZWRcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==