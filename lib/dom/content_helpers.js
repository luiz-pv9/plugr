export default function contentHelpers(source) {
  source.registerFirst('html', (node, contents) => {
    if(contents === undefined) return node.innerHTML

    source.empty()
    source.append(contents)
  })

  source.registerFirst('append', (node, child) => {
    window.Plugr.$(child).eachNode(child => {
      node.appendChild(child)
    })
  })

  source.register('empty', (node) => {
    while(node.firstChild) {
      node.removeChild(node.firstChild)
    }
  })

  return source
}