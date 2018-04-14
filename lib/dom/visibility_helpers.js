module.exports = function visibilityHelpers(source) {
  source.alias('hide', () => source.css('display', 'none'))

  source.alias('show', () => source.css('display', 'block'))

  source.alias('showInline', () => source.css('display', 'inline'))

  source.alias('showFlex', () => source.css('display', 'flex'))

  source.alias('showInlineFlex', () => source.css('display', 'inline-flex'))

  return source
}
