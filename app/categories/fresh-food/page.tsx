'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/input/SearchBar"
import { Label } from "../../components/ui/Label"
import { Select } from "../../components/ui/Select"
import { Slider } from "../../components/ui/Slider"
import { usePathname } from 'next/navigation'
import ProductCard from '../../components/ProductCard'

// Dummy fresh food products
const freshFoodProducts = [
  { id: 1, name: "Organic Bananas", price: 2.99, image: "/placeholder.svg", category: "Fruits" },
  { id: 2, name: "Fresh Tomatoes", price: 1.99, image: "/placeholder.svg", category: "Vegetables" },
  { id: 3, name: "Whole Chicken", price: 8.99, image: "/placeholder.svg", category: "Meat" },
  { id: 4, name: "Atlantic Salmon", price: 12.99, image: "/placeholder.svg", category: "Seafood" },
  { id: 5, name: "Organic Spinach", price: 3.99, image: "/placeholder.svg", category: "Vegetables" },
  { id: 6, name: "Red Apples", price: 4.99, image: "/placeholder.svg", category: "Fruits" },
  { id: 7, name: "Ground Beef", price: 7.99, image: "/placeholder.svg", category: "Meat" },
  { id: 8, name: "Fresh Tilapia", price: 9.99, image: "/placeholder.svg", category: "Seafood" },
]

const categories = [
  { id: 1, name: 'Fresh Food', link: '/categories/fresh-food', slug: 'fresh-food' },
  { id: 2, name: 'Dry Food', link: '/categories/dry-food', slug: 'dry-food' },
  { id: 3, name: 'Beverages', link: '/categories/beverages', slug: 'beverages' },
  { id: 4, name: 'Hair Care', link: '/categories/hair-care', slug: 'hair-care' },
  { id: 5, name: 'Skin Care', link: '/categories/skin-care', slug: 'skin-care' },
  { id: 6, name: 'Accessories', link: '/categories/accessories', slug: 'accessories' },
]

export default function FreshFoodCategory() {
  const pathname = usePathname()
  const currentCategory = pathname.split('/').pop()

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 20])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [quantities, setQuantities] = useState<{[key: number]: number}>(
    freshFoodProducts.reduce((acc, product) => ({...acc, [product.id]: 0}), {})
  )

  const filteredProducts = freshFoodProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  ).sort((a, b) => {
    if (sortBy === "low") return a.price - b.price
    if (sortBy === "high") return b.price - a.price
    return 0 // "featured" or default
  })

  const handleQuantityChange = (id: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + change)
    }))
  }

  const handleAddToWishlist = (productId: number) => {
    // Implement wishlist functionality here
    console.log(`Added product ${productId} to wishlist`)
  }

  const handleAddToCart = (productId: number) => {
    // Implement add to cart functionality here
    console.log(`Added product ${productId} to cart`)
    handleQuantityChange(productId, 1)
  }

  return (
    <div className="container mx-auto px-4 py-8 w-[80%]">
      <h1 className="text-3xl font-bold mb-8">Fresh Food</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="w-full lg:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            <div className="mb-4">
              <Label htmlFor="search">Search</Label>
              <Input 
                id="search"
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="category">Product</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                placeholder="Select a category"
                options={[
                  { value: "All", label: "All" },
                  { value: "Fruits", label: "Fruits" },
                  { value: "Vegetables", label: "Vegetables" },
                  { value: "Meat", label: "Meat" },
                  { value: "Seafood", label: "Seafood" }
                ]}
              />
            </div>

            <div className="mb-4">
              <Label>Price Range</Label>
              <Slider
                min={0}
                max={20}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
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
        </div>

        <div className="w-full lg:w-3/4">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-lg font-semibold">{filteredProducts.length} products found</p>
            <div style={{ width: '256px' }}> 
              <Select
                value={sortBy}
                onValueChange={setSortBy}
                placeholder="Sort by"
                options={[
                  { value: "featured", label: "Featured" },
                  { value: "low", label: "Price: Low to High" },
                  { value: "high", label: "Price: High to Low" },
                ]}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                onAddToWishlist={() => handleAddToWishlist(product.id)}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}