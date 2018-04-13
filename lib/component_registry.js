let { Component } = require('./component')

let registeredComponents = {}

/**
 * Register the component globally. Overrides any component with the same
 * name if it was already registered.
 */
exports.registerComponent = function(componentName, componentClass) {
  registeredComponents[componentName] = componentClass
}

/**
 * Boots a mutation observer on the root element. Whenever the contents inside
 * the root changes, we automatically call `connect` and `disconnect` for
 * the components, whetever it was inserted through ajax, dynamic 
 * templates or any source.
 *
 * @param {HTMLElement} root
 */
exports.watch = function(root) {
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

exports.connectComponents = function(rootElement) {
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

exports.render = function(componentName, opts) {
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
  let component = exports.connectComponents(node)[0]

  return { node, component }
}
