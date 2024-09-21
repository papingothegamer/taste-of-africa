import Image from 'next/image'
import Link from 'next/link'
import { Button } from "./ui/Button"
import { Heart, ShoppingBasket } from 'lucide-react'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  category: string
  onAddToWishlist: () => void
  onAddToCart: () => void
}

export default function ProductCard({ id, name, price, image, category, onAddToWishlist, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {/* Make the image and name clickable to the product page */}
        <Link 
          href={{ pathname: `/product/${id}`, query: { name, price, image, category } }}
        >
          <Image
            src={image}
            alt={name}
            width={300}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {/* Wishlist button */}
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-white bg-opacity-70 hover:bg-opacity-100"
            onClick={(e) => {
              e.preventDefault();
              onAddToWishlist();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Link 
          href={{ pathname: `/product/${id}`, query: { name, price, image, category } }}
        >
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
        </Link>
        <p className="text-gray-600 mb-2">{category}</p>
        <p className="text-xl font-bold mb-4">${price.toFixed(2)}</p>
        
        {/* Add to Cart button */}
        <Button 
          className="w-full bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center space-x-2"
          onClick={onAddToCart}
        >
          <ShoppingBasket className="h-5 w-5" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  )
}
