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
