import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-gray-600">{category}</p>
          <p className="text-xl font-bold mt-2">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}