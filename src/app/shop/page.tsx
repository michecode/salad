import { ProductCard } from "../_components/product-card";
import { getAllProducts, totalProductPages } from "~/lib/product";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../_components/ui/pagination";
import { Filters } from "../_components/filters";

export default async function Shop({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const totalPages = await totalProductPages();
  const page = Number(searchParams.page) || 1;
  const museumParam = searchParams.museum as string | undefined;
  console.log({museumParam});
  const products = await getAllProducts(page, museumParam);

  return (
    <main className="flex mb-10">
      <div className="w-1/4">
        <Filters />
      </div>
      <div className="w-3/4 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
          <div className="w-full">
            <Pagination className="mx-auto">
              <PaginationContent>
                {page > 1 && <PaginationItem>
                  <PaginationPrevious href={`/shop?page=${page-1}`} />
                </PaginationItem>}
                {page > 2 && <>
                  <PaginationItem>
                    <PaginationLink href="/shop?page=1">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>}
                {page > 1 && <PaginationItem>
                  <PaginationLink href={`/shop?page=${page-1}`}>{page-1}</PaginationLink>
                </PaginationItem>}
                <PaginationItem>
                  <PaginationLink href="#" isActive>{page}</PaginationLink>
                </PaginationItem>
                {page + 1 <= totalPages && <PaginationItem>
                  <PaginationLink href={`/shop?page=${page+1}`}>{page+1}</PaginationLink>
                </PaginationItem>}
                {page < (totalPages - 1) && <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`/shop?page=${totalPages}`}>{totalPages}</PaginationLink>
                  </PaginationItem>
                </>}
                {page < totalPages && <PaginationItem>
                  <PaginationNext href={`/shop?page=${page+1}`} />
                </PaginationItem>}
              </PaginationContent>
            </Pagination>
          </div>
      </div>
    </main>
  );
}
