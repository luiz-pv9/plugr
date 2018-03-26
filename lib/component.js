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

  on(eventName, handler) {
    this.$elm.on(eventName, handler)
  }

  off(eventName, handler) {
    this.$elm.off(eventName, handler)
  }

  trigger(eventName, data) {
    this.$elm.trigger(eventName, data)
  }

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
  let components = rootElement.querySelectorAll('[data-component]')

  Array.prototype.forEach.call(components, (node) => {
    let componentName = node.getAttribute('data-component')

    connectComponent(node, componentName)

    injectComponetAPI(node)
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

export function render(componentName) {
  let node = document.createElement('div')
  node.setAttribute('data-component', componentName)
  let component = connectComponent(node, componentName)

  return { node, component }
}
