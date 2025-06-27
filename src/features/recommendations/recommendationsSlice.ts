import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTrendingShows } from '@/services/tvmazeApi'

type Show = {
  id: number
  name: string
  image: { medium: string; original: string }
  summary: string
}

interface RecommendationsState {
  shows: Show[]
  loading: boolean
  error: string | null
}

const initialState: RecommendationsState = {
  shows: [],
  loading: false,
  error: null,
}

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async () => {
    const shows = await fetchTrendingShows()
    return shows.slice(0, 30) // Limit to top 30
  }
)

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false
        state.shows = action.payload
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch shows'
      })
  },
})

export default recommendationsSlice.reducer
