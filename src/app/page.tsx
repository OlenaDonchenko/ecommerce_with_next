import Image from 'next/image';
export default async function Home() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return (
    <div className="grid gird-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products?.map(
        (product: { title: string; image: string }, index: number) => {
          return (
            <div key={index}>
              {product.title}
              <Image
                src={product.image}
                alt="product image"
                width={100}
                height={100}
              />
            </div>
          );
        }
      )}
    </div>
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
