import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBasket, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from "../components/ui/Button";
import { useCart } from '../context/cartContext';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  variant: 'category' | 'wishlist' | 'cart';
  onAddToCart?: () => void;
  onRemove?: () => void;
  onAddToWishlist?: () => void;
  onIncreaseQuantity?: () => void;
  onDecreaseQuantity?: () => void;
  quantity?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  rating,
  variant,
  onAddToCart,
  onRemove,
  onAddToWishlist,
  onIncreaseQuantity,
  onDecreaseQuantity,
  quantity,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the "Add to Cart" button
    addToCart({
      id,
      name,
      price,
      image,
      category,
      rating,
      quantity: quantity || 1,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/product/${id}`} className="block relative">
        <Image
          src={image}
          alt={name}
          width={250}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        {variant === 'category' && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100"
            onClick={(e) => {
              e.preventDefault();
              onAddToWishlist && onAddToWishlist();
            }}
          >
            <Heart className="h-4 w-4 text-grey-500" />
          </Button>
        )}
        {variant === 'wishlist' && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100"
            onClick={(e) => {
              e.preventDefault();
              onRemove && onRemove();
            }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </Link>
      <div className="p-4">
        <Link href={`/product/${id}`} className="block">
          <h3 className="text-lg font-semibold mb-2 hover:text-green-600 transition-colors">{name}</h3>
        </Link>
        <p className="text-gray-600 mb-2">{category}</p>
        <p className="text-xl font-bold mb-4">${price.toFixed(2)}</p>

        {variant === 'category' && (
          <Button
            className="w-full bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center space-x-2"
            onClick={handleAddToCart}
          >
            <ShoppingBasket className="h-5 w-5" />
            <span>Add to Cart</span>
          </Button>
        )}

        {variant === 'wishlist' && (
          <Button
            className="w-full bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center space-x-2"
            onClick={handleAddToCart}
          >
            <ShoppingBasket className="h-5 w-5" />
            <span>Add to Cart</span>
          </Button>
        )}

        {variant === 'cart' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={onDecreaseQuantity}
                disabled={quantity === 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={onIncreaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onAddToWishlist}
              >
                <Heart className="h-5 w-5 text-gray-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}