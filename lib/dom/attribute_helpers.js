export default function attributeHelpers(source) {
  source.registerFirst('prop', (node, propName) => {
    return node[propName]
  })

  source.registerFirst('attr', (node, name, value) => {
    if(value === undefined) return node.getAttribute(name)
    if(value === false) return node.removeAttribute(name)
    node.setAttribute(name, value)
  })

  source.alias('data', (name, value) => {
    return source.attr('data-' + name, value)
  })

  return source
}
