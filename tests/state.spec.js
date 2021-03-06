let { expect } = require('chai')
let State = require('../lib/state')

describe('State specs', () => {
  let state

  beforeEach(() => {
    state = new State()
  })

  it('sets and gets values', () => {
    state.set('name', 'Bird')

    expect(state.get('name')).to.eql('Bird')
  })

  it('sets and gets nested objects', () => {
    state.set('name.first', 'Harry')
    state.set('name.last', 'Potter')

    expect(state.getAll('name')).to.eql({ first: 'Harry', last: 'Potter' })
  })

  it('notify on change', (done) => {
    state.onChange('name', (oldVal, newVal) => {
      expect(oldVal).to.be.undefined
      expect(newVal).to.eql('Bird')

      done()
    })

    state.set('name', 'Bird')
  })
})
