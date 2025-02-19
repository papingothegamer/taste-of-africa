'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/app/productList';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  products: Product[];
  isVisible: boolean;
  onClose: () => void;
}

export default function SearchResults({ query, products, isVisible, onClose }: SearchResultsProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      setSuggestedCategories([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    
    // Filter products
    const matchedProducts = products.filter(product => {
      const matchName = product.name.toLowerCase().includes(searchTerm);
      const matchCategory = product.category.toLowerCase().includes(searchTerm);
      const matchDescription = product.description?.toLowerCase().includes(searchTerm);
      return matchName || matchCategory || matchDescription;
    }).slice(0, 5);

    // Get unique categories from matched products
    const categories = Array.from(new Set(
      products
        .filter(product => product.category.toLowerCase().includes(searchTerm))
        .map(product => product.category)
    )).slice(0, 3);

    setFilteredProducts(matchedProducts);
    setSuggestedCategories(categories);
  }, [query, products]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (query.trim().length > 0) && (
        <>
          {/* Overlay that starts below the navbar */}
          <motion.div
            className="fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-1 z-50 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="p-4">
              {filteredProducts.length === 0 && suggestedCategories.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">No results found for "{query}"</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Products */}
                  {filteredProducts.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Products</h3>
                      <div className="space-y-4">
                        {filteredProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={onClose}
                          >
                            <div className="flex-shrink-0 w-12 h-12 relative">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {product.category}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <p className="text-sm font-medium text-green-600">
                                ${product.price}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories */}
                  {suggestedCategories.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {suggestedCategories.map((category) => (
                          <Link
                            key={category}
                            href={`/categories/${category.toLowerCase()}`}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={onClose}
                          >
                            <Search className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{category}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
