import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Product } from '@/types/modelTypes';
import CartControls from '@/components/CartControls';

type Params = { params: Promise<{ id: string }> };

type ProductInfo = Product & { description: string };

const ProductInfo = async ({ params }: Params) => {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  // fakestoreapi answers an unknown id with 200 and an empty body
  const text = res.ok ? await res.text() : '';
  if (!text) {
    notFound();
  }
  const product: ProductInfo = JSON.parse(text);

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
            ${product.price.toFixed(2)}
          </p>

          <div className="my-6 h-px bg-base-300" />

          <h2 className="text-lg font-semibold">Product description</h2>

          <p className="mt-3 leading-7 text-base-content/70">
            {product.description}
          </p>

          <div className="mt-auto pt-8">
            <CartControls product={product} fullWidth />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductInfo;
