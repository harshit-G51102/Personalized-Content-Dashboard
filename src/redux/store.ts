import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // uses localStorage
import thunk from 'redux-thunk'

import preferencesReducer from '@/features/preference/preferencesSlice'
import contentReducer from '@/features/content/contentSlice'
import favoritesReducer from '@/features/favorites/favoritesSlice'
import recommendationsReducer from '@/features/recommendations/recommendationsSlice'

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  content: contentReducer,
  favorites: favoritesReducer,
  recommendations: recommendationsReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'preferences'], // Persist these slices
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  }),

})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
