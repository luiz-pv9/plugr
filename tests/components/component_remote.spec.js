let { expect } = require('chai')
let { Component } = require('../../lib/component')

describe.only('Remote component specs', () => {
  let root

  let componentScript = `
    class Timepicker extends Plugr.Component {
      connect() {
        this.$elm.html('Tick tack')
      }
    }

    Plugr.registerComponent('timepicker', Timepicker)
  `

  beforeEach(() => {
    root = document.createElement('div')
    root.innerHTML = `
      <div data-component="timepicker">
      </div>
    `
  })

  it('tries to download a component if not registered', () => {
    Plugr.connectComponents(root)

    expect(latestRequest.url).to.eql('/components/timepicker.js')
  })

  it('initializes the component after the remote script is downloaded', () => {
    Plugr.connectComponents(root)

    respondLatestRequestWithJs(componentScript)

    expect(root.querySelector('[data-component="timepicker"]').innerHTML).to.eql('Tick tack')
  })

  it('adds an overlay on top of the div while it loads')

  it('removes the overlay once the component is initialized')
})
