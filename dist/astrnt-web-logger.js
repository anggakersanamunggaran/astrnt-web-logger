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
      domainPrefix = env;
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
    'company_id': params.company_id || 0,
    'device_name': params.device_name || '',
    'token': params.token || ''
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvdXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci8uL3NyYy91dGlscy9kYXRlLXV0aWxzLmpzIiwid2VicGFjazovL2FzdHJudC13ZWItbG9nZ2VyLy4vc3JjL3V0aWxzL25hdmlnYXRvci1oZWxwZXIuanMiXSwibmFtZXMiOlsibG9nRW52IiwibG9nQmFzZUluZm8iLCJsb2dJbmZvcyIsInN0b3JhZ2VLZXlzIiwiZ2V0RW52IiwiZW52IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldEJhc2VJbmZvIiwiaW5mbyIsIkpTT04iLCJwYXJzZSIsImNvbnN0cnVjdFVSTCIsImRvbWFpblByZWZpeCIsImJhc2VVUkwiLCJjb25zb2xlIiwibG9nIiwiY29uc3RydWN0SW50ZXJ2aWV3SW5mbyIsInBhcmFtcyIsImRldmljZSIsImRldmljZUluZm8iLCJ0aW1lWm9uZSIsIkRhdGVVdGlscyIsImxvZ1RpbWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm9zIiwib3NWZXJzaW9uIiwidmVyc2lvbiIsImJyb3dzZXIiLCJicm93c2VyVmVyc2lvbiIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJyZWNvcmRlZFBhcmFtIiwiZXZlbnQiLCJtZXNzYWdlIiwiaW1laSIsImxvZ190aW1lIiwidGltZV96b25lIiwic2VuZEV2ZW50IiwiVVJMIiwibG9nSW5mbyIsInJlcXVlc3RQYXJhbXMiLCJsb2dzIiwiaHR0cEhhbmRsZXIiLCJzdG9yZUV2ZW50IiwibG9nSXRlbXMiLCJzdG9yZWRMb2dzIiwicmVtb3ZlSXRlbSIsImludGVydmlld0luZm8iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaW5pdGlhbGl6ZSIsIm9uRXJyb3IiLCJvblVuaGFuZGxlZFJlamVjdGlvbiIsImJhc2VQYXJhbSIsImludGVydmlld19jb2RlIiwiY2FuZGlkYXRlX2lkIiwiam9iX2lkIiwiY29tcGFueV9pZCIsImRldmljZV9uYW1lIiwidG9rZW4iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXJyRXZ0IiwiZXJyb3IiLCJyZWFzb24iLCJyZWNvcmRFdmVudCIsInN0YXR1cyIsInNlbmRTYXZlZEV2ZW50cyIsInJlamVjdCIsInRoZW4iLCJyZXN1bHQiLCJjYXRjaCIsImNsZWFyQ2FjaGUiLCJmb3JFYWNoIiwia2V5IiwibWV0aG9kIiwidXJsIiwibWltZVR5cGUiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm92ZXJyaWRlTWltZVR5cGUiLCJldnQiLCJ0YXJnZXQiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlQ29kZSIsInNlbmQiLCJnZXRUaW1lem9uZSIsImN1cnJlbnRUaW1lIiwiRGF0ZSIsImN1cnJlbnRUaW1lem9uZSIsImdldFRpbWV6b25lT2Zmc2V0IiwiZ2V0Q3VycmVudERhdGVUaW1lIiwiZGF0ZSIsImQiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZSIsImdldE1pbnV0ZXMiLCJzZWNvbmQiLCJnZXRTZWNvbmRzIiwibGVuZ3RoIiwiam9pbiIsIm5WZXIiLCJhcHBWZXJzaW9uIiwiY29va2llRW5hYmxlZCIsImdldE9TSW5mbyIsImNsaWVudFN0cmluZ3MiLCJzIiwiciIsImlkIiwiY3MiLCJ0ZXN0IiwiZXhlYyIsIm5hbWUiLCJnZXRCcm93c2VySW5mbyIsIm1ham9yVmVyc2lvbiIsInBhcnNlSW50IiwiYXBwTmFtZSIsInBhcnNlRmxvYXQiLCJuYW1lT2Zmc2V0IiwidmVyT2Zmc2V0Iiwib2ZmU2V0IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsInNwbGl0IiwiaXNOYU4iLCJnZXRTY3JlZW5TaXplIiwic2NyZWVuIiwid2lkdGgiLCJ1bmRlZmluZWQiLCJoZWlnaHQiLCJpc0Nvb2tpZUVuYWJsZWQiLCJkb2N1bWVudCIsImNvb2tpZSIsInNjcmVlblNpemUiLCJtb2JpbGUiLCJjb29raWVzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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UixHQUFrQkgsTUFBTSxDQUFDRyxNQUF6QixHQUFrQyxFQUFqRDtBQUVBLFNBQU8sS0FBS0YsS0FBTCxHQUFhLEtBQWIsR0FBcUJFLE1BQTVCO0FBQ0QsQ0FURDs7QUFXQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07QUFDNUIsTUFBSSxPQUFPM0gsU0FBUyxDQUFDNkYsYUFBakIsS0FBbUMsV0FBbkMsSUFBa0QsQ0FBQ0EsYUFBdkQsRUFBc0U7QUFDcEUrQixZQUFRLENBQUNDLE1BQVQsR0FBa0IsWUFBbEI7QUFDQSxXQUFPRCxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JkLE9BQWhCLENBQXdCLFlBQXhCLE1BQTBDLENBQUMsQ0FBbEQ7QUFDRDs7QUFFRCxTQUFPLEtBQVA7QUFDRCxDQVBEOztBQVNPLFNBQVNwSCxVQUFULEdBQXNCO0FBQzNCLE1BQU1PLEVBQUUsR0FBRzRGLFNBQVMsRUFBcEI7QUFDQSxNQUFNekYsT0FBTyxHQUFHa0csY0FBYyxFQUE5QjtBQUNBLE1BQU11QixVQUFVLEdBQUdSLGFBQWEsRUFBaEM7QUFDQSxNQUFNUyxNQUFNLEdBQUcsNENBQTRDM0IsSUFBNUMsQ0FBaURULElBQWpELENBQWY7QUFFQSxTQUFPO0FBQ0w0QixVQUFNLEVBQUVPLFVBREg7QUFFTHpILFdBQU8sRUFBRUEsT0FBTyxDQUFDaUcsSUFGWjtBQUdMaEcsa0JBQWMsRUFBRUQsT0FBTyxDQUFDRCxPQUhuQjtBQUlMRyx1QkFBbUIsRUFBRUYsT0FBTyxDQUFDbUcsWUFKeEI7QUFLTHVCLFVBQU0sRUFBRUEsTUFMSDtBQU1MN0gsTUFBRSxFQUFFQSxFQUFFLENBQUNvRyxJQU5GO0FBT0xuRyxhQUFTLEVBQUVELEVBQUUsQ0FBQ0UsT0FQVDtBQVFMNEgsV0FBTyxFQUFFTDtBQVJKLEdBQVA7QUFVRCxDIiwiZmlsZSI6ImFzdHJudC13ZWItbG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJhc3RybnQtd2ViLWxvZ2dlclwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhc3RybnQtd2ViLWxvZ2dlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhc3RybnQtd2ViLWxvZ2dlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBodHRwSGFuZGxlciBmcm9tICd1dGlscy9hc3RybnQtaHR0cC1oYW5kbGVyJ1xuaW1wb3J0IHsgZGV2aWNlSW5mbyB9IGZyb20gJ3V0aWxzL25hdmlnYXRvci1oZWxwZXInXG5pbXBvcnQgKiBhcyBEYXRlVXRpbHMgZnJvbSAndXRpbHMvZGF0ZS11dGlscydcblxuY29uc3QgbG9nRW52ID0gJ0FTVFJOVF9MT0dfRU5WJ1xuY29uc3QgbG9nQmFzZUluZm8gPSAnQVNUUk5UX0JBU0VfTE9HX0lORk8nXG5jb25zdCBsb2dJbmZvcyA9ICdBU1RSTlRfTE9HX0lORk9TJ1xuY29uc3Qgc3RvcmFnZUtleXMgPSBbXG4gIGxvZ0VudixcbiAgbG9nQmFzZUluZm8sXG4gIGxvZ0luZm9zXG5dXG5cbmNvbnN0IGdldEVudiA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nRW52KVxuICByZXR1cm4gZW52XG59XG5cbmNvbnN0IGdldEJhc2VJbmZvID0gKCkgPT4ge1xuICBjb25zdCBpbmZvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dCYXNlSW5mbykpXG4gIHJldHVybiBpbmZvID8gaW5mbyA6IHt9XG59XG5cbmNvbnN0IGNvbnN0cnVjdFVSTCA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gZ2V0RW52KClcbiAgbGV0IGRvbWFpblByZWZpeFxuICB2YXIgYmFzZVVSTCA9IGVudlxuICBjb25zb2xlLmxvZyhlbnYpXG4gIHN3aXRjaCAoZW52KSB7XG4gICAgY2FzZSAnZGV2JzpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdsb2ctYmV0YSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncHJvZHVjdGlvbic6IGNhc2UgJ2xpdmUnOlxuICAgICAgZG9tYWluUHJlZml4ID0gJ2xvZy1hcHAnXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBkb21haW5QcmVmaXggPSBlbnZcbiAgfVxuICBpZiAoZG9tYWluUHJlZml4KSB7XG4gICAgYmFzZVVSTCA9IGBodHRwczovLyR7ZG9tYWluUHJlZml4fS5hc3RybnQuY29gXG4gIH1cbiAgcmV0dXJuIGAke2Jhc2VVUkx9L2FwaS92Mi9jYW5kaWRhdGUvbG9nc2Bcbn1cblxuY29uc3QgY29uc3RydWN0SW50ZXJ2aWV3SW5mbyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgZGV2aWNlID0gZGV2aWNlSW5mbygpXG4gIGNvbnN0IHRpbWVab25lID0gRGF0ZVV0aWxzLmdldFRpbWV6b25lKClcbiAgY29uc3QgbG9nVGltZSA9IERhdGVVdGlscy5nZXRDdXJyZW50RGF0ZVRpbWUoKVxuICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgY29uc3Qgb3MgPSBgJHtkZXZpY2Uub3N9ICgke2RldmljZS5vc1ZlcnNpb259KWBcbiAgY29uc3QgdmVyc2lvbiA9IGAke2RldmljZS5icm93c2VyfSwgVmVyc2lvbiAke2RldmljZS5icm93c2VyVmVyc2lvbn0gKCR7ZGV2aWNlLmJyb3dzZXJNYWpvclZlcnNpb259KWBcblxuICBsZXQgcmVjb3JkZWRQYXJhbSA9IGdldEJhc2VJbmZvKClcbiAgcmVjb3JkZWRQYXJhbS5ldmVudCA9IHBhcmFtcy5ldmVudCB8fCAnJ1xuICByZWNvcmRlZFBhcmFtLm1lc3NhZ2UgPSBwYXJhbXMubWVzc2FnZSB8fCAnJ1xuICByZWNvcmRlZFBhcmFtLm9zID0gb3NcbiAgcmVjb3JkZWRQYXJhbS52ZXJzaW9uID0gdmVyc2lvblxuICByZWNvcmRlZFBhcmFtLmltZWkgPSB1YVxuICByZWNvcmRlZFBhcmFtLmxvZ190aW1lID0gbG9nVGltZVxuICByZWNvcmRlZFBhcmFtLnRpbWVfem9uZSA9IHRpbWVab25lXG5cbiAgcmV0dXJuIHJlY29yZGVkUGFyYW1cbn1cblxuY29uc3Qgc2VuZEV2ZW50ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBVUkwgPSBjb25zdHJ1Y3RVUkwoKVxuICBjb25zdCBsb2dJbmZvID0gY29uc3RydWN0SW50ZXJ2aWV3SW5mbyhwYXJhbXMpXG4gIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XG4gICAgbG9nczogWyBsb2dJbmZvIF1cbiAgfVxuXG4gIHJldHVybiBodHRwSGFuZGxlcignUE9TVCcsIFVSTCwgcmVxdWVzdFBhcmFtcylcbn1cblxuY29uc3Qgc3RvcmVFdmVudCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgbG9nSXRlbXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dJbmZvcylcblxuICBsZXQgc3RvcmVkTG9nc1xuICBpZiAoIWxvZ0l0ZW1zKSB7XG4gICAgc3RvcmVkTG9ncyA9IFtdXG4gIH0gZWxzZSB7XG4gICAgc3RvcmVkTG9ncyA9IEpTT04ucGFyc2UobG9nSXRlbXMpXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9nSW5mb3MpXG4gIH1cblxuICBjb25zdCBpbnRlcnZpZXdJbmZvID0gY29uc3RydWN0SW50ZXJ2aWV3SW5mbyhwYXJhbXMpXG4gIHN0b3JlZExvZ3MucHVzaChpbnRlcnZpZXdJbmZvKVxuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvZ0luZm9zLCBKU09OLnN0cmluZ2lmeShzdG9yZWRMb2dzKSlcblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGludGVydmlld0luZm8pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKGVudiwgcGFyYW1zLCBvbkVycm9yID0gKCkgPT4ge30sIG9uVW5oYW5kbGVkUmVqZWN0aW9uID0gKCkgPT4ge30pIHtcbiAgY29uc3QgYmFzZVBhcmFtID0ge1xuICAgICdpbnRlcnZpZXdDb2RlJzogcGFyYW1zLmludGVydmlld19jb2RlIHx8ICcnLFxuICAgICdjYW5kaWRhdGVfaWQnOiBwYXJhbXMuY2FuZGlkYXRlX2lkIHx8IDAsXG4gICAgJ2pvYl9pZCc6IHBhcmFtcy5qb2JfaWQgfHwgMCxcbiAgICAnY29tcGFueV9pZCc6IHBhcmFtcy5jb21wYW55X2lkIHx8IDAsXG4gICAgJ2RldmljZV9uYW1lJzogcGFyYW1zLmRldmljZV9uYW1lIHx8ICcnLFxuICAgICd0b2tlbic6IHBhcmFtcy50b2tlbiB8fCAnJ1xuICB9XG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9nRW52LCBlbnYpXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvZ0Jhc2VJbmZvLCBKU09OLnN0cmluZ2lmeShiYXNlUGFyYW0pKVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJFdnQpID0+IHtcbiAgICBvbkVycm9yKGVyckV2dC5lcnJvcilcbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndW5oYW5kbGVkcmVqZWN0aW9uJywgKGVyckV2dCkgPT4ge1xuICAgIG9uVW5oYW5kbGVkUmVqZWN0aW9uKGVyckV2dC5yZWFzb24pXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvcmRFdmVudChwYXJhbXMpIHtcbiAgc3dpdGNoIChwYXJhbXMuc3RhdHVzKSB7XG4gICAgY2FzZSAnb25saW5lJzpcbiAgICAgIHJldHVybiBzZW5kRXZlbnQocGFyYW1zKVxuXG4gICAgY2FzZSAnb2ZmbGluZSc6XG4gICAgICByZXR1cm4gc3RvcmVFdmVudChwYXJhbXMpXG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdObyBldmVudCB0byBzZW5kJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRTYXZlZEV2ZW50cygpIHtcbiAgY29uc3QgbG9nSXRlbXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dJbmZvcylcbiAgaWYgKCFsb2dJdGVtcykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICB9XG5cbiAgY29uc3QgVVJMID0gY29uc3RydWN0VVJMKClcbiAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IHtcbiAgICBsb2dzOiBKU09OLnBhcnNlKGxvZ0l0ZW1zKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBodHRwSGFuZGxlcignUE9TVCcsIFVSTCwgcmVxdWVzdFBhcmFtcylcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvZ0luZm9zKVxuICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KGVycm9yKSlcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gIHN0b3JhZ2VLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH0pXG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IChtZXRob2QsIHVybCwgcGFyYW1zLCBtaW1lVHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgdHJ1ZSlcblxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpXG5cbiAgICBpZiAobWltZVR5cGUgJiYgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKSB7XG4gICAgICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUobWltZVR5cGUpXG4gICAgfVxuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpXG4gICAgICBjb25zdCByZXNwb25zZUNvZGUgPSByZXNwb25zZS5zdGF0dXMgfHwgcmVxdWVzdC5zdGF0dXNcblxuICAgICAgaWYgKHJlc3BvbnNlQ29kZSA+PSAyMDAgJiYgcmVzcG9uc2VDb2RlIDwgMzAwKSB7XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UubWVzc2FnZSB8fCByZXNwb25zZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZXF1ZXN0UGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0UGFyYW1zKVxuICB9KVxufVxuIiwiXG5leHBvcnQgY29uc3QgZ2V0VGltZXpvbmUgPSAoKSA9PiB7XG4gIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKClcbiAgdmFyIGN1cnJlbnRUaW1lem9uZSA9IGN1cnJlbnRUaW1lLmdldFRpbWV6b25lT2Zmc2V0KClcblxuICByZXR1cm4gKGN1cnJlbnRUaW1lem9uZSAvIDYwKSAqIC0xXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50RGF0ZVRpbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gIGxldCBkID0gbmV3IERhdGUoZGF0ZSksXG4gICAgbW9udGggPSAnJyArIChkLmdldE1vbnRoKCkgKyAxKSxcbiAgICBkYXkgPSAnJyArIGQuZ2V0RGF0ZSgpLFxuICAgIHllYXIgPSBkLmdldEZ1bGxZZWFyKCksXG4gICAgaG91ciA9IGQuZ2V0SG91cnMoKSxcbiAgICBtaW51dGUgPSBkLmdldE1pbnV0ZXMoKSxcbiAgICBzZWNvbmQgPSBkLmdldFNlY29uZHMoKVxuXG4gIGlmIChtb250aC5sZW5ndGggPCAyKSB7XG4gICAgbW9udGggPSAnMCcgKyBtb250aFxuICB9XG5cbiAgaWYgKGRheS5sZW5ndGggPCAyKSB7XG4gICAgZGF5ID0gJzAnICsgZGF5XG4gIH1cblxuICAvLyBob3VyID0gaG91ciAlIDEyO1xuICAvLyBob3VyID0gaG91ciA/IGhvdXIgOiAxMjtcbiAgbWludXRlID0gbWludXRlIDwgMTAgPyAnMCcgKyBtaW51dGUgOiBtaW51dGU7XG5cbiAgY29uc3QgcmVzdWx0ID0gYCR7W3llYXIsIG1vbnRoLCBkYXldLmpvaW4oJy0nKX0gJHtob3VyfToke21pbnV0ZX06JHtzZWNvbmR9YFxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKipcbiAqIHNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE4NzA2ODE4Lzk5Mzg1MzlcbiovXG5cbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuY29uc3QgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uXG5sZXQgY29va2llRW5hYmxlZCA9IG5hdmlnYXRvci5jb29raWVFbmFibGVkXG5cbmNvbnN0IGdldE9TSW5mbyA9ICgpID0+IHtcbiAgbGV0IG9zID0gJy0nXG4gIGxldCBvc1ZlcnNpb24gPSAnLSdcblxuICBjb25zdCBjbGllbnRTdHJpbmdzID0gW1xuICAgIHtzOiAnV2luZG93cyAxMCcsIHI6IC8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOC4xJywgcjogLyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvfSxcbiAgICB7czogJ1dpbmRvd3MgOCcsIHI6IC8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxuICAgIHtzOiAnV2luZG93cyA3JywgcjogLyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpL30sXG4gICAge3M6ICdXaW5kb3dzIFZpc3RhJywgcjogL1dpbmRvd3MgTlQgNi4wL30sXG4gICAge3M6ICdXaW5kb3dzIFNlcnZlciAyMDAzJywgcjogL1dpbmRvd3MgTlQgNS4yL30sXG4gICAge3M6ICdXaW5kb3dzIFhQJywgcjogLyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS99LFxuICAgIHtzOiAnV2luZG93cyAyMDAwJywgcjogLyhXaW5kb3dzIE5UIDUuMHxXaW5kb3dzIDIwMDApL30sXG4gICAge3M6ICdXaW5kb3dzIE1FJywgcjogLyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxuICAgIHtzOiAnV2luZG93cyA5OCcsIHI6IC8oV2luZG93cyA5OHxXaW45OCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOTUnLCByOiAvKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvfSxcbiAgICB7czogJ1dpbmRvd3MgTlQgNC4wJywgcjogLyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxuICAgIHtzOiAnV2luZG93cyBDRScsIHI6IC9XaW5kb3dzIENFL30sXG4gICAge3M6ICdXaW5kb3dzIDMuMTEnLCByOiAvV2luMTYvfSxcbiAgICB7czogJ0FuZHJvaWQnLCByOiAvQW5kcm9pZC99LFxuICAgIHtzOiAnT3BlbiBCU0QnLCByOiAvT3BlbkJTRC99LFxuICAgIHtzOiAnU3VuIE9TJywgcjogL1N1bk9TL30sXG4gICAge3M6ICdMaW51eCcsIHI6IC8oTGludXh8WDExKS99LFxuICAgIHtzOiAnaU9TJywgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS99LFxuICAgIHtzOiAnTWFjIE9TIFgnLCByOiAvTWFjIE9TIFgvfSxcbiAgICB7czogJ01hYyBPUycsIHI6IC8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcbiAgICB7czogJ1FOWCcsIHI6IC9RTlgvfSxcbiAgICB7czogJ1VOSVgnLCByOiAvVU5JWC99LFxuICAgIHtzOiAnQmVPUycsIHI6IC9CZU9TL30sXG4gICAge3M6ICdPUy8yJywgcjogL09TXFwvMi99LFxuICAgIHtzOiAnU2VhcmNoIEJvdCcsIHI6IC8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS99XG4gIF1cblxuICBmb3IgKGxldCBpZCBpbiBjbGllbnRTdHJpbmdzKSB7XG4gICAgbGV0IGNzID0gY2xpZW50U3RyaW5nc1tpZF1cbiAgICBpZiAoY3Muci50ZXN0KHVhKSkge1xuICAgICAgb3MgPSBjcy5zXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXVxuICAgIG9zID0gJ1dpbmRvd3MnXG4gIH1cblxuICBzd2l0Y2ggKG9zKSB7XG4gICAgY2FzZSAnTWFjIE9TIFgnOlxuICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWModWEpID8gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWModWEpWzFdIDogJzExJ1xuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ0FuZHJvaWQnOlxuICAgICAgb3NWZXJzaW9uID0gL0FuZHJvaWQgKFtcXC5cXF9cXGRdKykvLmV4ZWModWEpWzFdXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnaU9TJzpcbiAgICAgIG9zVmVyc2lvbiA9IC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/Ly5leGVjKG5WZXIpXG4gICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb25bMV0gKyAnLicgKyBvc1ZlcnNpb25bMl0gKyAnLicgKyAob3NWZXJzaW9uWzNdIHwgMClcbiAgICAgIGJyZWFrXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG9zLFxuICAgIHZlcnNpb246IG9zVmVyc2lvblxuICB9XG59XG5cbmNvbnN0IGdldEJyb3dzZXJJbmZvID0gKCkgPT4ge1xuICBsZXQgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoblZlciwgMTApXG4gIGxldCBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWVcbiAgbGV0IHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pXG4gIGxldCBuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQsIG9mZlNldFxuXG4gIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignT3BlcmEnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdPcGVyYSdcbiAgICBvZmZTZXQgPSB2ZXJPZmZzZXQgKyA2XG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyhvZmZTZXQpXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdWZXJzaW9uJykpICE9PSAtMSkge1xuICAgICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgOFxuICAgICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyhvZmZTZXQpXG4gICAgfVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdPUFInKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdPcGVyYSdcbiAgICBvZmZTZXQgPSB2ZXJPZmZzZXQgKyA0XG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyhvZmZTZXQpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0VkZ2UnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgRWRnZSdcbiAgICBvZmZTZXQgPSB2ZXJPZmZzZXQgKyA1XG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyhvZmZTZXQpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ01TSUUnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdDaHJvbWUnKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdDaHJvbWUnXG4gICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgN1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICB9IGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdTYWZhcmknKSkgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdTYWZhcmknXG4gICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgN1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICAgIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignVmVyc2lvbicpKSAhPT0gLTEpIHtcbiAgICAgIG9mZlNldCA9IHZlck9mZnNldCArIDhcbiAgICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICAgIH1cbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRmlyZWZveCcpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0ZpcmVmb3gnXG4gICAgb2ZmU2V0ID0gdmVyT2Zmc2V0ICsgOFxuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcob2ZmU2V0KVxuICB9IGVsc2UgaWYgKHVhLmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh1YS5pbmRleE9mKCdydjonKSArIDMpXG4gIH0gZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSB1YS5sYXN0SW5kZXhPZignICcpICsgMSkgPCAodmVyT2Zmc2V0ID0gdWEubGFzdEluZGV4T2YoJy8nKSkpIHtcbiAgICBicm93c2VyID0gdWEuc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldClcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDEpXG4gICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWVcbiAgICB9XG4gIH1cblxuICB2ZXJzaW9uID0gdmVyc2lvbi5zcGxpdCgnICcpO1xuICB2ZXJzaW9uID0gdmVyc2lvblswXVxuXG4gIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KCcnICsgdmVyc2lvbiwgMTApXG4gIGlmIChpc05hTihtYWpvclZlcnNpb24pKSB7XG4gICAgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuVmVyKVxuICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5WZXIsIDEwKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBicm93c2VyIHx8ICcnLFxuICAgIHZlcnNpb246IHZlcnNpb24gfHwgJycsXG4gICAgbWFqb3JWZXJzaW9uOiBtYWpvclZlcnNpb24gfHwgJydcbiAgfVxufVxuXG5jb25zdCBnZXRTY3JlZW5TaXplID0gKCkgPT4ge1xuICBpZiAoIXNjcmVlbi53aWR0aCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGNvbnN0IHdpZHRoID0gKHNjcmVlbi53aWR0aCkgPyBzY3JlZW4ud2lkdGggOiAnJ1xuICBjb25zdCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBzY3JlZW4uaGVpZ2h0IDogJydcblxuICByZXR1cm4gJycgKyB3aWR0aCArICcgeCAnICsgaGVpZ2h0XG59XG5cbmNvbnN0IGlzQ29va2llRW5hYmxlZCA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PT0gJ3VuZGVmaW5lZCcgJiYgIWNvb2tpZUVuYWJsZWQpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSAndGVzdGNvb2tpZSdcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ3Rlc3Rjb29raWUnKSAhPT0gLTFcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV2aWNlSW5mbygpIHtcbiAgY29uc3Qgb3MgPSBnZXRPU0luZm8oKVxuICBjb25zdCBicm93c2VyID0gZ2V0QnJvd3NlckluZm8oKVxuICBjb25zdCBzY3JlZW5TaXplID0gZ2V0U2NyZWVuU2l6ZSgpXG4gIGNvbnN0IG1vYmlsZSA9IC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuVmVyKVxuXG4gIHJldHVybiB7XG4gICAgc2NyZWVuOiBzY3JlZW5TaXplLFxuICAgIGJyb3dzZXI6IGJyb3dzZXIubmFtZSxcbiAgICBicm93c2VyVmVyc2lvbjogYnJvd3Nlci52ZXJzaW9uLFxuICAgIGJyb3dzZXJNYWpvclZlcnNpb246IGJyb3dzZXIubWFqb3JWZXJzaW9uLFxuICAgIG1vYmlsZTogbW9iaWxlLFxuICAgIG9zOiBvcy5uYW1lLFxuICAgIG9zVmVyc2lvbjogb3MudmVyc2lvbixcbiAgICBjb29raWVzOiBpc0Nvb2tpZUVuYWJsZWRcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==