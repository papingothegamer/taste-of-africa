import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Heart, ShoppingCart } from 'lucide-react'

const Navbar = () => {
    return (
        <nav className="bg-white px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/">
                    <Image src="/images/logo/logo.png" alt="Taste of Africa Logo" width={32} height={32} className="w-auto" />
                </Link>
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-8 text-sm font-medium">
                <li><Link href="/shop">Shop Now</Link></li>
                <li><Link href="/explore">Explore More</Link></li>
                <li><Link href="/discover">Discover</Link></li>
                <li>
                    <div className="relative group">
                        <button className="focus:outline-none flex items-center">
                            Browse Categories <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-white shadow-lg p-4">
                            <ul>
                                <li><Link href="/categories/food">Food Products</Link></li>
                                <li><Link href="/categories/skincare">Skincare Products</Link></li>
                                <li><Link href="/categories/haircare">Haircare Products</Link></li>
                                <li><Link href="/categories/accessories">Fashion Accessories</Link></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>

            {/* Wishlist and Cart */}
            <div className="flex space-x-4">
                <Link href="/wishlist" className="border px-4 py-1 rounded-lg flex items-center">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                </Link>
                <Link href="/cart" className="bg-green-500 text-white px-4 py-1 rounded-lg flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart
                </Link>
            </div>
        </nav>
    )
}

export default Navbar