if(!Array.prototype.forEach) {
  Array.prototype.forEach = function(fn, scope) {
    for(let i = 0, len = this.length; i < len; ++i) {
      fn.call(scope, this[i], i, this)
    }
  }
}