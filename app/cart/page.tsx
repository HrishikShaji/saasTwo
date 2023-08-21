import CartCard from "@/components/CartCard";
import { fetchCartProducts } from "@/lib/actions/actions.cart";
import { CartProduct } from "@/types/Types";
import React from "react";

const page = async () => {
  const products = await fetchCartProducts();
  return (
    <div className="w-full flex flex-col gap-2">
      {products.map((product: CartProduct) => (
        <CartCard
          key={product.id}
          id={product.id}
          productId={product.productId}
          name={product.name}
          price={product.price}
          currency={product.currency}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default page;
