import './arrays/array_filter'
import './arrays/array_find'
import './arrays/array_for_each'
import './arrays/array_map'
import './arrays/array_reduce'

import pluginHelpers    from './dom/plugin_helpers'
import classHelpers     from './dom/class_helpers'
import attributeHelpers from './dom/attribute_helpers'
import targetHelpers    from './dom/target_helpers'
import queryHelpers     from './dom/query_helpers'
import eventHelpers     from './dom/event_helpers'
import contentHelpers   from './dom/content_helpers'

import { Component, registerComponent, connectComponents, watch } from './component'

// Public API
window.Plugr = { $, Component, registerComponent, connectComponents, watch }

/**
 * Wraps the given DOMElement or NodeList in a Plugr element. The Plugr element
 * provides an API very similar to jQuery.
 */
export function $(arg) {
  return wrapDOMElement(arg, [
    pluginHelpers,
    classHelpers,
    attributeHelpers,
    queryHelpers,
    targetHelpers,
    eventHelpers,
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
