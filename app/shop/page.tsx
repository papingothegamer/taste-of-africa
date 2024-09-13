"use client";

import { useState } from 'react'
import Image from 'next/image'
import { Grid, Search, ShoppingBasket, Heart } from 'lucide-react'

import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/input/SearchBar"
import { Select } from "../components/ui/Select"  // Adjust import to match the path

const products = [
  { id: 1, name: 'African Spice Mix', category: 'Food', price: 9.99, image: '/placeholder.svg' },
  { id: 2, name: 'Dashiki Shirt', category: 'Fashion', price: 39.99, image: '/placeholder.svg' },
  { id: 3, name: 'Wooden Mask', category: 'Art', price: 59.99, image: '/placeholder.svg' },
  { id: 4, name: 'Jollof Rice Mix', category: 'Food', price: 7.99, image: '/placeholder.svg' },
  { id: 5, name: 'Ankara Fabric', category: 'Fashion', price: 24.99, image: '/placeholder.svg' },
  { id: 6, name: 'Tribal Painting', category: 'Art', price: 89.99, image: '/placeholder.svg' },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const categories = [
    { value: 'All', label: 'All Categories' },
    { value: 'Food', label: 'Food' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Art', label: 'Art' }
  ]

  const sortingOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' }
  ]

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">African Shop</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Select
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <Select
            options={sortingOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-[300px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            </div>
            <div className="absolute top-2 right-2 flex flex-col space-y-2">
              {/* Wishlist and Cart logic (update toggleWishlist and wishlist state accordingly) */}
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full p-2"
              >
                <Heart className="h-5 w-5 text-gray-500" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full p-2"
              >
                <ShoppingBasket className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
