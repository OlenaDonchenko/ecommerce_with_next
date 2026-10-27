import Image from 'next/image';
import { type Product } from '@/types/modelTypes';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const products: Product[] = await res.json();
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-10 overflow-hidden rounded-2xl shadow-sm">
        <Image
          src="/img/shopora-banner.png"
          alt="Shopora — Discover your style"
          width={1920}
          height={1080}
          priority
          className="h-[400px] w-full object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </section>

      <h1 className="mb-8 text-3xl font-bold">Our Products</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

// 'use client';
// import { useState, useEffect } from 'react';
// export default function Home() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await fetch('https://fakestoreapi.com/products');
//       const data = await res.json();
//       console.log(data);
//       setProducts(data);
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="grid gird-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//       {products?.map((p, index) => {
//         return (
//           <div key={index}>
//             {p.title}
//             <img src={p.image} alt="product image" width={100} height={100} />
//           </div>
//         );
//       })}
//     </div>
//   );
// }
