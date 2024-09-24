'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, Minus, Plus, ShoppingBasket } from 'lucide-react'
import { Button } from "../../components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { FilterSidebar } from "../../components/FilterSidebar"
import { Product, allProducts } from '../../productList'
import ProductCard from '../../components/ProductCard'
import { useCart } from '../../context/cartContext' 

const categories = [
  { id: 1, name: 'Fresh Food', link: '/categories/fresh-food', slug: 'fresh-food' },
  { id: 2, name: 'Dry Food', link: '/categories/dry-food', slug: 'dry-food' },
  { id: 3, name: 'Beverages', link: '/categories/beverages', slug: 'beverages' },
  { id: 4, name: 'Hair Care', link: '/categories/hair-care', slug: 'hair-care' },
  { id: 5, name: 'Skin Care', link: '/categories/skin-care', slug: 'skin-care' },
  { id: 6, name: 'Accessories', link: '/categories/accessories', slug: 'accessories' },
]

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { addToCart } = useCart() // Get addToCart function from CartContext

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      const productData = allProducts.find(p => p.id.toString() === id)
      setProduct(productData || null)
      if (productData) {
        setMainImage(productData.image)
      }
      setIsLoading(false)
    }
    loadProduct()
  }, [id])

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = (productToAdd?: Product) => {
    const productToLog = productToAdd || product;
    if (productToLog) {
      addToCart({ 
        id: productToLog.id, 
        name: productToLog.name, 
        price: productToLog.price, 
        quantity, 
        image: productToLog.image, 
        category: productToLog.category, 
        rating: productToLog.rating 
      });
      console.log(`Added ${quantity} ${productToLog.name}(s) to cart`)
    }
  }

  const handleAddToWishlist = (productToAdd?: Product) => {
    const productToLog = productToAdd || product;
    if (productToLog) {
      console.log(`Added ${productToLog.name} to wishlist`)
    }
  }

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index)
    const selectedProduct = allProducts.find(p => p.id.toString() === id);
    if (selectedProduct) {
      setMainImage(selectedProduct.image); // Update this based on your logic
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link href="/" className="text-green-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4 xl:w-1/5">
            <FilterSidebar
              categories={categories}
              productCategories={[]}
              onSearchChange={() => {}}
              onCategoryChange={() => {}}
              onPriceRangeChange={() => {}}
              maxPrice={0}
            />
          </div>

          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Images */}
              <div className="md:w-1/2 relative">
                <Image
                  src={mainImage}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <div className="grid grid-cols-5 gap-2">
                  {[product.image, ...Array(4)].map((img: string, index: number) => (
                    <Image
                      key={index}
                      src={img || '/placeholder.svg'}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className={`w-full h-auto rounded-md cursor-pointer ${
                        index === currentImageIndex ? 'border-2 border-green-500' : ''
                      }`}
                      onClick={() => handleImageChange(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.rating})</span>
                </div>
                <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                <div className="flex items-center mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 text-xl">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-4 mb-8">
                  <Button className="flex-1 bg-green-600 text-white" onClick={() => handleAddToCart(product)}>
                    <ShoppingBasket className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => handleAddToWishlist(product)}>
                    <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                  </Button>
                </div>
                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description">
                    <p>{product.description}</p>
                  </TabsContent>
                  <TabsContent value="reviews">
                    <p>Customer reviews will be displayed here.</p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-12">
  <h2 className="text-2xl font-bold mb-4">Related Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {relatedProducts.map((relatedProduct) => (
      <ProductCard
        key={relatedProduct.id}
        id={relatedProduct.id}
        name={relatedProduct.name}
        price={relatedProduct.price}
        image={relatedProduct.image}
        rating={relatedProduct.rating}
        category={relatedProduct.category} // Ensure 'category' is passed
        variant='category'
      />
    ))}
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  )
}
