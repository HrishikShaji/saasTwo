import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/actions/actions.product";
import { authenticatedUser } from "@/lib/actions/actions.user";

export default async function Home() {
  await authenticatedUser();
  const products = await fetchProducts();

  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 p-5 md:grid-cols-5 gap-2">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          productCurrency={product.currency}
          productId={product.id}
          productImage={product.image}
          productName={product.name}
          productPrice={product.price}
        />
      ))}
    </main>
  );
}
