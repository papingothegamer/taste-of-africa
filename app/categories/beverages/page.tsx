'use client'

import { useState, useMemo } from 'react'
import { Button } from "../../components/ui/Button"
import { Select } from "../../components/ui/Select"
import ProductCard from '../../components/ProductCard'
import { FilterSidebar } from '../../components/FilterSidebar'

// Dummy products
const beveragesProducts = [
  { id: 17, name: "Orange Juice", price: 3.99, image: "/placeholder.svg", category: "Juices", rating: 4.2, description: "Freshly squeezed orange juice.", productCategory: "beverages" },
  { id: 18, name: "Green Tea", price: 2.49, image: "/placeholder.svg", category: "Tea", rating: 4.5, description: "Antioxidant-rich green tea.", productCategory: "beverages" },
  { id: 19, name: "Coca-Cola", price: 1.99, image: "/placeholder.svg", category: "Soda", rating: 4.0, description: "Classic Coca-Cola soft drink.", productCategory: "beverages" },
  { id: 20, name: "Coffee Beans", price: 12.99, image: "/placeholder.svg", category: "Coffee", rating: 4.8, description: "Premium roasted coffee beans.", productCategory: "beverages" },
  { id: 21, name: "Lemonade", price: 2.99, image: "/placeholder.svg", category: "Juices", rating: 4.1, description: "Refreshing homemade-style lemonade.", productCategory: "beverages" },
  { id: 22, name: "Mineral Water", price: 0.99, image: "/placeholder.svg", category: "Water", rating: 4.0, description: "Pure mineral water from natural springs.", productCategory: "beverages" },
  { id: 23, name: "Energy Drink", price: 2.99, image: "/placeholder.svg", category: "Energy", rating: 3.9, description: "Energizing drink for a quick boost.", productCategory: "beverages" },
  { id: 24, name: "Herbal Tea", price: 4.49, image: "/placeholder.svg", category: "Tea", rating: 4.3, description: "Soothing blend of herbal teas.", productCategory: "beverages" },
  ]

  const categories = [
    { id: 1, name: 'Fresh Food', link: '/categories/fresh-food', slug: 'fresh-food' },
    { id: 2, name: 'Dry Food', link: '/categories/dry-food', slug: 'dry-food' },
    { id: 3, name: 'Beverages', link: '/categories/beverages', slug: 'beverages' },
    { id: 4, name: 'Hair Care', link: '/categories/hair-care', slug: 'hair-care' },
    { id: 5, name: 'Skin Care', link: '/categories/skin-care', slug: 'skin-care' },
    { id: 6, name: 'Accessories', link: '/categories/accessories', slug: 'accessories' },
  ]
  
  
  export default function BeveragesCategory() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("featured")
    const [priceRange, setPriceRange] = useState([0, 20])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [quantities, setQuantities] = useState<{[key: number]: number}>(
      beveragesProducts.reduce((acc, product) => ({...acc, [product.id]: 0}), {})
    )
  
    const productCategories = useMemo(() => 
      Array.from(new Set(beveragesProducts.map(p => p.category))),
      []
    )
  
    const maxPrice = useMemo(() => 
      Math.max(...beveragesProducts.map(p => p.price)),
      []
    )
  
    const filteredProducts = beveragesProducts.filter(product => 
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
        <h1 className="text-3xl font-bold mb-8">Beverages</h1>
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
                  variant="category"
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