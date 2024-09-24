'use client'

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Truck, Headphones, CreditCard } from 'lucide-react';
import { Button } from "../components/ui/Button";

const Homepage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/misc/west-african-food-concept-traditional-600nw-1351940339.webp" 
          alt="African Food" 
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover the Taste of Africa</h1>
          <p className="text-xl md:text-2xl mb-8">
            Authentic African goods delivered straight to your doorstep
          </p>
          <Link href="/shop" passHref>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[80%]">
          <h2 className="text-4xl font-bold text-center mb-12">Our Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['African Foods', 'African Fashion', 'African Art'].map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <Image 
                  src={`/images/categories/${category.toLowerCase().replace(' ', '-')}.jpg`} 
                  alt={category} 
                  width={400} 
                  height={300} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{category}</h3>
                  <p className="text-gray-600 mb-4">Explore authentic {category.toLowerCase()} from different regions of Africa.</p>
                  <Button variant="outline" className="w-full">
                    Explore {category}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-[80%]">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: 'Fast Shipping', description: 'Get your items delivered quickly and safely.' },
              { icon: Headphones, title: '24/7 Support', description: 'Our customer support team is always here to help.' },
              { icon: CreditCard, title: 'Secure Payment', description: 'Shop with confidence using our secure payment methods.' },
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white text-gray-800 rounded-lg p-6 shadow-lg text-center transition-transform duration-300 hover:scale-105"
              >
                <service.icon className="mx-auto h-16 w-16 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 max-w-[80%]">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                testimonial: "The quality of the African foods is outstanding! I can't get enough of the spices.",
                name: "John Doe",
                role: "Food Enthusiast",
                image: "/images/testimonials/user-1.jpg"
              },
              {
                testimonial: "Fast shipping and excellent customer service. Highly recommend this store!",
                name: "Jane Smith",
                role: "Satisfied Customer",
                image: "/images/testimonials/user-2.jpg"
              },
              {
                testimonial: "A fantastic selection of authentic African art. My home has never looked better!",
                name: "Mike Johnson",
                role: "Art Lover",
                image: "/images/testimonials/user-3.jpg"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <p className="text-gray-600 mb-4">"{item.testimonial}"</p>
                <div className="flex items-center">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={50} 
                    height={50} 
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-600">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[80%] text-center">
          <h2 className="text-4xl font-bold mb-12">Find Us</h2>
          <div className="relative">
            <div style={{ height: '400px' }} className="bg-gray-300"> {/* Placeholder for the map */}
              {/* You can replace this div with your new map library component */}
              {/* Example: <NewMapComponent /> */}
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            Come visit us at our store for a unique shopping experience!
          </p>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-[80%] text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8">Subscribe to our newsletter for exclusive offers and updates</p>
          <form className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <Button type="submit" className="bg-white text-green-600 rounded-l-none hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
