'use client'

import { useState, useMemo } from 'react'
import { Button } from "../../components/ui/Button"
import { Select } from "../../components/ui/Select"
import ProductCard from '../../components/ProductCard'
import { FilterSidebar } from '../../components/FilterSidebar'

// Dummy products
const freshFoodProducts = [
  { id: 1, name: "Organic Bananas", price: 2.99, image: "/placeholder.svg", category: "Fruits", rating: 4.5, description: "Fresh, organic bananas sourced from local farmers.", productCategory: "fresh-food" },
  { id: 2, name: "Fresh Tomatoes", price: 1.99, image: "/placeholder.svg", category: "Vegetables", rating: 4.2, description: "Juicy, ripe tomatoes perfect for salads.", productCategory: "fresh-food" },
  { id: 3, name: "Whole Chicken", price: 8.99, image: "/placeholder.svg", category: "Meat", rating: 4.0, description: "Farm-raised, antibiotic-free whole chicken.", productCategory: "fresh-food" },
  { id: 4, name: "Atlantic Salmon", price: 12.99, image: "/placeholder.svg", category: "Seafood", rating: 4.7, description: "Wild-caught Atlantic salmon, rich in omega-3.", productCategory: "fresh-food" },
  { id: 5, name: "Organic Spinach", price: 3.99, image: "/placeholder.svg", category: "Vegetables", rating: 4.3, description: "Fresh, organic spinach leaves.", productCategory: "fresh-food" },
  { id: 6, name: "Red Apples", price: 4.99, image: "/placeholder.svg", category: "Fruits", rating: 4.4, description: "Crisp and sweet red apples.", productCategory: "fresh-food" },
  { id: 7, name: "Ground Beef", price: 7.99, image: "/placeholder.svg", category: "Meat", rating: 4.1, description: "Lean ground beef from grass-fed cattle.", productCategory: "fresh-food" },
  { id: 8, name: "Fresh Tilapia", price: 9.99, image: "/placeholder.svg", category: "Seafood", rating: 4.2, description: "Fresh tilapia fillets.", productCategory: "fresh-food" },

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
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 20])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [quantities, setQuantities] = useState<{[key: number]: number}>(
    freshFoodProducts.reduce((acc, product) => ({...acc, [product.id]: 0}), {})
  )

  const productCategories = useMemo(() => 
    Array.from(new Set(freshFoodProducts.map(p => p.category))),
    []
  )

  const maxPrice = useMemo(() => 
    Math.max(...freshFoodProducts.map(p => p.price)),
    []
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
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full sm:w-[95%] md:w-[90%] lg:w-[80%]">
        <h1 className="text-3xl font-bold mb-8">Fresh Food</h1>
        
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="w-full lg:w-1/4 xl:w-1/5">
            <FilterSidebar
              categories={categories}
              productCategories={productCategories}
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
            />
          </div>

          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-lg font-semibold">{filteredProducts.length} products found</p>
              <div className="w-full sm:w-64"> 
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                  category={product.category}
                  onAddToWishlist={() => handleAddToWishlist(product.id)}
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}