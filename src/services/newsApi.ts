import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

export const fetchNewsByCategory = async (category: string, page = 1) => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country: 'us',
      category,
      apiKey: API_KEY,
      page,
      pageSize: 5, // adjust page size
    },
  })
  return response.data.articles
}
