
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  LogIn,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const { getTotalItems, searchQuery, setSearchQuery, isAuthenticated, logout, user } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const cartItemCount = getTotalItems();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold text-shop-purple">BrowseBuy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-shop-purple transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium hover:text-shop-purple transition-colors">Products</Link>
            <Link to="/categories" className="text-sm font-medium hover:text-shop-purple transition-colors">Categories</Link>
            <Link to="/about" className="text-sm font-medium hover:text-shop-purple transition-colors">About</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <div className={`hidden md:flex items-center transition-all duration-200 ${searchOpen ? 'w-64' : 'w-0'}`}>
            {searchOpen && (
              <Input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9"
              />
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSearch}
            className="hidden md:flex"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Cart Button with Badge */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-shop-purple text-xs text-white ${cartItemCount !== 0 ? 'animate-cart-bounce' : ''}`}>
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* User Menu */}
          {isAuthenticated() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Welcome, {user?.name}</span>
                </DropdownMenuItem>
                <Link to="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link to="/orders">
                  <DropdownMenuItem>My Orders</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Log in</span>
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b bg-background">
          <div className="container mx-auto py-4 px-4">
            <div className="flex items-center mb-4">
              <Input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mr-2"
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSearchQuery('')}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-lg font-medium hover:text-shop-purple transition-colors"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-lg font-medium hover:text-shop-purple transition-colors"
                onClick={toggleMobileMenu}
              >
                Products
              </Link>
              <Link 
                to="/categories" 
                className="text-lg font-medium hover:text-shop-purple transition-colors"
                onClick={toggleMobileMenu}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="text-lg font-medium hover:text-shop-purple transition-colors"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              {!isAuthenticated() && (
                <Link 
                  to="/login" 
                  className="text-lg font-medium hover:text-shop-purple transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
