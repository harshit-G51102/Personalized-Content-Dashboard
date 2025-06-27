import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Article = {
  title: string
  url: string
  urlToImage: string
  description: string
}

interface FavoritesState {
  articles: Article[]
}

const initialState: FavoritesState = {
  articles: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Article>) => {
      const alreadyExists = state.articles.find((a) => a.url === action.payload.url)
      if (!alreadyExists) state.articles.push(action.payload)
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter((a) => a.url !== action.payload)
    },
    // ✅ Add this to support cypress/localStorage preload
    setFavorites: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload
    },
  },
})


export const { addToFavorites, removeFromFavorites, setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
