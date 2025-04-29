
import React from 'react';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CartSummary: React.FC = () => {
  const { getTotalPrice, isAuthenticated, cart } = useStore();
  const navigate = useNavigate();
  
  const totalPrice = getTotalPrice();
  const shippingPrice = totalPrice > 50 ? 0 : 5.99;
  const taxRate = 0.0725; // 7.25% tax rate
  const taxAmount = totalPrice * taxRate;
  const orderTotal = totalPrice + shippingPrice + taxAmount;
  
  const handleCheckout = () => {
    if (!isAuthenticated()) {
      toast.info("Please sign in to continue with checkout");
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    navigate('/checkout');
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {shippingPrice === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span>${shippingPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        {shippingPrice === 0 && (
          <div className="text-green-600 text-xs">
            Free shipping on orders above $50
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 my-4 pt-4">
        <div className="flex justify-between font-semibold">
          <span>Order Total</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        className="w-full bg-shop-purple hover:bg-shop-dark-purple mt-4"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
