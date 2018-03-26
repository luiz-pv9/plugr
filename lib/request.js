/**
 * Sends AJAX request.
 * 
 * @param {string} method HTTP method (GET, POST, PUT, etc.)
 * @param {string} url Path of the url (e.g /some/thing)
 * @param {object} opts Options of the request.
 * @return {Promise} Resolves or rejects with the response from the server.
 */
export default function request(method, url, opts = {})  {
    let xhr = new XMLHttpRequest()

    // dom.trigger(document, 'request:start', { url })

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            let contentType = xhr.getResponseHeader('content-type') || 'text'
            let response = xhr.responseText

            if(/json/.test(contentType)) {
                response = JSON.parse(response)
            } else if(/javascript/.test(contentType)) {
                response = eval(response)
            } else if(/css/.test(contentType)) {
                let styleTag = document.createElement('style')
                styleTag.type = 'text/css'

                let styleTextNode = document.createTextNode(response)
                styleTag.appendChild(styleTextNode)

                document.head.appendChild(styleTag)
            }

            // dom.trigger(document, 'request:end', { url })

            if(xhr.status >= 200 && xhr.status <= 299) {
                // dom.trigger(document, 'request:success', { response })
                if(opts.success) opts.success(response)
            } else {
                // dom.trigger(document, 'request:error', { response })

                if(opts.error) {
                    console.log("tinha opts.error")
                    opts.error(response, xhr)
                } else {
                    console.log("no opts.error")
                    console.error(response)
                }
            }
        }
    }

    xhr.open(method, url, true)

    // Append csrf-token to the request if request is sent to the same origin
    let differentOrigin = (url.indexOf('http') !== -1 && 
        url.indexOf(document.location.hostname) === -1)

    let token = document.querySelector('meta[name="csrf-token"]')
    if(token && !differentOrigin) {
        xhr.setRequestHeader('X-CSRF-TOKEN', token.content)
    }

    let sendData = null

    if(opts.data) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

        if(opts.data instanceof FormData) {
            sendData = opts.data
        } else if(typeof opts.data === 'object') {
            sendData = JSON.stringify(opts.data)
            xhr.setRequestHeader('content-type', 'application/json')
        }
    }

    if(opts.uploadProgress && xhr.upload) {
        xhr.upload.addEventListener('progress', e => {
            console.log(e.loaded, e.total)
            var pc = (e.loaded / e.total * 100)
            opts.uploadProgress(pc)
    }, false)
    }

    xhr.send(sendData)

    return xhr
}
