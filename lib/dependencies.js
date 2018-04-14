let dependencies = {}
let loadedDependencies = {}

exports.setDependency = function setDependency(name, files) {
  dependencies[name] = files
}

exports.ensureDependenciesLoaded = function ensureDependencyLoaded(names, callback) {
  let totalFiles = names.reduce((total, depName) => {
    return total + dependencies[depName].length
  }, 0)

  let loadedFiles = 0

  let updatedLoadedDependencies = () => names.forEach(name => loadedDependencies[name] = true)

  names.forEach(depName => {
    if(loadedDependencies[depName]) {
      loadedFiles += dependencies[depName].length
      return
    }

    dependencies[depName].forEach(file => {
      Plugr.request('get', file, {
        success() {
          loadedFiles += 1

          if(loadedFiles >= totalFiles) {
            updatedLoadedDependencies()
            callback()
          }
        }
      })
    })
  })

  if(loadedFiles >= totalFiles) {
    callback()
  }
}