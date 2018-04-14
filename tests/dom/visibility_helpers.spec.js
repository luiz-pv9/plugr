let { expect } = require('chai')

describe('DOM visibility helpers', () => {
  it('hides an element', () => {
    let $elm = $('<div></div>')

    $elm.hide()

    expect($elm.css('display')).to.eql('none')
  })

  it('shows an element', () => {
    let $elm = $('<div style="display: none;"></div>')

    $elm.show()

    expect($elm.css('display')).to.eql('block')
  })

  it('shows an element inline', () => {
    let $elm = $('<div style="display: none;"></div>')

    $elm.showInline()
    
    expect($elm.css('display')).to.eql('inline')
  })

  it('shows an element flex', () => {
    let $elm = $('<div style="display: none;"></div>')

    $elm.showFlex()
    
    expect($elm.css('display')).to.eql('flex')
  })

  it('shows an element inline-flex', () => {
    let $elm = $('<div style="display: none;"></div>')

    $elm.showInlineFlex()
    
    expect($elm.css('display')).to.eql('inline-flex')
  })
})
