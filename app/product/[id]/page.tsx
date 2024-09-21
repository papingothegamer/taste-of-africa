'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Star, Heart, Minus, Plus, ShoppingBasket } from 'lucide-react'
import { Button } from "../../components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
  description: string
}

// Mock product data (this should ideally come from a central data store or API)
const mockProducts: Product[] = [
  { id: 1, name: "Organic Bananas", price: 2.99, image: "/placeholder.svg", category: "Fruits", rating: 4.5, description: "Fresh, organic bananas sourced from local farmers. Rich in potassium and perfect for a healthy snack or smoothie ingredient." },
  { id: 2, name: "Fresh Tomatoes", price: 1.99, image: "/placeholder.svg", category: "Vegetables", rating: 4.2, description: "Juicy, ripe tomatoes perfect for salads, sandwiches, or cooking. Locally grown and harvested at peak freshness." },
  { id: 3, name: "Whole Chicken", price: 8.99, image: "/placeholder.svg", category: "Meat", rating: 4.0, description: "Farm-raised, antibiotic-free whole chicken. Versatile for roasting, grilling, or making soup." },
  { id: 4, name: "Atlantic Salmon", price: 12.99, image: "/placeholder.svg", category: "Seafood", rating: 4.7, description: "Wild-caught Atlantic salmon, rich in omega-3 fatty acids. Perfect for grilling, baking, or pan-searing." },
  { id: 5, name: "Organic Spinach", price: 3.99, image: "/placeholder.svg", category: "Vegetables", rating: 4.3, description: "Nutrient-dense organic spinach, great for salads, smoothies, or cooking." },
  { id: 6, name: "Red Apples", price: 4.99, image: "/placeholder.svg", category: "Fruits", rating: 4.4, description: "Crisp and sweet red apples, perfect for snacking or baking." },
  { id: 7, name: "Ground Beef", price: 7.99, image: "/placeholder.svg", category: "Meat", rating: 4.1, description: "Lean ground beef from grass-fed cattle. Ideal for burgers, meatballs, or tacos." },
  { id: 8, name: "Fresh Tilapia", price: 9.99, image: "/placeholder.svg", category: "Seafood", rating: 4.0, description: "Farm-raised tilapia fillets, mild in flavor and versatile for various recipes." },
]

// Mock function to fetch product data
const fetchProduct = (id: string): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id.toString() === id)
      resolve(product || null)
    }, 500) // Simulate network delay
  })
}

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState('')

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProduct(id as string)
      setProduct(productData)
      if (productData) {
        setMainImage(productData.image)
      }
    }
    loadProduct()
  }, [id])

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    if (product) {
      console.log(`Added ${quantity} ${product.name}(s) to cart`)
    }
  }

  const handleAddToWishlist = () => {
    if (product) {
      console.log(`Added ${product.name} to wishlist`)
    }
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  // Generate dummy related products
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8 w-full lg:w-[80%]">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <Image
            src={mainImage}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg mb-4"
          />
          <div className="grid grid-cols-5 gap-2">
            {[product.image, ...Array(4)].map((img, index) => (
              <Image
                key={index}
                src={img || '/placeholder.svg'}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={100}
                height={100}
                className={`w-full h-auto rounded-md cursor-pointer ${
                  img === mainImage ? 'border-2 border-green-500' : ''
                }`}
                onClick={() => setMainImage(img || '/placeholder.svg')}
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
            <Button className="flex-1 bg-green-600 text-white" onClick={handleAddToCart}>
              <ShoppingBasket className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleAddToWishlist}>
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
            <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={relatedProduct.image}
                alt={relatedProduct.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{relatedProduct.name}</h3>
                <p className="text-xl font-bold">${relatedProduct.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
