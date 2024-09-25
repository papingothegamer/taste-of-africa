'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ProductCard from '../components/ProductCard'; // Import ProductCard
import { Product, allProducts } from '../productList'; // Import your product list data

const categories = [
  { id: 1, name: 'Fresh Food', image: '/images/misc/categories/different-vegetables-little-white-bowl-white_176474-82.jpg', link: '/categories/fresh-food' },
  { id: 2, name: 'Dry Food', image: '/images/misc/categories/various-breakfast-cereals_114579-8977.jpg', link: '/categories/dry-food' },
  { id: 3, name: 'Beverages', image: '/images/misc/categories/arrangement-colorful-juice-plastic-bottles_23-2148134930.jpg', link: '/categories/beverages' },
  { id: 4, name: 'Hair Care', image: '/images/misc/categories/beauty-concept_23-2147817608.jpg', link: '/categories/hair-care' },
  { id: 5, name: 'Skin Care', image: '/images/misc/categories/different-containers-dairy-produce_23-2147935435.jpg', link: '/categories/skin-care' },
  { id: 6, name: 'Accessories', image: '/images/misc/categories/glasses-cosmetics-near-stylish-makeup-bag_23-2147779029.jpg', link: '/categories/accessories' },
];

// Utility function to get four random products
const getRandomProducts = (productList: Product[], count: number): Product[] => {
  const shuffled = productList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count); // Return the first 'count' items
};

export default function CategoriesPage() {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch 4 random products from the list
    const randomProductsFromList = getRandomProducts(allProducts, 4);
    setRandomProducts(randomProductsFromList);
  }, []);

  return (
    <div className="w-full max-w-[80%] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Our Categories</h1>

      {/* Hero Banner */}
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-6 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Discover the Richness of Africa</h2>
        <p className="mb-6">Explore our wide range of authentic African products and bring the essence of the continent to your doorstep.</p>
        <Button className="bg-white text-indigo-600 hover:bg-gray-100">
          Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={category.link}>
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <Button className="w-full bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {randomProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              rating={product.rating}
              variant="category" // Use the category variant
            />
          ))}
        </div>
      </section>

      {/* CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <motion.div 
          className="bg-green-100 border-l-4 border-green-500 p-6 rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-green-800 mb-2">New Arrivals</h3>
          <p className="text-green-700 mb-4">Check out our latest products from across Africa!</p>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            View New Arrivals <Star className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
        <motion.div 
          className="bg-orange-100 border-l-4 border-orange-500 p-6 rounded-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-orange-800 mb-2">Trending Now</h3>
          <p className="text-orange-700 mb-4">Discover what's popular among our customers!</p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            See Trending Products <TrendingUp className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Newsletter */}
      <motion.div
        className="bg-indigo-600 text-white rounded-lg p-6 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <Mail className="h-6 w-6 text-white mr-4" />
          <h3 className="text-xl font-semibold">Subscribe to Our Newsletter</h3>
        </div>
        <p className="mt-2">Stay updated with our latest products, offers, and more.</p>
        <div className="mt-4">
          <input
            type="email"
            className="bg-white text-gray-900 px-4 py-2 rounded-lg mr-2 w-full md:w-auto"
            placeholder="Enter your email"
          />
          <Button className="bg-white text-indigo-600 hover:bg-gray-100">
            Subscribe
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
