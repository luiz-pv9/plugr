export default class State {
  constructor() {
    this.data = {}
    this.callbacks = {}
  }

  set(key, value) {
    this.triggerCallbacks(key, value)

    let nestedData = this.data
    let keyParts = key.split('.')
    for(let i = 0; i < keyParts.length; i++) {
      key = keyParts[i]

      console.log("called", keyParts[i]);
      if(i === keyParts.length-1) {
        console.log("yay")
        this.data[key] = value
      } else {
        console.log("nay")
        this.data = nestedData = this.data[key] || {}
      }
    }
    console.log(this.data)
  }

  get(key) {
    console.log(this.data)
    return this.data[key]
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