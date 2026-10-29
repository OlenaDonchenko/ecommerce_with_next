'use client';

import { useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductsContext';
import { Product } from '@/types/modelTypes';
import Image from 'next/image';
export default function CartPage() {
  const [fullPrice, setFullPrice] = useState(0);

  const { localData, setLocalData } = useProducts();

  // sumPrice function
  const sumPrice = (products: Product[]) => {
    const totalPrice = products.reduce(
      (total, product) => total + product.price * (product.amount ?? 1),
      0
    );
    setFullPrice(totalPrice);
  };

  const totalItems = localData.reduce(
    (total, product) => total + (product.amount ?? 1),
    0
  );

  useEffect(() => () => sumPrice(localData), [localData]);
  // useLocalData to figure out the total price
  // reset price to be totalPrice
  // setFullPrice()

  const handleAdd = (product: Product) => {
    const updatedProducts = localData.map((item) =>
      item.id === product.id
        ? { ...item, amount: (item.amount ?? 1) + 1 }
        : item
    );

    setLocalData(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    sumPrice(updatedProducts);
  };

  const handleSub = (product: Product) => {
    const updatedProducts = localData.map((item) =>
      item.id === product.id
        ? { ...item, amount: Math.max(1, (item.amount ?? 1) - 1) }
        : item
    );

    setLocalData(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    sumPrice(updatedProducts);
  };

  const handleDelete = (product: Product) => {
    const updatedProducts = localData.filter((item) => item.id !== product.id);

    setLocalData(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    sumPrice(updatedProducts);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 px-4 py-8">
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
                className="btn btn-sm rounded-lg border-0 bg-[#5B43E8] text-white shadow-md transition-all duration-300 ease-in-out hover:bg-[#8B5CF6] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 motion-reduce:transition-none"
                onClick={() => handleAdd(product)}
              >
                +
              </button>
              <span className="text-base font-semibold min-w-6 text-center">
                {product.amount ?? 1}
              </span>
              <button
                className="btn btn-sm rounded-lg border-0 bg-[#5B43E8] text-white shadow-md transition-all duration-300 ease-in-out hover:bg-[#8B5CF6] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 motion-reduce:transition-none"
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
      <div className="mt-8 flex justify-end">
        <div className="w-full max-w-sm rounded-2xl border-2 border-[#8B5CF6] p-6 text-[#35205F] shadow-lg shadow-purple-200/50">
          <p className="text-sm text-[#6D5A91]">Total items: {totalItems}</p>

          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="text-lg font-semibold">Total price:</span>

            <span className="text-2xl font-bold text-[#5B43E8]">
              ${fullPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
