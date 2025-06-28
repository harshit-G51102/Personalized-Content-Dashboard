'use client'

interface Props {
  results: any[]
  onClose: () => void
}

const SearchOverlay = ({ results, onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-transparent bg-opacity-50 flex items-start justify-center p-4 overflow-y-auto mt-20"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-lg shadow-lg p-6 border-2 border-black dark:border-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-between items-center p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold text-white">Search Results</h2>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((show) => (
            <div
              key={show.id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow"
              data-testid="result-card"
            >
              {show.image?.medium && (
                <img
                  src={show.image.medium}
                  alt={show.name}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h3 className="text-lg font-semibold mt-2">{show.name}</h3>
              <div
                className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay
