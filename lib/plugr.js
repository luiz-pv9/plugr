// Array polyfills for older browser
require('./arrays/array_map')
require('./arrays/array_find')
require('./arrays/array_filter')
require('./arrays/array_reduce')
require('./arrays/array_for_each')

let { Component } = require('./component')
let { registerComponent, connectComponents, watch } = require('./component_registry')
let { $ } = require('./dom_element')

let componentsBaseUrl = '/components'

let globalPublicAPI = { 
    $, Component, registerComponent, connectComponents, watch, componentsBaseUrl
}

if(typeof global !== undefined) {
    global.$ = $
    global.Plugr = globalPublicAPI
}

if(typeof window !== undefined) {
    window.$ = $
    window.Plugr = globalPublicAPI
}
