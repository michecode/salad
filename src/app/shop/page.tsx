import Image from "next/image";
import { api, HydrateClient } from "~/trpc/server";
import { ProductCard } from "../_components/product-card";

export default async function Shop() {
  const products = await api.product.getAllProducts();

  void api.product.getAllProducts.prefetch();

  return (
    <HydrateClient>
      <main className="flex">
        <div className="w-1/4">
          future filters
        </div>
        <div className="w-3/4 grid grid-cols-3 gap-4">
          {products.map((product) => {
            return (
              <ProductCard product={product} key={product.id}/>
            );
          })}
        </div>
      </main>
    </HydrateClient>
  );
};
