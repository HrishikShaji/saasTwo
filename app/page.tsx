import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/actions/actions.product";
import { authenticatedUser } from "@/lib/actions/actions.user";
import { Product } from "@/types/Types";

export default async function Home() {
  await authenticatedUser();
  const products = await fetchProducts();

  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 p-5 md:grid-cols-5 gap-2">
      {products?.map((product: Product) => (
        <ProductCard key={product.productId} productId={product.productId} />
      ))}
    </main>
  );
}
