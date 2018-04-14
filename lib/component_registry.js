let { Component } = require('./component')
let request = require('./request')
let { ensureDependenciesLoaded } = require('./dependencies')

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
  let nodes = rootElement.querySelectorAll('[data-controller]')
  nodes = Array.prototype.slice.call(nodes)
  nodes.unshift(rootElement)

  return nodes.map(node => {
    let componentName = node.getAttribute('data-controller')

    if(componentName) {
      let componentInstance = connectComponent(node, componentName)

      if(componentInstance) {
        injectComponetAPI(node)
        return componentInstance
      }
    }
  })
}

function connectComponent(node, componentName) {
  let componentClass = registeredComponents[componentName]

  if(!componentClass) {
    return attemptToDownloadRemoteComponent(node, componentName)
  }

  let instance = new componentClass(node)

  if(instance.dependencies && instance.dependencies()) {
    ensureDependenciesLoaded(instance.dependencies(), () => {
      instance.connect()
    })
  } else {
    instance.connect()
  }

  node.__initializedComponents = node.__initializedComponents || {}
  node.__initializedComponents[componentName] = instance

  return instance
}

function attemptToDownloadRemoteComponent(node, componentName) {
  request('get', Plugr.componentsBaseUrl + '/' + componentName + '.js', {
    success() {
      // We can call 'connectComponent' safely again now that the remote
      // component has been registered.
      connectComponent(node, componentName)
    }
  })
}

function injectComponetAPI(node) {
  node.getComponent = (name) => {
    return node.__initializedComponents && node.__initializedComponents[name]
  }
}

exports.render = function(componentName, opts) {
  let node = document.createElement('div')
  node.setAttribute('data-controller', componentName)

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
