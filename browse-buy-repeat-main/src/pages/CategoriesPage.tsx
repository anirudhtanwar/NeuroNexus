
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useStore } from '@/contexts/StoreContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoriesPage: React.FC = () => {
  const { products } = useStore();
  
  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Get a representative image for each category
  const getCategoryImage = (category: string) => {
    const productInCategory = products.find(product => product.category === category);
    return productInCategory?.image || '';
  };
  
  // Get count of products in each category
  const getCategoryCount = (category: string) => {
    return products.filter(product => product.category === category).length;
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shop by Category
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div 
              key={category}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link 
                to={`/products?category=${category}`} 
                className="block h-full"
              >
                <div className="relative overflow-hidden rounded-xl h-72 border shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  <img 
                    src={getCategoryImage(category)} 
                    alt={category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <h2 className="text-2xl font-bold mb-2">{category}</h2>
                    <p className="text-white/80">
                      {getCategoryCount(category)} {getCategoryCount(category) === 1 ? 'product' : 'products'}
                    </p>
                    <span className="inline-block mt-3 font-medium text-sm bg-shop-purple/80 hover:bg-shop-purple px-4 py-2 rounded-full transition-colors">
                      Browse {category}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
