
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShippingInfo, PaymentInfo, CheckoutPrices } from './types';

interface ReviewStepProps {
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  prices: CheckoutPrices;
  onBack: () => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  shippingInfo,
  paymentInfo,
  prices,
  onBack,
  onPlaceOrder,
  isProcessing
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
      
      <div className="space-y-4 border rounded-lg p-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
          <p className="text-gray-800">
            {shippingInfo.firstName} {shippingInfo.lastName}
          </p>
          <p className="text-gray-600">{shippingInfo.address}</p>
          <p className="text-gray-600">
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
          </p>
          <p className="text-gray-600">{shippingInfo.country}</p>
          <p className="text-gray-600">{shippingInfo.phone}</p>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Payment Method</h3>
          {paymentInfo.paymentMethod === 'credit-card' ? (
            <p className="text-gray-800">
              Credit Card ending in {paymentInfo.cardNumber.slice(-4)}
            </p>
          ) : (
            <p className="text-gray-800">PayPal</p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            (This is a demo store. No actual payment will be processed)
          </p>
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
        
        <div className="space-y-3 pb-4 border-b">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${prices.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            {prices.shippingPrice === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span>${prices.shippingPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>${prices.taxAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-between font-semibold text-lg pt-4">
          <span>Order Total</span>
          <span>${prices.orderTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex space-x-4 pt-4">
        <Button 
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={isProcessing}
        >
          Back
        </Button>
        <Button 
          type="button"
          onClick={onPlaceOrder}
          className="flex-1 bg-shop-purple hover:bg-shop-dark-purple"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
