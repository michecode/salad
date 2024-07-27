import Link from "next/link";


export const Header = () => {

  return (
    <header className="flex items-center justify-center space-x-6 p-4">
      <Link href="/shop">
        <h2 className="font-serif text-2xl">shop</h2>
      </Link>
      <Link href="/">
        <h1 className="font-serif text-5xl font-bold">salad</h1>
      </Link>
      <Link href="/about">
        <h2 className="font-serif text-2xl">about</h2>
      </Link>
    </header>
  );
};
