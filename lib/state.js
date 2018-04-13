module.exports = class State {
  constructor() {
    this.data = {}
    this.callbacks = {}
  }

  set(key, value) {
    this.triggerCallbacks(key, value)
    this.data[key] = value
  }

  get(key) {
    return this.data[key]
  }

  getAll(key) {
    return Object.keys(this.data).filter(storedKey => {
      return storedKey.indexOf(key) === 0
    }).reduce((data, storedKey) => {
      let localKey = storedKey.replace(key + '.', '')

      data[localKey] = this.data[storedKey]

      return data
    }, {})
  }

  onChange(key, callback) {
    let callbacks = this.callbacks[key] = this.callbacks[key] || []
    callbacks.push(callback)
  }

  triggerCallbacks(key, newValue) {
    let callbacks = this.callbacks[key] = this.callbacks[key] || []
    callbacks.forEach(callback => callback(this.get(key), newValue))
  }
}