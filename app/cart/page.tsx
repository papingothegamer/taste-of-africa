'use client';

import { useCart } from '../context/cartContext';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { ShoppingBasket, ArrowRight, Truck } from 'lucide-react';
import Link from 'next/link'; // Import the Link component from Next.js

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full sm:w-[95%] md:w-[90%] lg:w-[80%]">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 flex items-center">
          <ShoppingBasket className="mr-4 h-8 w-8 text-green-600" />
          Your Cart
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <ShoppingBasket className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Your cart is empty.</p>
                <Link href="/shop"> {/* Link to the shop page */}
                  <Button className="mt-6 bg-green-600 text-white hover:bg-green-700">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <ProductCard
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image || '/path/to/default/image.jpg'} // Provide a default image path
                      category={item.category}
                      rating={item.rating}
                      variant="cart"
                      quantity={item.quantity}
                      onRemove={() => removeFromCart(item.id)}
                      onAddToWishlist={() => console.log(`Added item ${item.id} to wishlist`)}
                      onIncreaseQuantity={() => updateQuantity(item.id, item.quantity + 1)}
                      onDecreaseQuantity={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg text-gray-600">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg text-gray-600">
                  <span>Shipping:</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Truck className="mr-2 h-4 w-4" />
                  Free shipping on orders over $50
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full py-3 bg-green-600 text-white text-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
