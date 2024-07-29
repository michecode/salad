import { notFound } from "next/navigation";
import { AddToCartButton } from "~/app/_components/AddToCardButton/add-to-cart-button";
import { Avatar, AvatarFallback, AvatarImage } from "~/app/_components/ui/avatar";
import { getProduct } from "~/lib/product";

export default async function ProductItem({ params }: { params: { id: string } }) {
  const product = await getProduct({ productId: params.id });

  if (!product) {
    return notFound();
  }

  return (
    <main>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <img src={product.fullImageUrl} alt={product.altDescription ?? 'art'} className="w-full" />
        </div>
        <div className="flex flex-col w-1/2 space-y-3">
          <p>{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={product.museumProfilePicture} />
                <AvatarFallback>{product.museum.at(0)}</AvatarFallback>
              </Avatar>
              <p>{product.museum}</p>
            </div>
            <p className="font-bold text-xl">${product.price}</p>
          </div>
          <AddToCartButton productId={product.id}/>
        </div>
      </div>
    </main>
  );
};