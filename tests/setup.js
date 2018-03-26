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
