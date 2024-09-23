import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Heart, ShoppingBasket } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  onAddToWishlist: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  rating,
  onAddToWishlist,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={name}
            width={300}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
        </Link>
        <button
          onClick={onAddToWishlist}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-200 transition"
        >
          <Heart className="h-5 w-5 text-grey-500" />
        </button>
      </div>
      <div className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
        </Link>
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l2.78 6.09L21 9.24l-4.92 4.8L17.72 21 12 17.77 6.28 21l1.64-6.96L3 9.24l6.22-1.15L12 2z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-xl font-bold mb-4">${price.toFixed(2)}</p>
        <div className="flex justify-center">
          <Button className="w-full bg-green-600 text-white" onClick={onAddToCart}>
            <ShoppingBasket className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
