
import React from 'react';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';

const CategoryFilter: React.FC = () => {
  const { products, categoryFilter, setCategoryFilter } = useStore();
  
  // Extract unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={categoryFilter === '' ? 'default' : 'outline'}
          onClick={() => setCategoryFilter('')}
          className={categoryFilter === '' ? 'bg-shop-purple hover:bg-shop-dark-purple' : ''}
        >
          All
        </Button>
        
        {categories.map(category => (
          <Button
            key={category}
            variant={categoryFilter === category ? 'default' : 'outline'}
            onClick={() => setCategoryFilter(category)}
            className={categoryFilter === category ? 'bg-shop-purple hover:bg-shop-dark-purple' : ''}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
