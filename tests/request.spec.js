let { expect } = require('chai')
let request = require('../lib/request')

describe('request spec', () => {
  it('sends GET request', (done) => {
    request('GET', '/something', {
      success(res) {
        expect(res).to.eql('hello world')
        done()
      }
    })

    respondLatestRequestWithHtml('hello world')
  })

  it('sends POST request with JSON payload', () => {
    request('POST', '/something', {
      data: { hello: 'world' }
    })

    expect(latestRequest.requestBody).to.eql(`{"hello":"world"}`)
    expect(latestRequest.requestHeaders['content-type']).to.match(/json/)
  })

  it('parses JSON reponse', (done) => {
    request('GET', '/something', {
      success(res) {
        expect(res).to.eql({ hello: 'world' })
        done()
      }
    })

    respondLatestRequestWithJson({ hello: 'world' })
  })

  it('evals JS response', (done) => {
    request('GET', '/something', {
      success(res) {
        expect(res).to.eq(2)
        done()
      }
    })

    respondLatestRequestWithJs('1+1')
  })
})
