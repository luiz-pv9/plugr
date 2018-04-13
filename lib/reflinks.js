let request = require('./request')

module.exports = class Reflinks {
  constructor() {
    this.cachedPages = {}
    this.modals = []
    this.currentRoot = null
  }

  /**
   * Intercepts clicks on links inside the body.
   * 
   * @param {HTMLElement} body 
   */
  initialize(body) {
    this.extractCurrentRoot(body)

    body.addEventListener('click', ev => {
      let target = ev.target

      // Check for clicks in elments inside an achor tag. For example:
      // <a href="/page"><span>Foo</span></a>
      while(target && target.tagName !== 'A') {
        target = target.parentNode
      }

      if(target) {
        // Ignore links that open in a new tab
        if(target.getAttribute('target') === '_blank') {
          return
        }

        if(target.getAttribute('data-reflinks') === 'false') {
          return
        }

        if(target.getAttribute('href') == '#') {
          return
        }

        ev.preventDefault()

        if(target.getAttribute('data-reflinks') === 'modal') {
          this.visitModal(target.href)
        } else {
          this.visit(target.href)
        }
      }
    }, true)

    // Maybe there is leftover modal to be open
    let modalRegex = /\#modal\=([^\s]+)/
    let match = modalRegex.exec(document.location.href)
    if(match && match[1]) {
      this.visitModal(match[1])
    }
  }

  /**
   * Tries to find data-reflinks=root inside the given body. Throws an error
   * if it doesn't find.
   * 
   * @param {HTMLElement} body 
   */
  extractCurrentRoot(body) {
    this.currentRoot = body.querySelector('[data-reflinks="root"]')

    if(!this.currentRoot) {
      throw new Error('Could not find document root on the page.')
    }
  }

  /**
   * Reloads the current page persisting query params and hash.
   */
  reload() {
    this.visit(document.location.href, { action: 'replace' })
  }

  /**
   * Visits a new page and replaces root element.
   * 
   * @param {string} href Path to visit.
   */
  visit(href, opts = {}) {
    window.Plugr.$(document).trigger('reflinks:start_visit', { url: href })

    let xhr = request('GET', href, {
      success: (res) => {
        let newRoot = this.extractRoot(res)
        this.currentRoot.parentNode.replaceChild(newRoot, this.currentRoot)
        this.currentRoot = newRoot

        let location = this.normalizeLocation(href, xhr)

        if(opts.action === 'replace') {
          this.replaceHistory(location)
        } else {
          this.advance(location)
        }

        this.triggerVisit()
      },
      error(err) {
        console.error(err)
      }
    })

    return xhr
  }

  /**
   * Visits a new page but opening the html in a modal above the current page
   * without changing the current root.
   * 
   * @param {string} href 
   */
  visitModal(href) {
    window.Plugr.$(document).trigger('reflinks:start_visit', {url: href})

    let xhr = request('GET', href, {
      success: (res) => {
        this.closeLatestModal()

        let root = this.extractRoot(res)
        this.openModal(root)

        this.replaceHistoryWithModal(this.normalizeLocation(href, xhr))

        window.Plugr.$(document).trigger('reflinks:end_visit', {root})
      },
      error(err) {
        console.error(err)
      }
    })

    return xhr
  }

  /**
   * Returns the new location the page should display.
   * 
   * @param {string} url
   * @param {XMLHttpRequest} xhr
   * @return {string}
   */
  normalizeLocation(url, xhr) {
    if(xhr.getResponseHeader('X-Reflinks-Location')) {
      return xhr.getResponseHeader('X-Reflinks-Location')
    }

    return url
  }

  /**
   * Triggers the 'reflinks:end_visit' event on the document.
   */
  triggerVisit() {
    window.Plugr.$(document).trigger('reflinks:end_visit', {root: this.currentRoot})
  }

  /**
   * Opens a modal above the current page with the given html root content.
   * 
   * @param {HTMLElement} root 
   */
  openModal(root) {
    window.Plugr.$(document.body).addClass('overflow-hidden')

    let modal = document.createElement('div')
    modal.className = 'modal'
    modal.appendChild(root)

    let backdrop = document.createElement('div')
    backdrop.className = 'modal-backdrop'
    backdrop.addEventListener('click', (ev) => {
      if(ev.target == backdrop) {
        this.closeLatestModal()
      }
    })

    backdrop.appendChild(modal)

    document.body.appendChild(backdrop)

    this.modals.push({ modal, backdrop })
  }

  /**
   * Close the latest modal opened by Reflinks.
   */
  closeLatestModal() {
    if(this.isModalOpen()) {
      let { modal, backdrop } = this.modals.pop()
      if(backdrop) backdrop.parentNode.removeChild(backdrop)
      if(modal) modal.parentNode.removeChild(modal)
      this.removeModalFromHistory()

      window.Plugr.$(document.body).removeClass('overflow-hidden')
    }
  }

  /**
   * Checks if there is an open modal on the screen.
   *
   * @return {Boolean}
   */
  isModalOpen() {
    return this.modals.length > 0
  }

  /**
   * Parses the given HTML and tries to find an element with 
   * data-reflinks="root". If it can't be found an error is thrown.
   * 
   * @param {string} html 
   * @return HTMLElement Root
   */
  extractRoot(html) {
    let doc = document.createElement('html')
    doc.innerHTML = html
    let root = doc.querySelector('[data-reflinks="root"]')

    if(!root) {
      throw new Error('Could not find root element on HTML: ' + html)
    }

    return root
  }

  /**
   * Advances the browser navigation history to the given path.
   * 
   * @param {string} href 
   */
  advance(href) {
    history.pushState(null, href, href)
  }

  /**
   * Advances the browser navigation history to the given path using hash
   * param to indicate modal state.
   * 
   * @param {string} href 
   */
  replaceHistoryWithModal(href) {
    // Remove protocol and domain from the href to make the url prettier.
    href = href.replace(document.location.host, "")
    href = href.replace(document.location.protocol + '//', '')

    let currentPath = document.location.pathname + document.location.search
    let newPath = currentPath +  '#modal=' + href
    return this.replaceHistory(newPath)
  }

  /**
   * Clears the "#modal=..." part of the url by replacing the current state
   * in history.
   */
  removeModalFromHistory() {
    let modalRegex = /\#modal\=([^\s]+)/
    let match = modalRegex.exec(document.location.href)
    if(match) {
      let newUrl = document.location.href.replace(match[0], "")
      this.replaceHistory(newUrl)
    }
  }

  /**
   * Replaces the current history state with the given href
   */
  replaceHistory(href) {
    history.replaceState(null, href, href)
  }
}
