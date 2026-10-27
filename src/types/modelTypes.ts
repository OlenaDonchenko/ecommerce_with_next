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
