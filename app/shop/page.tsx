"use client";

import React, { useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingBasket, Heart, Menu, X } from 'lucide-react'
import { Button } from "../components/ui/Button"

// Type definitions for products
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

type SimpleProduct = {
  id: number;
  name: string;
  image: string;
  discount?: string;
}

// Categories
const categories = [
  'Fresh Food', 'Dry Food', 'Beverages', 'Hair Care', 'Skincare',
  'Accessories'
]

// Carousel items
const carouselItems = [
  { id: 1, image: '/placeholder.svg', alt: 'Fitness Factory' },
  { id: 2, image: '/placeholder.svg', alt: 'Electronics Sale' },
  { id: 3, image: '/placeholder.svg', alt: 'Fashion Deals' },
]

// Products with possible discount
const products: SimpleProduct[] = [
  { id: 1, name: 'Spices and Condiments', image: '/placeholder.svg', discount: 'Up to 30% off' },
  { id: 2, name: 'Clearance Sale', image: '/placeholder.svg', discount: 'Up to 30% off' },
  { id: 3, name: 'Skincare Products', image: '/placeholder.svg', discount: '' },
  { id: 4, name: 'Groceries', image: '/placeholder.svg', discount: '' },
  { id: 5, name: 'Beverages', image: '/placeholder.svg', discount: '' },
  { id: 6, name: 'Native Foods', image: '/placeholder.svg', discount: '' },
]

// Detailed products
const detailedProducts: Product[] = [
  { id: 1, name: 'African Spice Mix', category: 'Food', price: 9.99, image: '/placeholder.svg' },
  { id: 2, name: 'Dashiki Shirt', category: 'Fashion', price: 39.99, image: '/placeholder.svg' },
  { id: 3, name: 'Wooden Mask', category: 'Art', price: 59.99, image: '/placeholder.svg' },
  { id: 4, name: 'Jollof Rice Mix', category: 'Food', price: 7.99, image: '/placeholder.svg' },
  { id: 5, name: 'Ankara Fabric', category: 'Fashion', price: 24.99, image: '/placeholder.svg' },
  { id: 6, name: 'Tribal Painting', category: 'Art', price: 89.99, image: '/placeholder.svg' },
  { id: 7, name: 'African Coffee Beans', category: 'Food', price: 14.99, image: '/placeholder.svg' },
  { id: 8, name: 'Beaded Necklace', category: 'Fashion', price: 29.99, image: '/placeholder.svg' },
]

// Function to shuffle arrays with a specific type
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-sm w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Categories</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function ShopPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  // Shuffle products to display
  const oraimoProducts = shuffleArray(detailedProducts).slice(0, 4)
  const featuredProducts = shuffleArray(detailedProducts).slice(0, 4)

  return (
    <div className="mx-auto px-4 py-8 w-full lg:w-4/5">
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Mobile Sidebar Trigger */}
        <Button className="lg:hidden mb-4" variant="outline" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="mr-2 h-4 w-4" /> Categories
        </Button>

        {/* Custom Modal for Mobile Sidebar */}
        <Modal isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="mb-2 hover:text-orange-500 cursor-pointer">{category}</li>
            ))}
          </ul>
        </Modal>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-1/5 bg-white rounded-lg shadow-md p-4">
          <h2 className="font-bold text-lg mb-4">Categories</h2>
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="mb-2 hover:text-orange-500 cursor-pointer">{category}</li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/5">
          {/* Carousel */}
          <div className="relative rounded-lg overflow-hidden mb-4">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {carouselItems.map((item) => (
                <Image key={item.id} src={item.image} alt={item.alt} width={800} height={400} className="w-full" />
              ))}
            </div>
            <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-1/5 bg-white rounded-lg shadow-md p-4">
          <Image src="/placeholder.svg" alt="Promotional Banner" width={300} height={400} className="w-full rounded-lg" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-2">{product.name}</h3>
              {product.discount && <p className="text-orange-500 text-sm">{product.discount}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* ORAIMO PRODUCTS Section */}
      <div className="mb-8 bg-green-700 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">ORAIMO PRODUCTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {oraimoProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative text-gray-800">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
              </div>
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full p-2"
                >
                  <Heart className="h-5 w-5 text-gray-500" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full p-2"
                >
                  <ShoppingBasket className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mb-8 bg-orange-500 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative text-gray-800">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
              </div>
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full p-2"
                >
                  <Heart className="h-5 w-5 text-gray-500" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full p-2"
                >
                  <ShoppingBasket className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}