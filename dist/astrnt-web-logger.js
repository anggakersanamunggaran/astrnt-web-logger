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
    case 'beta':
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvdXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci8uL3NyYy91dGlscy9kYXRlLXV0aWxzLmpzIiwid2VicGFjazovL2FzdHJudC13ZWItbG9nZ2VyLy4vc3JjL3V0aWxzL25hdmlnYXRvci1oZWxwZXIuanMiXSwibmFtZXMiOlsibG9nRW52IiwibG9nQmFzZUluZm8iLCJsb2dJbmZvcyIsInN0b3JhZ2VLZXlzIiwiZ2V0RW52IiwiZW52IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldEJhc2VJbmZvIiwiaW5mbyIsIkpTT04iLCJwYXJzZSIsImNvbnN0cnVjdFVSTCIsImRvbWFpblByZWZpeCIsImJhc2VVUkwiLCJjb25zb2xlIiwibG9nIiwiY29uc3RydWN0SW50ZXJ2aWV3SW5mbyIsInBhcmFtcyIsImRldmljZSIsImRldmljZUluZm8iLCJ0aW1lWm9uZSIsIkRhdGVVdGlscyIsImxvZ1RpbWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm9zIiwib3NWZXJzaW9uIiwidmVyc2lvbiIsImJyb3dzZXIiLCJicm93c2VyVmVyc2lvbiIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJyZWNvcmRlZFBhcmFtIiwiZXZlbnQiLCJtZXNzYWdlIiwiaW1laSIsImxvZ190aW1lIiwidGltZV96b25lIiwic2VuZEV2ZW50IiwiVVJMIiwibG9nSW5mbyIsInJlcXVlc3RQYXJhbXMiLCJsb2dzIiwiaHR0cEhhbmRsZXIiLCJzdG9yZUV2ZW50IiwibG9nSXRlbXMiLCJzdG9yZWRMb2dzIiwicmVtb3ZlSXRlbSIsImludGVydmlld0luZm8iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaW5pdGlhbGl6ZSIsIm9uRXJyb3IiLCJvblVuaGFuZGxlZFJlamVjdGlvbiIsImJhc2VQYXJhbSIsImludGVydmlld19jb2RlIiwiY2FuZGlkYXRlX2lkIiwiam9iX2lkIiwiY29tcGFueV9pZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJFdnQiLCJlcnJvciIsInJlYXNvbiIsInJlY29yZEV2ZW50Iiwic3RhdHVzIiwic2VuZFNhdmVkRXZlbnRzIiwicmVqZWN0IiwidGhlbiIsInJlc3VsdCIsImNhdGNoIiwiY2xlYXJDYWNoZSIsImZvckVhY2giLCJrZXkiLCJtZXRob2QiLCJ1cmwiLCJtaW1lVHlwZSIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib3ZlcnJpZGVNaW1lVHlwZSIsImV2dCIsInRhcmdldCIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VDb2RlIiwic2VuZCIsImdldFRpbWV6b25lIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiY3VycmVudFRpbWV6b25lIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJnZXRDdXJyZW50RGF0ZVRpbWUiLCJkYXRlIiwiZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJsZW5ndGgiLCJqb2luIiwiblZlciIsImFwcFZlcnNpb24iLCJjb29raWVFbmFibGVkIiwiZ2V0T1NJbmZvIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiaWQiLCJjcyIsInRlc3QiLCJleGVjIiwibmFtZSIsImdldEJyb3dzZXJJbmZvIiwibWFqb3JWZXJzaW9uIiwicGFyc2VJbnQiLCJhcHBOYW1lIiwicGFyc2VGbG9hdCIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJvZmZTZXQiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIiwic3BsaXQiLCJpc05hTiIsImdldFNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsInVuZGVmaW5lZCIsImhlaWdodCIsImlzQ29va2llRW5hYmxlZCIsImRvY3VtZW50IiwiY29va2llIiwic2NyZWVuU2l6ZSIsIm1vYmlsZSIsImNvb2tpZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxN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O0FBV0EsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFNO0FBQzVCLE1BQUksT0FBT3pILFNBQVMsQ0FBQzJGLGFBQWpCLEtBQW1DLFdBQW5DLElBQWtELENBQUNBLGFBQXZELEVBQXNFO0FBQ3BFK0IsWUFBUSxDQUFDQyxNQUFULEdBQWtCLFlBQWxCO0FBQ0EsV0FBT0QsUUFBUSxDQUFDQyxNQUFULENBQWdCZCxPQUFoQixDQUF3QixZQUF4QixNQUEwQyxDQUFDLENBQWxEO0FBQ0Q7O0FBRUQsU0FBTyxLQUFQO0FBQ0QsQ0FQRDs7QUFTTyxTQUFTbEgsVUFBVCxHQUFzQjtBQUMzQixNQUFNTyxFQUFFLEdBQUcwRixTQUFTLEVBQXBCO0FBQ0EsTUFBTXZGLE9BQU8sR0FBR2dHLGNBQWMsRUFBOUI7QUFDQSxNQUFNdUIsVUFBVSxHQUFHUixhQUFhLEVBQWhDO0FBQ0EsTUFBTVMsTUFBTSxHQUFHLDRDQUE0QzNCLElBQTVDLENBQWlEVCxJQUFqRCxDQUFmO0FBRUEsU0FBTztBQUNMNEIsVUFBTSxFQUFFTyxVQURIO0FBRUx2SCxXQUFPLEVBQUVBLE9BQU8sQ0FBQytGLElBRlo7QUFHTDlGLGtCQUFjLEVBQUVELE9BQU8sQ0FBQ0QsT0FIbkI7QUFJTEcsdUJBQW1CLEVBQUVGLE9BQU8sQ0FBQ2lHLFlBSnhCO0FBS0x1QixVQUFNLEVBQUVBLE1BTEg7QUFNTDNILE1BQUUsRUFBRUEsRUFBRSxDQUFDa0csSUFORjtBQU9MakcsYUFBUyxFQUFFRCxFQUFFLENBQUNFLE9BUFQ7QUFRTDBILFdBQU8sRUFBRUw7QUFSSixHQUFQO0FBVUQsQyIsImZpbGUiOiJhc3RybnQtd2ViLWxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYXN0cm50LXdlYi1sb2dnZXJcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYXN0cm50LXdlYi1sb2dnZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXN0cm50LXdlYi1sb2dnZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgaHR0cEhhbmRsZXIgZnJvbSAndXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlcidcbmltcG9ydCB7IGRldmljZUluZm8gfSBmcm9tICd1dGlscy9uYXZpZ2F0b3ItaGVscGVyJ1xuaW1wb3J0ICogYXMgRGF0ZVV0aWxzIGZyb20gJ3V0aWxzL2RhdGUtdXRpbHMnXG5cbmNvbnN0IGxvZ0VudiA9ICdBU1RSTlRfTE9HX0VOVidcbmNvbnN0IGxvZ0Jhc2VJbmZvID0gJ0FTVFJOVF9CQVNFX0xPR19JTkZPJ1xuY29uc3QgbG9nSW5mb3MgPSAnQVNUUk5UX0xPR19JTkZPUydcbmNvbnN0IHN0b3JhZ2VLZXlzID0gW1xuICBsb2dFbnYsXG4gIGxvZ0Jhc2VJbmZvLFxuICBsb2dJbmZvc1xuXVxuXG5jb25zdCBnZXRFbnYgPSAoKSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0VudilcbiAgcmV0dXJuIGVudlxufVxuXG5jb25zdCBnZXRCYXNlSW5mbyA9ICgpID0+IHtcbiAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nQmFzZUluZm8pKVxuICByZXR1cm4gaW5mbyA/IGluZm8gOiB7fVxufVxuXG5jb25zdCBjb25zdHJ1Y3RVUkwgPSAoKSA9PiB7XG4gIGNvbnN0IGVudiA9IGdldEVudigpXG4gIGxldCBkb21haW5QcmVmaXhcbiAgdmFyIGJhc2VVUkwgPSBlbnZcbiAgY29uc29sZS5sb2coZW52KVxuICBzd2l0Y2ggKGVudikge1xuICAgIGNhc2UgJ2JldGEnOiBjYXNlICdkZXYnOlxuICAgICAgZG9tYWluUHJlZml4ID0gJ2xvZy1iZXRhJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdwcm9kdWN0aW9uJzogY2FzZSAnbGl2ZSc6XG4gICAgICBkb21haW5QcmVmaXggPSAnbG9nLWFwcCdcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdlbnYnXG4gIH1cbiAgaWYgKGRvbWFpblByZWZpeCkge1xuICAgIGJhc2VVUkwgPSBgaHR0cHM6Ly8ke2RvbWFpblByZWZpeH0uYXN0cm50LmNvYFxuICB9XG4gIHJldHVybiBgJHtiYXNlVVJMfS9hcGkvdjIvY2FuZGlkYXRlL2xvZ3NgXG59XG5cbmNvbnN0IGNvbnN0cnVjdEludGVydmlld0luZm8gPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGRldmljZSA9IGRldmljZUluZm8oKVxuICBjb25zdCB0aW1lWm9uZSA9IERhdGVVdGlscy5nZXRUaW1lem9uZSgpXG4gIGNvbnN0IGxvZ1RpbWUgPSBEYXRlVXRpbHMuZ2V0Q3VycmVudERhdGVUaW1lKClcbiAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG4gIGNvbnN0IG9zID0gYCR7ZGV2aWNlLm9zfSAoJHtkZXZpY2Uub3NWZXJzaW9ufSlgXG4gIGNvbnN0IHZlcnNpb24gPSBgJHtkZXZpY2UuYnJvd3Nlcn0sIFZlcnNpb24gJHtkZXZpY2UuYnJvd3NlclZlcnNpb259ICgke2RldmljZS5icm93c2VyTWFqb3JWZXJzaW9ufSlgXG5cbiAgbGV0IHJlY29yZGVkUGFyYW0gPSBnZXRCYXNlSW5mbygpXG4gIHJlY29yZGVkUGFyYW0uZXZlbnQgPSBwYXJhbXMuZXZlbnQgfHwgJydcbiAgcmVjb3JkZWRQYXJhbS5tZXNzYWdlID0gcGFyYW1zLm1lc3NhZ2UgfHwgJydcbiAgcmVjb3JkZWRQYXJhbS5vcyA9IG9zXG4gIHJlY29yZGVkUGFyYW0udmVyc2lvbiA9IHZlcnNpb25cbiAgcmVjb3JkZWRQYXJhbS5pbWVpID0gdWFcbiAgcmVjb3JkZWRQYXJhbS5sb2dfdGltZSA9IGxvZ1RpbWVcbiAgcmVjb3JkZWRQYXJhbS50aW1lX3pvbmUgPSB0aW1lWm9uZVxuXG4gIHJldHVybiByZWNvcmRlZFBhcmFtXG59XG5cbmNvbnN0IHNlbmRFdmVudCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgVVJMID0gY29uc3RydWN0VVJMKClcbiAgY29uc3QgbG9nSW5mbyA9IGNvbnN0cnVjdEludGVydmlld0luZm8ocGFyYW1zKVxuICBjb25zdCByZXF1ZXN0UGFyYW1zID0ge1xuICAgIGxvZ3M6IFsgbG9nSW5mbyBdXG4gIH1cblxuICByZXR1cm4gaHR0cEhhbmRsZXIoJ1BPU1QnLCBVUkwsIHJlcXVlc3RQYXJhbXMpXG59XG5cbmNvbnN0IHN0b3JlRXZlbnQgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGxvZ0l0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nSW5mb3MpXG5cbiAgbGV0IHN0b3JlZExvZ3NcbiAgaWYgKCFsb2dJdGVtcykge1xuICAgIHN0b3JlZExvZ3MgPSBbXVxuICB9IGVsc2Uge1xuICAgIHN0b3JlZExvZ3MgPSBKU09OLnBhcnNlKGxvZ0l0ZW1zKVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvZ0luZm9zKVxuICB9XG5cbiAgY29uc3QgaW50ZXJ2aWV3SW5mbyA9IGNvbnN0cnVjdEludGVydmlld0luZm8ocGFyYW1zKVxuICBzdG9yZWRMb2dzLnB1c2goaW50ZXJ2aWV3SW5mbylcblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dJbmZvcywgSlNPTi5zdHJpbmdpZnkoc3RvcmVkTG9ncykpXG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbnRlcnZpZXdJbmZvKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZShlbnYsIHBhcmFtcywgb25FcnJvciA9ICgpID0+IHt9LCBvblVuaGFuZGxlZFJlamVjdGlvbiA9ICgpID0+IHt9KSB7XG4gIGNvbnN0IGJhc2VQYXJhbSA9IHtcbiAgICAnaW50ZXJ2aWV3Q29kZSc6IHBhcmFtcy5pbnRlcnZpZXdfY29kZSB8fCAnJyxcbiAgICAnY2FuZGlkYXRlX2lkJzogcGFyYW1zLmNhbmRpZGF0ZV9pZCB8fCAwLFxuICAgICdqb2JfaWQnOiBwYXJhbXMuam9iX2lkIHx8IDAsXG4gICAgJ2NvbXBhbnlfaWQnOiBwYXJhbXMuY29tcGFueV9pZCB8fCAwXG4gIH1cblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dFbnYsIGVudilcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9nQmFzZUluZm8sIEpTT04uc3RyaW5naWZ5KGJhc2VQYXJhbSkpXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGVyckV2dCkgPT4ge1xuICAgIG9uRXJyb3IoZXJyRXZ0LmVycm9yKVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCAoZXJyRXZ0KSA9PiB7XG4gICAgb25VbmhhbmRsZWRSZWplY3Rpb24oZXJyRXZ0LnJlYXNvbilcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY29yZEV2ZW50KHBhcmFtcykge1xuICBzd2l0Y2ggKHBhcmFtcy5zdGF0dXMpIHtcbiAgICBjYXNlICdvbmxpbmUnOlxuICAgICAgcmV0dXJuIHNlbmRFdmVudChwYXJhbXMpXG5cbiAgICBjYXNlICdvZmZsaW5lJzpcbiAgICAgIHJldHVybiBzdG9yZUV2ZW50KHBhcmFtcylcbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ05vIGV2ZW50IHRvIHNlbmQnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VuZFNhdmVkRXZlbnRzKCkge1xuICBjb25zdCBsb2dJdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0luZm9zKVxuICBpZiAoIWxvZ0l0ZW1zKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gIH1cblxuICBjb25zdCBVUkwgPSBjb25zdHJ1Y3RVUkwoKVxuICBjb25zdCByZXF1ZXN0UGFyYW1zID0ge1xuICAgIGxvZ3M6IEpTT04ucGFyc2UobG9nSXRlbXMpXG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGh0dHBIYW5kbGVyKCdQT1NUJywgVVJMLCByZXF1ZXN0UGFyYW1zKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9nSW5mb3MpXG4gICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IpKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgc3RvcmFnZUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSlcbiAgfSlcbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgKG1ldGhvZCwgdXJsLCBwYXJhbXMsIG1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKVxuXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JylcblxuICAgIGlmIChtaW1lVHlwZSAmJiByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUpIHtcbiAgICAgIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZShtaW1lVHlwZSlcbiAgICB9XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dClcbiAgICAgIGNvbnN0IHJlc3BvbnNlQ29kZSA9IHJlc3BvbnNlLnN0YXR1cyB8fCByZXF1ZXN0LnN0YXR1c1xuXG4gICAgICBpZiAocmVzcG9uc2VDb2RlID49IDIwMCAmJiByZXNwb25zZUNvZGUgPCAzMDApIHtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHJlc3BvbnNlLm1lc3NhZ2UgfHwgcmVzcG9uc2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3RQYXJhbXMpXG4gIH0pXG59XG4iLCJcbmV4cG9ydCBjb25zdCBnZXRUaW1lem9uZSA9ICgpID0+IHtcbiAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKVxuICB2YXIgY3VycmVudFRpbWV6b25lID0gY3VycmVudFRpbWUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuXG4gIHJldHVybiAoY3VycmVudFRpbWV6b25lIC8gNjApICogLTFcbn1cblxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnREYXRlVGltZSA9ICgpID0+IHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgbGV0IGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBtb250aCA9ICcnICsgKGQuZ2V0TW9udGgoKSArIDEpLFxuICAgIGRheSA9ICcnICsgZC5nZXREYXRlKCksXG4gICAgeWVhciA9IGQuZ2V0RnVsbFllYXIoKSxcbiAgICBob3VyID0gZC5nZXRIb3VycygpLFxuICAgIG1pbnV0ZSA9IGQuZ2V0TWludXRlcygpLFxuICAgIHNlY29uZCA9IGQuZ2V0U2Vjb25kcygpXG5cbiAgaWYgKG1vbnRoLmxlbmd0aCA8IDIpIHtcbiAgICBtb250aCA9ICcwJyArIG1vbnRoXG4gIH1cblxuICBpZiAoZGF5Lmxlbmd0aCA8IDIpIHtcbiAgICBkYXkgPSAnMCcgKyBkYXlcbiAgfVxuXG4gIC8vIGhvdXIgPSBob3VyICUgMTI7XG4gIC8vIGhvdXIgPSBob3VyID8gaG91ciA6IDEyO1xuICBtaW51dGUgPSBtaW51dGUgPCAxMCA/ICcwJyArIG1pbnV0ZSA6IG1pbnV0ZTtcblxuICBjb25zdCByZXN1bHQgPSBgJHtbeWVhciwgbW9udGgsIGRheV0uam9pbignLScpfSAke2hvdXJ9OiR7bWludXRlfToke3NlY29uZH1gXG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8qKlxuICogc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTg3MDY4MTgvOTkzODUzOVxuKi9cblxuY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG5jb25zdCBuVmVyID0gbmF2aWdhdG9yLmFwcFZlcnNpb25cbmxldCBjb29raWVFbmFibGVkID0gbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWRcblxuY29uc3QgZ2V0T1NJbmZvID0gKCkgPT4ge1xuICBsZXQgb3MgPSAnLSdcbiAgbGV0IG9zVmVyc2lvbiA9ICctJ1xuXG4gIGNvbnN0IGNsaWVudFN0cmluZ3MgPSBbXG4gICAge3M6ICdXaW5kb3dzIDEwJywgcjogLyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS99LFxuICAgIHtzOiAnV2luZG93cyA4LjEnLCByOiAvKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS99LFxuICAgIHtzOiAnV2luZG93cyA4JywgcjogLyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpL30sXG4gICAge3M6ICdXaW5kb3dzIDcnLCByOiAvKFdpbmRvd3MgN3xXaW5kb3dzIE5UIDYuMSkvfSxcbiAgICB7czogJ1dpbmRvd3MgVmlzdGEnLCByOiAvV2luZG93cyBOVCA2LjAvfSxcbiAgICB7czogJ1dpbmRvd3MgU2VydmVyIDIwMDMnLCByOiAvV2luZG93cyBOVCA1LjIvfSxcbiAgICB7czogJ1dpbmRvd3MgWFAnLCByOiAvKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApL30sXG4gICAge3M6ICdXaW5kb3dzIDIwMDAnLCByOiAvKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvfSxcbiAgICB7czogJ1dpbmRvd3MgTUUnLCByOiAvKFdpbiA5eCA0LjkwfFdpbmRvd3MgTUUpL30sXG4gICAge3M6ICdXaW5kb3dzIDk4JywgcjogLyhXaW5kb3dzIDk4fFdpbjk4KS99LFxuICAgIHtzOiAnV2luZG93cyA5NScsIHI6IC8oV2luZG93cyA5NXxXaW45NXxXaW5kb3dzXzk1KS99LFxuICAgIHtzOiAnV2luZG93cyBOVCA0LjAnLCByOiAvKFdpbmRvd3MgTlQgNC4wfFdpbk5UNC4wfFdpbk5UfFdpbmRvd3MgTlQpL30sXG4gICAge3M6ICdXaW5kb3dzIENFJywgcjogL1dpbmRvd3MgQ0UvfSxcbiAgICB7czogJ1dpbmRvd3MgMy4xMScsIHI6IC9XaW4xNi99LFxuICAgIHtzOiAnQW5kcm9pZCcsIHI6IC9BbmRyb2lkL30sXG4gICAge3M6ICdPcGVuIEJTRCcsIHI6IC9PcGVuQlNEL30sXG4gICAge3M6ICdTdW4gT1MnLCByOiAvU3VuT1MvfSxcbiAgICB7czogJ0xpbnV4JywgcjogLyhMaW51eHxYMTEpL30sXG4gICAge3M6ICdpT1MnLCByOiAvKGlQaG9uZXxpUGFkfGlQb2QpL30sXG4gICAge3M6ICdNYWMgT1MgWCcsIHI6IC9NYWMgT1MgWC99LFxuICAgIHtzOiAnTWFjIE9TJywgcjogLyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS99LFxuICAgIHtzOiAnUU5YJywgcjogL1FOWC99LFxuICAgIHtzOiAnVU5JWCcsIHI6IC9VTklYL30sXG4gICAge3M6ICdCZU9TJywgcjogL0JlT1MvfSxcbiAgICB7czogJ09TLzInLCByOiAvT1NcXC8yL30sXG4gICAge3M6ICdTZWFyY2ggQm90JywgcjogLyhudWhrfEdvb2dsZWJvdHxZYW1teWJvdHxPcGVuYm90fFNsdXJwfE1TTkJvdHxBc2sgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpL31cbiAgXVxuXG4gIGZvciAobGV0IGlkIGluIGNsaWVudFN0cmluZ3MpIHtcbiAgICBsZXQgY3MgPSBjbGllbnRTdHJpbmdzW2lkXVxuICAgIGlmIChjcy5yLnRlc3QodWEpKSB7XG4gICAgICBvcyA9IGNzLnNcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKC9XaW5kb3dzLy50ZXN0KG9zKSkge1xuICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdXG4gICAgb3MgPSAnV2luZG93cydcbiAgfVxuXG4gIHN3aXRjaCAob3MpIHtcbiAgICBjYXNlICdNYWMgT1MgWCc6XG4gICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwW1xcLlxcX1xcZF0rKS8uZXhlYyh1YSkgPyAvTWFjIE9TIFggKDEwW1xcLlxcX1xcZF0rKS8uZXhlYyh1YSlbMV0gOiAnMTEnXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnQW5kcm9pZCc6XG4gICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyh1YSlbMV1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdpT1MnOlxuICAgICAgb3NWZXJzaW9uID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMoblZlcilcbiAgICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvblsxXSArICcuJyArIG9zVmVyc2lvblsyXSArICcuJyArIChvc1ZlcnNpb25bM10gfCAwKVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogb3MsXG4gICAgdmVyc2lvbjogb3NWZXJzaW9uXG4gIH1cbn1cblxuY29uc3QgZ2V0QnJvd3NlckluZm8gPSAoKSA9PiB7XG4gIGxldCBtYWpvclZlcnNpb24gPSBwYXJzZUludChuVmVyLCAxMClcbiAgbGV0IGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZVxuICBsZXQgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbilcbiAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgb2ZmU2V0XG5cbiAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdPcGVyYScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ09wZXJhJ1xuICAgIG9mZlNldCA9IHZlck9mZnNldCArIDZcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1ZlcnNpb24nKSkgIT09IC0xKSB7XG4gICAgICBvZmZTZXQgPSB2ZXJPZmZzZXQgKyA4XG4gICAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgICB9XG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09QUicpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ09wZXJhJ1xuICAgIG9mZlNldCA9IHZlck9mZnNldCArIDRcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRWRnZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJ1xuICAgIG9mZlNldCA9IHZlck9mZnNldCArIDVcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignTVNJRScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcidcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDUpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0Nocm9tZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0Nocm9tZSdcbiAgICBvZmZTZXQgPSB2ZXJPZmZzZXQgKyA3XG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyhvZmZTZXQpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1NhZmFyaScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ1NhZmFyaSdcbiAgICBvZmZTZXQgPSB2ZXJPZmZzZXQgKyA3XG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyhvZmZTZXQpXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdWZXJzaW9uJykpICE9PSAtMSkge1xuICAgICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgOFxuICAgICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyhvZmZTZXQpXG4gICAgfVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdGaXJlZm94JykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnRmlyZWZveCdcbiAgICBvZmZTZXQgPSB2ZXJPZmZzZXQgKyA4XG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyhvZmZTZXQpXG4gIH0gZWxzZSBpZiAodWEuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcidcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHVhLmluZGV4T2YoJ3J2OicpICsgMylcbiAgfSBlbHNlIGlmICgobmFtZU9mZnNldCA9IHVhLmxhc3RJbmRleE9mKCcgJykgKyAxKSA8ICh2ZXJPZmZzZXQgPSB1YS5sYXN0SW5kZXhPZignLycpKSkge1xuICAgIGJyb3dzZXIgPSB1YS5zdWJzdHJpbmcobmFtZU9mZnNldCwgdmVyT2Zmc2V0KVxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSlcbiAgICBpZiAoYnJvd3Nlci50b0xvd2VyQ2FzZSgpID09PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZVxuICAgIH1cbiAgfVxuXG4gIHZlcnNpb24gPSB2ZXJzaW9uLnNwbGl0KCcgJyk7XG4gIHZlcnNpb24gPSB2ZXJzaW9uWzBdXG5cbiAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoJycgKyB2ZXJzaW9uLCAxMClcbiAgaWYgKGlzTmFOKG1ham9yVmVyc2lvbikpIHtcbiAgICB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5WZXIpXG4gICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoblZlciwgMTApXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IGJyb3dzZXIgfHwgJycsXG4gICAgdmVyc2lvbjogdmVyc2lvbiB8fCAnJyxcbiAgICBtYWpvclZlcnNpb246IG1ham9yVmVyc2lvbiB8fCAnJ1xuICB9XG59XG5cbmNvbnN0IGdldFNjcmVlblNpemUgPSAoKSA9PiB7XG4gIGlmICghc2NyZWVuLndpZHRoKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgY29uc3Qgd2lkdGggPSAoc2NyZWVuLndpZHRoKSA/IHNjcmVlbi53aWR0aCA6ICcnXG4gIGNvbnN0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHNjcmVlbi5oZWlnaHQgOiAnJ1xuXG4gIHJldHVybiAnJyArIHdpZHRoICsgJyB4ICcgKyBoZWlnaHRcbn1cblxuY29uc3QgaXNDb29raWVFbmFibGVkID0gKCkgPT4ge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvci5jb29raWVFbmFibGVkID09PSAndW5kZWZpbmVkJyAmJiAhY29va2llRW5hYmxlZCkge1xuICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJ1xuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUuaW5kZXhPZigndGVzdGNvb2tpZScpICE9PSAtMVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZpY2VJbmZvKCkge1xuICBjb25zdCBvcyA9IGdldE9TSW5mbygpXG4gIGNvbnN0IGJyb3dzZXIgPSBnZXRCcm93c2VySW5mbygpXG4gIGNvbnN0IHNjcmVlblNpemUgPSBnZXRTY3JlZW5TaXplKClcbiAgY29uc3QgbW9iaWxlID0gL01vYmlsZXxtaW5pfEZlbm5lY3xBbmRyb2lkfGlQKGFkfG9kfGhvbmUpLy50ZXN0KG5WZXIpXG5cbiAgcmV0dXJuIHtcbiAgICBzY3JlZW46IHNjcmVlblNpemUsXG4gICAgYnJvd3NlcjogYnJvd3Nlci5uYW1lLFxuICAgIGJyb3dzZXJWZXJzaW9uOiBicm93c2VyLnZlcnNpb24sXG4gICAgYnJvd3Nlck1ham9yVmVyc2lvbjogYnJvd3Nlci5tYWpvclZlcnNpb24sXG4gICAgbW9iaWxlOiBtb2JpbGUsXG4gICAgb3M6IG9zLm5hbWUsXG4gICAgb3NWZXJzaW9uOiBvcy52ZXJzaW9uLFxuICAgIGNvb2tpZXM6IGlzQ29va2llRW5hYmxlZFxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9