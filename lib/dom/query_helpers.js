export default function queryHelpers(source) {

  source.registerMapReduce('find', (node, selector) => {
    return node.querySelectorAll(selector)
  }, (allChildren) => {
    let flattened = []

    allChildren.forEach(nodes => {
      for(let i = 0; i < nodes.length; i++) {
        flattened.push(nodes[i])
      }
    })

    return window.Plugr.$(flattened)
  })

  source.registerFirst('parent', node => {
    return window.Plugr.$(node.parentNode)
  })

  return source
}
