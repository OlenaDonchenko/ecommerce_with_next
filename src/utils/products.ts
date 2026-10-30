import { Product } from '@/types/modelTypes';

export const addProduct = (products: Product[], product: Product) =>
  products.some((item) => item.id === product.id)
    ? products
    : [...products, { ...product, amount: 1 }];

export const incrementAmount = (products: Product[], id: Product['id']) =>
  products.map((item) =>
    item.id === id ? { ...item, amount: (item.amount ?? 1) + 1 } : item
  );

export const decrementAmount = (products: Product[], id: Product['id']) =>
  products.map((item) =>
    item.id === id
      ? { ...item, amount: Math.max(1, (item.amount ?? 1) - 1) }
      : item
  );

export const removeProduct = (products: Product[], id: Product['id']) =>
  products.filter((item) => item.id !== id);
