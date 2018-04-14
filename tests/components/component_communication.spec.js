let { expect } = require('chai')
let { Component } = require('../../lib/component')
let { registerComponent, render } = require('../../lib/component_registry')

class NestedComponent extends Component { }
class MyComponent extends Component { }

describe('Component communication', () => {
  beforeEach(() => {
    registerComponent('nested_component', NestedComponent)
    registerComponent('my_component', MyComponent)
  })

  it('doesnt find a component if there are none', () => {
    let {component} = render('my_component')

    expect(component.findComponent('nested_component')).to.be.undefined
  })

  it('finds a component inside itself', () => {
    let {component} = render('my_component', `
      <div data-controller="nested_component">
      </div>
    `)

    let nestedComponent = component.findComponent('nested_component')

    expect(nestedComponent).to.be.an.instanceof(NestedComponent)
  })

  it('finds a component with specific data attributes', () => {
    let {component} = render('my_component', `
      <div data-controller="nested_component" data-id="2">
      </div>

      <div data-controller="nested_component" data-id="3">
      </div>
    `)

    let nestedComponent = component.findComponent('nested_component', { id: '3' })

    expect(nestedComponent.data('id')).to.eq('3')
  })
})
