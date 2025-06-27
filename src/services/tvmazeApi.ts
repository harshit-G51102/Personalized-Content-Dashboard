import axios from 'axios'

export const fetchTrendingShows = async () => {
  const response = await axios.get('https://api.tvmaze.com/shows') // returns array of shows
  return response.data
}
