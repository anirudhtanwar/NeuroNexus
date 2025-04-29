
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ShippingInfo } from './types';

interface ShippingStepProps {
  shippingInfo: ShippingInfo;
  handleShippingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
}

const ShippingStep: React.FC<ShippingStepProps> = ({
  shippingInfo,
  handleShippingChange,
  onContinue
}) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !shippingInfo.firstName || 
      !shippingInfo.lastName || 
      !shippingInfo.address || 
      !shippingInfo.city || 
      !shippingInfo.state || 
      !shippingInfo.zipCode || 
      !shippingInfo.phone
    ) {
      toast.error('Please fill in all required fields');
      return;
    }
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input 
            id="firstName"
            name="firstName"
            value={shippingInfo.firstName}
            onChange={handleShippingChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input 
            id="lastName"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={handleShippingChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Street Address *</Label>
        <Input 
          id="address"
          name="address"
          value={shippingInfo.address}
          onChange={handleShippingChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input 
            id="city"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State/Province *</Label>
          <Input 
            id="state"
            name="state"
            value={shippingInfo.state}
            onChange={handleShippingChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
          <Input 
            id="zipCode"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleShippingChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input 
          id="country"
          name="country"
          value={shippingInfo.country}
          onChange={handleShippingChange}
          disabled
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input 
          id="phone"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleShippingChange}
          required
        />
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit"
          className="w-full bg-shop-purple hover:bg-shop-dark-purple"
        >
          Continue to Payment
        </Button>
      </div>
    </form>
  );
};

export default ShippingStep;
