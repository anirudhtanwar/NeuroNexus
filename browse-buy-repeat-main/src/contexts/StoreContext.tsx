
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  featured?: boolean;
  isSale?: boolean;
  isNew?: boolean;
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  categoryFilter: string;
  searchQuery: string;
  user: { name: string; email: string } | null;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "Experience crystal-clear sound with these premium noise-cancelling headphones.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Electronics",
    featured: true,
    isNew: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    description: "Stay connected with this feature-packed smartwatch.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Electronics",
    featured: true,
    rating: 4.5
  },
  {
    id: 3,
    name: "Designer Leather Backpack",
    price: 79.99,
    originalPrice: 129.99,
    description: "Stylish and functional backpack for everyday use.",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Fashion",
    isSale: true,
    rating: 4.3
  },
  {
    id: 4,
    name: "Ultra HD 4K Monitor",
    price: 349.99,
    description: "Immerse yourself in stunning visuals with this 4K monitor.",
    image: "https://images.unsplash.com/photo-1527443060795-0402a18106c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Electronics",
    rating: 4.7
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: 39.99,
    description: "Modern desk lamp with adjustable brightness.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Home",
    featured: true,
    rating: 4.2
  },
  {
    id: 6,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    description: "Comfortable and eco-friendly cotton t-shirt.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Fashion",
    isNew: true,
    rating: 4.0
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    price: 29.99,
    originalPrice: 49.99,
    description: "Convenient wireless charging for compatible devices.",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Electronics",
    isSale: true,
    rating: 4.4
  },
  {
    id: 8,
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    description: "Set of 4 elegant ceramic coffee mugs.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Home",
    rating: 4.1
  }
];

// Create the context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Provider component
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Apply filters whenever category or search query changes
  useEffect(() => {
    let result = products;
    
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [categoryFilter, searchQuery, products]);
  
  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...currentCart, { product, quantity: 1 }];
      }
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.product.id !== productId));
  };
  
  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(currentCart => 
      currentCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };
  
  // Mock auth functions
  const login = (email: string, password: string) => {
    // For demo purposes, accept any login
    const mockUser = { name: 'Demo User', email };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    toast.success('Logged in successfully');
    return true;
  };
  
  const signup = (name: string, email: string, password: string) => {
    // For demo purposes
    const mockUser = { name, email };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    toast.success('Account created successfully');
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };
  
  const isAuthenticated = () => {
    return user !== null;
  };
  
  const value = {
    products,
    filteredProducts,
    cart,
    categoryFilter,
    searchQuery,
    user,
    setSearchQuery,
    setCategoryFilter,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    login,
    signup,
    logout,
    isAuthenticated
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store context
export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
