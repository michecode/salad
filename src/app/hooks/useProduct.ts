import { type Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"

const getProduct = async (productId: string) => {
  const response = await fetch(`/api/product?id=${productId}`);
  return await response.json();
};

const parse = (response: Product) => {
  return response;
};

export const useProduct = ({ productId }: { productId: string }) => {
  return useQuery({
    queryKey: [ 'product', productId ],
    queryFn: async () => getProduct(productId),
    select: response => parse(response),
    enabled: !!productId,
  });
};