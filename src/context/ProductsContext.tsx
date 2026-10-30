'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { type Product, type ProductContextType } from '@/types/modelTypes';

import {
  addProduct,
  decrementAmount,
  incrementAmount,
  removeProduct,
} from '@/utils/products';
// describe values

const ProductsContext = createContext<ProductContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const localStorageProducts = localStorage.getItem('products');
  const parsedProducts =
    (localStorageProducts && JSON.parse(localStorageProducts)) || [];
  const [localData, setLocalData] = useState<Product[]>(parsedProducts);

  // keep localStorage in sync with every cart change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(localData));
  }, [localData]);

  const handleAddToCart = (product: Product) =>
    setLocalData((prev) => addProduct(prev, product));
  const handleAdd = (product: Product) =>
    setLocalData((prev) => incrementAmount(prev, product.id));
  const handleSub = (product: Product) =>
    setLocalData((prev) => decrementAmount(prev, product.id));
  const handleDelete = (product: Product) =>
    setLocalData((prev) => removeProduct(prev, product.id));

  const { full, total } = localData.reduce(
    (totals, product) => {
      const amount = product.amount ?? 1;
      totals.full += product.price * amount;
      totals.total += amount;
      return totals;
    },
    { full: 0, total: 0 }
  );

  return (
    <ProductsContext.Provider
      value={{
        localData,
        setLocalData,
        fullPrice: Number(full.toFixed(2)),
        totalItems: Number(total.toFixed(2)),
        handleAddToCart,
        handleAdd,
        handleSub,
        handleDelete,
      }}
    >
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
