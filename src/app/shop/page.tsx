import { ProductCard } from "../_components/product-card";
import { getAllProducts } from "~/lib/product";

export default async function Shop() {
  const products = await getAllProducts();

  return (
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
  );
};
