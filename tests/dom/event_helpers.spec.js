import '../../lib/plugr'
import {$} from '../../lib/dom_element'
import {expect} from 'chai'

describe('DOM events', () => {
  it('registers an event on a single element', () => {
    let clickCalled = false

    let $elm = div().on('click', () => clickCalled = true)

    $elm.trigger('click')

    expect(clickCalled).to.eq(true)
  })

  it('registers an event on multiple elements', () => {
    let node1 = document.createElement('div')
    let node2 = document.createElement('div')

    let $elm = $([node1, node2])

    let clickCalledCount = 0

    $elm.on('click', () => {
      clickCalledCount += 1
    })

    node1.click()
    node2.click()

    expect(clickCalledCount).to.eq(2)
  })

  it('passes the target as the second argument', () => {
    let node1 = document.createElement('div')
    let node2 = document.createElement('div')

    let $elm = $([node1, node2])

    let clickCalledWithTarget = null

    $elm.on('click', (node, target) => {
      clickCalledWithTarget = target
    })

    node2.click()

    expect(clickCalledWithTarget).to.eq(node2)
  })

  it('removes the event handler', () => {
    let clickCalled = false

    let $elm = div()

    let handler = () => clickCalled = true

    $elm.on('click', handler)
    $elm.off('click', handler)

    $elm.trigger('click')

    expect(clickCalled).to.eq(false)
  })

  function div() {
    return $(document.createElement('div'))
  }
})
