'use client'

import { useState, useMemo } from 'react'
import { Button } from "../../components/ui/Button"
import { Select } from "../../components/ui/Select"
import ProductCard from '../../components/ProductCard'
import { FilterSidebar } from '../../components/FilterSidebar'


// Dummy products
const hairCareProducts = [
  { id: 25, name: "Shampoo", price: 6.99, image: "/placeholder.svg", category: "Cleansing", rating: 4.3, description: "Nourishing shampoo for all hair types.", productCategory: "hair-care" },
  { id: 26, name: "Conditioner", price: 7.49, image: "/placeholder.svg", category: "Conditioning", rating: 4.4, description: "Hydrating conditioner for smooth hair.", productCategory: "hair-care" },
  { id: 27, name: "Hair Oil", price: 5.99, image: "/placeholder.svg", category: "Treatment", rating: 4.6, description: "Nourishing hair oil for shine and health.", productCategory: "hair-care" },
  { id: 28, name: "Hair Spray", price: 4.99, image: "/placeholder.svg", category: "Styling", rating: 4.1, description: "Long-lasting hair spray for styling.", productCategory: "hair-care" },
  { id: 29, name: "Hair Gel", price: 3.99, image: "/placeholder.svg", category: "Styling", rating: 4.0, description: "Strong hold hair gel for various styles.", productCategory: "hair-care" },
  { id: 30, name: "Hair Mask", price: 8.99, image: "/placeholder.svg", category: "Treatment", rating: 4.7, description: "Deep conditioning hair mask for damaged hair.", productCategory: "hair-care" },
  { id: 31, name: "Leave-in Conditioner", price: 9.99, image: "/placeholder.svg", category: "Conditioning", rating: 4.5, description: "Lightweight leave-in conditioner for daily use.", productCategory: "hair-care" },
  { id: 32, name: "Heat Protectant", price: 12.99, image: "/placeholder.svg", category: "Treatment", rating: 4.8, description: "Protective spray for heat styling.", productCategory: "hair-care" },
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
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("featured")
    const [priceRange, setPriceRange] = useState([0, 20])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [quantities, setQuantities] = useState<{[key: number]: number}>(
      hairCareProducts.reduce((acc, product) => ({...acc, [product.id]: 0}), {})
    )
  
    const productCategories = useMemo(() => 
      Array.from(new Set( hairCareProducts.map(p => p.category))),
      []
    )
  
    const maxPrice = useMemo(() => 
      Math.max(...hairCareProducts.map(p => p.price)),
      []
    )
  

    const filteredProducts =  hairCareProducts.filter(product => 
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
        <h1 className="text-3xl font-bold mb-8">Hair Care</h1>
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