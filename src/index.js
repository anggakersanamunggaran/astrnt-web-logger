import httpHandler from 'utils/astrnt-http-handler'
import { deviceInfo } from 'utils/navigator-helper'

const logEnv = 'ASTRNT_LOG_ENV'
const logBaseInfo = 'ASTRNT_BASE_LOG_INFO'
const storageKeys = [
  logEnv,
  logBaseInfo
]

const getCurrentDateTime = () => {
  const date = new Date()
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    second = d.getSeconds()

  if (month.length < 2) {
    month = '0' + month
  }

  if (day.length < 2) {
    day = '0' + day
  }

  hour = hour % 12;
  hour = hour ? hour : 12;
  minute = minute < 10 ? '0' + minute : minute;

  const result = `${[year, month, day].join('-')} ${hour}:${minute}:${second}`

  return result;
}

const getEnv = () => {
  const env = localStorage.getItem(logEnv)
  return env
}

const getBaseInfo = () => {
  const info = localStorage.getItem(logBaseInfo)
  return JSON.parse(info)
}

const constructURL = () => {
  const env = getEnv()
  let domainPrefix = ''

  switch (env) {
    case 'beta': case 'dev':
      domainPrefix = 'beta'
      break
    case 'production': case 'live':
      domainPrefix = 'app'
      break
  }

  const baseURL = `https://${domainPrefix}.astrnt.co`
  return `${baseURL}/api/v2/candidate/logs`
}

const constructInterviewInfo = (params) => {
  const device = deviceInfo()
  const timeZone = new Date().getTimezoneOffset()
  const logTime = getCurrentDateTime()
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

export function initialize(env, params) {
  const baseParam = {
    'interviewCode': params.interview_code || '',
    'candidate_id': params.candidate_id || 0,
    'job_id': params.job_id || 0,
    'company_id': params.company_id || 0
  }

  localStorage.setItem(logEnv, env)
  localStorage.setItem(logBaseInfo, JSON.stringify(baseParam))
}

export function recordEvent(params) {
  const URL = constructURL()
  const interviewInfo = constructInterviewInfo(params)
  const requestParams = {
    logs: [ interviewInfo ]
  }

  return httpHandler('POST', URL, requestParams)
}

export function clearCache() {
  storageKeys.forEach(key => {
    localStorage.removeItem(key)
  })
}
