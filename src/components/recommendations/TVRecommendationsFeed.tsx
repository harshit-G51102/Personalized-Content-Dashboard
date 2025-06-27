'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchRecommendations } from '@/features/recommendations/recommendationsSlice'

const TVRecommendationsFeed = () => {
  const dispatch = useDispatch()
  const { shows, loading, error } = useSelector((state: RootState) => state.recommendations)

  useEffect(() => {
    dispatch(fetchRecommendations() as any)
  }, [])

  if (loading) return <p>Loading shows...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Trending TV Shows</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {shows.map((show) => (
          <div key={show.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
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

export default TVRecommendationsFeed
