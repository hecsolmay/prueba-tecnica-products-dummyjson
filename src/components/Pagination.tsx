import { getPageNumbers } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router'

interface PaginationProps {
  totalPages: number
}

export default function Pagination ({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const currentPage = page > 0 ? page : 1
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  const updatePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    setSearchParams(newParams)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageNumbers = getPageNumbers({ currentPage, totalPages })

  return (
    <div className='flex items-center justify-center space-x-2'>
      <button
        onClick={() => updatePage(currentPage - 1)}
        disabled={!hasPreviousPage}
        className={`
          flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 transition-colors duration-200
          hover:bg-gray-50 hover:text-gray-700
          disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500
        `}
      >
        <ChevronLeft size={16} className='mr-1' />
        Anterior
      </button>

      <div className='flex items-center space-x-1'>
        {pageNumbers.map((page, index) => (
          <div key={index}>
            {page === '...'
              ? (
                <span className='px-3 py-2 text-sm font-medium text-gray-500'>
                  ...
                </span>
                )
              : (
                <button
                  onClick={() => updatePage(page as number)}
                  className={`
                    rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200
                    ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-md'
                        : `
                          border border-gray-300 bg-white text-gray-700
                          hover:bg-gray-50 hover:text-gray-900
                        `
                    }
                  `}
                >
                  {page}
                </button>
                )}
          </div>
        ))}
      </div>

      <button
        onClick={() => updatePage(currentPage + 1)}
        disabled={!hasNextPage}
        className={`
          flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 transition-colors duration-200
          hover:bg-gray-50 hover:text-gray-700
          disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500
        `}
      >
        Siguiente
        <ChevronRight size={16} className='ml-1' />
      </button>
    </div>
  )
}
