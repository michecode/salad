import Link from "next/link";
import { Icon } from "lucide-react";
import { ShoppingBasket } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center justify-between space-x-6 p-4">
      <Link href="/">
        <h1 className="font-serif text-5xl font-bold">salad</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/shop">
          <h2 className="font-serif text-2xl">shop</h2>
        </Link>
        <Link href="/about">
          <h2 className="font-serif text-2xl">about</h2>
        </Link>
      </div>
      <Link href="/cart">
        <ShoppingBasket />
      </Link>
    </header>
  );
};
