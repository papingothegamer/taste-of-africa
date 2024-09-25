'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Mail, Clock, Percent } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import { Product, allProducts } from '@/app/productList';

const promos = [
  { id: 1, name: 'Summer Sale', image: '/images/promos/summer-sale.jpg', discount: '20% OFF', endDate: '2023-08-31' },
  { id: 2, name: 'Back to School', image: '/images/promos/back-to-school.jpg', discount: '15% OFF', endDate: '2023-09-15' },
  { id: 3, name: 'Clearance', image: '/images/promos/clearance.jpg', discount: 'Up to 50% OFF', endDate: '2023-07-31' },
  { id: 4, name: 'New Customer', image: '/images/promos/new-customer.jpg', discount: '10% OFF', endDate: '2023-12-31' },
];

const getRandomProducts = (productList: Product[], count: number): Product[] => {
  const shuffled = productList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function PromosPage() {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    const randomProductsFromList = getRandomProducts(allProducts, 4);
    setRandomProducts(randomProductsFromList);
  }, []);

  return (
    <div className="w-full max-w-[80%] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Current Promotions</h1>

      {/* Hero Banner */}
      <motion.div
        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-6 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Exclusive Deals Just for You!</h2>
        <p className="mb-6">Don't miss out on our limited-time offers. Shop now and save big on your favorite African products.</p>
        <Button className="bg-white text-orange-600 hover:bg-gray-100">
          View All Deals <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

      {/* Promos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {promos.map((promo) => (
          <motion.div
            key={promo.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={`/promos/${promo.id}`}>
              <Image
                src={promo.image}
                alt={promo.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{promo.name}</h3>
                <p className="text-green-600 font-bold mb-2">{promo.discount}</p>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Ends: {promo.endDate}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Featured Promos */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Promo Products</h2>
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
              variant="category"
            />
          ))}
        </div>
      </section>

      {/* CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <motion.div 
          className="bg-purple-100 border-l-4 border-purple-500 p-6 rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-purple-800 mb-2">Flash Sales</h3>
          <p className="text-purple-700 mb-4">Limited-time offers on select items. Act fast!</p>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white">
            Shop Flash Sales <Star className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
        <motion.div 
          className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-blue-800 mb-2">Bulk Discounts</h3>
          <p className="text-blue-700 mb-4">Save more when you buy more. Check out our bulk offers!</p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            View Bulk Deals <Percent className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Newsletter */}
      <motion.div
        className="bg-orange-600 text-white rounded-lg p-6 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <Mail className="h-6 w-6 text-white mr-4" />
          <h3 className="text-xl font-semibold">Get Exclusive Promo Codes</h3>
        </div>
        <p className="mt-2">Subscribe to our newsletter and receive exclusive promo codes directly in your inbox.</p>
        <div className="mt-4">
          <input
            type="email"
            className="bg-white text-gray-900 px-4 py-2 rounded-lg mr-2 w-full md:w-auto"
            placeholder="Enter your email"
          />
          <Button className="bg-white text-orange-600 hover:bg-gray-100">
            Subscribe
          </Button>
        </div>
      </motion.div>
    </div>
  );
}