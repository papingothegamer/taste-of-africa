import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
            <div className="container mx-auto px-4">
                {/* Main grid: 4 equal sections */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 items-start">
                    {/* Logo Section */}
                    <div className="mb-8 md:mb-0">
                        <Image
                            src="/images/logo/logo.png"
                            alt="Taste of Africa"
                            width={150}
                            height={100}
                            className="w-auto"
                        />
                    </div>

                    {/* About Us Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/contact-us" className="text-gray-600 hover:text-gray-800">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-gray-600 hover:text-gray-800">
                                    Shipping
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-600 hover:text-gray-800">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="text-gray-600 hover:text-gray-800">
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Terms & Conditions Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-800">
                                    Privacy Policy
                                </Link>
                            </li>
                            
                           <li>
                                <Link href="/shipping-policy" className="text-gray-600 hover:text-gray-800">
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/return-policy" className="text-gray-600 hover:text-gray-800">
                                    Return Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Help Center Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Help Center</h3>
                        <ul className="space-y-2">
                            
                            <li>
                                <Link href="/faqs" className="text-gray-600 hover:text-gray-800">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="/order-history" className="text-gray-600 hover:text-gray-800">
                                    Order History
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-gray-600 hover:text-gray-800">
                                    My Cart
                                </Link>
                            </li>
                            <li>
                                <Link href="/account" className="text-gray-600 hover:text-gray-800">
                                    Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/wishlist" className="text-gray-600 hover:text-gray-800">
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Subscribe Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
                        <p className="text-gray-600 mb-4">
                            Join our mailing list to receive exclusive offers and updates.
                        </p>
                        <form className="mb-4">
                            <div className="flex flex-col md:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2 md:mb-0 md:mr-2"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                        <p className="text-xs text-gray-500">
                            By subscribing, you agree to our Privacy Policy and Terms & Conditions.
                        </p>
                    </div>
                </div>

                {/* Bottom section with copyright and social links */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-600 mb-4 md:mb-0">© 2024 Taste of Africa. All rights reserved.</p>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                            <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-800">Privacy Policy</Link>
                            <Link href="/terms-conditions" className="text-sm text-gray-600 hover:text-gray-800">Terms & Conditions</Link>
                            <Link href="/cookies-policy" className="text-sm text-gray-600 hover:text-gray-800">Cookies Policy</Link>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex justify-center mt-6 space-x-6">
                        <Link href="#" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-6 w-6" />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="h-6 w-6" />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-6 w-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
