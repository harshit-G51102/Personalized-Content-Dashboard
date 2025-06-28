# 📰 Personalized Content Dashboard

A feature-rich, customizable news and content dashboard built with **Next.js**, **TypeScript**, **Redux Toolkit**, and third-party APIs like **TV Maze** and **NewsAPI**. Users can personalize their experience by selecting categories, searching content, saving favorites, and viewing social media-like posts.

---

## 🔧 Features

- 🔍 **Search** TV shows via TV Maze API (with debounce + overlay results)
- 🧠 **User Preferences** to select and persist news categories
- 📰 **News Feed** with infinite scroll using Redux Toolkit
- ❤️ **Favorites Section** with reorder (drag & drop via Framer Motion)
- 🌑 **Dark Mode** toggle (powered by `next-themes`)
- 📱 **Responsive Design** using Tailwind CSS
- 🧪 **Unit + Integration Testing** via Jest and Testing Library
- 📷 **Mock Social Posts** with hashtag-based filtering (Instagram/Twitter-style)

---

## 🛠️ Tech Stack

| Frontend            | State Management  | Styling         | APIs              | Testing                     |
|---------------------|-------------------|------------------|--------------------|------------------------------|
| Next.js (App Router) | Redux Toolkit     | Tailwind CSS     | TV Maze, NewsAPI   | Jest, React Testing Library |
| React 19            | Redux Persist     | Dark Mode (Themes) | Mock APIs         | Framer Motion (DND)         |

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/personalized-dashboard.git
   cd personalized-dashboard

2. **Install dependencies**
   ```bash
   npm install
3. **Setup environment**
   
   Create a .env.local file:
   
   ```bash
     NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
5. **Run the development server**
   ```bash
   npm run dev

## Folder Structure (Brief)

```bash
src/
├── components/       # All UI components
│   ├── favorites/     # Favorite list UI and logic
│   ├── layout/        # Layout and wrapper components
│   ├── preference/    # Category selection and theme toggle
│   ├── search/        # Search bar and overlay UI
│   └── content/       # News feed and article components
├── features/         # Redux slices
│   ├── favorites/     # favoriteSlice.ts
│   ├── content/       # contentSlice.ts
│   └── preference/    # preferenceSlice.ts
├── redux/            # Redux store setup
├── app/              # Next.js routes (App Router structure)
├── data/             # Mock data (e.g., social posts)
├── tests/            # Unit & integration test files

