import { useEffect } from 'react'
import { useTitle } from 'hooks'
import { HR, Page, PageContainer, Waves } from 'components'
import { TransitionFromNone } from './experiments/TransitionFromNone'

//#  import { Square } from 'dc-react-ts-test-library'
//# import 'dc-react-ts-test-library/dist/main.css'

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
  useTitle('Home')

  useEffect(() => {
    console.log('\nThe page rendered...')
  })

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

        <TransitionFromNone />

        {/* 
        <div className='text-center text-3xl font-bold text-blue-500'>
          {import.meta.env.VITE_SECRET}
        </div> */}

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
