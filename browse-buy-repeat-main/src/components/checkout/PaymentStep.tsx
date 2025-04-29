
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import { PaymentInfo, CheckoutPrices } from './types';

interface PaymentStepProps {
  paymentInfo: PaymentInfo;
  handlePaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentMethodChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
  prices: CheckoutPrices;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  paymentInfo,
  handlePaymentChange,
  handlePaymentMethodChange,
  onContinue,
  onBack,
  prices
}) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentInfo.paymentMethod === 'credit-card') {
      // Validate credit card info
      if (
        !paymentInfo.cardName || 
        !paymentInfo.cardNumber || 
        !paymentInfo.expiryDate || 
        !paymentInfo.cvv
      ) {
        toast.error('Please fill in all payment fields');
        return;
      }
      
      // Basic credit card validation
      const cardNumberRegex = /^[0-9]{16}$/;
      const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      const cvvRegex = /^[0-9]{3,4}$/;
      
      if (!cardNumberRegex.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
        toast.error('Invalid card number');
        return;
      }
      
      if (!expiryDateRegex.test(paymentInfo.expiryDate)) {
        toast.error('Invalid expiry date (MM/YY)');
        return;
      }
      
      if (!cvvRegex.test(paymentInfo.cvv)) {
        toast.error('Invalid CVV');
        return;
      }
    }
    
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      
      <RadioGroup 
        value={paymentInfo.paymentMethod} 
        onValueChange={(value) => handlePaymentMethodChange(value)}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2 border rounded-lg p-4">
          <RadioGroupItem value="credit-card" id="credit-card" />
          <Label htmlFor="credit-card">Credit / Debit Card</Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-lg p-4">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal">PayPal</Label>
        </div>
      </RadioGroup>
      
      {paymentInfo.paymentMethod === 'credit-card' && (
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="cardName">Name on Card</Label>
            <Input 
              id="cardName"
              name="cardName"
              placeholder="John Smith"
              value={paymentInfo.cardName}
              onChange={handlePaymentChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input 
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input 
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv"
                name="cvv"
                placeholder="123"
                type="password"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
                required
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t space-y-2">
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
        <div className="flex justify-between font-semibold text-lg pt-2">
          <span>Total</span>
          <span>${prices.orderTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex space-x-4 pt-4">
        <Button 
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          type="submit"
          className="flex-1 bg-shop-purple hover:bg-shop-dark-purple"
        >
          Continue to Review
        </Button>
      </div>
    </form>
  );
};

export default PaymentStep;
