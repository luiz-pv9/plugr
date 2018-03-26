import {Component} from '../../lib/component'
import {registerComponent, connectComponents} from '../../lib/component'
import {expect} from 'chai'

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
      <div data-component="my_component">
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

  it('disconnects when removed from the root')
})

