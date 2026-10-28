'use client';

import { useState } from 'react';
import { useProducts } from '@/context/ProductsContext';
import { Product } from '@/types/modelTypes';
import Image from 'next/image';
export default function CartPage() {
  const [fullPrice, setFullPrice] = useState(0);

  const { localData, setLocalData } = useProducts();

  // sumPrice function
  const sumPrice = () => {
    // useLocalData to figure out the total price
    // reset price to be totalPrice
    // setFullPrice()
  };

  const handleAdd = (product: Product) => {
    const updatedProducts = localData.map((item) =>
      item.id === product.id
        ? { ...item, amount: (item.amount ?? 1) + 1 }
        : item
    );

    setLocalData(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    sumPrice();
  };

  const handleSub = (product: Product) => {
    const updatedProducts = localData.map((item) =>
      item.id === product.id
        ? { ...item, amount: Math.max(1, (item.amount ?? 1) - 1) }
        : item
    );

    setLocalData(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    sumPrice();
  };

  const handleDelete = (product: Product) => {
    const updatedProducts = localData.filter((item) => item.id !== product.id);

    setLocalData(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    sumPrice();
  };

  return (
    <div>
      {fullPrice}

      {localData.map((product) => {
        return (
          <div
            key={product.id}
            className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
          >
            <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-base-200 p-3 sm:w-28">
              <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="line-clamp-2 font-semibold">{product.title}</h2>

              <p className="mt-1 text-sm text-base-content/60">
                {product.category}
              </p>

              <p className="mt-2 font-bold text-primary">
                ${product.price.toFixed(2)}
                <span className="ml-1 text-xs font-normal text-base-content/60">
                  / item
                </span>
              </p>

              <p className="mt-1 text-sm">
                Subtotal:{' '}
                <span className="font-semibold">
                  ${(product.price * (product.amount ?? 1)).toFixed(2)}
                </span>
              </p>
            </div>

            <div className="card-actions justify-end mt-1">
              <button
                className="btn btn-primary btn-sm rounded-lg"
                onClick={() => handleAdd(product)}
              >
                +
              </button>
              <span className="text-base font-semibold min-w-6 text-center">
                {product.amount ?? 1}
              </span>
              <button
                className="btn btn-primary btn-sm rounded-lg"
                onClick={() => handleSub(product)}
              >
                −
              </button>
              <button
                className="btn btn-error btn-sm rounded-lg"
                onClick={() => handleDelete(product)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
