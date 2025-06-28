'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { removeFromFavorites, setFavorites } from '@/features/favorites/favoritesSlice'
import { useState, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { categoryImages } from '@/data/categoryImages'

const LOCAL_STORAGE_KEY = 'favorites-order'

const FavoritesFeed = () => {
  const favorites = useSelector((state: RootState) => state.favorites.articles)
  const dispatch = useDispatch()

  const [orderedFavorites, setOrderedFavorites] = useState<typeof favorites>([])
  const [orderRestored, setOrderRestored] = useState(false)

  // Restore custom order from localStorage (only once)
  useEffect(() => {
    if (!orderRestored && favorites.length) {
      const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (savedOrder) {
        try {
          const orderedUrls: string[] = JSON.parse(savedOrder)

          const ordered = orderedUrls
            .map((url) => favorites.find((item) => item.url === url))
            .filter(Boolean) as typeof favorites

          const remaining = favorites.filter(
            (item) => !ordered.some((o) => o.url === item.url)
          )

          setOrderedFavorites([...ordered, ...remaining])
        } catch (error) {
          console.error('Invalid favorites order in localStorage', error)
          setOrderedFavorites(favorites)
        }
      } else {
        setOrderedFavorites(favorites)
      }

      setOrderRestored(true)
    }
  }, [favorites, orderRestored])

  // Sync to localStorage whenever orderedFavorites change
  useEffect(() => {
    if (orderedFavorites.length) {
      const orderedUrls = orderedFavorites.map((article) => article.url)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orderedUrls))
    }
  }, [orderedFavorites])

  // Load Redux-persisted favorites (for dev or Cypress)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const stored = localStorage.getItem('redux-persist:favorites')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.articles) {
          dispatch(setFavorites(parsed.articles))
        }
      }
    }
  }, [])

  if (!orderedFavorites.length)
    return <p className="mt-4 text-center">No favorites yet.</p>

  return (
    <div className="mt-6">
      <Reorder.Group
        axis="y"
        values={orderedFavorites}
        onReorder={setOrderedFavorites}
        className="flex flex-col gap-4"
      >
        {orderedFavorites.map((article) => (
          <Reorder.Item
            key={article.url}
            value={article}
            data-testid="favorite-card"
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-grab active:cursor-grabbing"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: article.description }}
                ></p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:underline"
                >
                  Read More →
                </a>
                <button
                  onClick={() => dispatch(removeFromFavorites(article.url))}
                  className="cursor-pointer block mt-2 text-red-600 text-sm hover:underline"
                >
                  ❌ Remove
                </button>
              </div>

              <img
                src={
                  article.urlToImage ||
                  categoryImages[article.category as keyof typeof categoryImages] ||
                  '/demo.png'
                }
                alt={article.title}
                className="w-full md:w-48 h-32 object-cover rounded"
              />
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}

export default FavoritesFeed
