import Image from "next/image";
import { api, HydrateClient } from "~/trpc/server";

export default async function Shop() {
  const products = await api.product.getAllProducts();

  void api.product.getAllProducts.prefetch();

  return (
    <HydrateClient>
      <main>
        {products.map((product) => {
          return (
            <Image
              key={product.id}
              src={product.fullImageUrl}
              alt={product.altDescription || `art from ${product.museum}`}
              placeholder={product.blurHash ? 'blur' : undefined}
              blurDataURL={product.blurHash || undefined}
              width={500}
              height={500}
            />
          );
        })}
      </main>
    </HydrateClient>
  );
};
