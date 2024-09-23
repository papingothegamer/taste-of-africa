'use client'

import { useState, useMemo } from 'react'
import { Button } from "../../components/ui/Button"
import { Select } from "../../components/ui/Select"
import ProductCard from '../../components/ProductCard'
import { FilterSidebar } from '../../components/FilterSidebar'


// Dummy products
const dryFoodProducts = [
  { id: 9, name: "Brown Rice", price: 4.99, image: "/placeholder.svg", category: "Grains", rating: 4.3, description: "Wholesome brown rice, rich in fiber.", productCategory: "dry-food" },
  { id: 10, name: "Whole Wheat Pasta", price: 3.49, image: "/placeholder.svg", category: "Pasta", rating: 4.1, description: "Nutritious whole wheat pasta.", productCategory: "dry-food" },
  { id: 11, name: "Oats", price: 2.99, image: "/placeholder.svg", category: "Cereal", rating: 4.4, description: "Hearty oats for a nutritious breakfast.", productCategory: "dry-food" },
  { id: 12, name: "Chickpeas", price: 1.99, image: "/placeholder.svg", category: "Legumes", rating: 4.2, description: "Protein-rich chickpeas for various dishes.", productCategory: "dry-food" },
  { id: 13, name: "Quinoa", price: 6.49, image: "/placeholder.svg", category: "Grains", rating: 4.6, description: "Superfood quinoa, packed with nutrients.", productCategory: "dry-food" },
  { id: 14, name: "Lentils", price: 2.49, image: "/placeholder.svg", category: "Legumes", rating: 4.3, description: "Versatile lentils for soups and salads.", productCategory: "dry-food" },
  { id: 15, name: "Granola", price: 5.99, image: "/placeholder.svg", category: "Cereal", rating: 4.5, description: "Crunchy granola with nuts and dried fruits.", productCategory: "dry-food" },
  { id: 16, name: "Couscous", price: 3.99, image: "/placeholder.svg", category: "Grains", rating: 4.2, description: "Light and fluffy couscous.", productCategory: "dry-food" },
  ]

  const categories = [
    { id: 1, name: 'Fresh Food', link: '/categories/fresh-food', slug: 'fresh-food' },
    { id: 2, name: 'Dry Food', link: '/categories/dry-food', slug: 'dry-food' },
    { id: 3, name: 'Beverages', link: '/categories/beverages', slug: 'beverages' },
    { id: 4, name: 'Hair Care', link: '/categories/hair-care', slug: 'hair-care' },
    { id: 5, name: 'Skin Care', link: '/categories/skin-care', slug: 'skin-care' },
    { id: 6, name: 'Accessories', link: '/categories/accessories', slug: 'accessories' },
  ]
  
  export default function DryFoodCategory() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("featured")
    const [priceRange, setPriceRange] = useState([0, 20])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [quantities, setQuantities] = useState<{[key: number]: number}>(
      dryFoodProducts.reduce((acc, product) => ({...acc, [product.id]: 0}), {})
    )
  
    const productCategories = useMemo(() => 
      Array.from(new Set(dryFoodProducts.map(p => p.category))),
      []
    )
  
    const maxPrice = useMemo(() => 
      Math.max(...dryFoodProducts.map(p => p.price)),
      []
    )
  

    const filteredProducts = dryFoodProducts.filter(product => 
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
        <h1 className="text-3xl font-bold mb-8">Dry Food</h1>
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