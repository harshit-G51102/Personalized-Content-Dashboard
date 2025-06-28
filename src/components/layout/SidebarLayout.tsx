'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '../preference/ModeToggle'
import { useState } from 'react'
import SearchBar from '../search/SearchBar'
import SearchOverlay from '../search/SearchOverlay'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showOverlay, setShowOverlay] = useState(false)

  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }

    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    const data = await res.json()
    setSearchResults(data.map((item: any) => item.show))
    setShowOverlay(true)
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/social', label: 'Social' },
    { href: '/recommendations', label: 'Recommendations' },
    { href: '/settings', label: 'Settings' },
  ]

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white cursor-pointer">
              Newsly
            </h1>
          </Link>
          <div className="flex-1 max-w-md">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex gap-6">
            <ModeToggle />
            <Sheet>
              <SheetTrigger>Open</SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Select What You Want To See</SheetTitle>
                  {navItems.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`block px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 ${
                        pathname === href
                          ? 'bg-blue-500 text-white'
                          : 'text-black dark:text-white'
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 p-6 bg-white dark:bg-black text-black dark:text-white overflow-y-auto pl-48 pr-48">
          {showOverlay && searchResults.length > 0 && (
            <SearchOverlay
              results={searchResults}
              onClose={() => setShowOverlay(false)}
            />
          )}
          {children}
        </main>
      </div>
    </div>
  )
}

export default SidebarLayout
