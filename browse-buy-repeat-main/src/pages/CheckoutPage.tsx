
import React from 'react';
import Layout from '@/components/layout/Layout';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useStore } from '@/contexts/StoreContext';
import { Navigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { isAuthenticated, cart } = useStore();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }
  
  // Redirect to cart if cart is empty
  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        
        <CheckoutForm />
      </div>
    </Layout>
  );
};

export default CheckoutPage;
