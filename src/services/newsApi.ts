export const fetchNewsByCategory = async (category: string, page: number = 1) => {
  const res = await fetch(`/api/news?category=${category}&page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();
  return data.articles;
};
