let sinon = require('sinon')
require('jsdom-global')()

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest()
global.window.XMLHttpRequest = global.XMLHttpRequest
global.requests = []
global.latestRequest = null

global.XMLHttpRequest.onCreate = req => {
  global.latestRequest = req
  global.requests.push(req) 
}

global.respondLatestRequestWithHtml = (html) => {
  let headers = {'content-type': 'text/html'}
  return latestRequest.respond(200, headers, html)
}

global.respondLatestRequestWithJson = (data) => {
  let headers = {'content-type': 'application/json'}
  return latestRequest.respond(200, headers, JSON.stringify(data))
}

global.respondLatestRequestWithJs = (code) => {
  let headers = {'content-type': 'application/javascript'}
  return latestRequest.respond(200, headers, code)
}

/**
 * Mocking the history API.
 */
let visitedUrls = []
global.history = {
  pushState(data, title, url) {
    visitedUrls.push(url)
    this.currentUrl = url
  },
  replaceState(data, title, url) {
    visitedUrls.pop()
    visitedUrls.push(url)
    this.currentUrl = url
  },
  get length() {
    return visitedUrls.length
  }
}

/**
 * Mocking the localStorage API.
 */
let store = {}
global.localStorage = {
  clear() {
    store = {}
  },
  setItem(key, value) {
    store[key] = value
  },
  removeItem(key) {
    delete store[key]
  },
  getItem(key) {
    return store[key]
  }
}
