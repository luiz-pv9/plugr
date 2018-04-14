let cssHelpers        = require('./dom/css_helpers')
let classHelpers      = require('./dom/class_helpers')
let queryHelpers      = require('./dom/query_helpers')
let eventHelpers      = require('./dom/event_helpers')
let inputHelpers      = require('./dom/input_helpers')
let pluginHelpers     = require('./dom/plugin_helpers')
let targetHelpers     = require('./dom/target_helpers')
let contentHelpers    = require('./dom/content_helpers')
let attributeHelpers  = require('./dom/attribute_helpers')
let visibilityHelpers = require('./dom/visibility_helpers')

/**
 * Wraps the given DOMElement or NodeList in a Plugr element. The Plugr element
 * provides an API very similar to jQuery.
 */
exports.$ = function(arg) {
  return wrapDOMElement(arg, [
    pluginHelpers,
    cssHelpers,
    classHelpers,
    attributeHelpers,
    inputHelpers,
    queryHelpers,
    targetHelpers,
    eventHelpers,
    visibilityHelpers,
    contentHelpers,
  ])
}

/**
 * Returns an object with the given `arg` as the source
 * element with the helpers applied.
 *
 * @param {DOMElement|NodeList} arg
 * @param {function[]} helpers
 */
function wrapDOMElement(arg, helpers) {
  return helpers.reduce((arg, helper) => {
    return helper(arg)
  }, arg)
}
