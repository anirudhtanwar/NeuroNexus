
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { FilterOptions } from '@/components/checkout/types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onFilterChange }) => {
  const handlePriceChange = (value: number[]) => {
    onFilterChange({ priceRange: [value[0], value[1]] });
  };
  
  const handleQualityChange = (quality: string, checked: boolean) => {
    let newQualities = [...filters.quality];
    
    if (checked) {
      newQualities.push(quality);
    } else {
      newQualities = newQualities.filter(q => q !== quality);
    }
    
    onFilterChange({ quality: newQualities });
  };
  
  const handleSortChange = (value: string) => {
    onFilterChange({ 
      sortBy: value as 'latest' | 'price-low' | 'price-high' | 'rating' 
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Sort By</h3>
        <Select 
          value={filters.sortBy}
          onValueChange={handleSortChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <Slider
          defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
          max={1000}
          step={10}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-3">Product Status</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="new" 
              checked={filters.isNew}
              onCheckedChange={(checked) => 
                onFilterChange({ isNew: checked === true })
              }
            />
            <Label htmlFor="new">New Arrivals</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sale" 
              checked={filters.isSale}
              onCheckedChange={(checked) => 
                onFilterChange({ isSale: checked === true })
              }
            />
            <Label htmlFor="sale">On Sale</Label>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium mb-3">Quality</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="premium" 
              checked={filters.quality.includes('premium')}
              onCheckedChange={(checked) => 
                handleQualityChange('premium', checked === true)
              }
            />
            <Label htmlFor="premium">Premium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="standard" 
              checked={filters.quality.includes('standard')}
              onCheckedChange={(checked) => 
                handleQualityChange('standard', checked === true)
              }
            />
            <Label htmlFor="standard">Standard</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="budget" 
              checked={filters.quality.includes('budget')}
              onCheckedChange={(checked) => 
                handleQualityChange('budget', checked === true)
              }
            />
            <Label htmlFor="budget">Budget-friendly</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
