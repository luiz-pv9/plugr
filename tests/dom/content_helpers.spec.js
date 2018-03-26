import {$} from '../../lib/plugr'
import {expect} from 'chai'

describe('DOM content helpers spec', () => {
  it('reads the inner html', () => {
    let $elm = $('<div>Hello</div>')

    expect($elm.html()).to.eql('Hello')
  })

  it('sets the html as string', () => {
    let $elm = $('<div>Hello</div>').html('Funk')

    expect($elm.html()).to.eq('Funk')
  })

  it('sets the html as plugr element', () => {
    let $span = $('<span>Hello</span>')
    let $elm = $('<div></div>').html($span)

    expect($elm.html()).to.eql('<span>Hello</span>')
  })

  it('appends a child element as string', () => {
    let $elm = $('<div></div>').append('<span>Hello</span>')

    expect($elm.html()).to.eql('<span>Hello</span>')
  })

  it('appends a child element as an element', () => {
    let $span = $('<span>Hello</span>')
    let $elm = $('<div></div>').append($span)

    expect($elm.html()).to.eql('<span>Hello</span>')
  })

  it('removes all childNodes', () => {
    let $elm = $('<div><span></span><span></span></div>')
    $elm.empty()

    expect($elm.html()).to.eql('')
  })
})
