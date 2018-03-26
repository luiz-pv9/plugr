import {$} from '../../lib/plugr'
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
})