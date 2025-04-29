
import React from 'react';
import { Package, CreditCard, ShoppingBag } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number;
}

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep }) => {
  return (
    <div className="flex mb-8 justify-center">
      <div className={`flex flex-col items-center mx-4 ${currentStep >= 1 ? 'text-shop-purple' : 'text-gray-400'}`}>
        <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-shop-purple bg-shop-light-purple' : 'border-gray-300'}`}>
          <Package className="h-5 w-5" />
        </div>
        <span className="text-sm mt-1">Shipping</span>
      </div>
      <div className={`flex-grow border-t-2 ${currentStep >= 2 ? 'border-shop-purple' : 'border-gray-200'} self-center mx-2`}></div>
      <div className={`flex flex-col items-center mx-4 ${currentStep >= 2 ? 'text-shop-purple' : 'text-gray-400'}`}>
        <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-shop-purple bg-shop-light-purple' : 'border-gray-300'}`}>
          <CreditCard className="h-5 w-5" />
        </div>
        <span className="text-sm mt-1">Payment</span>
      </div>
      <div className={`flex-grow border-t-2 ${currentStep >= 3 ? 'border-shop-purple' : 'border-gray-200'} self-center mx-2`}></div>
      <div className={`flex flex-col items-center mx-4 ${currentStep >= 3 ? 'text-shop-purple' : 'text-gray-400'}`}>
        <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-shop-purple bg-shop-light-purple' : 'border-gray-300'}`}>
          <ShoppingBag className="h-5 w-5" />
        </div>
        <span className="text-sm mt-1">Review</span>
      </div>
    </div>
  );
};

export default CheckoutProgress;
