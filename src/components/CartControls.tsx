'use client';
import { useProducts } from '@/context/ProductsContext';
import { type Product } from '@/types/modelTypes';

type CartControlsProps = {
  product: Product;
  fullWidth?: boolean;
};

export default function CartControls({
  product,
  fullWidth = false,
}: CartControlsProps) {
  const { localData, handleAddToCart, handleAdd, handleSub, handleDelete } =
    useProducts();

  const cartItem = localData.find((item) => item.id === product.id);

  if (!cartItem) {
    return (
      <button
        className={`btn rounded-xl border-0 bg-[#5B43E8] text-white shadow-md transition-all duration-300 ease-in-out hover:bg-[#8B5CF6] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 motion-reduce:transition-none ${
          fullWidth ? 'w-full text-base' : ''
        }`}
        onClick={() => handleAddToCart(product)}
      >
        Add to cart
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-sm bg-[#5B43E8] text-white hover:bg-[#8B5CF6]"
        onClick={() => handleSub(product)}
      >
        −
      </button>

      <span className="font-semibold">{cartItem.amount}</span>

      <button
        className="btn btn-sm bg-[#5B43E8] text-white hover:bg-[#8B5CF6]"
        onClick={() => handleAdd(product)}
      >
        +
      </button>

      <button
        className="btn btn-sm bg-[#5B43E8] text-white hover:bg-[#8B5CF6]"
        onClick={() => handleDelete(product)}
      >
        Remove
      </button>
    </div>
  );
}
