import '../../lib/plugr'
import {$} from '../../lib/dom_element'
import {expect} from 'chai'

describe('DOM target helpers', () => {
  it('finds a single target', () => {
    let $elm = $(createNode(`
      <div>
        <span data-target="color"></span>
      </div>
    `))

    expect($elm.target('color').length).to.eq(1)
    expect($elm.target('color').prop('tagName')).to.eql('SPAN')
  })

  it('finds multiple targets', () => {
    let $elm = $(createNode(`
      <div>
        <span data-target="color"></span>
        <span data-target="color"></span>
      </div>
    `))

    expect($elm.target('color').length).to.eq(2)
  })

  function createNode(html) {
    let div = document.createElement('div')
    div.innerHTML = html.trim()

    return div.childNodes[0]
  }
})
