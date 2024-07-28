import { notFound } from "next/navigation";
import { ProductCard } from "~/app/_components/product-card";
import { api, HydrateClient } from "~/trpc/server";

export default async function ProductItem({ params }: { params: { id: string } }) {
  const product = await api.product.getProduct(params.id);

  if (!product) {
    return notFound();
  }

  return (
    <ProductCard product={product} />
  );
};