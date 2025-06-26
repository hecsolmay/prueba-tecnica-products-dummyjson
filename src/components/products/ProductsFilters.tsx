import SearchBar from '@/components/Searchbar'
import useDebounce from '@/hooks/useDebounce'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

export default function ProductsFilters () {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('query') || '')
  const debouncedValue = useDebounce(query, 400)

  useEffect(() => {
    const queryParam = searchParams.get('query')

    if (queryParam === debouncedValue) return

    if (debouncedValue === '') {
      searchParams.delete('query')
      setSearchParams(searchParams)
    } else {
      setSearchParams(new URLSearchParams({ query: debouncedValue }))
    }
  }, [debouncedValue])

  const changeQuery = (query: string) => {
    setQuery(query)
  }

  const handleClear = () => {
    setQuery('')
    setSearchParams(new URLSearchParams())
  }

  return (
    <>
      <div className='mb-8 flex justify-center'>
        <SearchBar
          value={query}
          onChange={changeQuery}
          onClear={handleClear}
          placeholder='Buscar...'
        />
      </div>
    </>
  )
}
