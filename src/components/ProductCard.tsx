import Image from 'next/image';
import { type ProductCardProps } from '@/types/modelTypes';
import Link from 'next/link';
import CartControls from '@/components/CartControls';

export default function ProductCard({ product }: ProductCardProps) {
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

        <div className="card-actions mt- 4 flex items-center justify-between gap-4">
          <CartControls product={product} />
          <Link href={`/${product.id}`} className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-primary transition-colors duration-200 hover:text-[#3D2BA8] group">
            See more
            <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
