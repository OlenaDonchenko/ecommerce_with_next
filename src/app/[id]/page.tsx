'use client';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { useProducts } from '@/context/ProductsContext';
import { Product } from '@/types/modelTypes';

type Params = { params: Promise<{ id: string }> };

// note address is not correct change it to suite your situation
type ProductInfo = Product & { description: string };

const ProductInfo = ({ params }: Params) => {
  const { id } = use(params);
  const {
    handleAddToCart,
    fullPrice,
    handleAdd,
    handleDelete,
    handleSub,
    localData,
  } = useProducts();
  const foundItem = localData.filter((e) => e.id === Number(id));
  const [product, setProduct] = useState<ProductInfo | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>no product</div>;
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      
      <div className="grid gap-8 overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-lg md:grid-cols-2">
        {/* Product image */}
        <div className="flex min-h-80 items-center justify-center bg-base-200 p-8 md:p-12">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="h-64 w-full object-contain md:h-96"
          />
        </div>

        {/* Product details */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <span className="mb-4 w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
            {product.title}
          </h1>

          <p className="mt-5 text-3xl font-bold text-primary">
            ${product.price}
          </p>

          <div className="my-6 h-px bg-base-300" />

          <h2 className="text-lg font-semibold">Product description</h2>

          <p className="mt-3 leading-7 text-base-content/70">
            {product.description}
          </p>
          {foundItem.length > 0 ? (
            <div className="mt-auto flex items-center p-4 gap-4">
              <button
                className="btn btn-primary"
                onClick={() => handleAdd(product)}
              >
                +
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleSub(product)}
              >
                -
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleDelete(product)}
              >
                remove
              </button>
            </div>
          ) : (
            <div className="mt-auto pt-8">
              <button
                className="btn w-full rounded-xl border-0 bg-[#5B43E8] text-base text-white shadow-md transition-all duration-300 ease-in-out hover:bg-[#8B5CF6] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 motion-reduce:transition-none"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductInfo;
