
import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { useStore } from '@/contexts/StoreContext';
import { FilterOptions } from '@/components/checkout/types';

interface ProductGridProps {
  filters?: FilterOptions;
}

const ProductGrid: React.FC<ProductGridProps> = ({ filters }) => {
  const { filteredProducts } = useStore();
  
  const displayProducts = useMemo(() => {
    if (!filters) return filteredProducts;
    
    let result = [...filteredProducts];
    
    // Filter by price range
    if (filters.priceRange) {
      result = result.filter(
        product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }
    
    // Filter by new status
    if (filters.isNew) {
      result = result.filter(product => product.isNew);
    }
    
    // Filter by sale status
    if (filters.isSale) {
      result = result.filter(product => product.isSale);
    }
    
    // Sort products
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'latest':
          // In a real app, you would sort by date added
          // Here we'll just use the id as a proxy for newest
          result.sort((a, b) => b.id - a.id);
          break;
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          break;
      }
    }
    
    return result;
  }, [filteredProducts, filters]);
  
  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No products found. Try adjusting your filters.</p>
      </div>
    );
  }
  
  return (
    <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
