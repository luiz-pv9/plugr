module.exports = function eventHelpers(source) {
  source.register('on', (node, eventName, handler) => {
    let wrappedHandler = ev => handler(ev, node)

    node.__eventHandlers = node.__eventHandlers || {}
    node.__eventHandlers[handler] = wrappedHandler

    node.addEventListener(eventName, wrappedHandler)
  })

  source.register('off', (node, eventName, handler) => {
    let wrappedHandler = node.__eventHandlers ?
      node.__eventHandlers[handler] :
      handler

    node.removeEventListener(eventName, wrappedHandler)
  })

  source.registerFirst('trigger', (node, eventName, data) => {
    let event = new CustomEvent(eventName, { detail: data });
    return node.dispatchEvent(event);
  })

  return source
}