"use client";
import { addToCart } from "@/lib/actions/actions.cart";
import React from "react";

interface ButtonProps {
  productId: string;
}

const Button: React.FC<ButtonProps> = ({ productId }) => {
  return (
    <button
      onClick={() => addToCart(productId)}
      className="bg-black hover:bg-neutral-900 text-white rounded-md px-3 py-2 w-full">
      Add to Cart
    </button>
  );
};

export default Button;
