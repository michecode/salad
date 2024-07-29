"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';

type CartID = string | null;

const CardIdContext = createContext<[CartID, Function]>([null, () => {}]);

const KEY = 'salad-cart-id';

export const CartIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [ cartId, setCartId ] = useState<string | null>(null);

  useEffect(() => {
    const storedCartId = localStorage.getItem(KEY);
    setCartId(storedCartId);
  }, []);

  useEffect(() => {
    if (!cartId) { return; }
    localStorage.setItem(KEY, cartId);
  }, [ cartId ]);

  const updateCartId = (newId: string) => {
    setCartId(newId);
  };

  return (
    <CardIdContext.Provider value={[ cartId, updateCartId ]}>
      {children}
    </CardIdContext.Provider>
  )
}

export const useCartIdContext = () => useContext(CardIdContext);
