import Cookies from 'js-cookie'
import Variables from './Variables'
import Lang from '@/Lang'

const parseHeaders = (headers) => {
  const token = Cookies.get(Lang.getString('enums.ACCESS_TOKEN'))
  let newHeaders = { ...headers }
  if (Boolean(token) && !Object.keys(newHeaders).includes('Authorization')) {
    newHeaders['Authorization'] = 'Bearer ' + token
  }
  if (!headers.hasOwnProperty('Content-Type')) {
    newHeaders['Content-Type'] = 'application/json'
  }
  if (headers['Content-Type'] === '') {
    const { 'Content-Type': contentType, ...clearHeader } = newHeaders
    newHeaders = { ...clearHeader }
  }
  newHeaders['Accept'] = 'application/json'
  return newHeaders
}

const post = async (url, data = {}, params = {}, headers = {}) => {
  const urlParams = new URLSearchParams(params)
  const newParams = Object.keys(params).length > 0 ? '?' + urlParams.toString() : ''
  const response = await fetch(Variables.API_URL.concat(url) + newParams, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: parseHeaders(headers),
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data instanceof FormData ? data : JSON.stringify(data),
  })
  const status = response.status
  let body = null
  try {
    body = await response.json()
  } catch (e) {
    body = await response.body
  }
  // console.log(response)
  const newResponse = { status, body }
  if (status >= 400 && status <= 500) {
    throw newResponse
  }

  return newResponse
}

const get = async (url, params = {}, headers = {}) => {
  const urlParams = new URLSearchParams(params)
  const newParams = Object.keys(params).length > 0 ? '?' + urlParams.toString() : ''
  const response = await fetch(Variables.API_URL.concat(url) + newParams, {
    method: 'GET',
    headers: parseHeaders(headers),
  })
  const status = response.status
  const body = await response.json()
  const newResponse = { status, body }

  if (status >= 400 && status <= 500) {
    throw newResponse
  }

  return newResponse;
}


export default {
  post, get
}
