module.exports = function cssHelpers(source) {
  source.register('css', (node, attribute, value) => {
    if(value) {
      node.style[attribute] = value
    } else {
      return node.style[attribute]
    }
  })

  return source
}
