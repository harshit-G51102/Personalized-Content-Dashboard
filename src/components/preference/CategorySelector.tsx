'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setCategories } from '@/features/preference/preferencesSlice'

const allCategories = ['technology', 'sports', 'finance', 'entertainment', 'health']

const CategorySelector = () => {
  const selected = useSelector((state: RootState) => state.preferences.categories)
  const dispatch = useDispatch()

  const toggleCategory = (cat: string) => {
    const updated = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat]
    dispatch(setCategories(updated))
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select Categories</h2>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-4 py-2 rounded-lg border ${
              selected.includes(cat) ? 'bg-blue-900 text-white' : 'bg-blue-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector
