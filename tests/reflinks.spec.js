import {expect} from 'chai'
import {$} from '../lib/plugr'
import Reflinks from '../lib/reflinks'

describe('Reflinks spec', () => {
  let root, reflinks

  beforeEach(() => {
    root = document.createElement('div')

    root.innerHTML = `
      <div>
        <a href="/page-1">Page 1</a>
        <a href="/page-2" data-reflinks="false">Page 2</a>
        <a href="/page-3" data-reflinks="modal">Page 3</a>
        <a href="/page-4"><span>Page 4</span></a>
        <a href="#">Ignored link</a>

        <div data-reflinks="root">Original content</div>
      </div>
    `

    reflinks = new Reflinks()
    reflinks.initialize(root)
  })
  
  it('visit a new page when clicking link', (done) => {
    click("/page-1")

    expect(latestRequest.url).to.eql('/page-1')

    respondLatestRequestWithHtml(`<div data-reflinks="root">New content</div>`)

    setTimeout(() => {
      expect(rootContent()).to.eql('New content')
      done()
    })
  })

  it('visits a page programatically', () => {
    reflinks.visit('/page-1')

    expect(latestRequest.url).to.eql('/page-1')
  })

  it('pushes a new state to the browser history', (done) => {
    reflinks.visit('/page-1')

    respondLatestRequestWithHtml(`<div data-reflinks="root">New content</div>`)

    setTimeout(() => {
      expect(history.currentUrl).to.eql('/page-1')
      done()
    }, 10)
  })

  it('opens a modal and pushes a new state', (done) => {
    click('/page-3')

    respondLatestRequestWithHtml(`<div data-reflinks="root">Modal content</div>`)

    setTimeout(() => {
      // Root content should still be the same
      expect(rootContent()).to.eql('Original content')

      // A modal should be on screen
      expect(document.querySelectorAll('.modal').length).to.eq(1)
      expect(modalContent()).to.eql('Modal content')

      // The path should be
      expect(history.currentUrl).to.include('#modal=/page-3')

      done()
    })
  })

  it('visit a page when clicking an element inside the anchor tag', () => {
    let $span = $(root).find('[href="/page-4"] span').trigger('click')

    expect(latestRequest.url).to.eql('/page-4')
  })

  it('ignores links with href=#', () => {
    let previousHistoryLength = history.length

    click('#')

    expect(history.length).to.eq(previousHistoryLength)
  })

  it('throws an error if the response has no root')
  it('does nothing when clinking data-reflinks=false')
  it('replaces data-reflinks=root with new content')
  it('handles history onpop by restoring a cached page')
  it('handles history onpop by sending a new request')

  function click(href) {
    root.querySelector('[href="'+href+'"]').click()
  }

  function rootContent() {
    return root.querySelector(['[data-reflinks="root"]']).innerHTML
  }

  function modalContent() {
    return document.querySelector('.modal [data-reflinks="root"]').innerHTML
  }
})
