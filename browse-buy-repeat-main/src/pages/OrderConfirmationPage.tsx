
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  // Generate a random order number
  const orderNumber = `DEMO-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg border shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <p className="text-amber-600 text-sm mb-6">
            (This is a demo store - no actual payment was processed)
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">Order Details</h2>
            <div className="text-gray-800">
              <p className="mb-2"><strong>Order Number:</strong> {orderNumber}</p>
              <p className="mb-2"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span className="text-green-600">Confirmed</span></p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-8 text-gray-600">
            <span className="inline-block p-3 bg-shop-light-purple rounded-full">
              <CheckCircle2 className="h-6 w-6 text-shop-purple" />
            </span>
            <span className="flex-1 h-1 bg-shop-light-purple"></span>
            <span className="inline-block p-3 bg-gray-100 rounded-full">
              <Package className="h-6 w-6 text-gray-400" />
            </span>
            <span className="flex-1 h-1 bg-gray-100"></span>
            <span className="inline-block p-3 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          
          <p className="text-gray-600 mb-6">
            In a real store, we would email you order confirmation and tracking information once your order ships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/orders">View Your Orders</Link>
            </Button>
            <Button asChild className="bg-shop-purple hover:bg-shop-dark-purple">
              <Link to="/products" className="flex items-center">
                Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
