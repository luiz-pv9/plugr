import '../../lib/plugr'
import {$} from '../../lib/dom_element'
import {expect} from 'chai'

describe('DOM attribute helpers', () => {
  it('finds the element ID', () => {
    let div = document.createElement('div')
    div.id = 'hello'

    expect($(div).prop('id')).to.eql('hello')
  })

  it('finds the element className', () => {
    let div = document.createElement('div')
    div.className = 'blue red'

    expect($(div).prop('className')).to.eql('blue red')
  })

  it('finds attributes', () => {
    let $elm = $('<a href="/example"></a>')

    expect($elm.attr('href')).to.eql('/example')
  })

  it('sets attributes', () => {
    let $elm = $('<a href="/example"></a>').attr('href', '/funk')

    expect($elm.attr('href')).to.eql('/funk')
  })

  it('finds data attributes', () => {
    let $elm = $('<div data-id="3"></div>')

    expect($elm.data('id')).to.eql('3')
  })

  it('sets data attributes', () => {
    let $elm = $('<div data-id="3"></div>').data('id', 4)

    expect($elm.data('id')).to.eql('4')
  })
})
