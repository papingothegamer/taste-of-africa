'use client'

import { useState } from 'react'
import ProductCard from '../components/ProductCard'

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  const removeItem = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  const addToCart = (id: number) => {
    console.log(`Added item ${id} to cart`)
  }

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full sm:w-[95%] md:w-[90%] lg:w-[80%]">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <p className="text-xl text-gray-600">Your wishlist is currently empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                rating={item.rating}
                category={item.category}
                variant="wishlist"
                onAddToCart={() => addToCart(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
