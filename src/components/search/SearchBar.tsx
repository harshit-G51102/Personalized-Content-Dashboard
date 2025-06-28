'use client'

import { useState, useEffect } from 'react'
import { debounce } from 'lodash'

interface Props {
  onSearch: (query: string) => void
  placeholder?: string
}

const SearchBar = ({ onSearch, placeholder = 'Search...' }: Props) => {
  const [query, setQuery] = useState('')

  const debouncedSearch = debounce((val: string) => {
    onSearch(val)
  }, 500)

  useEffect(() => {
    debouncedSearch(query)
    return debouncedSearch.cancel
  }, [query])

  return (
    <input
      data-testid="search-input"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
    />
  )
}

export default SearchBar
