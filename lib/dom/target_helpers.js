export default function targetHelpers(source) {
  source.alias('target', (targetName) => {
    return source.find(`[data-target="${targetName}"]`)
  })

  return source
}
