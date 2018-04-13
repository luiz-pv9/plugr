import '../../lib/plugr'
import {Component} from '../../lib/component'
import {registerComponent, render} from '../../lib/component_registry'
import {expect} from 'chai'

class ComponentWithTemplate extends Component {
  template() {
    return `
      <div data-target="hello">Hello</div>
    `
  }
}

describe('Component with custom template', () => {
  beforeEach(() => {
    registerComponent('with_template', ComponentWithTemplate)
  })

  it('inserts the template as the innerHTML of the component', () => {
    let {node, component} = render('with_template')
    expect(node.innerHTML).to.include('data-target="hello"')
  })

  it('target works correctly when inserted through the template', () => {
    let {node, component} = render('with_template')

    expect(component.target('hello').length).to.eql(1)
  })
})
