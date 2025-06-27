import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchNewsByCategory } from '@/services/newsApi'

type Article = {
  title: string
  url: string
  urlToImage: string
  description: string
}

interface ContentState {
  articles: Article[]
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
}

const initialState: ContentState = {
  articles: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
}

// Thunk for loading more articles (paginated)
export const fetchNews = createAsyncThunk(
  'content/fetchNews',
  async ({ categories, page }: { categories: string[]; page: number }) => {
    const allArticles = await Promise.all(
      categories.map((cat) => fetchNewsByCategory(cat, page))
    )
    return allArticles.flat()
  }
)

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    resetArticles: (state) => {
      state.articles = []
      state.page = 1
      state.hasMore = true
    },
    incrementPage: (state) => {
      state.page += 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false
        state.articles.push(...action.payload)
        if (action.payload.length === 0) {
          state.hasMore = false
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch news'
      })
  },
})

export const { resetArticles, incrementPage } = contentSlice.actions
export default contentSlice.reducer
