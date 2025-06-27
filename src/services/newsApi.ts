export const fetchNewsByCategory = async (category: string, page: number = 1) => {
  // Encode the category to be safe in URLs
  const encodedCategory = encodeURIComponent(category);

  // Google News RSS URL for that category
  const rssUrl = `https://news.google.com/rss/search?q=${encodedCategory}`;

  // Use rss2json to convert RSS to JSON
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news from Google News RSS');
  }

  const data = await response.json();

  const mappedArticles = data.items.map((item: any) => ({
    title: item.title,
    url: item.link,
    urlToImage: item.enclosure?.link || '', // image if available
    description: item.description,
  }));

  return mappedArticles;
};
