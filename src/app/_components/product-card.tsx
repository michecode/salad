import { type Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCardButton/add-to-cart-button";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex w-full flex-col space-y-2 bg-background">
      <div className="relative mx-auto h-[250px] w-4/5">
        <Link href={`/item/${product.id}`}>
          <Image
            key={product.id}
            src={product.smallImageUrl}
            alt={product.altDescription || `art from ${product.museum}`}
            placeholder={product.blurHash ? "blur" : undefined}
            blurDataURL={product.blurHash || undefined}
            fill={true}
            objectFit="contain"
          />
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs">{product.museum}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
};
