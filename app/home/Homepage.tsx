'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Truck, Headphones, CreditCard, MapPin, Phone, Mail, Clock, ChevronRight, Utensils, ShirtIcon, LucideImage } from 'lucide-react'
import { Button } from "../components/ui/Button"
import { motion } from 'framer-motion'

const importImage = (imagePath: string) => {
  return `/images/misc/${imagePath}`
}

const Homepage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden rounded-b-lg">
        <Image 
          src={importImage("west-african-food-concept-traditional-600nw-1351940339.webp")}
          alt="African Food" 
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="rounded-b-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70 rounded-b-lg" />
        <motion.div 
          className="relative z-10 text-left text-white max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Discover the <span className="text-yellow-400">Taste of Africa</span></h1>
          <p className="text-xl md:text-2xl mb-8 max-w-xl">
            Authentic African goods delivered straight to your doorstep
          </p>
          <Link href="/shop" passHref>
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-white rounded-lg">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Our Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'African Foods', icon: Utensils, color: 'text-green-500' },
              { name: 'African Fashion', icon: ShirtIcon, color: 'text-green-500' },
              { name: 'African Art', icon: LucideImage, color: 'text-green-500' }
            ].map((category, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <category.icon className={`w-full h-full ${category.color}`} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">Explore authentic {category.name.toLowerCase()} from different regions of Africa.</p>
                  <Link href={`/categories`}>
                    <Button variant="outline" className="w-full group rounded-full">
                      Explore {category.name}
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-green-600 to-green-700 text-white rounded-lg">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: 'Fast Shipping', description: 'Get your items delivered quickly and safely.' },
              { icon: Headphones, title: '24/7 Support', description: 'Our customer support team is always here to help.' },
              { icon: CreditCard, title: 'Secure Payment', description: 'Shop with confidence using our secure payment methods.' },
            ].map((service, index) => (
              <motion.div 
                key={index} 
                className="bg-white text-gray-800 rounded-lg p-6 shadow-lg text-center transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <service.icon className="mx-auto h-16 w-16 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100 rounded-lg">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                testimonial: "The quality of the African foods is outstanding! I can't get enough of the spices.",
                name: "John Doe",
                role: "Food Enthusiast",
                image: "/images/misc/isolated-shot-happy-afro-american-man-looks-away-with-glad-expression-smiles-broadly-wears-winter-hat-with-pompon-black-suit-isolated-yellow-studio-wall_273609-32834.jpg"
              },
              {
                testimonial: "Fast shipping and excellent customer service. Highly recommend this store!",
                name: "Jane Smith",
                role: "Satisfied Customer",
                image: "/images/misc/beautiful-woman-looking-camera_23-2148281605.jpg"
              },
              {
                testimonial: "A fantastic selection of authentic African art. My home has never looked better!",
                name: "Michelle Johnson",
                role: "Art Lover",
                image: "/images/misc/portrait-young-woman-street_641386-1075.jpg"
              }
            ].map((item, index) => (
              <motion.div 
              key={index} 
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-600 italic mb-4 flex-grow">"{item.testimonial}"</p>
                <div className="flex items-center mt-auto">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white rounded-lg">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Find Us</h2>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-4 text-center">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-green-600 mr-2" />
                    <div className="text-left">
                      <p>123 African Market Street, Lodz, Poland</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-green-600 mr-2" />
                    <div className="text-left">
                      <p>+48 123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-green-600 mr-2" />
                    <div className="text-left">
                      <p>info@tasteofafrica.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-4 text-center">Store Hours</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-green-600 mr-2" />
                    <div className="text-left">
                      <p className="font-semibold">Monday - Friday:</p>
                      <p>9:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-green-600 mr-2" />
                    <div className="text-left">
                      <p className="font-semibold">Saturday:</p>
                      <p>10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-green-600 mr-2" />
                    <div className="text-left">
                      <p className="font-semibold">Sunday:</p>
                      <p>Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Visit our store for a unique shopping experience!
              </p>
              <Link href="https://www.google.com/maps/search/?api=1&query=123+African+Market+Street,+Lodz,+Poland" passHref>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full">
                  Get Directions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-b from-green-600 to-green-700 text-white rounded-lg">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8">Subscribe to our newsletter for exclusive offers and updates</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            />
            <Button type="submit" className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500 rounded-full">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Homepage