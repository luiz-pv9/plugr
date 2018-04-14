let { expect } = require('chai')

describe('DOM css helpers', () => {
  it('sets the value of an input', () => {
    let $elm = $('<input>')

    $elm.val('Funk')

    expect($elm.first().value).to.eql('Funk')
  })

  it('reads the value of an input', () => {
    let $elm = $('<input value="Cat">')

    expect($elm.val()).to.eql('Cat')
  })
})
