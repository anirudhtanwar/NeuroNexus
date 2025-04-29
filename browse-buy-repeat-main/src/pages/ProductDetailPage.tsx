
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Product, useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addToCart } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [productId, products]);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <p className="mb-6 text-gray-600">The product you're looking for could not be found.</p>
          <Button asChild variant="secondary">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden border">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div>
            {/* Badges */}
            <div className="mb-4">
              {product.isSale && <span className="badge badge-sale mr-2">SALE</span>}
              {product.isNew && <span className="badge badge-new">NEW</span>}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">{product.rating} out of 5</span>
              </div>
            )}
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-shop-purple">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-lg ml-3">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 text-sm mt-1">
                  You save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round((1 - product.price / product.originalPrice) * 100)}%)
                </p>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-shop-purple hover:bg-shop-dark-purple"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button 
                variant="secondary"
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex">
                <Truck className="h-5 w-5 mr-3 text-shop-purple" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over $50. Order now to get free shipping!</p>
                </div>
              </div>
              
              <div className="flex">
                <Shield className="h-5 w-5 mr-3 text-shop-purple" />
                <div>
                  <h4 className="font-medium">Secure Payment</h4>
                  <p className="text-sm text-gray-600">Your payment details are safe with our secure payment system.</p>
                </div>
              </div>
              
              <div className="flex">
                <RotateCcw className="h-5 w-5 mr-3 text-shop-purple" />
                <div>
                  <h4 className="font-medium">30-Day Returns</h4>
                  <p className="text-sm text-gray-600">Not satisfied? Return the product within 30 days for a full refund.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
