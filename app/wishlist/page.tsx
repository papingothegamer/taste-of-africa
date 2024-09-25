'use client';

import { useWishlist } from '../context/wishlistContext';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { Heart } from 'lucide-react'; // You can choose any icon that fits
import Link from 'next/link'; // Import Link from Next.js

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const addToCart = (id: number) => {
    console.log(`Added item ${id} to cart`);
  };

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full sm:w-[95%] md:w-[90%] lg:w-[80%]">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 flex items-center">
          <Heart className="mr-4 h-8 w-8 text-grey-600" />
          Your Wishlist
        </h1>
        <div className="flex flex-col gap-8">
          {wishlistItems.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">Your wishlist is currently empty.</p>
              <Link href="/shop"> {/* Link to the shop page */}
                <Button className="mt-6 bg-green-600 text-white hover:bg-green-700">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    rating={item.rating}
                    category={item.category}
                    variant="wishlist"
                    onAddToCart={() => addToCart(item.id)}
                    onRemove={() => removeFromWishlist(item.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
