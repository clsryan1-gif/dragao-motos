'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Produto = {
  id: string;
  nome: string;
  preco: number;
  imagem: string | null;
  qtd: number;
};

interface CartContextType {
  cart: Produto[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qtd: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Produto[]>([]);

  // Persistência no LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('dragao-radar');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar radar:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dragao-radar', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qtd: item.qtd + 1 } : item
        );
      }
      return [...prev, { ...product, qtd: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qtd: number) => {
    setCart(prev => {
      if (qtd <= 0) {
        return prev.filter(item => item.id !== id);
      }
      return prev.map(item => 
        item.id === id ? { ...item, qtd } : item
      );
    });
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
  const count = cart.reduce((acc, item) => acc + item.qtd, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
