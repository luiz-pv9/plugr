module.exports = function cssHelpers(source) {
  source.register('val', (node, value) => {
    if(!value) return node.value
    node.value = value
  })

  return source
}
