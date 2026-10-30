import Image from 'next/image';
import Link from 'next/link';
import CartSummary from '@/components/CartSummary';

const Nav = () => {
  return (
    <div className="navbar bg-base-100 p-6 shadow-sm">
      <div className="flex-1">
        <Link
          className="btn btn-ghost hover:bg-[#F0EBFF] hover:text-[#5B43E8] transition-colors duration-200 text-xl"
          href={`/`}
        >
          Home
        </Link>
        <Link
          className="btn btn-ghost hover:bg-[#F0EBFF] hover:text-[#5B43E8] transition-colors duration-200 text-xl"
          href={`/cart`}
        >
          Cart
        </Link>
        <span className="absolute left-1/2 -translate-x-1/2 text-2xl font-extrabold tracking-tight text-[#5B43E8] hover:text-[#4933D4] transition-colors">
          Shopora
        </span>
      </div>
      <div className="flex items-center gap-4">
        <CartSummary />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                width={40}
                height={40}
              />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
