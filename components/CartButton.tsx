import React from "react";
import Link from "next/link";
import { isAddedToCart } from "@/lib/actions/actions.cart";
import Button from "./Button";

interface CartButtonProps {
  productId: string;
}

const CartButton: React.FC<CartButtonProps> = async ({ productId }) => {
  const isAdded = await isAddedToCart(productId);
  return (
    <>
      {isAdded ? (
        <Link
          href="/cart"
          className="bg-black text-center hover:bg-neutral-900 text-white rounded-md px-3 py-2 w-full">
          Go To Cart
        </Link>
      ) : (
        <Button productId={productId} />
      )}
    </>
  );
};

export default CartButton;
