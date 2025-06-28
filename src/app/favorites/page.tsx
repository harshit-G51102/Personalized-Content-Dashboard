import FavoritesFeed from "@/components/favorites/FavoritesFeed";

export default function FavoritesPage() {
  return (
    <div>
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 text-center">Your Favorites</h1>
      <FavoritesFeed></FavoritesFeed>
    </div>
  )
}
