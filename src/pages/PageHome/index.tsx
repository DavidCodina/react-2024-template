import { useTitle } from 'hooks'
import { useRef, useEffect } from 'react'
import { HR, Page, PageContainer, Waves } from 'components'

// const obj = {
//   message: 'Hello',
//   func: () => {
//     alert('Hello')
//   }
// }

// const stringifyWithFunctions = (obj: any) => {
//   return JSON.stringify(obj, (key, value) =>
//     typeof value === 'function' ? value.toString() : value
//   )
// }

// const parseWithFunctions = (str: any) => {
//   return JSON.parse(str, (key, value) => {
//     if (
//       typeof value === 'string' &&
//       (value.startsWith('function') || value.includes('=>'))
//     ) {
//       if (value.includes('=>')) {
//         // Handle arrow functions
//         return eval(value)
//       } else {
//         // Handle regular functions
//         return new Function('return ' + value)()
//       }
//     }
//     return value
//   })
// }

/* ========================================================================
                                PageHome
======================================================================== */

const PageHome = () => {
  const wcDivRef = useRef<any>(null)
  useTitle('Home')

  /* ======================
         useEffect
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // It turns out that passing functions as attributes to web components
  // does not work very well. Well, it works great with common JSX synthetic
  // event handlers, but as soon as you try to use a custom attribute, the
  // behavior changes.
  //
  //   onclick={`(${() => {
  //     alert(message) // ❌ Uncaught ReferenceError: message is not defined
  //     handleClick()  // ❌ Uncaught ReferenceError: handleClick is not defined
  //   }})()`}
  //
  // It will end up looking for message or handleClick in the global scope.
  // The better solution would be to use a ref to assign event handlers to internal
  // parts of the component, or possibly pass in slots with event handlers on them.
  //
  // The third options would be to send an object with the args and a stringified function
  // to revive on the other side, but that feels super hacky.
  //
  /////////////////////////
  //
  // The bigger takeaway here is that any attribute that requires complex data needs to be
  // serialized before passing it to the web component as an attribute. Then it needs to
  // be deserialized within the web component. Otherwise, it will be turned into [object object],
  // and at that point, it's not readable.
  //
  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const wcDiv = wcDivRef.current

    const handleDivClick = (e: any) => {
      // e.stopPropagation()
      console.dir(e.currentTarget)
    }
    const div = wcDiv.shadowRoot.querySelector('div')

    if (div instanceof HTMLElement) {
      div?.addEventListener('click', handleDivClick)
    }

    return () => {
      div?.removeEventListener('click', handleDivClick)
    }
  }, [])

  /* ======================
          return
  ====================== */

  return (
    <Page>
      <Waves />

      <PageContainer>
        <h1
          className='text-center text-5xl font-black'
          style={{ position: 'relative', marginBottom: 24 }}
        >
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textShadow:
                '0px 0px 1px rgba(0,0,0,1), 0px 0px 1px rgba(0,0,0,1)',
              width: '100%',
              height: '100%'
            }}
          >
            Home
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            Home
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />

        <wc-div
          ref={wcDivRef}
          style={{ border: '1px solid var(--tw-blue-500)' }}
          className='mx-auto max-w-[600px] cursor-pointer rounded-lg bg-white p-2 shadow-lg'
          divClassName='font-black text-blue-500 text-3xl text-center'
          // divStyle={JSON.stringify({ outline: '2px dashed green' })}
          // divStyle='outline: 2px dashed orange;'
          // divStyle={`
          //   outline: 2px dashed orange;
          //   background-color: var(--tw-neutral-100);
          // `}
          onClick={() => alert('Whuddup!')}
          globalCSSPath={'/src/styles/main.css'}
          data={JSON.stringify(['Muffy', 1, true])}
        >
          Read A Book
        </wc-div>

        {/* <div
          style={{
            margin: '0 auto',
            height: 200,
            position: 'relative',
            width: 300,
            backgroundColor: '#fff',
            border: '1px solid #333',
            borderRadius: 5
          }}
        >
          <Ribbon>Demo</Ribbon>
        </div> */}

        {/* <Alert className='alert-blue mx-auto mb-12 max-w-2xl flex-col'>
          <div className='text-center'>
            <strong> VITE_SECRET:</strong> {import.meta.env.VITE_SECRET}
          </div>

          <div className='text-center'>
            <strong>MODE:</strong> {import.meta.env.MODE}
          </div>

          <div className='text-center'>
            <strong> DEV:</strong> {import.meta.env.DEV ? 'true' : 'false'}
          </div>

          <div className='text-center'>
            <strong>PROD:</strong> {import.meta.env.PROD ? 'true' : 'false'}
          </div>
        </Alert> */}
      </PageContainer>
    </Page>
  )
}

export default PageHome
