
import React, { useState } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ShippingInfo, PaymentInfo } from './types';
import { simulatePaymentProcessing, calculatePrices } from './checkoutUtils';
import CheckoutProgress from './CheckoutProgress';
import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';
import ReviewStep from './ReviewStep';

const CheckoutForm: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { user, getTotalPrice, clearCart } = useStore();
  const navigate = useNavigate();
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit-card'
  });
  
  // Handle shipping form input changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle payment form input changes
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setPaymentInfo(prev => ({ ...prev, paymentMethod: value as 'credit-card' | 'paypal' }));
  };
  
  // Navigation between steps
  const goToNextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const goToPreviousStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle final order submission
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      const paymentSuccessful = await simulatePaymentProcessing();
      
      if (paymentSuccessful) {
        toast.success('Your order has been placed successfully!');
        clearCart();
        navigate('/order-confirmation');
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to process your order. Please try again.');
      console.error('Order processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Calculate prices
  const subtotal = getTotalPrice();
  const prices = calculatePrices(subtotal);
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <CheckoutProgress currentStep={step} />
      
      {/* Step 1: Shipping Information */}
      {step === 1 && (
        <ShippingStep 
          shippingInfo={shippingInfo} 
          handleShippingChange={handleShippingChange} 
          onContinue={goToNextStep} 
        />
      )}
      
      {/* Step 2: Payment Information */}
      {step === 2 && (
        <PaymentStep 
          paymentInfo={paymentInfo}
          handlePaymentChange={handlePaymentChange}
          handlePaymentMethodChange={handlePaymentMethodChange}
          onContinue={goToNextStep}
          onBack={goToPreviousStep}
          prices={prices}
        />
      )}
      
      {/* Step 3: Review Order */}
      {step === 3 && (
        <ReviewStep 
          shippingInfo={shippingInfo}
          paymentInfo={paymentInfo}
          prices={prices}
          onBack={goToPreviousStep}
          onPlaceOrder={handlePlaceOrder}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default CheckoutForm;
