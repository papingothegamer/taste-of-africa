"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);

    return (
        <div className="w-4/5 mx-auto sticky top-0 left-0 right-0 z-50 bg-white">
            <nav className="px-6 py-4 flex flex-col md:flex-row justify-between items-center">
                {/* Logo */}
                <div className="flex items-center mb-4 md:mb-0">
                    <Link href="/">
                        <Image src="/images/logo/logo.png" alt="Taste of Africa Logo" width={32} height={32} className="w-auto" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-sm font-medium mb-4 md:mb-0">
                    <li><Link href="/shop">Shop Now</Link></li>
                    <li><Link href="/promos">Promos</Link></li>
                    <li className="relative">
                        <button
                            className="flex items-center relative focus:outline-none"
                            onClick={() => setCategoryOpen(!categoryOpen)}
                        >
                            <span>Browse Categories</span>
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: categoryOpen ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                            </motion.div>
                            <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: categoryOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {categoryOpen && (
                                <motion.div
                                    className="absolute hidden md:block bg-white p-4 mt-2"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ul>
                                        <li><Link href="/categories/food">Food Products</Link></li>
                                        <li><Link href="/categories/skincare">Skin Care </Link></li>
                                        <li><Link href="/categories/haircare">Hair Care </Link></li>
                                        <li><Link href="/categories/accessories">Fashion </Link></li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                    <li className="relative">
                        <button
                            className="flex items-center relative focus:outline-none"
                            onClick={() => setAccountOpen(!accountOpen)}
                        >
                            <span>Your Account</span>
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: accountOpen ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                            </motion.div>
                            <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: accountOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {accountOpen && (
                                <motion.div
                                    className="absolute hidden md:block bg-white p-4 mt-2"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ul>
                                        <li><Link href="/account/login">Login</Link></li>
                                        <li><Link href="/account/sign-up">Sign Up</Link></li>
                                        <li><Link href="/account/profile">Profile</Link></li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                </ul>

                {/* Wishlist and Cart */}
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <Link href="/wishlist" className="border px-4 py-2 rounded-lg flex items-center justify-center">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                    </Link>
                    <Link href="/cart" className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Cart
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
