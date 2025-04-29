
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import CategoryFilter from '@/components/products/CategoryFilter';
import { Input } from '@/components/ui/input';
import { useStore } from '@/contexts/StoreContext';
import ProductFilters from '@/components/products/ProductFilters';
import { FilterOptions } from '@/components/checkout/types';

const ProductsPage: React.FC = () => {
  const { searchQuery, setSearchQuery, setCategoryFilter } = useStore();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    quality: [],
    isNew: false,
    isSale: false,
    sortBy: 'latest'
  });
  
  useEffect(() => {
    // Set category from URL parameter if present
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
  }, [searchParams, setCategoryFilter]);
  
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Search</h3>
                <Input 
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <CategoryFilter />
              
              <ProductFilters 
                filters={filters} 
                onFilterChange={handleFilterChange} 
              />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="md:col-span-3">
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
