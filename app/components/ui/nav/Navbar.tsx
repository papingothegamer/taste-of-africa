"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Heart, ShoppingBasket, Search } from "lucide-react"; // Updated import
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../ui/input/SearchBar";
import { Button } from "../Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [wishlistTotal, setWishlistTotal] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = () => {
    setCartTotal(cartTotal + 1); // Mock logic
    setCartOpen(true);
  };

  const addToWishlist = () => {
    setWishlistTotal(wishlistTotal + 1); // Mock logic
    setWishlistOpen(true);
  };

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
            <div className="relative">
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
                <span>Your Account</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${accountOpen ? "rotate-180" : ""}`} />
              </Button>
              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href="/account/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link href="/account/sign-up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Up
                    </Link>
                    <Link href="/account/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <Button variant="outline" size="icon" onClick={addToWishlist}>
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
              {/* Wishlist popup */}
              <AnimatePresence>
                {wishlistOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 text-sm text-gray-700">Total items in wishlist: {wishlistTotal}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <Button
                variant="default"
                size="icon"
                className="bg-green-500 text-white" 
                onClick={addToCart}
              >
                <ShoppingBasket className="h-5 w-5" /> {/* Updated icon */}
                <span className="sr-only">Cart</span>
              </Button>
              {/* Cart popup */}
              <AnimatePresence>
                {cartOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 text-sm text-gray-700">Total items in cart: {cartTotal}</div>
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-12 space-x-8">
            <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Shop Now
            </Link>
            <Link href="/promos" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Promos
            </Link>
            <Link href="/categories" className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900">
              <span>Browse Categories</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
