
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const location = useLocation();
  
  // Set the active tab based on the current route
  React.useEffect(() => {
    if (location.pathname === '/signup') {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg border shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {location.pathname === '/login' ? 'Sign In to Your Account' : 'Create an Account'}
          </h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
            <p>By signing in or creating an account, you agree to our</p>
            <p className="mt-1">
              <a href="#" className="text-shop-purple hover:text-shop-dark-purple">Terms of Service</a>
              {' '}&amp;{' '}
              <a href="#" className="text-shop-purple hover:text-shop-dark-purple">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
