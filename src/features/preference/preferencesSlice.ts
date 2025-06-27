import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PreferencesState = {
  categories: string[]
  darkMode: boolean
}

const initialState: PreferencesState = {
  categories: ['technology', 'sports'],
  darkMode: false,
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
  },
})

export const { toggleDarkMode, setCategories } = preferencesSlice.actions
export default preferencesSlice.reducer
