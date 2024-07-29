import { type Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCardButton/add-to-cart-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex w-full flex-col space-y-2 bg-background border p-4">
      <div className="relative mx-auto h-[250px] w-5/6">
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
      <div className="flex items-center justify-between space-x-4">
        <Avatar>
          <AvatarImage src={product.museumProfilePicture} />
          <AvatarFallback>{product.museum.at(0)}</AvatarFallback>
        </Avatar>
        <p className="text-xs">{product.museum}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
};
