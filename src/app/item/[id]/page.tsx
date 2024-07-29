import { notFound } from "next/navigation";
import { ProductCard } from "~/app/_components/product-card";
import { getProduct } from "~/lib/product";

export default async function ProductItem({ params }: { params: { id: string } }) {
  const product = await getProduct({ productId: params.id });

  if (!product) {
    return notFound();
  }

  return (
    <ProductCard product={product} />
  );
};