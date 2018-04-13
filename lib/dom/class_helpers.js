module.exports = function classHelpers(source) {
  source.register('addClass', (node, className) => {
    className.split(' ').forEach(className => {
      node.classList.add(className)
    })
  })

  source.register('removeClass', (node, className) => {
    className.split(' ').forEach(className => {
      node.classList.remove(className)
    })
  })

  source.register('toggleClass', (node, className, conditional) => {
    className.split(' ').forEach(className => {
      node.classList.toggle(className, conditional)
    })
  })

  return source
}