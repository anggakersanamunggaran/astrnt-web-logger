import httpHandler from 'utils/astrnt-http-handler'
import { deviceInfo } from 'utils/navigator-helper'
import * as DateUtils from 'utils/date-utils'

const logEnv = 'ASTRNT_LOG_ENV'
const logBaseInfo = 'ASTRNT_BASE_LOG_INFO'
const logInfos = 'ASTRNT_LOG_INFOS'
const storageKeys = [
  logEnv,
  logBaseInfo,
  logInfos
]

const getEnv = () => {
  const env = localStorage.getItem(logEnv)
  return env
}

const getBaseInfo = () => {
  const info = JSON.parse(localStorage.getItem(logBaseInfo))
  return info ? info : {}
}

const constructURL = () => {
  const env = getEnv()
  let domainPrefix
  var baseURL = env
  console.log(env)
  switch (env) {
    case 'beta': case 'dev':
      domainPrefix = 'log-beta'
      break
    case 'production': case 'live':
      domainPrefix = 'log-app'
      break
  }
  if (domainPrefix) {
    baseURL = `https://${domainPrefix}.astrnt.co`
  }
  return `${baseURL}/api/v2/candidate/logs`
}

const constructInterviewInfo = (params) => {
  const device = deviceInfo()
  const timeZone = DateUtils.getTimezone()
  const logTime = DateUtils.getCurrentDateTime()
  const ua = navigator.userAgent
  const os = `${device.os} (${device.osVersion})`
  const version = `${device.browser}, Version ${device.browserVersion} (${device.browserMajorVersion})`

  let recordedParam = getBaseInfo()
  recordedParam.event = params.event || ''
  recordedParam.message = params.message || ''
  recordedParam.os = os
  recordedParam.version = version
  recordedParam.imei = ua
  recordedParam.log_time = logTime
  recordedParam.time_zone = timeZone

  return recordedParam
}

const sendEvent = (params) => {
  const URL = constructURL()
  const logInfo = constructInterviewInfo(params)
  const requestParams = {
    logs: [ logInfo ]
  }

  return httpHandler('POST', URL, requestParams)
}

const storeEvent = (params) => {
  const logItems = localStorage.getItem(logInfos)

  let storedLogs
  if (!logItems) {
    storedLogs = []
  } else {
    storedLogs = JSON.parse(logItems)
    localStorage.removeItem(logInfos)
  }

  const interviewInfo = constructInterviewInfo(params)
  storedLogs.push(interviewInfo)

  localStorage.setItem(logInfos, JSON.stringify(storedLogs))

  return Promise.resolve(interviewInfo)
}

export function initialize(env, params, onError = () => {}, onUnhandledRejection = () => {}) {
  const baseParam = {
    'interviewCode': params.interview_code || '',
    'candidate_id': params.candidate_id || 0,
    'job_id': params.job_id || 0,
    'company_id': params.company_id || 0
  }

  localStorage.setItem(logEnv, env)
  localStorage.setItem(logBaseInfo, JSON.stringify(baseParam))

  window.addEventListener('error', (errEvt) => {
    onError(errEvt.error)
    return false
  })

  window.addEventListener('unhandledrejection', (errEvt) => {
    onUnhandledRejection(errEvt.reason)
  })
}

export function recordEvent(params) {
  switch (params.status) {
    case 'online':
      return sendEvent(params)

    case 'offline':
      return storeEvent(params)
  }

  return Promise.resolve('No event to send')
}

export function sendSavedEvents() {
  const logItems = localStorage.getItem(logInfos)
  if (!logItems) {
    return Promise.resolve()
  }

  const URL = constructURL()
  const requestParams = {
    logs: JSON.parse(logItems)
  }

  return new Promise((resolve, reject) => {
    httpHandler('POST', URL, requestParams)
      .then(result => {
        localStorage.removeItem(logInfos)
        resolve(result)
      })
      .catch(error => reject(error))
  })
}

export function clearCache() {
  storageKeys.forEach(key => {
    localStorage.removeItem(key)
  })
}
