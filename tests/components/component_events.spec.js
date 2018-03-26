import {Component, registerComponent, render} from '../../lib/component'
import {expect} from 'chai'

class MyComponent extends Component {
  triggerHello() {
    this.trigger('hello')
  }
}

describe.only('Component event specs', () => {
  beforeEach(() => {
    registerComponent('my_component', MyComponent)
  })

  it('calls an event handler', () => {
    let handlerCalled = false

    let {component} = render('my_component')

    component.on('hello', () => handlerCalled = true)

    component.triggerHello()

    expect(handlerCalled).to.eq(true)
  })

  it('calls multiple event handlers', () => {
    let handlerCalls = []

    let {component} = render('my_component')

    component.on('hello', () => handlerCalls.push(true))
    component.on('hello', () => handlerCalls.push(true))

    component.triggerHello()

    expect(handlerCalls).to.have.length(2)
  })
})