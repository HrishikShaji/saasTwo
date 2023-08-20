"use client";
import { addToCart } from "@/lib/actions/actions.cart";
import React from "react";

interface Props {
  productId: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productCurrency: string;
}

const Button: React.FC<Props> = ({
  productId,
  productCurrency,
  productImage,
  productName,
  productPrice,
}) => {
  return (
    <button
      onClick={() =>
        addToCart({
          productId,
          productCurrency,
          productImage,
          productName,
          productPrice,
        })
      }
      className="bg-black hover:bg-neutral-900 text-white rounded-md px-3 py-2 w-full">
      Add to Cart
    </button>
  );
};

export default Button;
