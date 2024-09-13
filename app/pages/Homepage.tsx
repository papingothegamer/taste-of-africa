// Import necessary dependencies
import Image from 'next/image';
import Link from 'next/link';

const Homepage = () => {
  return (
    <div>
      {/* CTA Section */}
      <section className="cta-section py-16 bg-gray-50">
        <div className="container mx-auto flex justify-center w-4/5">
          <div className="w-full md:w-1/2 text-center">
            <h1 className="text-4xl font-bold mb-4">Discover African Goods</h1>
            <p className="text-lg mb-6">
              Taste of Africa brings you authentic and high-quality products directly from the heart of Africa.
            </p>
            <Link href="/shop/">
              <button className="bg-green-600 text-white px-6 py-3">Shop Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="relative">
        <Image src="/images/misc/west-african-food-concept-traditional-600nw-1351940339.webp" alt="Banner Image" width={1200} height={780} className="w-full h-auto" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-white">Explore Our Unique Collection</h2>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Product Categories</h2>
          <p className="text-lg mb-6">Explore the wide variety of African products that we offer.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="category">
              <Image src="/icons/food-icon.svg" alt="Food" width={100} height={100} />
              <h3 className="text-xl font-semibold mt-4">African Foods</h3>
              <p className="mt-2">Explore authentic food items from different regions of Africa.</p>
              <Link href="/shop">
                <button className="mt-4 bg-green-600 text-white px-4 py-2">Shop Now</button>
              </Link>
            </div>
            <div className="category">
              <Image src="/icons/fashion-icon.svg" alt="Fashion" width={100} height={100} />
              <h3 className="text-xl font-semibold mt-4">African Fashion</h3>
              <p className="mt-2">Traditional and modern clothing, accessories, and more.</p>
              <Link href="/shop">
                <button className="mt-4 bg-green-600 text-white px-4 py-2">Shop Now</button>
              </Link>
            </div>
            <div className="category">
              <Image src="/icons/art-icon.svg" alt="Art" width={100} height={100} />
              <h3 className="text-xl font-semibold mt-4">African Art</h3>
              <p className="mt-2">Discover unique artworks created by African artisans.</p>
              <Link href="/shop">
                <button className="mt-4 bg-green-600 text-white px-4 py-2">Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="service">
              <Image src="/images/shipping.jpg" alt="Fast Shipping" width={300} height={200} />
              <h3 className="text-xl font-semibold mt-4">Fast Shipping</h3>
              <p>Get your items delivered quickly and safely.</p>
            </div>
            <div className="service">
              <Image src="/images/support.jpg" alt="Customer Support" width={300} height={200} />
              <h3 className="text-xl font-semibold mt-4">Customer Support</h3>
              <p>24/7 customer support to help with your needs.</p>
            </div>
            <div className="service">
              <Image src="/images/payment.jpg" alt="Secure Payment" width={300} height={200} />
              <h3 className="text-xl font-semibold mt-4">Secure Payment</h3>
              <p>Enjoy secure and easy payment methods on our site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Address & Contact Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Find Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold">Our Location</h3>
              <p>123 African Market Street, Lodz, Poland</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <p>Email: info@tasteofafrica.com</p>
              <p>Phone: +48 123 456 789</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section 2 */}
      <section className="cta-section-2 py-16 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Don&apos;t Miss Out!</h2>
        <p className="text-lg mb-6">Join our mailing list and stay up to date on exclusive offers and new products.</p>
        <Link href="/subscribe">
          <button className="bg-white text-green-600 px-6 py-3">Subscribe</button>
        </Link>
      </section>
    </div>
  );
};

export default Homepage;
