"use client";
import React from "react";
import Image from "next/image";
import { removeCartProducts } from "@/lib/actions/actions.cart";
import { CartProduct } from "@/types/Types";
import Link from "next/link";

const CartCard: React.FC<CartProduct> = async ({
  id,
  productId,
  name,
  price,
  currency,
  image,
}) => {
  const handleRemove = async () => {
    await removeCartProducts(id);
  };
  return (
    <div className=" p-5 flex  gap-2 justify-between items-center rounded-md bg-neutral-700">
      <Link href={`/product/${productId}`}>
        <Image
          src={image}
          height={1000}
          width={1000}
          alt=""
          className="h-40 w-40"
          style={{ objectFit: "contain" }}
        />
      </Link>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white">{name}</h1>

        <h1 className="text-white font-semibold">
          {price}
          <span className="text-xs text-gray-200"> {currency}</span>
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
