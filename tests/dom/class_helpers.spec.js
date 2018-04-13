import '../../lib/plugr'
import {$} from '../../lib/dom_element'
import {expect} from 'chai'

describe('DOM class helpers', () => {
  it('adds a class', () => {
    let $elm = div().addClass('hello')
    expect($elm.prop('className')).to.eql('hello')
  })

  it('removes a class', () => {
    let $elm = div().addClass('hello').removeClass('hello')
    expect($elm.prop('className')).to.eql('')
  })

  it('toggles a class', () => {
    let $elm = div().toggleClass('hello')

    expect($elm.prop('className')).to.eql('hello')

    $elm.toggleClass('hello')

    expect($elm.prop('className')).to.eql('')
  })

  it('toggles a class based on a conditional', () => {
    let $elm = div().toggleClass('hello', false)

    expect($elm.prop('className')).to.eql('')

    $elm.toggleClass('hello', true)

    expect($elm.prop('className')).to.eql('hello')
  })

  function div() {
    return $(document.createElement('div'))
  }
})
