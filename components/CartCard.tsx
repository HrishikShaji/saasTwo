"use client";
import React from "react";
import Image from "next/image";
import { removeCartProducts } from "@/lib/actions/actions.cart";

interface Props {
  productId: string;
  productImage: string;
  productName: string;
  productPrice: number;
  productCurrency: string;
}

const CartCard: React.FC<Props> = async ({
  productCurrency,
  productId,
  productImage,
  productName,
  productPrice,
}) => {
  const handleRemove = async () => {
    await removeCartProducts(productId);
  };
  return (
    <div className=" p-5 flex  gap-2 justify-between items-center rounded-md bg-neutral-700">
      <Image
        src={productImage}
        height={1000}
        width={1000}
        alt=""
        className="h-40 w-40"
        style={{ objectFit: "contain" }}
      />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white">{productName}</h1>

        <h1 className="text-white font-semibold">
          {productPrice}
          <span className="text-xs text-gray-200"> {productCurrency}</span>
        </h1>
      </div>
      <button
        onClick={handleRemove}
        className="bg-black hover:bg-neutral-900 text-white rounded-md px-3 py-2 w-full">
        Remove from Cart
      </button>
    </div>
  );
};

export default CartCard;
