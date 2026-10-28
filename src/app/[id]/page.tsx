'use client';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { useProducts } from '@/context/ProductsContext';
import { Product } from '@/types/modelTypes';

type Params = { params: Promise<{ id: string }> };

// note address is not correct change it to suite your situation
type ProductInfo = Product & { address: string };

const ProductInfo = ({ params }: Params) => {
  const { id } = use(params);
  const { localData, setLocalData } = useProducts();
  const [product, setProduct] = useState<ProductInfo | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }
    const filteredEl = localData.filter((p) => p.id === product.id);
    if (filteredEl.length > 0) {
      return;
    }
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const localProducts = JSON.parse(storedProducts);
      localStorage.setItem(
        'products',
        JSON.stringify([...localProducts, { ...product, amount: 1 }])
      );
      setLocalData(JSON.parse(localStorage.getItem('products') ?? '[]'));
    } else {
      localStorage.setItem(
        'products',
        JSON.stringify([{ ...product, amount: 1 }])
      );
      setLocalData(JSON.parse(localStorage.getItem('products') ?? '[]'));
    }
  };

  if (!product) {
    return <div>no product</div>;
  }

  return (
    <div className="card bg-base-100 shadow-md rounded-2xl border border-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="px-5 pt-5">
        <Image
          src={product.image}
          alt={product.title}
          width={220}
          height={220}
          className="h-48 w-full object-contain"
        />
      </figure>

      <div className="card-body p-5">
        <h2 className="card-title text-base font-semibold line-clamp-2 min-h-12">
          {product.title}
        </h2>

        <p className="mt-2 text-lg font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>

        <p className="text-right text-xs text-base-content/60">
          More from {product.category}
        </p>

        <div className="card-actions justify-end mt-1">
          <button
            className="btn btn-primary rounded-lg"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
