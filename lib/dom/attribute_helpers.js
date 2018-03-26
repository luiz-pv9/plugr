export default function attributeHelpers(source) {
  source.registerFirst('prop', (node, propName) => {
    return node[propName]
  })

  return source
}