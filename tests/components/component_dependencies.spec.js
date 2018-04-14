let { expect } = require('chai')
let { Component } = require('../../lib/component')

class WithDependencies extends Component {
  dependencies() {
    return ['example']
  }

  connect() {
    this.connectCalled = true
  }
}

describe('Component dependencies', () => {
  let root

  beforeEach(() => {
    root = document.createElement('div')

    root.innerHTML = `
      <div data-controller="with_dependencies">
      </div>
    `

    Plugr.setDependency('example', ['/example.js'])

    Plugr.registerComponent('with_dependencies', WithDependencies)
  })

  it('downloads dependency before component is connected', () => {
    Plugr.connectComponents(root)

    let component = root.querySelector('[data-controller="with_dependencies"]')

    expect(
      component.getComponent('with_dependencies').connectCalled
    ).to.be.undefined

    expect(latestRequest.url).to.eql('/example.js')
    respondLatestRequestWithJs(`var a = 10;`)

    expect(
      component.getComponent('with_dependencies').connectCalled
    ).to.eq(true)
  })
})