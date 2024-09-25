export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
}

export const allProducts = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    image: "/images/misc/products/fresh-food/37438.jpg",
    category: "Fresh Food",
    rating: 4.5,
    description: "Fresh, organic bananas sourced from local farmers."
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    price: 1.99,
    image: "/images/misc/products/fresh-food/15411.jpg",
    category: "Fresh Food",
    rating: 4.2,
    description: "Juicy, ripe tomatoes perfect for salads."
  },
  {
    id: 3,
    name: "Whole Chicken",
    price: 8.99,
    image: "/images/misc/products/fresh-food/1776.jpg",
    category: "Fresh Food",
    rating: 4.0,
    description: "Farm-raised, antibiotic-free whole chicken."
  },
  {
    id: 4,
    name: "Atlantic Salmon",
    price: 12.99,
    image: "/images/misc/products/fresh-food/11091.jpg",
    category: "Fresh Food",
    rating: 4.7,
    description: "Wild-caught Atlantic salmon, rich in omega-3."
  },
  {
    id: 5,
    name: "Organic Spinach",
    price: 3.99,
    image: "/images/misc/products/fresh-food/30028.jpg",
    category: "Fresh Food",
    rating: 4.3,
    description: "Fresh, organic spinach leaves."
  },
  {
    id: 6,
    name: "Red Apples",
    price: 4.99,
    image: "/images/misc/products/fresh-food/271.jpg",
    category: "Fresh Food",
    rating: 4.4,
    description: "Crisp and sweet red apples."
  },
  {
    id: 7,
    name: "Ground Beef",
    price: 7.99,
    image: "/images/misc/products/fresh-food/595.jpg",
    category: "Fresh Food",
    rating: 4.1,
    description: "Lean ground beef from grass-fed cattle."
  },
  {
    id: 8,
    name: "Fresh Tilapia",
    price: 9.99,
    image: "/images/misc/products/fresh-food/tilapia-raw_1339-896.jpg",
    category: "Fresh Food",
    rating: 4.2,
    description: "Fresh tilapia fillets."
  },
  {
    id: 9,
    name: "Brown Rice",
    price: 4.99,
    image: "/images/misc/products/dry-food/brown-rice.png",
    category: "Dry Food",
    rating: 4.3,
    description: "Wholesome brown rice, rich in fiber."
  },
  {
    id: 10,
    name: "Whole Wheat Pasta",
    price: 3.49,
    image: "/images/misc/products/dry-food/whole-wheat-pasta.png",
    category: "Dry Food",
    rating: 4.1,
    description: "Nutritious whole wheat pasta."
  },
  {
    id: 11,
    name: "Oats",
    price: 2.99,
    image: "/images/misc/products/dry-food/oats.jpg",
    category: "Dry Food",
    rating: 4.4,
    description: "Hearty oats for a nutritious breakfast."
  },
  {
    id: 12,
    name: "Chickpeas",
    price: 1.99,
    image: "/images/misc/products/dry-food/chickpeas.jpg",
    category: "Dry Food",
    rating: 4.2,
    description: "Protein-rich chickpeas for various dishes."
  },
  {
    id: 13,
    name: "Quinoa",
    price: 6.49,
    image: "/images/misc/products/dry-food/quinoa.jpg",
    category: "Dry Food",
    rating: 4.6,
    description: "Superfood quinoa, packed with nutrients."
  },
  {
    id: 14,
    name: "Lentils",
    price: 2.49,
    image: "/images/misc/products/dry-food/quinoa.jpg",
    category: "Dry Food",
    rating: 4.3,
    description: "Versatile lentils for soups and salads."
  },
  {
    id: 15,
    name: "Granola",
    price: 5.99,
    image: "/images/misc/products/dry-food/granola.jpg",
    category: "Dry Food",
    rating: 4.5,
    description: "Crunchy granola with nuts and dried fruits."
  },
  {
    id: 16,
    name: "Couscous",
    price: 3.99,
    image: "/images/misc/products/dry-food/couscous.jpg",
    category: "Dry Food",
    rating: 4.2,
    description: "Light and fluffy couscous."
  },
  {
    id: 17,
    name: "Orange Juice",
    price: 3.99,
    image: "/images/misc/products/beverages/orange-juice.jpg",
    category: "Beverages",
    rating: 4.2,
    description: "Freshly squeezed orange juice."
  },
  {
    id: 18,
    name: "Green Tea",
    price: 2.49,
    image: "/images/misc/products/beverages/green-tea.jpg",
    category: "Beverages",
    rating: 4.5,
    description: "Antioxidant-rich green tea."
  },
  {
    id: 19,
    name: "Coca-Cola",
    price: 1.99,
    image: "/images/misc/products/beverages/coca-cola.jpg",
    category: "Beverages",
    rating: 4.0,
    description: "Classic Coca-Cola soft drink."
  },
  {
    id: 20,
    name: "Coffee Beans",
    price: 12.99,
    image: "/images/misc/products/beverages/coffee-beans.png",
    category: "Beverages",
    rating: 4.8,
    description: "Premium roasted coffee beans."
  },
  {
    id: 21,
    name: "Lemonade",
    price: 2.99,
    image: "/images/misc/products/beverages/lemonade.jpg",
    category: "Beverages",
    rating: 4.1,
    description: "Refreshing homemade-style lemonade."
  },
  {
    id: 22,
    name: "Mineral Water",
    price: 0.99,
    image: "/images/mineral-water.jpg",
    category: "Beverages",
    rating: 4.0,
    description: "Pure mineral water from natural springs."
  },
  {
    id: 23,
    name: "Energy Drink",
    price: 2.99,
    image: "/images/misc/products/beverages/mineral-water.jpg",
    category: "Beverages",
    rating: 3.9,
    description: "Energizing drink for a quick boost."
  },
  {
    id: 24,
    name: "Herbal Tea",
    price: 4.49,
    image: "/images/misc/products/beverages/herbal-tea.jpg",
    category: "Beverages",
    rating: 4.3,
    description: "Soothing blend of herbal teas."
  },
  {
    id: 25,
    name: "Shampoo",
    price: 6.99,
    image: "/images/misc/products/hair-care/shampoo.jpg",
    category: "Hair Care",
    rating: 4.3,
    description: "Nourishing shampoo for all hair types."
  },
  {
    id: 26,
    name: "Conditioner",
    price: 7.49,
    image: "/images/misc/products/hair-care/conditioner.png",
    category: "Hair Care",
    rating: 4.4,
    description: "Hydrating conditioner for smooth hair."
  },
  {
    id: 27,
    name: "Hair Oil",
    price: 5.99,
    image: "/images/misc/products/hair-care/hair-oil.jpg",
    category: "Hair Care",
    rating: 4.6,
    description: "Nourishing hair oil for shine and health."
  },
  {
    id: 28,
    name: "Hair Spray",
    price: 4.99,
    image: "/images/misc/products/hair-care/hair-spray.png",
    category: "Hair Care",
    rating: 4.1,
    description: "Long-lasting hair spray for styling."
  },
  {
    id: 29,
    name: "Hair Gel",
    price: 3.99,
    image: "/images/misc/products/hair-care/hair-gel.jpg",
    category: "Hair Care",
    rating: 4.0,
    description: "Strong hold hair gel for various styles."
  },
  {
    id: 30,
    name: "Hair Mask",
    price: 8.99,
    image: "/images/misc/products/hair-care/hair-mask.jpg",
    category: "Hair Care",
    rating: 4.7,
    description: "Deep conditioning hair mask for damaged hair."
  },
  {
    id: 31,
    name: "Leave-in Conditioner",
    price: 9.99,
    image: "/images/misc/products/hair-care/leave-in-conditioner.jpg",
    category: "Hair Care",
    rating: 4.5,
    description: "Lightweight leave-in conditioner for daily use."
  },
  {
    id: 32,
    name: "Heat Protectant",
    price: 12.99,
    image: "/images/misc/products/hair-care/heat-protectant.jpg",
    category: "Hair Care",
    rating: 4.8,
    description: "Protective spray for heat styling."
  },
  {
    id: 33,
    name: "Facial Cleanser",
    price: 6.99,
    image: "/images/facial-cleanser.jpg",
    category: "Skin Care",
    rating: 4.5,
    description: "Gentle facial cleanser for all skin types."
  },
  {
    id: 34,
    name: "Moisturizer",
    price: 8.99,
    image: "/images/moisturizer.jpg",
    category: "Skin Care",
    rating: 4.7,
    description: "Hydrating moisturizer for soft skin."
  },
  {
    id: 35,
    name: "Sunscreen",
    price: 9.99,
    image: "/images/sunscreen.jpg",
    category: "Skin Care",
    rating: 4.8,
    description: "Broad-spectrum sunscreen for daily use."
  },
  {
    id: 36,
    name: "Face Mask",
    price: 5.99,
    image: "/images/face-mask.jpg",
    category: "Skin Care",
    rating: 4.4,
    description: "Rejuvenating face mask for glowing skin."
  },
  {
    id: 37,
    name: "Eye Cream",
    price: 11.99,
    image: "/images/eye-cream.jpg",
    category: "Skin Care",
    rating: 4.6,
    description: "Nourishing eye cream for delicate eye area."
  },
  {
    id: 38,
    name: "Exfoliator",
    price: 7.99,
    image: "/images/exfoliator.jpg",
    category: "Skin Care",
    rating: 4.3,
    description: "Gentle exfoliating scrub for smooth skin."
  },
  {
    id: 39,
    name: "Toner",
    price: 6.49,
    image: "/images/toner.jpg",
    category: "Skin Care",
    rating: 4.2,
    description: "Balancing toner for refreshed skin."
  },
  {
    id: 40,
    name: "Serum",
    price: 15.99,
    image: "/images/serum.jpg",
    category: "Skin Care",
    rating: 4.9,
    description: "Concentrated serum for targeted skincare."
  },
  {
    id: 41,
    name: "Sunglasses",
    price: 14.99,
    image: "/images/sunglasses.jpg",
    category: "Accessories",
    rating: 4.2,
    description: "Stylish sunglasses for UV protection."
  },
  {
    id: 42,
    name: "Watch",
    price: 25.99,
    image: "/images/watch.jpg",
    category: "Accessories",
    rating: 4.6,
    description: "Elegant watch for everyday wear."
  },
  {
    id: 43,
    name: "Necklace",
    price: 9.99,
    image: "/images/necklace.jpg",
    category: "Accessories",
    rating: 4.3,
    description: "Delicate necklace for a touch of elegance."
  },
  {
    id: 44,
    name: "Bracelet",
    price: 5.49,
    image: "/images/bracelet.jpg",
    category: "Accessories",
    rating: 4.1,
    description: "Charming bracelet to complement any outfit."
  },
  {
    id: 45,
    name: "Belt",
    price: 7.99,
    image: "/images/belt.jpg",
    category: "Accessories",
    rating: 4.0,
    description: "Versatile belt for casual and formal wear."
  },
  {
    id: 46,
    name: "Earrings",
    price: 3.99,
    image: "/images/earrings.jpg",
    category: "Accessories",
    rating: 4.4,
    description: "Stylish earrings for everyday elegance."
  },
  {
    id: 47,
    name: "Hat",
    price: 12.99,
    image: "/images/hat.jpg",
    category: "Accessories",
    rating: 4.2,
    description: "Trendy hat for sun protection and style."
  },
  {
    id: 48,
    name: "Wallet",
    price: 19.99,
    image: "/images/wallet.jpg",
    category: "Accessories",
    rating: 4.5,
    description: "Durable and stylish wallet for everyday use."
  }
];

export const fetchProduct = (id: string): Product | null => {
  return allProducts.find(p => p.id.toString() === id) || null;
};

