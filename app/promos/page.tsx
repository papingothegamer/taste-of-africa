'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBasket, Clock, Tag, ArrowRight, Gift, Percent, Mail } from 'lucide-react'
import { Button } from "../components/ui/Button"

const featuredPromo = {
  title: "African Heritage Month",
  description: "Celebrate our rich culture with up to 50% off on selected items!",
  image: "/placeholder.svg",
  expiryDate: "2023-09-30",
  code: "HERITAGE50"
}

const promos = [
  {
    id: 1,
    title: "Summer Spice Bonanza",
    description: "Get 30% off on all spice mixes!",
    image: "/placeholder.svg",
    expiryDate: "2023-08-31",
    code: "SUMMER30",
    category: "Food"
  },
  {
    id: 2,
    title: "African Fashion Week",
    description: "Buy any 2 clothing items and get 1 free!",
    image: "/placeholder.svg",
    expiryDate: "2023-09-15",
    code: "FASHION3FOR2",
    category: "Fashion"
  },
  {
    id: 3,
    title: "Tribal Art Collection",
    description: "20% discount on all handcrafted items",
    image: "/placeholder.svg",
    expiryDate: "2023-09-30",
    code: "TRIBALART20",
    category: "Art"
  },
  {
    id: 4,
    title: "Taste of Nigeria Bundle",
    description: "Get a curated box of Nigerian delicacies at 25% off",
    image: "/placeholder.svg",
    expiryDate: "2023-10-10",
    code: "NIGERIAYUM25",
    category: "Food"
  },
  {
    id: 5,
    title: "African Literature Sale",
    description: "15% off on all books by African authors",
    image: "/placeholder.svg",
    expiryDate: "2023-09-20",
    code: "READAFRICA15",
    category: "Books"
  },
  {
    id: 6,
    title: "Traditional Instrument Showcase",
    description: "Free shipping on all musical instruments",
    image: "/placeholder.svg",
    expiryDate: "2023-10-05",
    code: "MUSICSHIP",
    category: "Music"
  }
]

const categories = ["All", "Food", "Fashion", "Art", "Books", "Music"]

const randomProducts = [
  { id: 1, name: "African Print Tote Bag", price: 29.99, image: "/placeholder.svg", bonus: "Free matching wallet with purchase" },
  { id: 2, name: "Shea Butter Gift Set", price: 39.99, image: "/placeholder.svg", bonus: "20% off your next skincare purchase" },
  { id: 3, name: "Handwoven Kente Scarf", price: 49.99, image: "/placeholder.svg", bonus: "Buy one, get 50% off the second" },
  { id: 4, name: "African Spice Blend Sampler", price: 24.99, image: "/placeholder.svg", bonus: "Free recipe book included" }
]

export default function PromosPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [email, setEmail] = React.useState("")

  const filteredPromos = promos.filter(promo => 
    selectedCategory === "All" || promo.category === selectedCategory
  )

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscribed with email:", email)
    setEmail("")
  }

  return (
    <div className="w-full max-w-[80%] mx-auto px-4 py-8">
      <motion.div 
        className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white rounded-lg p-4 sm:p-8 mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">{featuredPromo.title}</h1>
        <p className="text-base sm:text-xl mb-4 sm:mb-6">{featuredPromo.description}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm mb-1 sm:mb-2">Use code: <span className="font-bold">{featuredPromo.code}</span></p>
            <p className="text-sm">Expires: {featuredPromo.expiryDate}</p>
          </div>
          <Button className="bg-white text-pink-500 hover:bg-gray-100 w-full sm:w-auto">
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Current Promotions</h2>

      <div className="flex flex-wrap justify-center gap-2 sm:space-x-4 mb-6 sm:mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className="mb-2 sm:mb-0"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPromos.map((promo) => (
          <motion.div
            key={promo.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <Image
                src={promo.image}
                alt={promo.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded">
                {promo.category}
              </div>
            </div>
            <div className="p-4 sm:p-6 flex-grow flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{promo.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{promo.description}</p>
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Expires: {promo.expiryDate}</span>
              </div>
              <div className="flex items-center mb-4">
                <Tag className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">{promo.code}</span>
              </div>
              <Button className="w-full mt-auto  bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                <ShoppingBasket className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="bg-blue-100 border-l-4 border-blue-500 p-4 my-8 sm:my-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-blue-800 mb-2">Limited Time Offers!</h3>
        <p className="text-blue-700 mb-4">Don't miss out on these exclusive deals. Shop now and save big!</p>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          View All Deals <Percent className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Featured Products with Bonuses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
        {randomProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-xl font-bold mb-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-green-600 mb-4 flex-grow">{product.bonus}</p>
              <Button className="w-full mt-auto bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Add to Cart
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="bg-green-100 border-l-4 border-green-500 p-4 mt-8 sm:mt-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Gift className="h-6 w-6 text-green-500 mr-4" />
            <p className="text-green-700 text-sm sm:text-base">
              <span className="font-bold">Pro Tip:</span> Sign up for our newsletter to get exclusive promotions and early access to sales!
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-2 border border-green-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-l-none">
              Subscribe <Mail className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}