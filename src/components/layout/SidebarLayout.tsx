'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '../preference/ModeToggle'

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/settings', label: 'Settings' },
    { href: '/recommendations', label: 'Recommendations' },
    { href: '/search', label: 'Search' },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 ${
                pathname === href ? 'bg-blue-500 text-white' : 'text-black dark:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="pt-4">
          <ModeToggle></ModeToggle>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white dark:bg-black text-black dark:text-white">
        {children}
      </main>
    </div>
  )
}

export default SidebarLayout
