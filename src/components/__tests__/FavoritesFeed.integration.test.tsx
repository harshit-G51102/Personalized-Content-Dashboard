// Simulate no content (empty favorites)
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '@/features/favorites/favoritesSlice'
import FavoritesFeed from '../favorites/FavoritesFeed'
FavoritesFeed

const customStore = configureStore({
  reducer: {
    favorites: () => ({ articles: [] }), // mock empty state
  },
})

test('renders empty state when no favorites', () => {
  render(
    <Provider store={customStore}>
      <FavoritesFeed />
    </Provider>
  )

  expect(screen.getByText('No favorites yet.')).toBeInTheDocument()
})
