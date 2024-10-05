import { useNavigate, useSearchParams } from 'react-router-dom'
import { Pagination } from './Pagination'
//import { SimplePagination as Pagination } from './SimplePagination'

// const data: any = []
// for (let i = 1; i <= 100; i++) {
//   data.push({ id: i.toString(), title: `Item ${i}` })
// }

// const data = Array.from(Array(50).keys()).map((i) => ({
//   id: i.toString(),
//   title: `Item ${i}`
// }))

// const data = [...Array(93)].map((_, index) => {
//   const n = index + 1
//   return {
//     id: n.toString(),
//     title: `Item ${n}`
//   }
// })

const data = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`)
const itemsPerPage = 10

/* ========================================================================
                          
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// WDS:          https://www.youtube.com/watch?v=VenLRGHx3D4
//               https://www.youtube.com/watch?v=oZZEI23Ri6E
// ByteGrad:     https://www.youtube.com/watch?v=ukpgxEemXsk&t=2s
// CoderOne:     https://www.youtube.com/watch?v=h9hYnDe8DtI&t=145s
//
// Sam Selikoff: https://www.youtube.com/watch?v=sFTGEs2WXQ4
//
//               Discusses the 'browser back button bug', and how to avoid 'two sources of truth'.
//               https://www.youtube.com/watch?v=fYqMPvPvVAc
//
// Theo:         https://www.youtube.com/watch?v=t3FUkq7yoCw
//
// John Reilly:  https://blog.logrocket.com/use-state-url-persist-state-usesearchparams/
//               https://johnnyreilly.com/react-usesearchparamsstate
//
///////////////////////////////////////////////////////////////////////////

export const PaginatedListDemo = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  /* ======================
        Dervived state
  ====================== */

  const currentPage = (() => {
    const pageParam = searchParams.get('page')
    if (pageParam && typeof pageParam === 'string') {
      const pageNumber = parseInt(pageParam)
      return typeof pageNumber === 'number' && !isNaN(pageNumber)
        ? pageNumber
        : 1
    }
    return 1
  })()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const dataSubset = data.slice(indexOfFirstItem, indexOfLastItem)

  const itemCount = data.length
  const pageCount = Math.ceil(itemCount / itemsPerPage)

  /* ======================
      handlePageChange()
  ====================== */

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString()) // Get all params
    params.set('page', page.toString()) // Update page param
    navigate(
      `?${params.toString()}`,
      // Optional: avoid adding to the history stack.
      // This changes the behavior of the browser's back button,
      // so we're not iterating through list sets, but instead go
      // to the previous URL.
      { replace: true }
    )
  }

  /* ======================
        renderList()
  ====================== */

  const renderList = () => {
    return (
      <ul className='mx-auto mb-4 flex flex-col rounded pl-0 '>
        {dataSubset.map((item, index) => (
          <li
            key={index}
            className={`
          relative block cursor-pointer select-none border border-neutral-400 bg-white px-2 py-2 text-sm
          font-black text-blue-500 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] first:rounded-t-[inherit]
          last:rounded-b-[inherit] [&:not(:first-child)]:border-t-0`}
          >
            {item}
          </li>
        ))}
      </ul>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <div className='mx-auto mb-6 max-w-[500px]'>
      {renderList()}

      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        pageCount={pageCount}
      />
    </div>
  )
}
