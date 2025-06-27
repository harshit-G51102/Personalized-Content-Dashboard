import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '@/features/favorites/favoritesSlice'
import FavoritesFeed from '../favorites/FavoritesFeed'

const mockStoreWithData = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: {
      articles: [
        {
          url: 'https://example.com',
          title: 'Sample Article',
          description: 'Test description',
          urlToImage: 'https://example.com/image.jpg',
        },
      ],
    },
  },
})

test('renders favorites section title', () => {
  render(
    <Provider store={mockStoreWithData}>
      <FavoritesFeed />
    </Provider>
  )

  expect(screen.getByText('Your Favorites')).toBeInTheDocument()
  expect(screen.getByText('Sample Article')).toBeInTheDocument()
})
