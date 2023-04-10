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
  var info = JSON.parse(localStorage.getItem(logBaseInfo));
  return info ? info : {};
};

var constructURL = function constructURL() {
  var env = getEnv();
  var domainPrefix;
  var baseURL = env;
  console.log(env);

  switch (env) {
    case 'dev':
      domainPrefix = 'log-beta';
      break;

    case 'production':
    case 'live':
      domainPrefix = 'log-app';
      break;

    default:
      domainPrefix = 'env';
  }

  if (domainPrefix) {
    baseURL = "https://".concat(domainPrefix, ".astrnt.co");
  }

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
  } // hour = hour % 12;
  // hour = hour ? hour : 12;


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
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(ua) ? /Mac OS X (10[\.\_\d]+)/.exec(ua)[1] : '11';
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
  var nameOffset, verOffset, offSet;

  if ((verOffset = ua.indexOf('Opera')) !== -1) {
    browser = 'Opera';
    offSet = verOffset + 6;
    version = ua.substring(offSet);

    if ((verOffset = ua.indexOf('Version')) !== -1) {
      offSet = verOffset + 8;
      version = ua.substring(offSet);
    }
  } else if ((verOffset = ua.indexOf('OPR')) !== -1) {
    browser = 'Opera';
    offSet = verOffset + 4;
    version = ua.substring(offSet);
  } else if ((verOffset = ua.indexOf('Edge')) !== -1) {
    browser = 'Microsoft Edge';
    offSet = verOffset + 5;
    version = ua.substring(offSet);
  } else if ((verOffset = ua.indexOf('MSIE')) !== -1) {
    browser = 'Microsoft Internet Explorer';
    version = ua.substring(verOffset + 5);
  } else if ((verOffset = ua.indexOf('Chrome')) !== -1) {
    browser = 'Chrome';
    offSet = verOffset + 7;
    version = ua.substring(offSet);
  } else if ((verOffset = ua.indexOf('Safari')) !== -1) {
    browser = 'Safari';
    offSet = verOffset + 7;
    version = ua.substring(offSet);

    if ((verOffset = ua.indexOf('Version')) !== -1) {
      offSet = verOffset + 8;
      version = ua.substring(offSet);
    }
  } else if ((verOffset = ua.indexOf('Firefox')) !== -1) {
    browser = 'Firefox';
    offSet = verOffset + 8;
    version = ua.substring(offSet);
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

  version = version.split(' ');
  version = version[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvdXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci8uL3NyYy91dGlscy9kYXRlLXV0aWxzLmpzIiwid2VicGFjazovL2FzdHJudC13ZWItbG9nZ2VyLy4vc3JjL3V0aWxzL25hdmlnYXRvci1oZWxwZXIuanMiXSwibmFtZXMiOlsibG9nRW52IiwibG9nQmFzZUluZm8iLCJsb2dJbmZvcyIsInN0b3JhZ2VLZXlzIiwiZ2V0RW52IiwiZW52IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldEJhc2VJbmZvIiwiaW5mbyIsIkpTT04iLCJwYXJzZSIsImNvbnN0cnVjdFVSTCIsImRvbWFpblByZWZpeCIsImJhc2VVUkwiLCJjb25zb2xlIiwibG9nIiwiY29uc3RydWN0SW50ZXJ2aWV3SW5mbyIsInBhcmFtcyIsImRldmljZSIsImRldmljZUluZm8iLCJ0aW1lWm9uZSIsIkRhdGVVdGlscyIsImxvZ1RpbWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm9zIiwib3NWZXJzaW9uIiwidmVyc2lvbiIsImJyb3dzZXIiLCJicm93c2VyVmVyc2lvbiIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJyZWNvcmRlZFBhcmFtIiwiZXZlbnQiLCJtZXNzYWdlIiwiaW1laSIsImxvZ190aW1lIiwidGltZV96b25lIiwic2VuZEV2ZW50IiwiVVJMIiwibG9nSW5mbyIsInJlcXVlc3RQYXJhbXMiLCJsb2dzIiwiaHR0cEhhbmRsZXIiLCJzdG9yZUV2ZW50IiwibG9nSXRlbXMiLCJzdG9yZWRMb2dzIiwicmVtb3ZlSXRlbSIsImludGVydmlld0luZm8iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaW5pdGlhbGl6ZSIsIm9uRXJyb3IiLCJvblVuaGFuZGxlZFJlamVjdGlvbiIsImJhc2VQYXJhbSIsImludGVydmlld19jb2RlIiwiY2FuZGlkYXRlX2lkIiwiam9iX2lkIiwiY29tcGFueV9pZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJFdnQiLCJlcnJvciIsInJlYXNvbiIsInJlY29yZEV2ZW50Iiwic3RhdHVzIiwic2VuZFNhdmVkRXZlbnRzIiwicmVqZWN0IiwidGhlbiIsInJlc3VsdCIsImNhdGNoIiwiY2xlYXJDYWNoZSIsImZvckVhY2giLCJrZXkiLCJtZXRob2QiLCJ1cmwiLCJtaW1lVHlwZSIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib3ZlcnJpZGVNaW1lVHlwZSIsImV2dCIsInRhcmdldCIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VDb2RlIiwic2VuZCIsImdldFRpbWV6b25lIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiY3VycmVudFRpbWV6b25lIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJnZXRDdXJyZW50RGF0ZVRpbWUiLCJkYXRlIiwiZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJsZW5ndGgiLCJqb2luIiwiblZlciIsImFwcFZlcnNpb24iLCJjb29raWVFbmFibGVkIiwiZ2V0T1NJbmZvIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiaWQiLCJjcyIsInRlc3QiLCJleGVjIiwibmFtZSIsImdldEJyb3dzZXJJbmZvIiwibWFqb3JWZXJzaW9uIiwicGFyc2VJbnQiLCJhcHBOYW1lIiwicGFyc2VGbG9hdCIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJvZmZTZXQiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIiwic3BsaXQiLCJpc05hTiIsImdldFNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsInVuZGVmaW5lZCIsImhlaWdodCIsImlzQ29va2llRW5hYmxlZCIsImRvY3VtZW50IiwiY29va2llIiwic2NyZWVuU2l6ZSIsIm1vYmlsZSIsImNvb2tpZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxNQUFNLEdBQUcsZ0JBQWY7QUFDQSxJQUFNQyxXQUFXLEdBQUcsc0JBQXBCO0FBQ0EsSUFBTUMsUUFBUSxHQUFHLGtCQUFqQjtBQUNBLElBQU1DLFdBQVcsR0FBRyxDQUNsQkgsTUFEa0IsRUFFbEJDLFdBRmtCLEVBR2xCQyxRQUhrQixDQUFwQjs7QUFNQSxJQUFNRSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFNO0FBQ25CLE1BQU1DLEdBQUcsR0FBR0MsWUFBWSxDQUFDQyxPQUFiLENBQXFCUCxNQUFyQixDQUFaO0FBQ0EsU0FBT0ssR0FBUDtBQUNELENBSEQ7O0FBS0EsSUFBTUcsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtBQUN4QixNQUFNQyxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxZQUFZLENBQUNDLE9BQWIsQ0FBcUJOLFdBQXJCLENBQVgsQ0FBYjtBQUNBLFNBQU9RLElBQUksR0FBR0EsSUFBSCxHQUFVLEVBQXJCO0FBQ0QsQ0FIRDs7QUFLQSxJQUFNRyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ3pCLE1BQU1QLEdBQUcsR0FBR0QsTUFBTSxFQUFsQjtBQUNBLE1BQUlTLFlBQUo7QUFDQSxNQUFJQyxPQUFPLEdBQUdULEdBQWQ7QUFDQVUsU0FBTyxDQUFDQyxHQUFSLENBQVlYLEdBQVo7O0FBQ0EsVUFBUUEsR0FBUjtBQUNFLFNBQUssS0FBTDtBQUNFUSxrQkFBWSxHQUFHLFVBQWY7QUFDQTs7QUFDRixTQUFLLFlBQUw7QUFBbUIsU0FBSyxNQUFMO0FBQ2pCQSxrQkFBWSxHQUFHLFNBQWY7QUFDQTs7QUFDRjtBQUNFQSxrQkFBWSxHQUFHLEtBQWY7QUFSSjs7QUFVQSxNQUFJQSxZQUFKLEVBQWtCO0FBQ2hCQyxXQUFPLHFCQUFjRCxZQUFkLGVBQVA7QUFDRDs7QUFDRCxtQkFBVUMsT0FBVjtBQUNELENBbkJEOztBQXFCQSxJQUFNRyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUNDLE1BQUQsRUFBWTtBQUN6QyxNQUFNQyxNQUFNLEdBQUdDLHlFQUFVLEVBQXpCO0FBQ0EsTUFBTUMsUUFBUSxHQUFHQyw0REFBQSxFQUFqQjtBQUNBLE1BQU1DLE9BQU8sR0FBR0QsbUVBQUEsRUFBaEI7QUFDQSxNQUFNRSxFQUFFLEdBQUdDLFNBQVMsQ0FBQ0MsU0FBckI7QUFDQSxNQUFNQyxFQUFFLGFBQU1SLE1BQU0sQ0FBQ1EsRUFBYixlQUFvQlIsTUFBTSxDQUFDUyxTQUEzQixNQUFSO0FBQ0EsTUFBTUMsT0FBTyxhQUFNVixNQUFNLENBQUNXLE9BQWIsdUJBQWlDWCxNQUFNLENBQUNZLGNBQXhDLGVBQTJEWixNQUFNLENBQUNhLG1CQUFsRSxNQUFiO0FBRUEsTUFBSUMsYUFBYSxHQUFHekIsV0FBVyxFQUEvQjtBQUNBeUIsZUFBYSxDQUFDQyxLQUFkLEdBQXNCaEIsTUFBTSxDQUFDZ0IsS0FBUCxJQUFnQixFQUF0QztBQUNBRCxlQUFhLENBQUNFLE9BQWQsR0FBd0JqQixNQUFNLENBQUNpQixPQUFQLElBQWtCLEVBQTFDO0FBQ0FGLGVBQWEsQ0FBQ04sRUFBZCxHQUFtQkEsRUFBbkI7QUFDQU0sZUFBYSxDQUFDSixPQUFkLEdBQXdCQSxPQUF4QjtBQUNBSSxlQUFhLENBQUNHLElBQWQsR0FBcUJaLEVBQXJCO0FBQ0FTLGVBQWEsQ0FBQ0ksUUFBZCxHQUF5QmQsT0FBekI7QUFDQVUsZUFBYSxDQUFDSyxTQUFkLEdBQTBCakIsUUFBMUI7QUFFQSxTQUFPWSxhQUFQO0FBQ0QsQ0FsQkQ7O0FBb0JBLElBQU1NLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNyQixNQUFELEVBQVk7QUFDNUIsTUFBTXNCLEdBQUcsR0FBRzVCLFlBQVksRUFBeEI7QUFDQSxNQUFNNkIsT0FBTyxHQUFHeEIsc0JBQXNCLENBQUNDLE1BQUQsQ0FBdEM7QUFDQSxNQUFNd0IsYUFBYSxHQUFHO0FBQ3BCQyxRQUFJLEVBQUUsQ0FBRUYsT0FBRjtBQURjLEdBQXRCO0FBSUEsU0FBT0cseUVBQVcsQ0FBQyxNQUFELEVBQVNKLEdBQVQsRUFBY0UsYUFBZCxDQUFsQjtBQUNELENBUkQ7O0FBVUEsSUFBTUcsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQzNCLE1BQUQsRUFBWTtBQUM3QixNQUFNNEIsUUFBUSxHQUFHeEMsWUFBWSxDQUFDQyxPQUFiLENBQXFCTCxRQUFyQixDQUFqQjtBQUVBLE1BQUk2QyxVQUFKOztBQUNBLE1BQUksQ0FBQ0QsUUFBTCxFQUFlO0FBQ2JDLGNBQVUsR0FBRyxFQUFiO0FBQ0QsR0FGRCxNQUVPO0FBQ0xBLGNBQVUsR0FBR3JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXbUMsUUFBWCxDQUFiO0FBQ0F4QyxnQkFBWSxDQUFDMEMsVUFBYixDQUF3QjlDLFFBQXhCO0FBQ0Q7O0FBRUQsTUFBTStDLGFBQWEsR0FBR2hDLHNCQUFzQixDQUFDQyxNQUFELENBQTVDO0FBQ0E2QixZQUFVLENBQUNHLElBQVgsQ0FBZ0JELGFBQWhCO0FBRUEzQyxjQUFZLENBQUM2QyxPQUFiLENBQXFCakQsUUFBckIsRUFBK0JRLElBQUksQ0FBQzBDLFNBQUwsQ0FBZUwsVUFBZixDQUEvQjtBQUVBLFNBQU9NLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQkwsYUFBaEIsQ0FBUDtBQUNELENBakJEOztBQW1CTyxTQUFTTSxVQUFULENBQW9CbEQsR0FBcEIsRUFBeUJhLE1BQXpCLEVBQXNGO0FBQUEsTUFBckRzQyxPQUFxRCx1RUFBM0MsWUFBTSxDQUFFLENBQW1DO0FBQUEsTUFBakNDLG9CQUFpQyx1RUFBVixZQUFNLENBQUUsQ0FBRTtBQUMzRixNQUFNQyxTQUFTLEdBQUc7QUFDaEIscUJBQWlCeEMsTUFBTSxDQUFDeUMsY0FBUCxJQUF5QixFQUQxQjtBQUVoQixvQkFBZ0J6QyxNQUFNLENBQUMwQyxZQUFQLElBQXVCLENBRnZCO0FBR2hCLGNBQVUxQyxNQUFNLENBQUMyQyxNQUFQLElBQWlCLENBSFg7QUFJaEIsa0JBQWMzQyxNQUFNLENBQUM0QyxVQUFQLElBQXFCO0FBSm5CLEdBQWxCO0FBT0F4RCxjQUFZLENBQUM2QyxPQUFiLENBQXFCbkQsTUFBckIsRUFBNkJLLEdBQTdCO0FBQ0FDLGNBQVksQ0FBQzZDLE9BQWIsQ0FBcUJsRCxXQUFyQixFQUFrQ1MsSUFBSSxDQUFDMEMsU0FBTCxDQUFlTSxTQUFmLENBQWxDO0FBRUFLLFFBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBQ0MsTUFBRCxFQUFZO0FBQzNDVCxXQUFPLENBQUNTLE1BQU0sQ0FBQ0MsS0FBUixDQUFQO0FBQ0EsV0FBTyxLQUFQO0FBQ0QsR0FIRDtBQUtBSCxRQUFNLENBQUNDLGdCQUFQLENBQXdCLG9CQUF4QixFQUE4QyxVQUFDQyxNQUFELEVBQVk7QUFDeERSLHdCQUFvQixDQUFDUSxNQUFNLENBQUNFLE1BQVIsQ0FBcEI7QUFDRCxHQUZEO0FBR0Q7QUFFTSxTQUFTQyxXQUFULENBQXFCbEQsTUFBckIsRUFBNkI7QUFDbEMsVUFBUUEsTUFBTSxDQUFDbUQsTUFBZjtBQUNFLFNBQUssUUFBTDtBQUNFLGFBQU85QixTQUFTLENBQUNyQixNQUFELENBQWhCOztBQUVGLFNBQUssU0FBTDtBQUNFLGFBQU8yQixVQUFVLENBQUMzQixNQUFELENBQWpCO0FBTEo7O0FBUUEsU0FBT21DLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixrQkFBaEIsQ0FBUDtBQUNEO0FBRU0sU0FBU2dCLGVBQVQsR0FBMkI7QUFDaEMsTUFBTXhCLFFBQVEsR0FBR3hDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQkwsUUFBckIsQ0FBakI7O0FBQ0EsTUFBSSxDQUFDNEMsUUFBTCxFQUFlO0FBQ2IsV0FBT08sT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRDs7QUFFRCxNQUFNZCxHQUFHLEdBQUc1QixZQUFZLEVBQXhCO0FBQ0EsTUFBTThCLGFBQWEsR0FBRztBQUNwQkMsUUFBSSxFQUFFakMsSUFBSSxDQUFDQyxLQUFMLENBQVdtQyxRQUFYO0FBRGMsR0FBdEI7QUFJQSxTQUFPLElBQUlPLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVpQixNQUFWLEVBQXFCO0FBQ3RDM0IsNkVBQVcsQ0FBQyxNQUFELEVBQVNKLEdBQVQsRUFBY0UsYUFBZCxDQUFYLENBQ0c4QixJQURILENBQ1EsVUFBQUMsTUFBTSxFQUFJO0FBQ2RuRSxrQkFBWSxDQUFDMEMsVUFBYixDQUF3QjlDLFFBQXhCO0FBQ0FvRCxhQUFPLENBQUNtQixNQUFELENBQVA7QUFDRCxLQUpILEVBS0dDLEtBTEgsQ0FLUyxVQUFBUixLQUFLO0FBQUEsYUFBSUssTUFBTSxDQUFDTCxLQUFELENBQVY7QUFBQSxLQUxkO0FBTUQsR0FQTSxDQUFQO0FBUUQ7QUFFTSxTQUFTUyxVQUFULEdBQXNCO0FBQzNCeEUsYUFBVyxDQUFDeUUsT0FBWixDQUFvQixVQUFBQyxHQUFHLEVBQUk7QUFDekJ2RSxnQkFBWSxDQUFDMEMsVUFBYixDQUF3QjZCLEdBQXhCO0FBQ0QsR0FGRDtBQUdELEM7Ozs7Ozs7Ozs7OztBQ3RKRDtBQUFlLHlFQUFDQyxNQUFELEVBQVNDLEdBQVQsRUFBYzdELE1BQWQsRUFBd0Q7QUFBQSxNQUFsQzhELFFBQWtDLHVFQUF2QixrQkFBdUI7QUFDckUsU0FBTyxJQUFJM0IsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVWlCLE1BQVYsRUFBcUI7QUFDdEMsUUFBSVUsT0FBTyxHQUFHLElBQUlDLGNBQUosRUFBZDtBQUVBRCxXQUFPLENBQUNFLElBQVIsQ0FBYUwsTUFBYixFQUFxQkMsR0FBckIsRUFBMEIsSUFBMUI7QUFFQUUsV0FBTyxDQUFDRyxnQkFBUixDQUF5QixjQUF6QixFQUF5QyxnQ0FBekM7O0FBRUEsUUFBSUosUUFBUSxJQUFJQyxPQUFPLENBQUNJLGdCQUF4QixFQUEwQztBQUN4Q0osYUFBTyxDQUFDSSxnQkFBUixDQUF5QkwsUUFBekI7QUFDRDs7QUFFREMsV0FBTyxDQUFDakIsZ0JBQVIsQ0FBeUIsTUFBekIsRUFBaUMsVUFBQ3NCLEdBQUQsRUFBUztBQUN4QyxVQUFNQyxNQUFNLEdBQUdELEdBQUcsQ0FBQ0MsTUFBbkI7QUFDQSxVQUFNQyxRQUFRLEdBQUc5RSxJQUFJLENBQUNDLEtBQUwsQ0FBVzRFLE1BQU0sQ0FBQ0UsWUFBbEIsQ0FBakI7QUFDQSxVQUFNQyxZQUFZLEdBQUdGLFFBQVEsQ0FBQ25CLE1BQVQsSUFBbUJZLE9BQU8sQ0FBQ1osTUFBaEQ7O0FBRUEsVUFBSXFCLFlBQVksSUFBSSxHQUFoQixJQUF1QkEsWUFBWSxHQUFHLEdBQTFDLEVBQStDO0FBQzdDcEMsZUFBTyxDQUFDa0MsUUFBUSxDQUFDckQsT0FBVCxJQUFvQnFELFFBQXJCLENBQVA7QUFDRCxPQUZELE1BRU87QUFDTGpCLGNBQU0sQ0FBQ2lCLFFBQVEsQ0FBQ3JELE9BQVQsSUFBb0JxRCxRQUFyQixDQUFOO0FBQ0Q7QUFDRixLQVZEO0FBWUEsUUFBTTlDLGFBQWEsR0FBR2hDLElBQUksQ0FBQzBDLFNBQUwsQ0FBZWxDLE1BQWYsQ0FBdEI7QUFDQStELFdBQU8sQ0FBQ1UsSUFBUixDQUFhakQsYUFBYjtBQUNELEdBekJNLENBQVA7QUEwQkQsQ0EzQkQsRTs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQU8sSUFBTWtELFdBQVcsR0FBRyxTQUFkQSxXQUFjLEdBQU07QUFDL0IsTUFBSUMsV0FBVyxHQUFHLElBQUlDLElBQUosRUFBbEI7QUFDQSxNQUFJQyxlQUFlLEdBQUdGLFdBQVcsQ0FBQ0csaUJBQVosRUFBdEI7QUFFQSxTQUFRRCxlQUFlLEdBQUcsRUFBbkIsR0FBeUIsQ0FBQyxDQUFqQztBQUNELENBTE07QUFPQSxJQUFNRSxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLEdBQU07QUFDdEMsTUFBTUMsSUFBSSxHQUFHLElBQUlKLElBQUosRUFBYjtBQUNBLE1BQUlLLENBQUMsR0FBRyxJQUFJTCxJQUFKLENBQVNJLElBQVQsQ0FBUjtBQUFBLE1BQ0VFLEtBQUssR0FBRyxNQUFNRCxDQUFDLENBQUNFLFFBQUYsS0FBZSxDQUFyQixDQURWO0FBQUEsTUFFRUMsR0FBRyxHQUFHLEtBQUtILENBQUMsQ0FBQ0ksT0FBRixFQUZiO0FBQUEsTUFHRUMsSUFBSSxHQUFHTCxDQUFDLENBQUNNLFdBQUYsRUFIVDtBQUFBLE1BSUVDLElBQUksR0FBR1AsQ0FBQyxDQUFDUSxRQUFGLEVBSlQ7QUFBQSxNQUtFQyxNQUFNLEdBQUdULENBQUMsQ0FBQ1UsVUFBRixFQUxYO0FBQUEsTUFNRUMsTUFBTSxHQUFHWCxDQUFDLENBQUNZLFVBQUYsRUFOWDs7QUFRQSxNQUFJWCxLQUFLLENBQUNZLE1BQU4sR0FBZSxDQUFuQixFQUFzQjtBQUNwQlosU0FBSyxHQUFHLE1BQU1BLEtBQWQ7QUFDRDs7QUFFRCxNQUFJRSxHQUFHLENBQUNVLE1BQUosR0FBYSxDQUFqQixFQUFvQjtBQUNsQlYsT0FBRyxHQUFHLE1BQU1BLEdBQVo7QUFDRCxHQWhCcUMsQ0FrQnRDO0FBQ0E7OztBQUNBTSxRQUFNLEdBQUdBLE1BQU0sR0FBRyxFQUFULEdBQWMsTUFBTUEsTUFBcEIsR0FBNkJBLE1BQXRDO0FBRUEsTUFBTW5DLE1BQU0sYUFBTSxDQUFDK0IsSUFBRCxFQUFPSixLQUFQLEVBQWNFLEdBQWQsRUFBbUJXLElBQW5CLENBQXdCLEdBQXhCLENBQU4sY0FBc0NQLElBQXRDLGNBQThDRSxNQUE5QyxjQUF3REUsTUFBeEQsQ0FBWjtBQUVBLFNBQU9yQyxNQUFQO0FBQ0QsQ0F6Qk0sQzs7Ozs7Ozs7Ozs7O0FDUlA7QUFBQTtBQUFBOzs7QUFJQSxJQUFNakQsRUFBRSxHQUFHQyxTQUFTLENBQUNDLFNBQXJCO0FBQ0EsSUFBTXdGLElBQUksR0FBR3pGLFNBQVMsQ0FBQzBGLFVBQXZCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHM0YsU0FBUyxDQUFDMkYsYUFBOUI7O0FBRUEsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBTTtBQUN0QixNQUFJMUYsRUFBRSxHQUFHLEdBQVQ7QUFDQSxNQUFJQyxTQUFTLEdBQUcsR0FBaEI7QUFFQSxNQUFNMEYsYUFBYSxHQUFHLENBQ3BCO0FBQUNDLEtBQUMsRUFBRSxZQUFKO0FBQWtCQyxLQUFDLEVBQUU7QUFBckIsR0FEb0IsRUFFcEI7QUFBQ0QsS0FBQyxFQUFFLGFBQUo7QUFBbUJDLEtBQUMsRUFBRTtBQUF0QixHQUZvQixFQUdwQjtBQUFDRCxLQUFDLEVBQUUsV0FBSjtBQUFpQkMsS0FBQyxFQUFFO0FBQXBCLEdBSG9CLEVBSXBCO0FBQUNELEtBQUMsRUFBRSxXQUFKO0FBQWlCQyxLQUFDLEVBQUU7QUFBcEIsR0FKb0IsRUFLcEI7QUFBQ0QsS0FBQyxFQUFFLGVBQUo7QUFBcUJDLEtBQUMsRUFBRTtBQUF4QixHQUxvQixFQU1wQjtBQUFDRCxLQUFDLEVBQUUscUJBQUo7QUFBMkJDLEtBQUMsRUFBRTtBQUE5QixHQU5vQixFQU9wQjtBQUFDRCxLQUFDLEVBQUUsWUFBSjtBQUFrQkMsS0FBQyxFQUFFO0FBQXJCLEdBUG9CLEVBUXBCO0FBQUNELEtBQUMsRUFBRSxjQUFKO0FBQW9CQyxLQUFDLEVBQUU7QUFBdkIsR0FSb0IsRUFTcEI7QUFBQ0QsS0FBQyxFQUFFLFlBQUo7QUFBa0JDLEtBQUMsRUFBRTtBQUFyQixHQVRvQixFQVVwQjtBQUFDRCxLQUFDLEVBQUUsWUFBSjtBQUFrQkMsS0FBQyxFQUFFO0FBQXJCLEdBVm9CLEVBV3BCO0FBQUNELEtBQUMsRUFBRSxZQUFKO0FBQWtCQyxLQUFDLEVBQUU7QUFBckIsR0FYb0IsRUFZcEI7QUFBQ0QsS0FBQyxFQUFFLGdCQUFKO0FBQXNCQyxLQUFDLEVBQUU7QUFBekIsR0Fab0IsRUFhcEI7QUFBQ0QsS0FBQyxFQUFFLFlBQUo7QUFBa0JDLEtBQUMsRUFBRTtBQUFyQixHQWJvQixFQWNwQjtBQUFDRCxLQUFDLEVBQUUsY0FBSjtBQUFvQkMsS0FBQyxFQUFFO0FBQXZCLEdBZG9CLEVBZXBCO0FBQUNELEtBQUMsRUFBRSxTQUFKO0FBQWVDLEtBQUMsRUFBRTtBQUFsQixHQWZvQixFQWdCcEI7QUFBQ0QsS0FBQyxFQUFFLFVBQUo7QUFBZ0JDLEtBQUMsRUFBRTtBQUFuQixHQWhCb0IsRUFpQnBCO0FBQUNELEtBQUMsRUFBRSxRQUFKO0FBQWNDLEtBQUMsRUFBRTtBQUFqQixHQWpCb0IsRUFrQnBCO0FBQUNELEtBQUMsRUFBRSxPQUFKO0FBQWFDLEtBQUMsRUFBRTtBQUFoQixHQWxCb0IsRUFtQnBCO0FBQUNELEtBQUMsRUFBRSxLQUFKO0FBQVdDLEtBQUMsRUFBRTtBQUFkLEdBbkJvQixFQW9CcEI7QUFBQ0QsS0FBQyxFQUFFLFVBQUo7QUFBZ0JDLEtBQUMsRUFBRTtBQUFuQixHQXBCb0IsRUFxQnBCO0FBQUNELEtBQUMsRUFBRSxRQUFKO0FBQWNDLEtBQUMsRUFBRTtBQUFqQixHQXJCb0IsRUFzQnBCO0FBQUNELEtBQUMsRUFBRSxLQUFKO0FBQVdDLEtBQUMsRUFBRTtBQUFkLEdBdEJvQixFQXVCcEI7QUFBQ0QsS0FBQyxFQUFFLE1BQUo7QUFBWUMsS0FBQyxFQUFFO0FBQWYsR0F2Qm9CLEVBd0JwQjtBQUFDRCxLQUFDLEVBQUUsTUFBSjtBQUFZQyxLQUFDLEVBQUU7QUFBZixHQXhCb0IsRUF5QnBCO0FBQUNELEtBQUMsRUFBRSxNQUFKO0FBQVlDLEtBQUMsRUFBRTtBQUFmLEdBekJvQixFQTBCcEI7QUFBQ0QsS0FBQyxFQUFFLFlBQUo7QUFBa0JDLEtBQUMsRUFBRTtBQUFyQixHQTFCb0IsQ0FBdEI7O0FBNkJBLE9BQUssSUFBSUMsRUFBVCxJQUFlSCxhQUFmLEVBQThCO0FBQzVCLFFBQUlJLEVBQUUsR0FBR0osYUFBYSxDQUFDRyxFQUFELENBQXRCOztBQUNBLFFBQUlDLEVBQUUsQ0FBQ0YsQ0FBSCxDQUFLRyxJQUFMLENBQVVuRyxFQUFWLENBQUosRUFBbUI7QUFDakJHLFFBQUUsR0FBRytGLEVBQUUsQ0FBQ0gsQ0FBUjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxNQUFJLFVBQVVJLElBQVYsQ0FBZWhHLEVBQWYsQ0FBSixFQUF3QjtBQUN0QkMsYUFBUyxHQUFHLGVBQWVnRyxJQUFmLENBQW9CakcsRUFBcEIsRUFBd0IsQ0FBeEIsQ0FBWjtBQUNBQSxNQUFFLEdBQUcsU0FBTDtBQUNEOztBQUVELFVBQVFBLEVBQVI7QUFDRSxTQUFLLFVBQUw7QUFDRUMsZUFBUyxHQUFHLHlCQUF5QmdHLElBQXpCLENBQThCcEcsRUFBOUIsSUFBb0MseUJBQXlCb0csSUFBekIsQ0FBOEJwRyxFQUE5QixFQUFrQyxDQUFsQyxDQUFwQyxHQUEyRSxJQUF2RjtBQUNBOztBQUVGLFNBQUssU0FBTDtBQUNFSSxlQUFTLEdBQUcsc0JBQXNCZ0csSUFBdEIsQ0FBMkJwRyxFQUEzQixFQUErQixDQUEvQixDQUFaO0FBQ0E7O0FBRUYsU0FBSyxLQUFMO0FBQ0VJLGVBQVMsR0FBRyx5QkFBeUJnRyxJQUF6QixDQUE4QlYsSUFBOUIsQ0FBWjtBQUNBdEYsZUFBUyxHQUFHQSxTQUFTLENBQUMsQ0FBRCxDQUFULEdBQWUsR0FBZixHQUFxQkEsU0FBUyxDQUFDLENBQUQsQ0FBOUIsR0FBb0MsR0FBcEMsSUFBMkNBLFNBQVMsQ0FBQyxDQUFELENBQVQsR0FBZSxDQUExRCxDQUFaO0FBQ0E7QUFaSjs7QUFlQSxTQUFPO0FBQ0xpRyxRQUFJLEVBQUVsRyxFQUREO0FBRUxFLFdBQU8sRUFBRUQ7QUFGSixHQUFQO0FBSUQsQ0FqRUQ7O0FBbUVBLElBQU1rRyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07QUFDM0IsTUFBSUMsWUFBWSxHQUFHQyxRQUFRLENBQUNkLElBQUQsRUFBTyxFQUFQLENBQTNCO0FBQ0EsTUFBSXBGLE9BQU8sR0FBR0wsU0FBUyxDQUFDd0csT0FBeEI7QUFDQSxNQUFJcEcsT0FBTyxHQUFHLEtBQUtxRyxVQUFVLENBQUN6RyxTQUFTLENBQUMwRixVQUFYLENBQTdCO0FBQ0EsTUFBSWdCLFVBQUosRUFBZ0JDLFNBQWhCLEVBQTJCQyxNQUEzQjs7QUFFQSxNQUFJLENBQUNELFNBQVMsR0FBRzVHLEVBQUUsQ0FBQzhHLE9BQUgsQ0FBVyxPQUFYLENBQWIsTUFBc0MsQ0FBQyxDQUEzQyxFQUE4QztBQUM1Q3hHLFdBQU8sR0FBRyxPQUFWO0FBQ0F1RyxVQUFNLEdBQUdELFNBQVMsR0FBRyxDQUFyQjtBQUNBdkcsV0FBTyxHQUFHTCxFQUFFLENBQUMrRyxTQUFILENBQWFGLE1BQWIsQ0FBVjs7QUFDQSxRQUFJLENBQUNELFNBQVMsR0FBRzVHLEVBQUUsQ0FBQzhHLE9BQUgsQ0FBVyxTQUFYLENBQWIsTUFBd0MsQ0FBQyxDQUE3QyxFQUFnRDtBQUM5Q0QsWUFBTSxHQUFHRCxTQUFTLEdBQUcsQ0FBckI7QUFDQXZHLGFBQU8sR0FBR0wsRUFBRSxDQUFDK0csU0FBSCxDQUFhRixNQUFiLENBQVY7QUFDRDtBQUNGLEdBUkQsTUFRTyxJQUFJLENBQUNELFNBQVMsR0FBRzVHLEVBQUUsQ0FBQzhHLE9BQUgsQ0FBVyxLQUFYLENBQWIsTUFBb0MsQ0FBQyxDQUF6QyxFQUE0QztBQUNqRHhHLFdBQU8sR0FBRyxPQUFWO0FBQ0F1RyxVQUFNLEdBQUdELFNBQVMsR0FBRyxDQUFyQjtBQUNBdkcsV0FBTyxHQUFHTCxFQUFFLENBQUMrRyxTQUFILENBQWFGLE1BQWIsQ0FBVjtBQUNELEdBSk0sTUFJQSxJQUFJLENBQUNELFNBQVMsR0FBRzVHLEVBQUUsQ0FBQzhHLE9BQUgsQ0FBVyxNQUFYLENBQWIsTUFBcUMsQ0FBQyxDQUExQyxFQUE2QztBQUNsRHhHLFdBQU8sR0FBRyxnQkFBVjtBQUNBdUcsVUFBTSxHQUFHRCxTQUFTLEdBQUcsQ0FBckI7QUFDQXZHLFdBQU8sR0FBR0wsRUFBRSxDQUFDK0csU0FBSCxDQUFhRixNQUFiLENBQVY7QUFDRCxHQUpNLE1BSUEsSUFBSSxDQUFDRCxTQUFTLEdBQUc1RyxFQUFFLENBQUM4RyxPQUFILENBQVcsTUFBWCxDQUFiLE1BQXFDLENBQUMsQ0FBMUMsRUFBNkM7QUFDbER4RyxXQUFPLEdBQUcsNkJBQVY7QUFDQUQsV0FBTyxHQUFHTCxFQUFFLENBQUMrRyxTQUFILENBQWFILFNBQVMsR0FBRyxDQUF6QixDQUFWO0FBQ0QsR0FITSxNQUdBLElBQUksQ0FBQ0EsU0FBUyxHQUFHNUcsRUFBRSxDQUFDOEcsT0FBSCxDQUFXLFFBQVgsQ0FBYixNQUF1QyxDQUFDLENBQTVDLEVBQStDO0FBQ3BEeEcsV0FBTyxHQUFHLFFBQVY7QUFDQXVHLFVBQU0sR0FBR0QsU0FBUyxHQUFHLENBQXJCO0FBQ0F2RyxXQUFPLEdBQUdMLEVBQUUsQ0FBQytHLFNBQUgsQ0FBYUYsTUFBYixDQUFWO0FBQ0QsR0FKTSxNQUlBLElBQUksQ0FBQ0QsU0FBUyxHQUFHNUcsRUFBRSxDQUFDOEcsT0FBSCxDQUFXLFFBQVgsQ0FBYixNQUF1QyxDQUFDLENBQTVDLEVBQStDO0FBQ3BEeEcsV0FBTyxHQUFHLFFBQVY7QUFDQXVHLFVBQU0sR0FBR0QsU0FBUyxHQUFHLENBQXJCO0FBQ0F2RyxXQUFPLEdBQUdMLEVBQUUsQ0FBQytHLFNBQUgsQ0FBYUYsTUFBYixDQUFWOztBQUNBLFFBQUksQ0FBQ0QsU0FBUyxHQUFHNUcsRUFBRSxDQUFDOEcsT0FBSCxDQUFXLFNBQVgsQ0FBYixNQUF3QyxDQUFDLENBQTdDLEVBQWdEO0FBQzlDRCxZQUFNLEdBQUdELFNBQVMsR0FBRyxDQUFyQjtBQUNBdkcsYUFBTyxHQUFHTCxFQUFFLENBQUMrRyxTQUFILENBQWFGLE1BQWIsQ0FBVjtBQUNEO0FBQ0YsR0FSTSxNQVFBLElBQUksQ0FBQ0QsU0FBUyxHQUFHNUcsRUFBRSxDQUFDOEcsT0FBSCxDQUFXLFNBQVgsQ0FBYixNQUF3QyxDQUFDLENBQTdDLEVBQWdEO0FBQ3JEeEcsV0FBTyxHQUFHLFNBQVY7QUFDQXVHLFVBQU0sR0FBR0QsU0FBUyxHQUFHLENBQXJCO0FBQ0F2RyxXQUFPLEdBQUdMLEVBQUUsQ0FBQytHLFNBQUgsQ0FBYUYsTUFBYixDQUFWO0FBQ0QsR0FKTSxNQUlBLElBQUk3RyxFQUFFLENBQUM4RyxPQUFILENBQVcsVUFBWCxNQUEyQixDQUFDLENBQWhDLEVBQW1DO0FBQ3hDeEcsV0FBTyxHQUFHLDZCQUFWO0FBQ0FELFdBQU8sR0FBR0wsRUFBRSxDQUFDK0csU0FBSCxDQUFhL0csRUFBRSxDQUFDOEcsT0FBSCxDQUFXLEtBQVgsSUFBb0IsQ0FBakMsQ0FBVjtBQUNELEdBSE0sTUFHQSxJQUFJLENBQUNILFVBQVUsR0FBRzNHLEVBQUUsQ0FBQ2dILFdBQUgsQ0FBZSxHQUFmLElBQXNCLENBQXBDLEtBQTBDSixTQUFTLEdBQUc1RyxFQUFFLENBQUNnSCxXQUFILENBQWUsR0FBZixDQUF0RCxDQUFKLEVBQWdGO0FBQ3JGMUcsV0FBTyxHQUFHTixFQUFFLENBQUMrRyxTQUFILENBQWFKLFVBQWIsRUFBeUJDLFNBQXpCLENBQVY7QUFDQXZHLFdBQU8sR0FBR0wsRUFBRSxDQUFDK0csU0FBSCxDQUFhSCxTQUFTLEdBQUcsQ0FBekIsQ0FBVjs7QUFDQSxRQUFJdEcsT0FBTyxDQUFDMkcsV0FBUixPQUEwQjNHLE9BQU8sQ0FBQzRHLFdBQVIsRUFBOUIsRUFBcUQ7QUFDbkQ1RyxhQUFPLEdBQUdMLFNBQVMsQ0FBQ3dHLE9BQXBCO0FBQ0Q7QUFDRjs7QUFFRHBHLFNBQU8sR0FBR0EsT0FBTyxDQUFDOEcsS0FBUixDQUFjLEdBQWQsQ0FBVjtBQUNBOUcsU0FBTyxHQUFHQSxPQUFPLENBQUMsQ0FBRCxDQUFqQjtBQUVBa0csY0FBWSxHQUFHQyxRQUFRLENBQUMsS0FBS25HLE9BQU4sRUFBZSxFQUFmLENBQXZCOztBQUNBLE1BQUkrRyxLQUFLLENBQUNiLFlBQUQsQ0FBVCxFQUF5QjtBQUN2QmxHLFdBQU8sR0FBRyxLQUFLcUcsVUFBVSxDQUFDaEIsSUFBRCxDQUF6QjtBQUNBYSxnQkFBWSxHQUFHQyxRQUFRLENBQUNkLElBQUQsRUFBTyxFQUFQLENBQXZCO0FBQ0Q7O0FBRUQsU0FBTztBQUNMVyxRQUFJLEVBQUUvRixPQUFPLElBQUksRUFEWjtBQUVMRCxXQUFPLEVBQUVBLE9BQU8sSUFBSSxFQUZmO0FBR0xrRyxnQkFBWSxFQUFFQSxZQUFZLElBQUk7QUFIekIsR0FBUDtBQUtELENBbEVEOztBQW9FQSxJQUFNYyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07QUFDMUIsTUFBSSxDQUFDQyxNQUFNLENBQUNDLEtBQVosRUFBbUI7QUFDakIsV0FBT0MsU0FBUDtBQUNEOztBQUVELE1BQU1ELEtBQUssR0FBSUQsTUFBTSxDQUFDQyxLQUFSLEdBQWlCRCxNQUFNLENBQUNDLEtBQXhCLEdBQWdDLEVBQTlDO0FBQ0EsTUFBTUUsTUFBTSxHQUFJSCxNQUFNLENBQUNHLE1BQVIsR0FBa0JILE1BQU0sQ0FBQ0csTUFBekIsR0FBa0MsRUFBakQ7QUFFQSxTQUFPLEtBQUtGLEtBQUwsR0FBYSxLQUFiLEdBQXFCRSxNQUE1QjtBQUNELENBVEQ7O0FBV0EsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0FBQzVCLE1BQUksT0FBT3pILFNBQVMsQ0FBQzJGLGFBQWpCLEtBQW1DLFdBQW5DLElBQWtELENBQUNBLGFBQXZELEVBQXNFO0FBQ3BFK0IsWUFBUSxDQUFDQyxNQUFULEdBQWtCLFlBQWxCO0FBQ0EsV0FBT0QsUUFBUSxDQUFDQyxNQUFULENBQWdCZCxPQUFoQixDQUF3QixZQUF4QixNQUEwQyxDQUFDLENBQWxEO0FBQ0Q7O0FBRUQsU0FBTyxLQUFQO0FBQ0QsQ0FQRDs7QUFTTyxTQUFTbEgsVUFBVCxHQUFzQjtBQUMzQixNQUFNTyxFQUFFLEdBQUcwRixTQUFTLEVBQXBCO0FBQ0EsTUFBTXZGLE9BQU8sR0FBR2dHLGNBQWMsRUFBOUI7QUFDQSxNQUFNdUIsVUFBVSxHQUFHUixhQUFhLEVBQWhDO0FBQ0EsTUFBTVMsTUFBTSxHQUFHLDRDQUE0QzNCLElBQTVDLENBQWlEVCxJQUFqRCxDQUFmO0FBRUEsU0FBTztBQUNMNEIsVUFBTSxFQUFFTyxVQURIO0FBRUx2SCxXQUFPLEVBQUVBLE9BQU8sQ0FBQytGLElBRlo7QUFHTDlGLGtCQUFjLEVBQUVELE9BQU8sQ0FBQ0QsT0FIbkI7QUFJTEcsdUJBQW1CLEVBQUVGLE9BQU8sQ0FBQ2lHLFlBSnhCO0FBS0x1QixVQUFNLEVBQUVBLE1BTEg7QUFNTDNILE1BQUUsRUFBRUEsRUFBRSxDQUFDa0csSUFORjtBQU9MakcsYUFBUyxFQUFFRCxFQUFFLENBQUNFLE9BUFQ7QUFRTDBILFdBQU8sRUFBRUw7QUFSSixHQUFQO0FBVUQsQyIsImZpbGUiOiJhc3RybnQtd2ViLWxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYXN0cm50LXdlYi1sb2dnZXJcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYXN0cm50LXdlYi1sb2dnZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXN0cm50LXdlYi1sb2dnZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgaHR0cEhhbmRsZXIgZnJvbSAndXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlcidcbmltcG9ydCB7IGRldmljZUluZm8gfSBmcm9tICd1dGlscy9uYXZpZ2F0b3ItaGVscGVyJ1xuaW1wb3J0ICogYXMgRGF0ZVV0aWxzIGZyb20gJ3V0aWxzL2RhdGUtdXRpbHMnXG5cbmNvbnN0IGxvZ0VudiA9ICdBU1RSTlRfTE9HX0VOVidcbmNvbnN0IGxvZ0Jhc2VJbmZvID0gJ0FTVFJOVF9CQVNFX0xPR19JTkZPJ1xuY29uc3QgbG9nSW5mb3MgPSAnQVNUUk5UX0xPR19JTkZPUydcbmNvbnN0IHN0b3JhZ2VLZXlzID0gW1xuICBsb2dFbnYsXG4gIGxvZ0Jhc2VJbmZvLFxuICBsb2dJbmZvc1xuXVxuXG5jb25zdCBnZXRFbnYgPSAoKSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0VudilcbiAgcmV0dXJuIGVudlxufVxuXG5jb25zdCBnZXRCYXNlSW5mbyA9ICgpID0+IHtcbiAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nQmFzZUluZm8pKVxuICByZXR1cm4gaW5mbyA/IGluZm8gOiB7fVxufVxuXG5jb25zdCBjb25zdHJ1Y3RVUkwgPSAoKSA9PiB7XG4gIGNvbnN0IGVudiA9IGdldEVudigpXG4gIGxldCBkb21haW5QcmVmaXhcbiAgdmFyIGJhc2VVUkwgPSBlbnZcbiAgY29uc29sZS5sb2coZW52KVxuICBzd2l0Y2ggKGVudikge1xuICAgIGNhc2UgJ2Rldic6XG4gICAgICBkb21haW5QcmVmaXggPSAnbG9nLWJldGEnXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3Byb2R1Y3Rpb24nOiBjYXNlICdsaXZlJzpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdsb2ctYXBwJ1xuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgZG9tYWluUHJlZml4ID0gJ2VudidcbiAgfVxuICBpZiAoZG9tYWluUHJlZml4KSB7XG4gICAgYmFzZVVSTCA9IGBodHRwczovLyR7ZG9tYWluUHJlZml4fS5hc3RybnQuY29gXG4gIH1cbiAgcmV0dXJuIGAke2Jhc2VVUkx9L2FwaS92Mi9jYW5kaWRhdGUvbG9nc2Bcbn1cblxuY29uc3QgY29uc3RydWN0SW50ZXJ2aWV3SW5mbyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgZGV2aWNlID0gZGV2aWNlSW5mbygpXG4gIGNvbnN0IHRpbWVab25lID0gRGF0ZVV0aWxzLmdldFRpbWV6b25lKClcbiAgY29uc3QgbG9nVGltZSA9IERhdGVVdGlscy5nZXRDdXJyZW50RGF0ZVRpbWUoKVxuICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgY29uc3Qgb3MgPSBgJHtkZXZpY2Uub3N9ICgke2RldmljZS5vc1ZlcnNpb259KWBcbiAgY29uc3QgdmVyc2lvbiA9IGAke2RldmljZS5icm93c2VyfSwgVmVyc2lvbiAke2RldmljZS5icm93c2VyVmVyc2lvbn0gKCR7ZGV2aWNlLmJyb3dzZXJNYWpvclZlcnNpb259KWBcblxuICBsZXQgcmVjb3JkZWRQYXJhbSA9IGdldEJhc2VJbmZvKClcbiAgcmVjb3JkZWRQYXJhbS5ldmVudCA9IHBhcmFtcy5ldmVudCB8fCAnJ1xuICByZWNvcmRlZFBhcmFtLm1lc3NhZ2UgPSBwYXJhbXMubWVzc2FnZSB8fCAnJ1xuICByZWNvcmRlZFBhcmFtLm9zID0gb3NcbiAgcmVjb3JkZWRQYXJhbS52ZXJzaW9uID0gdmVyc2lvblxuICByZWNvcmRlZFBhcmFtLmltZWkgPSB1YVxuICByZWNvcmRlZFBhcmFtLmxvZ190aW1lID0gbG9nVGltZVxuICByZWNvcmRlZFBhcmFtLnRpbWVfem9uZSA9IHRpbWVab25lXG5cbiAgcmV0dXJuIHJlY29yZGVkUGFyYW1cbn1cblxuY29uc3Qgc2VuZEV2ZW50ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBVUkwgPSBjb25zdHJ1Y3RVUkwoKVxuICBjb25zdCBsb2dJbmZvID0gY29uc3RydWN0SW50ZXJ2aWV3SW5mbyhwYXJhbXMpXG4gIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XG4gICAgbG9nczogWyBsb2dJbmZvIF1cbiAgfVxuXG4gIHJldHVybiBodHRwSGFuZGxlcignUE9TVCcsIFVSTCwgcmVxdWVzdFBhcmFtcylcbn1cblxuY29uc3Qgc3RvcmVFdmVudCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgbG9nSXRlbXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dJbmZvcylcblxuICBsZXQgc3RvcmVkTG9nc1xuICBpZiAoIWxvZ0l0ZW1zKSB7XG4gICAgc3RvcmVkTG9ncyA9IFtdXG4gIH0gZWxzZSB7XG4gICAgc3RvcmVkTG9ncyA9IEpTT04ucGFyc2UobG9nSXRlbXMpXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9nSW5mb3MpXG4gIH1cblxuICBjb25zdCBpbnRlcnZpZXdJbmZvID0gY29uc3RydWN0SW50ZXJ2aWV3SW5mbyhwYXJhbXMpXG4gIHN0b3JlZExvZ3MucHVzaChpbnRlcnZpZXdJbmZvKVxuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvZ0luZm9zLCBKU09OLnN0cmluZ2lmeShzdG9yZWRMb2dzKSlcblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGludGVydmlld0luZm8pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKGVudiwgcGFyYW1zLCBvbkVycm9yID0gKCkgPT4ge30sIG9uVW5oYW5kbGVkUmVqZWN0aW9uID0gKCkgPT4ge30pIHtcbiAgY29uc3QgYmFzZVBhcmFtID0ge1xuICAgICdpbnRlcnZpZXdDb2RlJzogcGFyYW1zLmludGVydmlld19jb2RlIHx8ICcnLFxuICAgICdjYW5kaWRhdGVfaWQnOiBwYXJhbXMuY2FuZGlkYXRlX2lkIHx8IDAsXG4gICAgJ2pvYl9pZCc6IHBhcmFtcy5qb2JfaWQgfHwgMCxcbiAgICAnY29tcGFueV9pZCc6IHBhcmFtcy5jb21wYW55X2lkIHx8IDBcbiAgfVxuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvZ0VudiwgZW52KVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dCYXNlSW5mbywgSlNPTi5zdHJpbmdpZnkoYmFzZVBhcmFtKSlcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyRXZ0KSA9PiB7XG4gICAgb25FcnJvcihlcnJFdnQuZXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VuaGFuZGxlZHJlamVjdGlvbicsIChlcnJFdnQpID0+IHtcbiAgICBvblVuaGFuZGxlZFJlamVjdGlvbihlcnJFdnQucmVhc29uKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkRXZlbnQocGFyYW1zKSB7XG4gIHN3aXRjaCAocGFyYW1zLnN0YXR1cykge1xuICAgIGNhc2UgJ29ubGluZSc6XG4gICAgICByZXR1cm4gc2VuZEV2ZW50KHBhcmFtcylcblxuICAgIGNhc2UgJ29mZmxpbmUnOlxuICAgICAgcmV0dXJuIHN0b3JlRXZlbnQocGFyYW1zKVxuICB9XG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnTm8gZXZlbnQgdG8gc2VuZCcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZW5kU2F2ZWRFdmVudHMoKSB7XG4gIGNvbnN0IGxvZ0l0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nSW5mb3MpXG4gIGlmICghbG9nSXRlbXMpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgfVxuXG4gIGNvbnN0IFVSTCA9IGNvbnN0cnVjdFVSTCgpXG4gIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XG4gICAgbG9nczogSlNPTi5wYXJzZShsb2dJdGVtcylcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaHR0cEhhbmRsZXIoJ1BPU1QnLCBVUkwsIHJlcXVlc3RQYXJhbXMpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2dJbmZvcylcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHJlamVjdChlcnJvcikpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICBzdG9yYWdlS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KVxuICB9KVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCAobWV0aG9kLCB1cmwsIHBhcmFtcywgbWltZVR5cGUgPSAnYXBwbGljYXRpb24vanNvbicpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIHRydWUpXG5cbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKVxuXG4gICAgaWYgKG1pbWVUeXBlICYmIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZSkge1xuICAgICAgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKG1pbWVUeXBlKVxuICAgIH1cblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KVxuICAgICAgY29uc3QgcmVzcG9uc2VDb2RlID0gcmVzcG9uc2Uuc3RhdHVzIHx8IHJlcXVlc3Quc3RhdHVzXG5cbiAgICAgIGlmIChyZXNwb25zZUNvZGUgPj0gMjAwICYmIHJlc3BvbnNlQ29kZSA8IDMwMCkge1xuICAgICAgICByZXNvbHZlKHJlc3BvbnNlLm1lc3NhZ2UgfHwgcmVzcG9uc2UpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QocmVzcG9uc2UubWVzc2FnZSB8fCByZXNwb25zZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdFBhcmFtcylcbiAgfSlcbn1cbiIsIlxuZXhwb3J0IGNvbnN0IGdldFRpbWV6b25lID0gKCkgPT4ge1xuICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpXG4gIHZhciBjdXJyZW50VGltZXpvbmUgPSBjdXJyZW50VGltZS5nZXRUaW1lem9uZU9mZnNldCgpXG5cbiAgcmV0dXJuIChjdXJyZW50VGltZXpvbmUgLyA2MCkgKiAtMVxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudERhdGVUaW1lID0gKCkgPT4ge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICBsZXQgZCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIG1vbnRoID0gJycgKyAoZC5nZXRNb250aCgpICsgMSksXG4gICAgZGF5ID0gJycgKyBkLmdldERhdGUoKSxcbiAgICB5ZWFyID0gZC5nZXRGdWxsWWVhcigpLFxuICAgIGhvdXIgPSBkLmdldEhvdXJzKCksXG4gICAgbWludXRlID0gZC5nZXRNaW51dGVzKCksXG4gICAgc2Vjb25kID0gZC5nZXRTZWNvbmRzKClcblxuICBpZiAobW9udGgubGVuZ3RoIDwgMikge1xuICAgIG1vbnRoID0gJzAnICsgbW9udGhcbiAgfVxuXG4gIGlmIChkYXkubGVuZ3RoIDwgMikge1xuICAgIGRheSA9ICcwJyArIGRheVxuICB9XG5cbiAgLy8gaG91ciA9IGhvdXIgJSAxMjtcbiAgLy8gaG91ciA9IGhvdXIgPyBob3VyIDogMTI7XG4gIG1pbnV0ZSA9IG1pbnV0ZSA8IDEwID8gJzAnICsgbWludXRlIDogbWludXRlO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGAke1t5ZWFyLCBtb250aCwgZGF5XS5qb2luKCctJyl9ICR7aG91cn06JHttaW51dGV9OiR7c2Vjb25kfWBcblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLyoqXG4gKiBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xODcwNjgxOC85OTM4NTM5XG4qL1xuXG5jb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbmNvbnN0IG5WZXIgPSBuYXZpZ2F0b3IuYXBwVmVyc2lvblxubGV0IGNvb2tpZUVuYWJsZWQgPSBuYXZpZ2F0b3IuY29va2llRW5hYmxlZFxuXG5jb25zdCBnZXRPU0luZm8gPSAoKSA9PiB7XG4gIGxldCBvcyA9ICctJ1xuICBsZXQgb3NWZXJzaW9uID0gJy0nXG5cbiAgY29uc3QgY2xpZW50U3RyaW5ncyA9IFtcbiAgICB7czogJ1dpbmRvd3MgMTAnLCByOiAvKFdpbmRvd3MgMTAuMHxXaW5kb3dzIE5UIDEwLjApL30sXG4gICAge3M6ICdXaW5kb3dzIDguMScsIHI6IC8oV2luZG93cyA4LjF8V2luZG93cyBOVCA2LjMpL30sXG4gICAge3M6ICdXaW5kb3dzIDgnLCByOiAvKFdpbmRvd3MgOHxXaW5kb3dzIE5UIDYuMikvfSxcbiAgICB7czogJ1dpbmRvd3MgNycsIHI6IC8oV2luZG93cyA3fFdpbmRvd3MgTlQgNi4xKS99LFxuICAgIHtzOiAnV2luZG93cyBWaXN0YScsIHI6IC9XaW5kb3dzIE5UIDYuMC99LFxuICAgIHtzOiAnV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6IC9XaW5kb3dzIE5UIDUuMi99LFxuICAgIHtzOiAnV2luZG93cyBYUCcsIHI6IC8oV2luZG93cyBOVCA1LjF8V2luZG93cyBYUCkvfSxcbiAgICB7czogJ1dpbmRvd3MgMjAwMCcsIHI6IC8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS99LFxuICAgIHtzOiAnV2luZG93cyBNRScsIHI6IC8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvfSxcbiAgICB7czogJ1dpbmRvd3MgOTgnLCByOiAvKFdpbmRvd3MgOTh8V2luOTgpL30sXG4gICAge3M6ICdXaW5kb3dzIDk1JywgcjogLyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpL30sXG4gICAge3M6ICdXaW5kb3dzIE5UIDQuMCcsIHI6IC8oV2luZG93cyBOVCA0LjB8V2luTlQ0LjB8V2luTlR8V2luZG93cyBOVCkvfSxcbiAgICB7czogJ1dpbmRvd3MgQ0UnLCByOiAvV2luZG93cyBDRS99LFxuICAgIHtzOiAnV2luZG93cyAzLjExJywgcjogL1dpbjE2L30sXG4gICAge3M6ICdBbmRyb2lkJywgcjogL0FuZHJvaWQvfSxcbiAgICB7czogJ09wZW4gQlNEJywgcjogL09wZW5CU0QvfSxcbiAgICB7czogJ1N1biBPUycsIHI6IC9TdW5PUy99LFxuICAgIHtzOiAnTGludXgnLCByOiAvKExpbnV4fFgxMSkvfSxcbiAgICB7czogJ2lPUycsIHI6IC8oaVBob25lfGlQYWR8aVBvZCkvfSxcbiAgICB7czogJ01hYyBPUyBYJywgcjogL01hYyBPUyBYL30sXG4gICAge3M6ICdNYWMgT1MnLCByOiAvKE1hY1BQQ3xNYWNJbnRlbHxNYWNfUG93ZXJQQ3xNYWNpbnRvc2gpL30sXG4gICAge3M6ICdRTlgnLCByOiAvUU5YL30sXG4gICAge3M6ICdVTklYJywgcjogL1VOSVgvfSxcbiAgICB7czogJ0JlT1MnLCByOiAvQmVPUy99LFxuICAgIHtzOiAnT1MvMicsIHI6IC9PU1xcLzIvfSxcbiAgICB7czogJ1NlYXJjaCBCb3QnLCByOiAvKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvfVxuICBdXG5cbiAgZm9yIChsZXQgaWQgaW4gY2xpZW50U3RyaW5ncykge1xuICAgIGxldCBjcyA9IGNsaWVudFN0cmluZ3NbaWRdXG4gICAgaWYgKGNzLnIudGVzdCh1YSkpIHtcbiAgICAgIG9zID0gY3Muc1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XG4gICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV1cbiAgICBvcyA9ICdXaW5kb3dzJ1xuICB9XG5cbiAgc3dpdGNoIChvcykge1xuICAgIGNhc2UgJ01hYyBPUyBYJzpcbiAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTBbXFwuXFxfXFxkXSspLy5leGVjKHVhKSA/IC9NYWMgT1MgWCAoMTBbXFwuXFxfXFxkXSspLy5leGVjKHVhKVsxXSA6ICcxMSdcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdBbmRyb2lkJzpcbiAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKHVhKVsxXVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ2lPUyc6XG4gICAgICBvc1ZlcnNpb24gPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuVmVyKVxuICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApXG4gICAgICBicmVha1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBvcyxcbiAgICB2ZXJzaW9uOiBvc1ZlcnNpb25cbiAgfVxufVxuXG5jb25zdCBnZXRCcm93c2VySW5mbyA9ICgpID0+IHtcbiAgbGV0IG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5WZXIsIDEwKVxuICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lXG4gIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKVxuICBsZXQgbmFtZU9mZnNldCwgdmVyT2Zmc2V0LCBvZmZTZXRcblxuICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09wZXJhJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgNlxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICAgIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignVmVyc2lvbicpKSAhPT0gLTEpIHtcbiAgICAgIG9mZlNldCA9IHZlck9mZnNldCArIDhcbiAgICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICAgIH1cbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignT1BSJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgNFxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdFZGdlJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEVkZ2UnXG4gICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgNVxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdNU0lFJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSlcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignQ2hyb21lJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnQ2hyb21lJ1xuICAgIG9mZlNldCA9IHZlck9mZnNldCArIDdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignU2FmYXJpJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnU2FmYXJpJ1xuICAgIG9mZlNldCA9IHZlck9mZnNldCArIDdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1ZlcnNpb24nKSkgIT09IC0xKSB7XG4gICAgICBvZmZTZXQgPSB2ZXJPZmZzZXQgKyA4XG4gICAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgICB9XG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdGaXJlZm94J1xuICAgIG9mZlNldCA9IHZlck9mZnNldCArIDhcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgfSBlbHNlIGlmICh1YS5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodWEuaW5kZXhPZigncnY6JykgKyAzKVxuICB9IGVsc2UgaWYgKChuYW1lT2Zmc2V0ID0gdWEubGFzdEluZGV4T2YoJyAnKSArIDEpIDwgKHZlck9mZnNldCA9IHVhLmxhc3RJbmRleE9mKCcvJykpKSB7XG4gICAgYnJvd3NlciA9IHVhLnN1YnN0cmluZyhuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQpXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKVxuICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT09IGJyb3dzZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lXG4gICAgfVxuICB9XG5cbiAgdmVyc2lvbiA9IHZlcnNpb24uc3BsaXQoJyAnKTtcbiAgdmVyc2lvbiA9IHZlcnNpb25bMF1cblxuICBtYWpvclZlcnNpb24gPSBwYXJzZUludCgnJyArIHZlcnNpb24sIDEwKVxuICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xuICAgIHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQoblZlcilcbiAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludChuVmVyLCAxMClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogYnJvd3NlciB8fCAnJyxcbiAgICB2ZXJzaW9uOiB2ZXJzaW9uIHx8ICcnLFxuICAgIG1ham9yVmVyc2lvbjogbWFqb3JWZXJzaW9uIHx8ICcnXG4gIH1cbn1cblxuY29uc3QgZ2V0U2NyZWVuU2l6ZSA9ICgpID0+IHtcbiAgaWYgKCFzY3JlZW4ud2lkdGgpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICBjb25zdCB3aWR0aCA9IChzY3JlZW4ud2lkdGgpID8gc2NyZWVuLndpZHRoIDogJydcbiAgY29uc3QgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gc2NyZWVuLmhlaWdodCA6ICcnXG5cbiAgcmV0dXJuICcnICsgd2lkdGggKyAnIHggJyArIGhlaWdodFxufVxuXG5jb25zdCBpc0Nvb2tpZUVuYWJsZWQgPSAoKSA9PiB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQgPT09ICd1bmRlZmluZWQnICYmICFjb29raWVFbmFibGVkKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0gJ3Rlc3Rjb29raWUnXG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCd0ZXN0Y29va2llJykgIT09IC0xXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldmljZUluZm8oKSB7XG4gIGNvbnN0IG9zID0gZ2V0T1NJbmZvKClcbiAgY29uc3QgYnJvd3NlciA9IGdldEJyb3dzZXJJbmZvKClcbiAgY29uc3Qgc2NyZWVuU2l6ZSA9IGdldFNjcmVlblNpemUoKVxuICBjb25zdCBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcilcblxuICByZXR1cm4ge1xuICAgIHNjcmVlbjogc2NyZWVuU2l6ZSxcbiAgICBicm93c2VyOiBicm93c2VyLm5hbWUsXG4gICAgYnJvd3NlclZlcnNpb246IGJyb3dzZXIudmVyc2lvbixcbiAgICBicm93c2VyTWFqb3JWZXJzaW9uOiBicm93c2VyLm1ham9yVmVyc2lvbixcbiAgICBtb2JpbGU6IG1vYmlsZSxcbiAgICBvczogb3MubmFtZSxcbiAgICBvc1ZlcnNpb246IG9zLnZlcnNpb24sXG4gICAgY29va2llczogaXNDb29raWVFbmFibGVkXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=