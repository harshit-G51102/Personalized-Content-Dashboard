import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category') || 'general'
  const page = searchParams.get('page') || '1'
  const pageSize = 5

  const apiKey = process.env.GNEWS_API_KEY
  const url = `https://gnews.io/api/v4/top-headlines?lang=en&topic=${category}&token=${apiKey}&page=${page}&max=${pageSize}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    const safeArticles = (data.articles || [])
      .filter((a: any) => a && a.url && a.title && a.description)
      .map((a: any) => ({
        title: a.title,
        url: a.url,
        urlToImage: a.image,
        description: a.description,
      }));

    return NextResponse.json({ articles: safeArticles })
  } catch (err) {
    console.error('Error fetching GNews:', err)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
