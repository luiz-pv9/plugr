export default function pluginHelpers(arg) {
  if(typeof arg === 'string' || typeof arg === 'number') {
    let div = document.createElement('div')
    div.innerHTML = arg.toString().trim()
    arg = div.childNodes
  }

  if(arg instanceof NodeList) {
    arg = Array.prototype.slice.call(arg)
  } else if(arg instanceof HTMLElement || arg == document) {
    arg = [arg]
  } else if(arg.source) {
    arg = arg.source
  }

  let eachNode = (callback) => arg.forEach(callback)
  let firstNode = (callback) => callback(arg[0])

  return {
    source: arg,
    eachNode: eachNode,
    get length() {
      if(arg.length !== undefined) {
        return arg.length
      }

      if(!arg) {
        return 0
      }
      
      return 1
    },
    register(functionName, callback) {
      this[functionName] = function() {
        let args = Array.prototype.slice.call(arguments)

        eachNode(node => {
          callback.apply(null, [node].concat(args))
        })

        return this
      }
    },
    registerFirst(functionName, callback) {
      this[functionName] = function() {
        let args = Array.prototype.slice.call(arguments)

        let returnValue = firstNode(node => {
          return callback.apply(null, [node].concat(args))
        })

        return returnValue === undefined ? this : returnValue
      }
    },
    registerMapReduce(functionName, map, reduce) {
      this[functionName] = function() {
        let args = Array.prototype.slice.call(arguments)

        let values = []

        eachNode(node => {
          values.push(map.apply(null, [node].concat(args)))
        })

        return reduce(values)
      }
    },
    alias(functionName, callback) {
      this[functionName] = function() {
        let args = Array.prototype.slice.call(arguments)

        return callback.apply(null, args)
      }
    }
  }
}
