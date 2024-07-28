import { type Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col space-y-2 w-full bg-background">
      <div className="w-4/5 h-[250px] mx-auto relative">
        <Image
          key={product.id}
          src={product.smallImageUrl}
          alt={product.altDescription || `art from ${product.museum}`}
          placeholder={product.blurHash ? 'blur' : undefined}
          blurDataURL={product.blurHash || undefined}
          fill={true}
          objectFit="contain"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs">{product.museum}</p>
        <Button asChild size="sm">
          <Link href={`/item/${product.id}`}>
            Buy
          </Link>
        </Button>
      </div>
    </div>
  );
};
