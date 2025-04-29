
import React from 'react';
import Layout from '@/components/layout/Layout';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSlider from '@/components/home/HeroSlider';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const HomePage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    toast.success('Thank you for subscribing!');
    setEmail('');
  };
  
  return (
    <Layout>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Shop by Category
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="transition-all duration-300"
            >
              <Link to="/products?category=Electronics" className="relative group overflow-hidden rounded-xl block shadow-sm border">
                <div className="aspect-square bg-shop-gray">
                  <img 
                    src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Electronics" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-6">
                  <h3 className="text-white text-2xl font-bold">Electronics</h3>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="transition-all duration-300"
            >
              <Link to="/products?category=Fashion" className="relative group overflow-hidden rounded-xl block shadow-sm border">
                <div className="aspect-square bg-shop-gray">
                  <img 
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Fashion" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-6">
                  <h3 className="text-white text-2xl font-bold">Fashion</h3>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="transition-all duration-300"
            >
              <Link to="/products?category=Home" className="relative group overflow-hidden rounded-xl block shadow-sm border">
                <div className="aspect-square bg-shop-gray">
                  <img 
                    src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Home" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-6">
                  <h3 className="text-white text-2xl font-bold">Home</h3>
                </div>
              </Link>
            </motion.div>
          </div>
          
          <div className="mt-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button 
                asChild
                variant="outline"
                className="mt-4"
              >
                <Link to="/categories" className="flex items-center">
                  View All Categories <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <motion.section 
        className="py-20 bg-shop-light-purple"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-3">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">Subscribe to get special offers, free giveaways, and new product alerts.</p>
          
          <form onSubmit={handleSubscribe} className="flex">
            <Input 
              placeholder="Enter your email" 
              className="rounded-r-none" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="rounded-l-none bg-shop-purple hover:bg-shop-dark-purple">
              Subscribe
            </Button>
          </form>
        </div>
      </motion.section>
    </Layout>
  );
};

export default HomePage;
