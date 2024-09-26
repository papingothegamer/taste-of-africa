'use client'

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Heart, ShoppingBasket, Search, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "../input/SearchBar"
import { Button } from "../Button"
import { useCart } from "../../../context/cartContext"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [isCartPopupVisible, setIsCartPopupVisible] = useState(false)
  const { cartItems, cartTotal } = useCart()
  
  // State to keep track of selected link
  const [selectedLink, setSelectedLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/images/logo/logo.png" alt="Taste of Africa Logo" width={40} height={40} />
            </Link>
          </div>
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative hidden md:block">
              <Input type="text" placeholder="Search products..." className="w-full pl-10 pr-4" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-1"
                onClick={() => setAccountOpen(!accountOpen)}
              >
                <User className="h-5 w-5" />
                <span className="hidden md:inline">Your Account</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${accountOpen ? "rotate-180" : ""}`} />
              </Button>
              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-[calc(100%+2rem)] bg-white rounded-md shadow-lg py-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col items-center">
                      <Link href="/account/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center">
                        Login
                      </Link>
                      <Link href="/account/sign-up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center">
                        Sign Up
                      </Link>
                      <Link href="/account/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center">
                        Profile
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Wishlist Button */}
            <Link href="/wishlist">
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            {/* Cart Button with Popup */}
            <div
              className="relative"
              onMouseEnter={() => setIsCartPopupVisible(true)}
              onMouseLeave={() => setIsCartPopupVisible(false)}
            >
              <Button
                variant="default"
                size="icon"
                className="bg-green-500 text-white"
              >
                <ShoppingBasket className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-600 rounded-full">
                    ${cartTotal.toFixed(2)}
                  </span>
                )}
              </Button>

              <AnimatePresence>
                {isCartPopupVisible && cartItems.length > 0 && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2">
                      <p className="text-sm font-semibold text-gray-700">Cart Summary</p>
                      <p className="text-sm text-gray-600">{cartItems.length} item(s)</p>
                      <p className="text-lg font-bold text-green-600 mt-1">Total: ${cartTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-center">
                      <Link href="/cart">
                        <Button className="w-full mt-2">View Cart</Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Section */}
      <motion.div
        className="bg-gray-50"
        initial={{ height: "auto" }}
        animate={{ height: isScrolled ? 0 : "auto" }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-12 space-x-8">
            <Link 
              href="/shop" 
              className={`text-sm font-medium ${selectedLink === "Shop Now" ? "text-green-500" : "text-gray-700  hover:text-green-600"}`}
              onClick={() => setSelectedLink("Shop Now")}
            >
              Shop Now
            </Link>
            <Link 
              href="/promos" 
              className={`text-sm font-medium ${selectedLink === "Promos" ? "text-green-500" : "text-gray-700  hover:text-green-600"}`}
              onClick={() => setSelectedLink("Promos")}
            >
              Promos
            </Link>
            <Link 
              href="/categories" 
              className={`text-sm font-medium ${selectedLink === "Categories" ? "text-green-500" : "text-gray-700  hover:text-green-600"}`}
              onClick={() => setSelectedLink("Categories")}
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}
