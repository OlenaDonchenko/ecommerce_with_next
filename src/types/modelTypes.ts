import { Dispatch, SetStateAction } from 'react';

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  amount: number;
};

export type ProductCardProps = {
  product: Product;
};

export type ProductContextType = {
  localData: Product[];
  setLocalData: Dispatch<SetStateAction<Product[]>>;
  fullPrice: number;
  totalItems: number;
  handleAddToCart: (product: Product) => void;
  handleAdd: (product: Product) => void;
  handleSub: (product: Product) => void;
  handleDelete: (product: Product) => void;
};
