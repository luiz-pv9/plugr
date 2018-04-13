import '../../lib/plugr'
import {$} from '../../lib/dom_element'
import {expect} from 'chai'

describe('DOM query helpers', () => {
  it('finds a single element', () => {
    let $elm = $(createNode(`
      <div><span class="hello"></span></div>
    `))

    expect($elm.find('.hello').length).to.eq(1)
    expect($elm.find('.hello').prop('tagName')).to.eq('SPAN')
  })

  it('finds multiple elements', () => {
    let $elm = $(createNode(`
      <div>
        <span class="hello"></span>
        <span class="hello"></span>
      </div>
    `))

    expect($elm.find('.hello').length).to.eq(2)
  })

  it('finds multiple elements from multiple roots', () => {
    let node1 = createNode(`<div><span class="hello"></span></div>`)
    let node2 = createNode(`<div><span class="hello"></span></div>`)
    let $elm = $([node1, node2])

    expect($elm.find('.hello').length).to.eql(2)
  })

  it('doesnt find the root element itself', () => {
    let $elm = $(createNode(`
      <div class="hello"><span></span></div>
    `))

    expect($elm.find('.hello').length).to.eq(0)
  })

  it('finds the parent of a node', () => {
    let $elm = $(createNode(`
      <div class="hello"><span></span></div>
    `))

    let $span = $elm.find('span')

    expect($span.parent().length).to.eq(1)
    expect($span.parent().prop('tagName')).to.eql('DIV')
  })

  function createNode(html) {
    let div = document.createElement('div')
    div.innerHTML = html.trim()

    return div.childNodes[0]
  }
})
