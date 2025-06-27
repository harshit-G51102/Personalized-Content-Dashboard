'use client'

import { useState } from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'

const TVShowSearch = () => {
  const [results, setResults] = useState<any[]>([])

  const handleSearch = async (query: string) => {
    if (!query) return setResults([])
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
    setResults(res.data.map((item: any) => item.show))
  }

  return (
    <div className="mt-6">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {results.map((show) => (
          <div key={show.id}
            data-testid="result-card"
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            {show.image?.medium && (
              <img
                src={show.image.medium}
                alt={show.name}
                className="w-full h-60 object-cover rounded"
              />
            )}
            <h3 className="text-lg font-semibold mt-2">{show.name}</h3>
            <div
              className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: show.summary }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TVShowSearch
