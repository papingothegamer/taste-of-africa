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
import { usePathname } from 'next/navigation'

// Dummy fresh food products
const hairCareProducts = [
    { id: 1, name: "Shampoo", price: 6.99, image: "/placeholder.svg", category: "Cleansing" },
    { id: 2, name: "Conditioner", price: 7.49, image: "/placeholder.svg", category: "Conditioning" },
    { id: 3, name: "Hair Oil", price: 5.99, image: "/placeholder.svg", category: "Treatment" },
    { id: 4, name: "Hair Spray", price: 4.99, image: "/placeholder.svg", category: "Styling" },
    { id: 5, name: "Hair Gel", price: 3.99, image: "/placeholder.svg", category: "Styling" },
    { id: 6, name: "Hair Mask", price: 8.99, image: "/placeholder.svg", category: "Treatment" },
    { id: 7, name: "Leave-in Conditioner", price: 9.99, image: "/placeholder.svg", category: "Conditioning" },
    { id: 8, name: "Heat Protectant", price: 12.99, image: "/placeholder.svg", category: "Treatment" },
  ]

  const categories = [
    { id: 1, name: 'Fresh Food', link: '/categories/fresh-food', slug: 'fresh-food' },
    { id: 2, name: 'Dry Food', link: '/categories/dry-food', slug: 'dry-food' },
    { id: 3, name: 'Beverages', link: '/categories/beverages', slug: 'beverages' },
    { id: 4, name: 'Hair Care', link: '/categories/hair-care', slug: 'hair-care' },
    { id: 5, name: 'Skin Care', link: '/categories/skin-care', slug: 'skin-care' },
    { id: 6, name: 'Accessories', link: '/categories/accessories', slug: 'accessories' },
  ]
  
  export default function HairCareCategory() {
    const pathname = usePathname()
    const currentCategory = pathname.split('/').pop()

    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("featured")
    const [priceRange, setPriceRange] = useState([0, 20])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [quantities, setQuantities] = useState<{[key: number]: number}>(
      hairCareProducts.reduce((acc, product) => ({...acc, [product.id]: 0}), {})
    )
  
    const filteredProducts = hairCareProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    ).sort((a, b) => {
      if (sortBy === "low") return a.price - b.price
      if (sortBy === "high") return b.price - a.price
      return 0
    })

    const handleQuantityChange = (id: number, change: number) => {
        setQuantities(prev => ({
          ...prev,
          [id]: Math.max(0, prev[id] + change)
        }))
      }
  
    return (
      <div className="container mx-auto px-4 py-8 w-[80%]">
        <h1 className="text-3xl font-bold mb-8">Hair Care</h1>
      
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
                  { value: "Styling", label: "Styling" },
                  { value: "Conditioning", label: "Conditioning" },
                  { value: "Cleansing", label: "Cleansing" },
                  { value: "Treatment", label: "Treatment" }
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
                    {/* highlight-start */}
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
                    {/* highlight-end */}
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
