import CartCard from "@/components/CartCard";
import { fetchCartProducts } from "@/lib/actions/actions.cart";
import React from "react";

interface Product {
  productId: string;
  productImage: string;
  productName: string;
  productPrice: number;
  productCurrency: string;
}

const page = async () => {
  const products = await fetchCartProducts();
  return (
    <div className="w-full flex flex-col gap-2">
      {products.map((product: Product, i: number) => (
        <CartCard
          key={i}
          productCurrency={product.productCurrency}
          productId={product.productId}
          productImage={product.productImage}
          productName={product.productName}
          productPrice={product.productPrice}
        />
      ))}
    </div>
  );
};

export default page;
