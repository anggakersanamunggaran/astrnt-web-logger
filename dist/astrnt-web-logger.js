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
  localStorage.setItem(logInfos, JSON.stringify(storedLogs));
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
  return new Promise(function (resolve, reject) {
    Object(utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', URL, requestParams).then(function (result) {
      localStorage.removeItem(logInfos);
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvdXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci8uL3NyYy91dGlscy9kYXRlLXV0aWxzLmpzIiwid2VicGFjazovL2FzdHJudC13ZWItbG9nZ2VyLy4vc3JjL3V0aWxzL25hdmlnYXRvci1oZWxwZXIuanMiXSwibmFtZXMiOlsibG9nRW52IiwibG9nQmFzZUluZm8iLCJsb2dJbmZvcyIsInN0b3JhZ2VLZXlzIiwiZ2V0RW52IiwiZW52IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldEJhc2VJbmZvIiwiaW5mbyIsIkpTT04iLCJwYXJzZSIsImNvbnN0cnVjdFVSTCIsImRvbWFpblByZWZpeCIsImJhc2VVUkwiLCJjb25zdHJ1Y3RJbnRlcnZpZXdJbmZvIiwicGFyYW1zIiwiZGV2aWNlIiwiZGV2aWNlSW5mbyIsInRpbWVab25lIiwiRGF0ZVV0aWxzIiwibG9nVGltZSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwib3MiLCJvc1ZlcnNpb24iLCJ2ZXJzaW9uIiwiYnJvd3NlciIsImJyb3dzZXJWZXJzaW9uIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsInJlY29yZGVkUGFyYW0iLCJldmVudCIsIm1lc3NhZ2UiLCJpbWVpIiwibG9nX3RpbWUiLCJ0aW1lX3pvbmUiLCJzZW5kRXZlbnQiLCJVUkwiLCJsb2dJbmZvIiwicmVxdWVzdFBhcmFtcyIsImxvZ3MiLCJodHRwSGFuZGxlciIsInN0b3JlRXZlbnQiLCJsb2dJdGVtcyIsInN0b3JlZExvZ3MiLCJyZW1vdmVJdGVtIiwiaW50ZXJ2aWV3SW5mbyIsInB1c2giLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJpbml0aWFsaXplIiwib25FcnJvciIsIm9uVW5oYW5kbGVkUmVqZWN0aW9uIiwiYmFzZVBhcmFtIiwiaW50ZXJ2aWV3X2NvZGUiLCJjYW5kaWRhdGVfaWQiLCJqb2JfaWQiLCJjb21wYW55X2lkIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVyckV2dCIsImVycm9yIiwicmVhc29uIiwicmVjb3JkRXZlbnQiLCJzdGF0dXMiLCJzZW5kU2F2ZWRFdmVudHMiLCJyZWplY3QiLCJ0aGVuIiwicmVzdWx0IiwiY2F0Y2giLCJjbGVhckNhY2hlIiwiZm9yRWFjaCIsImtleSIsIm1ldGhvZCIsInVybCIsIm1pbWVUeXBlIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvdmVycmlkZU1pbWVUeXBlIiwiZXZ0IiwidGFyZ2V0IiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZUNvZGUiLCJzZW5kIiwiZ2V0VGltZXpvbmUiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJjdXJyZW50VGltZXpvbmUiLCJnZXRUaW1lem9uZU9mZnNldCIsImdldEN1cnJlbnREYXRlVGltZSIsImRhdGUiLCJkIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsImxlbmd0aCIsImpvaW4iLCJuVmVyIiwiYXBwVmVyc2lvbiIsImNvb2tpZUVuYWJsZWQiLCJnZXRPU0luZm8iLCJjbGllbnRTdHJpbmdzIiwicyIsInIiLCJpZCIsImNzIiwidGVzdCIsImV4ZWMiLCJuYW1lIiwiZ2V0QnJvd3NlckluZm8iLCJtYWpvclZlcnNpb24iLCJwYXJzZUludCIsImFwcE5hbWUiLCJwYXJzZUZsb2F0IiwibmFtZU9mZnNldCIsInZlck9mZnNldCIsIml4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsImlzTmFOIiwiZ2V0U2NyZWVuU2l6ZSIsInNjcmVlbiIsIndpZHRoIiwidW5kZWZpbmVkIiwiaGVpZ2h0IiwiaXNDb29raWVFbmFibGVkIiwiZG9jdW1lbnQiLCJjb29raWUiLCJzY3JlZW5TaXplIiwibW9iaWxlIiwiY29va2llcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLE1BQU0sR0FBRyxnQkFBZjtBQUNBLElBQU1DLFdB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U0FBTyxLQUFLRixLQUFMLEdBQWEsS0FBYixHQUFxQkUsTUFBNUI7QUFDRCxDQVREOztBQVdBLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBTTtBQUM1QixNQUFJLE9BQU94SCxTQUFTLENBQUMyRixhQUFqQixLQUFtQyxXQUFuQyxJQUFrRCxDQUFDQSxhQUF2RCxFQUFzRTtBQUNwRThCLFlBQVEsQ0FBQ0MsTUFBVCxHQUFrQixZQUFsQjtBQUNBLFdBQU9ELFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQmIsT0FBaEIsQ0FBd0IsWUFBeEIsTUFBMEMsQ0FBQyxDQUFsRDtBQUNEOztBQUVELFNBQU8sS0FBUDtBQUNELENBUEQ7O0FBU08sU0FBU2xILFVBQVQsR0FBc0I7QUFDM0IsTUFBTU8sRUFBRSxHQUFHMEYsU0FBUyxFQUFwQjtBQUNBLE1BQU12RixPQUFPLEdBQUdnRyxjQUFjLEVBQTlCO0FBQ0EsTUFBTXNCLFVBQVUsR0FBR1IsYUFBYSxFQUFoQztBQUNBLE1BQU1TLE1BQU0sR0FBRyw0Q0FBNEMxQixJQUE1QyxDQUFpRFQsSUFBakQsQ0FBZjtBQUVBLFNBQU87QUFDTDJCLFVBQU0sRUFBRU8sVUFESDtBQUVMdEgsV0FBTyxFQUFFQSxPQUFPLENBQUMrRixJQUZaO0FBR0w5RixrQkFBYyxFQUFFRCxPQUFPLENBQUNELE9BSG5CO0FBSUxHLHVCQUFtQixFQUFFRixPQUFPLENBQUNpRyxZQUp4QjtBQUtMc0IsVUFBTSxFQUFFQSxNQUxIO0FBTUwxSCxNQUFFLEVBQUVBLEVBQUUsQ0FBQ2tHLElBTkY7QUFPTGpHLGFBQVMsRUFBRUQsRUFBRSxDQUFDRSxPQVBUO0FBUUx5SCxXQUFPLEVBQUVMO0FBUkosR0FBUDtBQVVELEMiLCJmaWxlIjoiYXN0cm50LXdlYi1sb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImFzdHJudC13ZWItbG9nZ2VyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFzdHJudC13ZWItbG9nZ2VyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFzdHJudC13ZWItbG9nZ2VyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGh0dHBIYW5kbGVyIGZyb20gJ3V0aWxzL2FzdHJudC1odHRwLWhhbmRsZXInXG5pbXBvcnQgeyBkZXZpY2VJbmZvIH0gZnJvbSAndXRpbHMvbmF2aWdhdG9yLWhlbHBlcidcbmltcG9ydCAqIGFzIERhdGVVdGlscyBmcm9tICd1dGlscy9kYXRlLXV0aWxzJ1xuXG5jb25zdCBsb2dFbnYgPSAnQVNUUk5UX0xPR19FTlYnXG5jb25zdCBsb2dCYXNlSW5mbyA9ICdBU1RSTlRfQkFTRV9MT0dfSU5GTydcbmNvbnN0IGxvZ0luZm9zID0gJ0FTVFJOVF9MT0dfSU5GT1MnXG5jb25zdCBzdG9yYWdlS2V5cyA9IFtcbiAgbG9nRW52LFxuICBsb2dCYXNlSW5mbyxcbiAgbG9nSW5mb3Ncbl1cblxuY29uc3QgZ2V0RW52ID0gKCkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dFbnYpXG4gIHJldHVybiBlbnZcbn1cblxuY29uc3QgZ2V0QmFzZUluZm8gPSAoKSA9PiB7XG4gIGNvbnN0IGluZm8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dCYXNlSW5mbylcbiAgcmV0dXJuIEpTT04ucGFyc2UoaW5mbylcbn1cblxuY29uc3QgY29uc3RydWN0VVJMID0gKCkgPT4ge1xuICBjb25zdCBlbnYgPSBnZXRFbnYoKVxuICBsZXQgZG9tYWluUHJlZml4ID0gJydcblxuICBzd2l0Y2ggKGVudikge1xuICAgIGNhc2UgJ2JldGEnOiBjYXNlICdkZXYnOlxuICAgICAgZG9tYWluUHJlZml4ID0gJ2JldGEnXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3Byb2R1Y3Rpb24nOiBjYXNlICdsaXZlJzpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdhcHAnXG4gICAgICBicmVha1xuICB9XG5cbiAgY29uc3QgYmFzZVVSTCA9IGBodHRwczovLyR7ZG9tYWluUHJlZml4fS5hc3RybnQuY29gXG4gIHJldHVybiBgJHtiYXNlVVJMfS9hcGkvdjIvY2FuZGlkYXRlL2xvZ3NgXG59XG5cbmNvbnN0IGNvbnN0cnVjdEludGVydmlld0luZm8gPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGRldmljZSA9IGRldmljZUluZm8oKVxuICBjb25zdCB0aW1lWm9uZSA9IERhdGVVdGlscy5nZXRUaW1lem9uZSgpXG4gIGNvbnN0IGxvZ1RpbWUgPSBEYXRlVXRpbHMuZ2V0Q3VycmVudERhdGVUaW1lKClcbiAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG4gIGNvbnN0IG9zID0gYCR7ZGV2aWNlLm9zfSAoJHtkZXZpY2Uub3NWZXJzaW9ufSlgXG4gIGNvbnN0IHZlcnNpb24gPSBgJHtkZXZpY2UuYnJvd3Nlcn0sIFZlcnNpb24gJHtkZXZpY2UuYnJvd3NlclZlcnNpb259ICgke2RldmljZS5icm93c2VyTWFqb3JWZXJzaW9ufSlgXG5cbiAgbGV0IHJlY29yZGVkUGFyYW0gPSBnZXRCYXNlSW5mbygpXG4gIHJlY29yZGVkUGFyYW0uZXZlbnQgPSBwYXJhbXMuZXZlbnQgfHwgJydcbiAgcmVjb3JkZWRQYXJhbS5tZXNzYWdlID0gcGFyYW1zLm1lc3NhZ2UgfHwgJydcbiAgcmVjb3JkZWRQYXJhbS5vcyA9IG9zXG4gIHJlY29yZGVkUGFyYW0udmVyc2lvbiA9IHZlcnNpb25cbiAgcmVjb3JkZWRQYXJhbS5pbWVpID0gdWFcbiAgcmVjb3JkZWRQYXJhbS5sb2dfdGltZSA9IGxvZ1RpbWVcbiAgcmVjb3JkZWRQYXJhbS50aW1lX3pvbmUgPSB0aW1lWm9uZVxuXG4gIHJldHVybiByZWNvcmRlZFBhcmFtXG59XG5cbmNvbnN0IHNlbmRFdmVudCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgVVJMID0gY29uc3RydWN0VVJMKClcbiAgY29uc3QgbG9nSW5mbyA9IGNvbnN0cnVjdEludGVydmlld0luZm8ocGFyYW1zKVxuICBjb25zdCByZXF1ZXN0UGFyYW1zID0ge1xuICAgIGxvZ3M6IFsgbG9nSW5mbyBdXG4gIH1cblxuICByZXR1cm4gaHR0cEhhbmRsZXIoJ1BPU1QnLCBVUkwsIHJlcXVlc3RQYXJhbXMpXG59XG5cbmNvbnN0IHN0b3JlRXZlbnQgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGxvZ0l0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nSW5mb3MpXG5cbiAgbGV0IHN0b3JlZExvZ3NcbiAgaWYgKCFsb2dJdGVtcykge1xuICAgIHN0b3JlZExvZ3MgPSBbXVxuICB9IGVsc2Uge1xuICAgIHN0b3JlZExvZ3MgPSBKU09OLnBhcnNlKGxvZ0l0ZW1zKVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvZ0luZm9zKVxuICB9XG5cbiAgY29uc3QgaW50ZXJ2aWV3SW5mbyA9IGNvbnN0cnVjdEludGVydmlld0luZm8ocGFyYW1zKVxuICBzdG9yZWRMb2dzLnB1c2goaW50ZXJ2aWV3SW5mbylcblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dJbmZvcywgSlNPTi5zdHJpbmdpZnkoc3RvcmVkTG9ncykpXG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbnRlcnZpZXdJbmZvKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShlbnYsIHBhcmFtcywgb25FcnJvciA9ICgpID0+IHt9LCBvblVuaGFuZGxlZFJlamVjdGlvbiA9ICgpID0+IHt9KSB7XG4gIGNvbnN0IGJhc2VQYXJhbSA9IHtcbiAgICAnaW50ZXJ2aWV3Q29kZSc6IHBhcmFtcy5pbnRlcnZpZXdfY29kZSB8fCAnJyxcbiAgICAnY2FuZGlkYXRlX2lkJzogcGFyYW1zLmNhbmRpZGF0ZV9pZCB8fCAwLFxuICAgICdqb2JfaWQnOiBwYXJhbXMuam9iX2lkIHx8IDAsXG4gICAgJ2NvbXBhbnlfaWQnOiBwYXJhbXMuY29tcGFueV9pZCB8fCAwXG4gIH1cblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dFbnYsIGVudilcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9nQmFzZUluZm8sIEpTT04uc3RyaW5naWZ5KGJhc2VQYXJhbSkpXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVyckV2dCkgPT4ge1xuICAgIG9uRXJyb3IoZXJyRXZ0LmVycm9yKVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCAoZXJyRXZ0KSA9PiB7XG4gICAgb25VbmhhbmRsZWRSZWplY3Rpb24oZXJyRXZ0LnJlYXNvbilcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY29yZEV2ZW50KHBhcmFtcykge1xuICBzd2l0Y2ggKHBhcmFtcy5zdGF0dXMpIHtcbiAgICBjYXNlICdvbmxpbmUnOlxuICAgICAgcmV0dXJuIHNlbmRFdmVudChwYXJhbXMpXG5cbiAgICBjYXNlICdvZmZsaW5lJzpcbiAgICAgIHJldHVybiBzdG9yZUV2ZW50KHBhcmFtcylcbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ05vIGV2ZW50IHRvIHNlbmQnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VuZFNhdmVkRXZlbnRzKCkge1xuICBjb25zdCBsb2dJdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0luZm9zKVxuICBpZiAoIWxvZ0l0ZW1zKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gIH1cblxuICBjb25zdCBVUkwgPSBjb25zdHJ1Y3RVUkwoKVxuICBjb25zdCByZXF1ZXN0UGFyYW1zID0ge1xuICAgIGxvZ3M6IEpTT04ucGFyc2UobG9nSXRlbXMpXG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGh0dHBIYW5kbGVyKCdQT1NUJywgVVJMLCByZXF1ZXN0UGFyYW1zKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9nSW5mb3MpXG4gICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IpKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgc3RvcmFnZUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSlcbiAgfSlcbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgKG1ldGhvZCwgdXJsLCBwYXJhbXMsIG1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKVxuXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JylcblxuICAgIGlmIChtaW1lVHlwZSAmJiByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUpIHtcbiAgICAgIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZShtaW1lVHlwZSlcbiAgICB9XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dClcbiAgICAgIGNvbnN0IHJlc3BvbnNlQ29kZSA9IHJlc3BvbnNlLnN0YXR1cyB8fCByZXF1ZXN0LnN0YXR1c1xuXG4gICAgICBpZiAocmVzcG9uc2VDb2RlID49IDIwMCAmJiByZXNwb25zZUNvZGUgPCAzMDApIHtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHJlc3BvbnNlLm1lc3NhZ2UgfHwgcmVzcG9uc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3RQYXJhbXMpXG4gIH0pXG59XG4iLCJcbmV4cG9ydCBjb25zdCBnZXRUaW1lem9uZSA9ICgpID0+IHtcbiAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKVxuICB2YXIgY3VycmVudFRpbWV6b25lID0gY3VycmVudFRpbWUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuXG4gIHJldHVybiAoY3VycmVudFRpbWV6b25lIC8gNjApICogLTFcbn1cblxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnREYXRlVGltZSA9ICgpID0+IHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgbGV0IGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBtb250aCA9ICcnICsgKGQuZ2V0TW9udGgoKSArIDEpLFxuICAgIGRheSA9ICcnICsgZC5nZXREYXRlKCksXG4gICAgeWVhciA9IGQuZ2V0RnVsbFllYXIoKSxcbiAgICBob3VyID0gZC5nZXRIb3VycygpLFxuICAgIG1pbnV0ZSA9IGQuZ2V0TWludXRlcygpLFxuICAgIHNlY29uZCA9IGQuZ2V0U2Vjb25kcygpXG5cbiAgaWYgKG1vbnRoLmxlbmd0aCA8IDIpIHtcbiAgICBtb250aCA9ICcwJyArIG1vbnRoXG4gIH1cblxuICBpZiAoZGF5Lmxlbmd0aCA8IDIpIHtcbiAgICBkYXkgPSAnMCcgKyBkYXlcbiAgfVxuXG4gIGhvdXIgPSBob3VyICUgMTI7XG4gIGhvdXIgPSBob3VyID8gaG91ciA6IDEyO1xuICBtaW51dGUgPSBtaW51dGUgPCAxMCA/ICcwJyArIG1pbnV0ZSA6IG1pbnV0ZTtcblxuICBjb25zdCByZXN1bHQgPSBgJHtbeWVhciwgbW9udGgsIGRheV0uam9pbignLScpfSAke2hvdXJ9OiR7bWludXRlfToke3NlY29uZH1gXG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qKlxuICogc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTg3MDY4MTgvOTkzODUzOVxuKi9cblxuY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG5jb25zdCBuVmVyID0gbmF2aWdhdG9yLmFwcFZlcnNpb25cbmxldCBjb29raWVFbmFibGVkID0gbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWRcblxuY29uc3QgZ2V0T1NJbmZvID0gKCkgPT4ge1xuICBsZXQgb3MgPSAnLSdcbiAgbGV0IG9zVmVyc2lvbiA9ICctJ1xuXG4gIGNvbnN0IGNsaWVudFN0cmluZ3MgPSBbXG4gICAge3M6ICdXaW5kb3dzIDEwJywgcjogLyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS99LFxuICAgIHtzOiAnV2luZG93cyA4LjEnLCByOiAvKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS99LFxuICAgIHtzOiAnV2luZG93cyA4JywgcjogLyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpL30sXG4gICAge3M6ICdXaW5kb3dzIDcnLCByOiAvKFdpbmRvd3MgN3xXaW5kb3dzIE5UIDYuMSkvfSxcbiAgICB7czogJ1dpbmRvd3MgVmlzdGEnLCByOiAvV2luZG93cyBOVCA2LjAvfSxcbiAgICB7czogJ1dpbmRvd3MgU2VydmVyIDIwMDMnLCByOiAvV2luZG93cyBOVCA1LjIvfSxcbiAgICB7czogJ1dpbmRvd3MgWFAnLCByOiAvKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApL30sXG4gICAge3M6ICdXaW5kb3dzIDIwMDAnLCByOiAvKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvfSxcbiAgICB7czogJ1dpbmRvd3MgTUUnLCByOiAvKFdpbiA5eCA0LjkwfFdpbmRvd3MgTUUpL30sXG4gICAge3M6ICdXaW5kb3dzIDk4JywgcjogLyhXaW5kb3dzIDk4fFdpbjk4KS99LFxuICAgIHtzOiAnV2luZG93cyA5NScsIHI6IC8oV2luZG93cyA5NXxXaW45NXxXaW5kb3dzXzk1KS99LFxuICAgIHtzOiAnV2luZG93cyBOVCA0LjAnLCByOiAvKFdpbmRvd3MgTlQgNC4wfFdpbk5UNC4wfFdpbk5UfFdpbmRvd3MgTlQpL30sXG4gICAge3M6ICdXaW5kb3dzIENFJywgcjogL1dpbmRvd3MgQ0UvfSxcbiAgICB7czogJ1dpbmRvd3MgMy4xMScsIHI6IC9XaW4xNi99LFxuICAgIHtzOiAnQW5kcm9pZCcsIHI6IC9BbmRyb2lkL30sXG4gICAge3M6ICdPcGVuIEJTRCcsIHI6IC9PcGVuQlNEL30sXG4gICAge3M6ICdTdW4gT1MnLCByOiAvU3VuT1MvfSxcbiAgICB7czogJ0xpbnV4JywgcjogLyhMaW51eHxYMTEpL30sXG4gICAge3M6ICdpT1MnLCByOiAvKGlQaG9uZXxpUGFkfGlQb2QpL30sXG4gICAge3M6ICdNYWMgT1MgWCcsIHI6IC9NYWMgT1MgWC99LFxuICAgIHtzOiAnTWFjIE9TJywgcjogLyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS99LFxuICAgIHtzOiAnUU5YJywgcjogL1FOWC99LFxuICAgIHtzOiAnVU5JWCcsIHI6IC9VTklYL30sXG4gICAge3M6ICdCZU9TJywgcjogL0JlT1MvfSxcbiAgICB7czogJ09TLzInLCByOiAvT1NcXC8yL30sXG4gICAge3M6ICdTZWFyY2ggQm90JywgcjogLyhudWhrfEdvb2dsZWJvdHxZYW1teWJvdHxPcGVuYm90fFNsdXJwfE1TTkJvdHxBc2sgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpL31cbiAgXVxuXG4gIGZvciAobGV0IGlkIGluIGNsaWVudFN0cmluZ3MpIHtcbiAgICBsZXQgY3MgPSBjbGllbnRTdHJpbmdzW2lkXVxuICAgIGlmIChjcy5yLnRlc3QodWEpKSB7XG4gICAgICBvcyA9IGNzLnNcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKC9XaW5kb3dzLy50ZXN0KG9zKSkge1xuICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdXG4gICAgb3MgPSAnV2luZG93cydcbiAgfVxuXG4gIHN3aXRjaCAob3MpIHtcbiAgICBjYXNlICdNYWMgT1MgWCc6XG4gICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwW1xcLlxcX1xcZF0rKS8uZXhlYyh1YSlbMV1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdBbmRyb2lkJzpcbiAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKHVhKVsxXVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ2lPUyc6XG4gICAgICBvc1ZlcnNpb24gPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuVmVyKVxuICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApXG4gICAgICBicmVha1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBvcyxcbiAgICB2ZXJzaW9uOiBvc1ZlcnNpb25cbiAgfVxufVxuXG5jb25zdCBnZXRCcm93c2VySW5mbyA9ICgpID0+IHtcbiAgbGV0IG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5WZXIsIDEwKVxuICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lXG4gIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKVxuICBsZXQgbmFtZU9mZnNldCwgdmVyT2Zmc2V0LCBpeFxuXG4gIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignT3BlcmEnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdPcGVyYSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDYpXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdWZXJzaW9uJykpICE9PSAtMSkge1xuICAgICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICAgIH1cbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignT1BSJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA0KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdFZGdlJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEVkZ2UnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdNU0lFJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSlcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignQ2hyb21lJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnQ2hyb21lJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNylcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignU2FmYXJpJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnU2FmYXJpJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNylcbiAgICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1ZlcnNpb24nKSkgIT09IC0xKSB7XG4gICAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpXG4gICAgfVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdGaXJlZm94JykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnRmlyZWZveCdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpXG4gIH0gZWxzZSBpZiAodWEuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcidcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHVhLmluZGV4T2YoJ3J2OicpICsgMylcbiAgfSBlbHNlIGlmICgobmFtZU9mZnNldCA9IHVhLmxhc3RJbmRleE9mKCcgJykgKyAxKSA8ICh2ZXJPZmZzZXQgPSB1YS5sYXN0SW5kZXhPZignLycpKSkge1xuICAgIGJyb3dzZXIgPSB1YS5zdWJzdHJpbmcobmFtZU9mZnNldCwgdmVyT2Zmc2V0KVxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSlcbiAgICBpZiAoYnJvd3Nlci50b0xvd2VyQ2FzZSgpID09PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZVxuICAgIH1cbiAgfVxuXG4gIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJycpKSAhPT0gLTEpIHtcbiAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpXG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcgJykpICE9PSAtMSkge1xuICAgIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeClcbiAgfVxuXG4gIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyknKSkgIT09IC0xKSB7XG4gICAgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KVxuICB9XG5cbiAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoJycgKyB2ZXJzaW9uLCAxMClcbiAgaWYgKGlzTmFOKG1ham9yVmVyc2lvbikpIHtcbiAgICB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5WZXIpXG4gICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoblZlciwgMTApXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IGJyb3dzZXIgfHwgJycsXG4gICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnJyxcbiAgICBtYWpvclZlcnNpb246IG1ham9yVmVyc2lvbiB8fCAnJ1xuICB9XG59XG5cbmNvbnN0IGdldFNjcmVlblNpemUgPSAoKSA9PiB7XG4gIGlmICghc2NyZWVuLndpZHRoKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgY29uc3Qgd2lkdGggPSAoc2NyZWVuLndpZHRoKSA/IHNjcmVlbi53aWR0aCA6ICcnXG4gIGNvbnN0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHNjcmVlbi5oZWlnaHQgOiAnJ1xuXG4gIHJldHVybiAnJyArIHdpZHRoICsgJyB4ICcgKyBoZWlnaHRcbn1cblxuY29uc3QgaXNDb29raWVFbmFibGVkID0gKCkgPT4ge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvci5jb29raWVFbmFibGVkID09PSAndW5kZWZpbmVkJyAmJiAhY29va2llRW5hYmxlZCkge1xuICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJ1xuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUuaW5kZXhPZigndGVzdGNvb2tpZScpICE9PSAtMVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZpY2VJbmZvKCkge1xuICBjb25zdCBvcyA9IGdldE9TSW5mbygpXG4gIGNvbnN0IGJyb3dzZXIgPSBnZXRCcm93c2VySW5mbygpXG4gIGNvbnN0IHNjcmVlblNpemUgPSBnZXRTY3JlZW5TaXplKClcbiAgY29uc3QgbW9iaWxlID0gL01vYmlsZXxtaW5pfEZlbm5lY3xBbmRyb2lkfGlQKGFkfG9kfGhvbmUpLy50ZXN0KG5WZXIpXG5cbiAgcmV0dXJuIHtcbiAgICBzY3JlZW46IHNjcmVlblNpemUsXG4gICAgYnJvd3NlcjogYnJvd3Nlci5uYW1lLFxuICAgIGJyb3dzZXJWZXJzaW9uOiBicm93c2VyLnZlcnNpb24sXG4gICAgYnJvd3Nlck1ham9yVmVyc2lvbjogYnJvd3Nlci5tYWpvclZlcnNpb24sXG4gICAgbW9iaWxlOiBtb2JpbGUsXG4gICAgb3M6IG9zLm5hbWUsXG4gICAgb3NWZXJzaW9uOiBvcy52ZXJzaW9uLFxuICAgIGNvb2tpZXM6IGlzQ29va2llRW5hYmxlZFxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9