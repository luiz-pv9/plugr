export class Component {
  constructor(node) {
    this.node = node
    this.$elm = window.Plugr.$(node)

    if(typeof this.template === 'function') {
      this.$elm.html(this.template())
    }
  }

  target(targetName) {
    return this.$elm.target(targetName)
  }

  data(name, value) {
    return this.$elm.data(name, value)
  }

  on(eventName, handler) {
    this.$elm.on(eventName, handler)
  }

  off(eventName, handler) {
    this.$elm.off(eventName, handler)
  }

  trigger(eventName, data) {
    this.$elm.trigger(eventName, data)
  }

  findComponent(name, attributes) {
    let $component = this.$elm.find('[data-component="'+name+'"]')
    if($component.length > 0) {
      if(attributes) {
        let node = $component.source.find(node => {
          return Object.keys(attributes).map(key => {
            return window.Plugr.$(node).data(key) == attributes[key]
          }).every(e => e)
        })

        if(node) return node.getComponent(name)
      } else {
        return $component.source[0].getComponent && $component.source[0].getComponent(name)
      }
    }
  }

  // Default implementation to prevent errors
  connect() {}
  disconnect() {}
}
