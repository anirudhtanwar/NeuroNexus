
import React from 'react';
import { CartItem as CartItemType, useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartItemQuantity, removeFromCart } = useStore();
  const { product, quantity } = item;
  
  const handleQuantityChange = (value: string) => {
    updateCartItemQuantity(product.id, parseInt(value));
  };
  
  return (
    <div className="flex items-center py-4 border-b last:border-0">
      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h4 className="text-gray-900 font-medium">{product.name}</h4>
        <div className="flex items-center mt-1">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="w-20">
          <Select
            value={quantity.toString()}
            onValueChange={handleQuantityChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Qty" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(product.id)}
        >
          <Trash2 className="h-5 w-5 text-gray-500" />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
