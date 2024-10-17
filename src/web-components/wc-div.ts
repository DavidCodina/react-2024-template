/* eslint-disable @typescript-eslint/no-namespace */
import { DetailedHTMLProps, HTMLAttributes } from 'react'

import {
  cssPropertiesToString,
  convertReactClassName,
  isStringifiedArray,
  isStringifiedObject
} from './utlis'

///////////////////////////////////////////////////////////////////////////
//
// Declaring the type in the same file is useful for React ONLY cases, but makes
// less sense as soon as you consider that it could be implemented in other frameworks.
// Usage: In main.tsx do: import './web-components/wc-div'
// Then use anywhere as follows:
//
//   <wc-div
//     ref={wcDivRef}
//     style={{ border: '1px solid var(--tw-blue-500)' }}
//     className='mx-auto max-w-[600px] cursor-pointer rounded-lg bg-white p-2 shadow-lg'
//     divClassName='font-black text-blue-500 text-3xl text-center'
//     // divStyle={JSON.stringify({ outline: '2px dashed green' })}
//     // divStyle='outline: 2px dashed orange;'
//     // divStyle={`
//     //   outline: 2px dashed orange;
//     //   background-color: var(--tw-neutral-100);
//     // `}
//     onClick={() => alert('Whuddup!')}
//     globalCSSPath={'/src/styles/main.css'}
//     data={JSON.stringify(['Muffy', 1, true])}
//   >
//     Read A Book
//   </wc-div>
//
///////////////////////////////////////////////////////////////////////////

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wc-div': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        divClassName?: string
        globalCSSPath?: string
        divStyle?: string
        data?: any
      }
    }
  }
}

/* ========================================================================

======================================================================== */

class WCDiv extends HTMLElement {
  constructor() {
    super()
  }

  ///////////////////////////////////////////////////////////////////////////
  //
  // This approach doesn't use the shadow DOM, which makes it work with global CSS out of the box.
  // The downside is that you can't leverage the shadow DOM's encapsulation, <slots>, etc.
  // connectedCallback() {
  //   this.removeAttribute('globalCSSPath')
  //   convertReactClassName(this)
  //   this.style.display = 'block' // Default is inline
  //   const div = document.createElement('div')
  //   const divClassName = this.getAttribute('divClassName') || ''
  //   this.removeAttribute('divClassName')
  //   if (div instanceof HTMLElement) {
  //     if (typeof divClassName === 'string') {
  //       div.setAttribute('class', divClassName)
  //     }
  //   }
  //   // Move any innerHTML / children to the div.
  //   div.innerHTML = this.innerHTML
  //   this.innerHTML = ''
  //   this.appendChild(div)
  // }
  //
  ///////////////////////////////////////////////////////////////////////////

  connectedCallback() {
    convertReactClassName(this)
    this.style.display = 'block' // Default is inline

    /* ======================
            data
    ====================== */

    let data: any = this.getAttribute('data') || ''
    this.removeAttribute('data')

    if (isStringifiedObject(data) || isStringifiedArray(data)) {
      data = JSON.parse(data)
      console.log('data;', data)
    }

    /* ======================
            shadow
    ====================== */

    const template = document.createElement('template')
    const globalCSSPath = this.getAttribute('globalCSSPath') || ''
    this.removeAttribute('globalCSSPath')

    // If you want global CSS to work inside of your component, then you need to bring it in.
    // Rather than hardcoding `@import '/src/styles/main.css';`, we can use globalCSSPath.
    // But actually, a better approach would be to use an array in order to add multiple stylesheets.
    template.innerHTML = `
    <style>
      ${globalCSSPath && `@import '${globalCSSPath}';`}
      div {
        /* Your styles here... */
        /* outline: 2px dashed red; */
      }
    </style>

    <div>
      <slot></slot>
    </div>
    `

    // If we wanted to get the div from a ref, then we'd need to do this:
    // const div = wcDiv.shadowRoot.querySelector('div')
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.append(template.content.cloneNode(true))

    /* ======================
              div
    ====================== */
    // Move the divClassName attribute to the div. There's really
    // no need to do this, but it's good for demo purposes.

    const div = shadow.querySelector('div')

    const divClassName = this.getAttribute('divClassName') || ''
    this.removeAttribute('divClassName')

    let divStyle: any = this.getAttribute('divStyle') || ''
    this.removeAttribute('divStyle')

    const divStyleIsObject = isStringifiedObject(divStyle)

    if (divStyleIsObject) {
      const divStyleObject = JSON.parse(divStyle)

      if (divStyleObject && typeof divStyleObject === 'object') {
        divStyle = cssPropertiesToString(divStyleObject as any)
      }
    }

    if (div instanceof HTMLElement) {
      div.setAttribute('style', divStyle)

      if (typeof divClassName === 'string') {
        div.setAttribute('class', divClassName)
      }
    }
  }
}

customElements.define('wc-div', WCDiv)
