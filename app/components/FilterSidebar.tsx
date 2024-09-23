'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Input } from "../components/ui/input/SearchBar"
import { Label } from "../components/ui/Label"
import { Select } from "../components/ui/Select"
import { Slider } from "../components/ui/Slider"

interface Category {
  id: number
  name: string
  link: string
  slug: string
}

interface FilterSidebarProps {
  categories: Category[]
  productCategories: string[]
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onPriceRangeChange: (value: [number, number]) => void
  maxPrice: number
}

export function FilterSidebar({ 
  categories, 
  productCategories,
  onSearchChange, 
  onCategoryChange, 
  onPriceRangeChange,
  maxPrice
}: FilterSidebarProps) {
  const pathname = usePathname()
  const currentCategory = pathname.split('/').pop()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, maxPrice])

  useEffect(() => {
    setPriceRange([0, maxPrice])
  }, [maxPrice])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    onSearchChange(e.target.value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    onCategoryChange(value)
  }

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value)
    onPriceRangeChange(value)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      <div className="mb-4">
        <Label htmlFor="search">Search</Label>
        <Input 
          id="search"
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="category">Product Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          placeholder="Select a category"
          options={[
            { value: "All", label: "All" },
            ...productCategories.map(cat => ({ value: cat, label: cat }))
          ]}
        />
      </div>

      <div className="mb-4">
        <Label>Price Range</Label>
        <Slider
          min={0}
          max={maxPrice}
          step={1}
          value={priceRange}
          onValueChange={handlePriceRangeChange}
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-lg mb-4">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              <Link 
                href={category.link} 
                className={`block p-2 rounded transition-colors ${
                  category.slug === currentCategory 
                    ? 'text-green-600 font-semibold' 
                    : ' hover:text-green-600'
                }`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}