'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/input/SearchBar"
import { Label } from "../../components/ui/Label"
import { Select } from "../../components/ui/Select"
import { Slider } from "../../components/ui/Slider"
import { Heart, ShoppingBasket, Plus, Minus } from 'lucide-react'

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

export default function FreshFoodCategory() {
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
              <Label htmlFor="category">Category</Label>
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
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="relative">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button variant="secondary" size="icon" className="rounded-full bg-white bg-opacity-70 hover:bg-opacity-100">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 mb-2">{product.category}</p>
                  <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={quantities[product.id] === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 w-8 text-center">{quantities[product.id]}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center space-x-2">
                    <ShoppingBasket className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
