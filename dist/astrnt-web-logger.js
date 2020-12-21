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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvdXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci8uL3NyYy91dGlscy9kYXRlLXV0aWxzLmpzIiwid2VicGFjazovL2FzdHJudC13ZWItbG9nZ2VyLy4vc3JjL3V0aWxzL25hdmlnYXRvci1oZWxwZXIuanMiXSwibmFtZXMiOlsibG9nRW52IiwibG9nQmFzZUluZm8iLCJsb2dJbmZvcyIsInN0b3JhZ2VLZXlzIiwiZ2V0RW52IiwiZW52IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldEJhc2VJbmZvIiwiaW5mbyIsIkpTT04iLCJwYXJzZSIsImNvbnN0cnVjdFVSTCIsImRvbWFpblByZWZpeCIsImJhc2VVUkwiLCJjb25zb2xlIiwibG9nIiwiY29uc3RydWN0SW50ZXJ2aWV3SW5mbyIsInBhcmFtcyIsImRldmljZSIsImRldmljZUluZm8iLCJ0aW1lWm9uZSIsIkRhdGVVdGlscyIsImxvZ1RpbWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm9zIiwib3NWZXJzaW9uIiwidmVyc2lvbiIsImJyb3dzZXIiLCJicm93c2VyVmVyc2lvbiIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJyZWNvcmRlZFBhcmFtIiwiZXZlbnQiLCJtZXNzYWdlIiwiaW1laSIsImxvZ190aW1lIiwidGltZV96b25lIiwic2VuZEV2ZW50IiwiVVJMIiwibG9nSW5mbyIsInJlcXVlc3RQYXJhbXMiLCJsb2dzIiwiaHR0cEhhbmRsZXIiLCJzdG9yZUV2ZW50IiwibG9nSXRlbXMiLCJzdG9yZWRMb2dzIiwicmVtb3ZlSXRlbSIsImludGVydmlld0luZm8iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaW5pdGlhbGl6ZSIsIm9uRXJyb3IiLCJvblVuaGFuZGxlZFJlamVjdGlvbiIsImJhc2VQYXJhbSIsImludGVydmlld19jb2RlIiwiY2FuZGlkYXRlX2lkIiwiam9iX2lkIiwiY29tcGFueV9pZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJFdnQiLCJlcnJvciIsInJlYXNvbiIsInJlY29yZEV2ZW50Iiwic3RhdHVzIiwic2VuZFNhdmVkRXZlbnRzIiwicmVqZWN0IiwidGhlbiIsInJlc3VsdCIsImNhdGNoIiwiY2xlYXJDYWNoZSIsImZvckVhY2giLCJrZXkiLCJtZXRob2QiLCJ1cmwiLCJtaW1lVHlwZSIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib3ZlcnJpZGVNaW1lVHlwZSIsImV2dCIsInRhcmdldCIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VDb2RlIiwic2VuZCIsImdldFRpbWV6b25lIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiY3VycmVudFRpbWV6b25lIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJnZXRDdXJyZW50RGF0ZVRpbWUiLCJkYXRlIiwiZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJsZW5ndGgiLCJqb2luIiwiblZlciIsImFwcFZlcnNpb24iLCJjb29raWVFbmFibGVkIiwiZ2V0T1NJbmZvIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiaWQiLCJjcyIsInRlc3QiLCJleGVjIiwibmFtZSIsImdldEJyb3dzZXJJbmZvIiwibWFqb3JWZXJzaW9uIiwicGFyc2VJbnQiLCJhcHBOYW1lIiwicGFyc2VGbG9hdCIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJvZmZTZXQiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIiwic3BsaXQiLCJpc05hTiIsImdldFNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsInVuZGVmaW5lZCIsImhlaWdodCIsImlzQ29va2llRW5hYmxlZCIsImRvY3VtZW50IiwiY29va2llIiwic2NyZWVuU2l6ZSIsIm1vYmlsZSIsImNvb2tpZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxN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LGVBQWtCLEdBQU07QUFDNUIsTUFBSSxPQUFPekgsU0FBUyxDQUFDMkYsYUFBakIsS0FBbUMsV0FBbkMsSUFBa0QsQ0FBQ0EsYUFBdkQsRUFBc0U7QUFDcEUrQixZQUFRLENBQUNDLE1BQVQsR0FBa0IsWUFBbEI7QUFDQSxXQUFPRCxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JkLE9BQWhCLENBQXdCLFlBQXhCLE1BQTBDLENBQUMsQ0FBbEQ7QUFDRDs7QUFFRCxTQUFPLEtBQVA7QUFDRCxDQVBEOztBQVNPLFNBQVNsSCxVQUFULEdBQXNCO0FBQzNCLE1BQU1PLEVBQUUsR0FBRzBGLFNBQVMsRUFBcEI7QUFDQSxNQUFNdkYsT0FBTyxHQUFHZ0csY0FBYyxFQUE5QjtBQUNBLE1BQU11QixVQUFVLEdBQUdSLGFBQWEsRUFBaEM7QUFDQSxNQUFNUyxNQUFNLEdBQUcsNENBQTRDM0IsSUFBNUMsQ0FBaURULElBQWpELENBQWY7QUFFQSxTQUFPO0FBQ0w0QixVQUFNLEVBQUVPLFVBREg7QUFFTHZILFdBQU8sRUFBRUEsT0FBTyxDQUFDK0YsSUFGWjtBQUdMOUYsa0JBQWMsRUFBRUQsT0FBTyxDQUFDRCxPQUhuQjtBQUlMRyx1QkFBbUIsRUFBRUYsT0FBTyxDQUFDaUcsWUFKeEI7QUFLTHVCLFVBQU0sRUFBRUEsTUFMSDtBQU1MM0gsTUFBRSxFQUFFQSxFQUFFLENBQUNrRyxJQU5GO0FBT0xqRyxhQUFTLEVBQUVELEVBQUUsQ0FBQ0UsT0FQVDtBQVFMMEgsV0FBTyxFQUFFTDtBQVJKLEdBQVA7QUFVRCxDIiwiZmlsZSI6ImFzdHJudC13ZWItbG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJhc3RybnQtd2ViLWxvZ2dlclwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhc3RybnQtd2ViLWxvZ2dlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhc3RybnQtd2ViLWxvZ2dlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBodHRwSGFuZGxlciBmcm9tICd1dGlscy9hc3RybnQtaHR0cC1oYW5kbGVyJ1xuaW1wb3J0IHsgZGV2aWNlSW5mbyB9IGZyb20gJ3V0aWxzL25hdmlnYXRvci1oZWxwZXInXG5pbXBvcnQgKiBhcyBEYXRlVXRpbHMgZnJvbSAndXRpbHMvZGF0ZS11dGlscydcblxuY29uc3QgbG9nRW52ID0gJ0FTVFJOVF9MT0dfRU5WJ1xuY29uc3QgbG9nQmFzZUluZm8gPSAnQVNUUk5UX0JBU0VfTE9HX0lORk8nXG5jb25zdCBsb2dJbmZvcyA9ICdBU1RSTlRfTE9HX0lORk9TJ1xuY29uc3Qgc3RvcmFnZUtleXMgPSBbXG4gIGxvZ0VudixcbiAgbG9nQmFzZUluZm8sXG4gIGxvZ0luZm9zXG5dXG5cbmNvbnN0IGdldEVudiA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nRW52KVxuICByZXR1cm4gZW52XG59XG5cbmNvbnN0IGdldEJhc2VJbmZvID0gKCkgPT4ge1xuICBjb25zdCBpbmZvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dCYXNlSW5mbykpXG4gIHJldHVybiBpbmZvID8gaW5mbyA6IHt9XG59XG5cbmNvbnN0IGNvbnN0cnVjdFVSTCA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gZ2V0RW52KClcbiAgbGV0IGRvbWFpblByZWZpeFxuICB2YXIgYmFzZVVSTCA9IGVudlxuICBjb25zb2xlLmxvZyhlbnYpXG4gIHN3aXRjaCAoZW52KSB7XG4gICAgY2FzZSAnYmV0YSc6IGNhc2UgJ2Rldic6XG4gICAgICBkb21haW5QcmVmaXggPSAnbG9nLWJldGEnXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3Byb2R1Y3Rpb24nOiBjYXNlICdsaXZlJzpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdsb2ctYXBwJ1xuICAgICAgYnJlYWtcbiAgfVxuICBpZiAoZG9tYWluUHJlZml4KSB7XG4gICAgYmFzZVVSTCA9IGBodHRwczovLyR7ZG9tYWluUHJlZml4fS5hc3RybnQuY29gXG4gIH1cbiAgcmV0dXJuIGAke2Jhc2VVUkx9L2FwaS92Mi9jYW5kaWRhdGUvbG9nc2Bcbn1cblxuY29uc3QgY29uc3RydWN0SW50ZXJ2aWV3SW5mbyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgZGV2aWNlID0gZGV2aWNlSW5mbygpXG4gIGNvbnN0IHRpbWVab25lID0gRGF0ZVV0aWxzLmdldFRpbWV6b25lKClcbiAgY29uc3QgbG9nVGltZSA9IERhdGVVdGlscy5nZXRDdXJyZW50RGF0ZVRpbWUoKVxuICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgY29uc3Qgb3MgPSBgJHtkZXZpY2Uub3N9ICgke2RldmljZS5vc1ZlcnNpb259KWBcbiAgY29uc3QgdmVyc2lvbiA9IGAke2RldmljZS5icm93c2VyfSwgVmVyc2lvbiAke2RldmljZS5icm93c2VyVmVyc2lvbn0gKCR7ZGV2aWNlLmJyb3dzZXJNYWpvclZlcnNpb259KWBcblxuICBsZXQgcmVjb3JkZWRQYXJhbSA9IGdldEJhc2VJbmZvKClcbiAgcmVjb3JkZWRQYXJhbS5ldmVudCA9IHBhcmFtcy5ldmVudCB8fCAnJ1xuICByZWNvcmRlZFBhcmFtLm1lc3NhZ2UgPSBwYXJhbXMubWVzc2FnZSB8fCAnJ1xuICByZWNvcmRlZFBhcmFtLm9zID0gb3NcbiAgcmVjb3JkZWRQYXJhbS52ZXJzaW9uID0gdmVyc2lvblxuICByZWNvcmRlZFBhcmFtLmltZWkgPSB1YVxuICByZWNvcmRlZFBhcmFtLmxvZ190aW1lID0gbG9nVGltZVxuICByZWNvcmRlZFBhcmFtLnRpbWVfem9uZSA9IHRpbWVab25lXG5cbiAgcmV0dXJuIHJlY29yZGVkUGFyYW1cbn1cblxuY29uc3Qgc2VuZEV2ZW50ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBVUkwgPSBjb25zdHJ1Y3RVUkwoKVxuICBjb25zdCBsb2dJbmZvID0gY29uc3RydWN0SW50ZXJ2aWV3SW5mbyhwYXJhbXMpXG4gIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XG4gICAgbG9nczogWyBsb2dJbmZvIF1cbiAgfVxuXG4gIHJldHVybiBodHRwSGFuZGxlcignUE9TVCcsIFVSTCwgcmVxdWVzdFBhcmFtcylcbn1cblxuY29uc3Qgc3RvcmVFdmVudCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgbG9nSXRlbXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dJbmZvcylcblxuICBsZXQgc3RvcmVkTG9nc1xuICBpZiAoIWxvZ0l0ZW1zKSB7XG4gICAgc3RvcmVkTG9ncyA9IFtdXG4gIH0gZWxzZSB7XG4gICAgc3RvcmVkTG9ncyA9IEpTT04ucGFyc2UobG9nSXRlbXMpXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9nSW5mb3MpXG4gIH1cblxuICBjb25zdCBpbnRlcnZpZXdJbmZvID0gY29uc3RydWN0SW50ZXJ2aWV3SW5mbyhwYXJhbXMpXG4gIHN0b3JlZExvZ3MucHVzaChpbnRlcnZpZXdJbmZvKVxuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvZ0luZm9zLCBKU09OLnN0cmluZ2lmeShzdG9yZWRMb2dzKSlcblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGludGVydmlld0luZm8pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKGVudiwgcGFyYW1zLCBvbkVycm9yID0gKCkgPT4ge30sIG9uVW5oYW5kbGVkUmVqZWN0aW9uID0gKCkgPT4ge30pIHtcbiAgY29uc3QgYmFzZVBhcmFtID0ge1xuICAgICdpbnRlcnZpZXdDb2RlJzogcGFyYW1zLmludGVydmlld19jb2RlIHx8ICcnLFxuICAgICdjYW5kaWRhdGVfaWQnOiBwYXJhbXMuY2FuZGlkYXRlX2lkIHx8IDAsXG4gICAgJ2pvYl9pZCc6IHBhcmFtcy5qb2JfaWQgfHwgMCxcbiAgICAnY29tcGFueV9pZCc6IHBhcmFtcy5jb21wYW55X2lkIHx8IDBcbiAgfVxuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvZ0VudiwgZW52KVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dCYXNlSW5mbywgSlNPTi5zdHJpbmdpZnkoYmFzZVBhcmFtKSlcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyRXZ0KSA9PiB7XG4gICAgb25FcnJvcihlcnJFdnQuZXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VuaGFuZGxlZHJlamVjdGlvbicsIChlcnJFdnQpID0+IHtcbiAgICBvblVuaGFuZGxlZFJlamVjdGlvbihlcnJFdnQucmVhc29uKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkRXZlbnQocGFyYW1zKSB7XG4gIHN3aXRjaCAocGFyYW1zLnN0YXR1cykge1xuICAgIGNhc2UgJ29ubGluZSc6XG4gICAgICByZXR1cm4gc2VuZEV2ZW50KHBhcmFtcylcblxuICAgIGNhc2UgJ29mZmxpbmUnOlxuICAgICAgcmV0dXJuIHN0b3JlRXZlbnQocGFyYW1zKVxuICB9XG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnTm8gZXZlbnQgdG8gc2VuZCcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZW5kU2F2ZWRFdmVudHMoKSB7XG4gIGNvbnN0IGxvZ0l0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nSW5mb3MpXG4gIGlmICghbG9nSXRlbXMpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgfVxuXG4gIGNvbnN0IFVSTCA9IGNvbnN0cnVjdFVSTCgpXG4gIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XG4gICAgbG9nczogSlNPTi5wYXJzZShsb2dJdGVtcylcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaHR0cEhhbmRsZXIoJ1BPU1QnLCBVUkwsIHJlcXVlc3RQYXJhbXMpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2dJbmZvcylcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHJlamVjdChlcnJvcikpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICBzdG9yYWdlS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KVxuICB9KVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCAobWV0aG9kLCB1cmwsIHBhcmFtcywgbWltZVR5cGUgPSAnYXBwbGljYXRpb24vanNvbicpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIHRydWUpXG5cbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKVxuXG4gICAgaWYgKG1pbWVUeXBlICYmIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZSkge1xuICAgICAgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKG1pbWVUeXBlKVxuICAgIH1cblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXRcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KVxuICAgICAgY29uc3QgcmVzcG9uc2VDb2RlID0gcmVzcG9uc2Uuc3RhdHVzIHx8IHJlcXVlc3Quc3RhdHVzXG5cbiAgICAgIGlmIChyZXNwb25zZUNvZGUgPj0gMjAwICYmIHJlc3BvbnNlQ29kZSA8IDMwMCkge1xuICAgICAgICByZXNvbHZlKHJlc3BvbnNlLm1lc3NhZ2UgfHwgcmVzcG9uc2UpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QocmVzcG9uc2UubWVzc2FnZSB8fCByZXNwb25zZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdFBhcmFtcylcbiAgfSlcbn1cbiIsIlxuZXhwb3J0IGNvbnN0IGdldFRpbWV6b25lID0gKCkgPT4ge1xuICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpXG4gIHZhciBjdXJyZW50VGltZXpvbmUgPSBjdXJyZW50VGltZS5nZXRUaW1lem9uZU9mZnNldCgpXG5cbiAgcmV0dXJuIChjdXJyZW50VGltZXpvbmUgLyA2MCkgKiAtMVxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudERhdGVUaW1lID0gKCkgPT4ge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICBsZXQgZCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIG1vbnRoID0gJycgKyAoZC5nZXRNb250aCgpICsgMSksXG4gICAgZGF5ID0gJycgKyBkLmdldERhdGUoKSxcbiAgICB5ZWFyID0gZC5nZXRGdWxsWWVhcigpLFxuICAgIGhvdXIgPSBkLmdldEhvdXJzKCksXG4gICAgbWludXRlID0gZC5nZXRNaW51dGVzKCksXG4gICAgc2Vjb25kID0gZC5nZXRTZWNvbmRzKClcblxuICBpZiAobW9udGgubGVuZ3RoIDwgMikge1xuICAgIG1vbnRoID0gJzAnICsgbW9udGhcbiAgfVxuXG4gIGlmIChkYXkubGVuZ3RoIDwgMikge1xuICAgIGRheSA9ICcwJyArIGRheVxuICB9XG5cbiAgLy8gaG91ciA9IGhvdXIgJSAxMjtcbiAgLy8gaG91ciA9IGhvdXIgPyBob3VyIDogMTI7XG4gIG1pbnV0ZSA9IG1pbnV0ZSA8IDEwID8gJzAnICsgbWludXRlIDogbWludXRlO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGAke1t5ZWFyLCBtb250aCwgZGF5XS5qb2luKCctJyl9ICR7aG91cn06JHttaW51dGV9OiR7c2Vjb25kfWBcblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLyoqXG4gKiBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xODcwNjgxOC85OTM4NTM5XG4qL1xuXG5jb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbmNvbnN0IG5WZXIgPSBuYXZpZ2F0b3IuYXBwVmVyc2lvblxubGV0IGNvb2tpZUVuYWJsZWQgPSBuYXZpZ2F0b3IuY29va2llRW5hYmxlZFxuXG5jb25zdCBnZXRPU0luZm8gPSAoKSA9PiB7XG4gIGxldCBvcyA9ICctJ1xuICBsZXQgb3NWZXJzaW9uID0gJy0nXG5cbiAgY29uc3QgY2xpZW50U3RyaW5ncyA9IFtcbiAgICB7czogJ1dpbmRvd3MgMTAnLCByOiAvKFdpbmRvd3MgMTAuMHxXaW5kb3dzIE5UIDEwLjApL30sXG4gICAge3M6ICdXaW5kb3dzIDguMScsIHI6IC8oV2luZG93cyA4LjF8V2luZG93cyBOVCA2LjMpL30sXG4gICAge3M6ICdXaW5kb3dzIDgnLCByOiAvKFdpbmRvd3MgOHxXaW5kb3dzIE5UIDYuMikvfSxcbiAgICB7czogJ1dpbmRvd3MgNycsIHI6IC8oV2luZG93cyA3fFdpbmRvd3MgTlQgNi4xKS99LFxuICAgIHtzOiAnV2luZG93cyBWaXN0YScsIHI6IC9XaW5kb3dzIE5UIDYuMC99LFxuICAgIHtzOiAnV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6IC9XaW5kb3dzIE5UIDUuMi99LFxuICAgIHtzOiAnV2luZG93cyBYUCcsIHI6IC8oV2luZG93cyBOVCA1LjF8V2luZG93cyBYUCkvfSxcbiAgICB7czogJ1dpbmRvd3MgMjAwMCcsIHI6IC8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS99LFxuICAgIHtzOiAnV2luZG93cyBNRScsIHI6IC8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvfSxcbiAgICB7czogJ1dpbmRvd3MgOTgnLCByOiAvKFdpbmRvd3MgOTh8V2luOTgpL30sXG4gICAge3M6ICdXaW5kb3dzIDk1JywgcjogLyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpL30sXG4gICAge3M6ICdXaW5kb3dzIE5UIDQuMCcsIHI6IC8oV2luZG93cyBOVCA0LjB8V2luTlQ0LjB8V2luTlR8V2luZG93cyBOVCkvfSxcbiAgICB7czogJ1dpbmRvd3MgQ0UnLCByOiAvV2luZG93cyBDRS99LFxuICAgIHtzOiAnV2luZG93cyAzLjExJywgcjogL1dpbjE2L30sXG4gICAge3M6ICdBbmRyb2lkJywgcjogL0FuZHJvaWQvfSxcbiAgICB7czogJ09wZW4gQlNEJywgcjogL09wZW5CU0QvfSxcbiAgICB7czogJ1N1biBPUycsIHI6IC9TdW5PUy99LFxuICAgIHtzOiAnTGludXgnLCByOiAvKExpbnV4fFgxMSkvfSxcbiAgICB7czogJ2lPUycsIHI6IC8oaVBob25lfGlQYWR8aVBvZCkvfSxcbiAgICB7czogJ01hYyBPUyBYJywgcjogL01hYyBPUyBYL30sXG4gICAge3M6ICdNYWMgT1MnLCByOiAvKE1hY1BQQ3xNYWNJbnRlbHxNYWNfUG93ZXJQQ3xNYWNpbnRvc2gpL30sXG4gICAge3M6ICdRTlgnLCByOiAvUU5YL30sXG4gICAge3M6ICdVTklYJywgcjogL1VOSVgvfSxcbiAgICB7czogJ0JlT1MnLCByOiAvQmVPUy99LFxuICAgIHtzOiAnT1MvMicsIHI6IC9PU1xcLzIvfSxcbiAgICB7czogJ1NlYXJjaCBCb3QnLCByOiAvKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvfVxuICBdXG5cbiAgZm9yIChsZXQgaWQgaW4gY2xpZW50U3RyaW5ncykge1xuICAgIGxldCBjcyA9IGNsaWVudFN0cmluZ3NbaWRdXG4gICAgaWYgKGNzLnIudGVzdCh1YSkpIHtcbiAgICAgIG9zID0gY3Muc1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XG4gICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV1cbiAgICBvcyA9ICdXaW5kb3dzJ1xuICB9XG5cbiAgc3dpdGNoIChvcykge1xuICAgIGNhc2UgJ01hYyBPUyBYJzpcbiAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTBbXFwuXFxfXFxkXSspLy5leGVjKHVhKSA/IC9NYWMgT1MgWCAoMTBbXFwuXFxfXFxkXSspLy5leGVjKHVhKVsxXSA6ICcxMSdcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdBbmRyb2lkJzpcbiAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKHVhKVsxXVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ2lPUyc6XG4gICAgICBvc1ZlcnNpb24gPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuVmVyKVxuICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApXG4gICAgICBicmVha1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBvcyxcbiAgICB2ZXJzaW9uOiBvc1ZlcnNpb25cbiAgfVxufVxuXG5jb25zdCBnZXRCcm93c2VySW5mbyA9ICgpID0+IHtcbiAgbGV0IG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5WZXIsIDEwKVxuICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lXG4gIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKVxuICBsZXQgbmFtZU9mZnNldCwgdmVyT2Zmc2V0LCBvZmZTZXRcblxuICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09wZXJhJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgNlxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICAgIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignVmVyc2lvbicpKSAhPT0gLTEpIHtcbiAgICAgIG9mZlNldCA9IHZlck9mZnNldCArIDhcbiAgICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICAgIH1cbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignT1BSJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgNFxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdFZGdlJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEVkZ2UnXG4gICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgNVxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdNU0lFJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSlcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignQ2hyb21lJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnQ2hyb21lJ1xuICAgIG9mZlNldCA9IHZlck9mZnNldCArIDdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignU2FmYXJpJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnU2FmYXJpJ1xuICAgIG9mZlNldCA9IHZlck9mZnNldCArIDdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1ZlcnNpb24nKSkgIT09IC0xKSB7XG4gICAgICBvZmZTZXQgPSB2ZXJPZmZzZXQgKyA4XG4gICAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgICB9XG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdGaXJlZm94J1xuICAgIG9mZlNldCA9IHZlck9mZnNldCArIDhcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKG9mZlNldClcbiAgfSBlbHNlIGlmICh1YS5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodWEuaW5kZXhPZigncnY6JykgKyAzKVxuICB9IGVsc2UgaWYgKChuYW1lT2Zmc2V0ID0gdWEubGFzdEluZGV4T2YoJyAnKSArIDEpIDwgKHZlck9mZnNldCA9IHVhLmxhc3RJbmRleE9mKCcvJykpKSB7XG4gICAgYnJvd3NlciA9IHVhLnN1YnN0cmluZyhuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQpXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKVxuICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT09IGJyb3dzZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lXG4gICAgfVxuICB9XG5cbiAgdmVyc2lvbiA9IHZlcnNpb24uc3BsaXQoJyAnKTtcbiAgdmVyc2lvbiA9IHZlcnNpb25bMF1cblxuICBtYWpvclZlcnNpb24gPSBwYXJzZUludCgnJyArIHZlcnNpb24sIDEwKVxuICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xuICAgIHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQoblZlcilcbiAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludChuVmVyLCAxMClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogYnJvd3NlciB8fCAnJyxcbiAgICB2ZXJzaW9uOiB2ZXJzaW9uIHx8ICcnLFxuICAgIG1ham9yVmVyc2lvbjogbWFqb3JWZXJzaW9uIHx8ICcnXG4gIH1cbn1cblxuY29uc3QgZ2V0U2NyZWVuU2l6ZSA9ICgpID0+IHtcbiAgaWYgKCFzY3JlZW4ud2lkdGgpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICBjb25zdCB3aWR0aCA9IChzY3JlZW4ud2lkdGgpID8gc2NyZWVuLndpZHRoIDogJydcbiAgY29uc3QgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gc2NyZWVuLmhlaWdodCA6ICcnXG5cbiAgcmV0dXJuICcnICsgd2lkdGggKyAnIHggJyArIGhlaWdodFxufVxuXG5jb25zdCBpc0Nvb2tpZUVuYWJsZWQgPSAoKSA9PiB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQgPT09ICd1bmRlZmluZWQnICYmICFjb29raWVFbmFibGVkKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0gJ3Rlc3Rjb29raWUnXG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCd0ZXN0Y29va2llJykgIT09IC0xXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldmljZUluZm8oKSB7XG4gIGNvbnN0IG9zID0gZ2V0T1NJbmZvKClcbiAgY29uc3QgYnJvd3NlciA9IGdldEJyb3dzZXJJbmZvKClcbiAgY29uc3Qgc2NyZWVuU2l6ZSA9IGdldFNjcmVlblNpemUoKVxuICBjb25zdCBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcilcblxuICByZXR1cm4ge1xuICAgIHNjcmVlbjogc2NyZWVuU2l6ZSxcbiAgICBicm93c2VyOiBicm93c2VyLm5hbWUsXG4gICAgYnJvd3NlclZlcnNpb246IGJyb3dzZXIudmVyc2lvbixcbiAgICBicm93c2VyTWFqb3JWZXJzaW9uOiBicm93c2VyLm1ham9yVmVyc2lvbixcbiAgICBtb2JpbGU6IG1vYmlsZSxcbiAgICBvczogb3MubmFtZSxcbiAgICBvc1ZlcnNpb246IG9zLnZlcnNpb24sXG4gICAgY29va2llczogaXNDb29raWVFbmFibGVkXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=