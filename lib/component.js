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

let registeredComponents = {}

export function registerComponent(componentName, componentClass) {
  registeredComponents[componentName] = componentClass
}

export function watch(root) {
  let mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      console.log('mutation', mutation)
    })
  })

  mutationObserver.observe(root, {
    childList: true,
    subtree: true
  })
}

export function connectComponents(rootElement) {
  let nodes = rootElement.querySelectorAll('[data-component]')
  nodes = Array.prototype.slice.call(nodes)
  nodes.unshift(rootElement)

  return nodes.map(node => {
    let componentName = node.getAttribute('data-component')

    if(componentName) {
      let componentInstance = connectComponent(node, componentName)
      injectComponetAPI(node)

      return componentInstance
    }
  })
}

function connectComponent(node, componentName) {
  let componentClass = registeredComponents[componentName]

  let instance = new componentClass(node)

  instance.connect()

  node.__initializedComponents = node.__initializedComponents || {}
  node.__initializedComponents[componentName] = instance

  return instance
}

function injectComponetAPI(node) {
  node.getComponent = (name) => {
    return node.__initializedComponents && node.__initializedComponents[name]
  }
}

export function render(componentName, opts) {
  let node = document.createElement('div')
  node.setAttribute('data-component', componentName)

  if(typeof opts === 'string') {
    node.innerHTML = opts
  } else if(typeof opts === 'object') {
    Object.keys(opts).forEach(key => {
      if(key === 'innerHTML') {
        node.innerHTML = key
      } else {
        node.dataset[key] = opts[key]
      }
    })
  }

  // connectComponents returns an array of component instances, so we'll
  // just grab the first one that should be the root component.
  let component = connectComponents(node)[0]

  return { node, component }
}
