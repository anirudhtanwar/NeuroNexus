
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">About BrowseBuy</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-lg mb-4">
              Welcome to BrowseBuy, your one-stop destination for quality products at affordable prices. 
              Founded in 2023, we are committed to providing an exceptional shopping experience.
            </p>
            <p className="text-lg mb-4">
              Our mission is to offer a curated selection of high-quality products across multiple categories,
              ensuring that you find exactly what you're looking for with ease and confidence.
            </p>
            <p className="text-lg">
              We prioritize customer satisfaction and strive to make your shopping journey seamless and enjoyable.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 shadow-inner">
            <h2 className="text-xl font-semibold mb-4">Company Values</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-shop-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">1</span>
                <span>Quality First: We never compromise on the quality of products</span>
              </li>
              <li className="flex items-start">
                <span className="bg-shop-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">2</span>
                <span>Customer Satisfaction: Your happiness is our top priority</span>
              </li>
              <li className="flex items-start">
                <span className="bg-shop-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">3</span>
                <span>Ethical Sourcing: We ensure responsible supply chains</span>
              </li>
              <li className="flex items-start">
                <span className="bg-shop-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">4</span>
                <span>Sustainability: Committed to environmental responsibility</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            BrowseBuy began with a simple idea: to create an online shopping experience that combines quality, 
            affordability, and convenience. Our founders, passionate about e-commerce, identified a gap in the market 
            for a platform that truly focuses on customer experience.
          </p>
          <p>
            From our humble beginnings, we've grown into a platform offering thousands of products across multiple categories.
            We continue to expand our selection while maintaining our commitment to quality and customer satisfaction.
          </p>
        </div>
        
        <div className="bg-shop-light-purple rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">Have questions or feedback? We'd love to hear from you!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Customer Support</h3>
              <p>Email: support@browsebuy.example.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Hours: Monday-Friday, 9am-6pm EST</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Business Inquiries</h3>
              <p>Email: business@browsebuy.example.com</p>
              <p>Phone: (555) 765-4321</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
