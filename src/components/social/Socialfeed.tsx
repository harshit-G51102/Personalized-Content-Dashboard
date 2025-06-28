'use client'

import { useState } from 'react'
import { mockSocialPosts } from '@/data/mockSocialPosts'

const Socialfeed = () => {
  const [hashtag, setHashtag] = useState('')
  const [filtered, setFiltered] = useState(mockSocialPosts)

  const handleSearch = (tag: string) => {
    setHashtag(tag)
    const results = mockSocialPosts.filter((post) =>
      post.hashtag.toLowerCase().includes(tag.toLowerCase()) ||
      post.user.toLowerCase().includes(tag.toLowerCase())
    )
    setFiltered(results)
  }

  return (
    <div className="p-6">
      <input
        value={hashtag}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by #hashtag or username"
        className="w-full p-2 border rounded mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow"
          >
            <div className="flex items-center mb-2">
              <img
                src={post.image}
                className="w-10 h-10 rounded-full mr-3"
                alt={post.user}
              />
              <div>
                <p className="font-semibold">{post.user}</p>
                <p className="text-sm text-gray-500">{post.platform}</p>
              </div>
            </div>
            <p className="mb-2">{post.content}</p>
            <p className="text-sm text-gray-400">{post.hashtag}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Socialfeed
