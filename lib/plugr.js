// Array polyfills for older browser
import './arrays/array_map'
import './arrays/array_find'
import './arrays/array_filter'
import './arrays/array_reduce'
import './arrays/array_for_each'

import { Component } from './component'
import { registerComponent, connectComponents, watch } from './component_registry'
import { $ } from './dom_element'

window.Plugr = { $, Component, registerComponent, connectComponents, watch }
