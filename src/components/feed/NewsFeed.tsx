'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchNews, incrementPage } from '@/features/content/contentSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect } from 'react'
import { addToFavorites } from '@/features/favorites/favoritesSlice'

const NewsFeed = () => {
  const dispatch = useDispatch()
  const { articles, loading, hasMore, page } = useSelector((state: RootState) => state.content)
  const categories = useSelector((state: RootState) => state.preferences.categories)

  useEffect(() => {
    dispatch(fetchNews({ categories, page: 1 }) as any)
  }, [categories])

  const fetchMore = () => {
    dispatch(incrementPage())
    dispatch(fetchNews({ categories, page: page + 1 }) as any)
  }

  return (
    <div className="mt-6">
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p className="text-center mt-4">No more articles</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                className="inline-block mt-2 text-blue-600 hover:underline"
                rel="noopener noreferrer"
              >
                Read More →
              </a>
              <button
                onClick={() => dispatch(addToFavorites(article))}
                className="mt-2 text-sm text-green-600 hover:underline"
              >
                ❤️ Add to Favorites
              </button>
            </div>

          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default NewsFeed
