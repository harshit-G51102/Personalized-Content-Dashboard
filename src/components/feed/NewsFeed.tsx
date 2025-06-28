'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchNews, incrementPage } from '@/features/content/contentSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'
import { addToFavorites } from '@/features/favorites/favoritesSlice'

const NewsFeed = () => {
  const dispatch = useDispatch()
  const [addedFavorites, setAddedFavorites] = useState<number[]>([])

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
    <div className="mt-2">
      <h1 className='text-center mb-4 text-4xl font-bold'>Dashboard</h1>
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
              <img
                src={article.urlToImage || '/demo.png'}
                alt={article.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
              <p
                className="text-sm text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: article.description }}
              ></p>
              <a
                href={article.url}
                target="_blank"
                className="inline-block mt-2 text-blue-600 hover:underline"
                rel="noopener noreferrer"
              >
                Read More →
              </a>
              <button
                onClick={() => {
                  dispatch(addToFavorites(article))
                  setAddedFavorites((prev) => [...prev, index])
                  setTimeout(() => {
                    setAddedFavorites((prev) => prev.filter((i) => i !== index))
                  }, 2000)
                }}
                className="cursor-pointer mt-2 text-sm text-pink-600"
              >
                {addedFavorites.includes(index) ? '✅ Added to Favorites' : '❤️ Add to Favorites'}
              </button>

            </div>


          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default NewsFeed
