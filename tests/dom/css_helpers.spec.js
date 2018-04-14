let { expect } = require('chai')

describe('DOM css helpers', () => {
  it('sets a css property with chain API', () => {
    let $elm = $('<div></div>')

    expect(
      $elm.css('width', '100px')
    ).to.eql($elm)
  })

  it('fetches a css style', () => {
    let $elm = $('<div style="width: 50px;"></div>')

    expect(
      $elm.css('width')
    ).to.eql('50px')
  })
})
