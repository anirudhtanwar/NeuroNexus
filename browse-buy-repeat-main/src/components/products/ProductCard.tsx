
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();
  
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md">
      {/* Sale or New badge */}
      {(product.isSale || product.isNew) && (
        <div className="absolute top-2 right-2 z-10">
          {product.isSale && (
            <span className="badge badge-sale">SALE</span>
          )}
          {product.isNew && (
            <span className="badge badge-new ml-1">NEW</span>
          )}
        </div>
      )}

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-800 mb-1 hover:text-shop-purple transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500 text-xs ml-1">{product.rating}</span>
          </div>
        )}
        
        {/* Add to Cart Button */}
        <Button 
          onClick={() => addToCart(product)}
          className="w-full bg-shop-purple hover:bg-shop-dark-purple"
        >
          <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
