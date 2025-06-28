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
    <div className="p-2">
      <h2 className="text-4xl font-semibold mb-4 text-center">Select Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`w-68 h-68 text-lg font-medium rounded-lg border transition-all duration-200 shadow ${
              selected.includes(cat)
                ? 'bg-gray-900 text-white border-2 border-white'
                : 'bg-blue-100 text-black hover:bg-blue-200 border-1 border-white'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector
