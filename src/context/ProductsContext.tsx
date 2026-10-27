'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';
import { type Product } from '@/types/modelTypes';

// describe values
type ProductContextType = {
  localData: Product[];
  setLocalData: Dispatch<SetStateAction<Product[]>>;
};

const ProductsContext = createContext<ProductContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const localStorageProducts = localStorage.getItem('products');
  const parsedProducts =
    (localStorageProducts && JSON.parse(localStorageProducts)) || [];
  const [localData, setLocalData] = useState<Product[]>(parsedProducts);

  return (
    <ProductsContext.Provider value={{ localData, setLocalData }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used inside a ProductsProvider');
  }
  return context;
};
