import Image from "next/image";

export type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    image: string;
};

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="card bg-base-100 shadow-md rounded-2xl border border-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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

        <p className="text-right text-xs text-base-content/60">
          More from {product.category}
        </p>

        <div className="card-actions justify-end mt-1">
          <button className="btn btn-primary rounded-lg">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}