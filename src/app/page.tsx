'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchNews,resetArticles } from '@/features/content/contentSlice'
import CategorySelector from '@/components/preference/CategorySelector'
import NewsFeed from '@/components/feed/NewsFeed'
import FavoritesFeed from '@/components/favorites/FavoritesFeed'
import { ModeToggle } from '@/components/preference/ModeToggle'

export default function Home() {
  const dispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.preferences.categories)

  useEffect(() => {
     dispatch(resetArticles())
  dispatch(fetchNews({ categories, page: 1 }) as any)

  }, [categories])

  return (
    <main className="min-h-screen p-4">
      <NewsFeed></NewsFeed>
    </main>
  )
}
