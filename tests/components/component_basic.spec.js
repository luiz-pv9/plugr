let { expect } = require('chai')
let { Component } = require('../../lib/component')
let { registerComponent, connectComponents } = require('../../lib/component_registry')

class MyComponent extends Component {
  connect() {
    this.connectCalled = true
  }

  disconnect() {
  }
}

describe('Component basic specs', () => {
  let rootElement

  beforeEach(() => {
    registerComponent('my_component', MyComponent)

    rootElement = document.createElement('div')

    rootElement.innerHTML = `
      <div data-controller="my_component">
        <div data-target="hello"></div>

        <div data-target="funk"></div>
        <div data-target="funk"></div>
      </div>
    `

    connectComponents(rootElement)
  })

  it('has a reference to the component instance', () => {
    let node = rootElement.querySelector('div')

    expect(node.getComponent('other_component')).to.be.undefined
    expect(node.getComponent('my_component')).to.be.an.instanceof(MyComponent)
  })

  it('has an $elm property', () => {
    let node = rootElement.querySelector('div')

    let $elm = node.getComponent('my_component').$elm

    expect($elm.prop('tagName')).to.eq('DIV')
  })

  it('connects when inserted in the root', () => {
    let node = rootElement.querySelector('div')

    expect(node.getComponent('my_component').connectCalled).to.eq(true)
  })

  it('finds targets', () => {
    let component = rootElement.querySelector('div').getComponent('my_component')

    expect(component.target('hello').length).to.eq(1)
    expect(component.target('funk').length).to.eq(2)
  })

  // it.only('adds data-controller-initialized after it has been initialized', () => {
  //   let component = rootElement.querySelector('[data-controller="my_component"]')
  //   expect(component.getAttribute('data-controller-initialized')).to.eql('my_component')
  // })
})

