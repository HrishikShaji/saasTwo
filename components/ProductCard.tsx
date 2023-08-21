import React from "react";
import Image from "next/image";
import Rating from "./Rating";
import Button from "./Button";
import { isAddedToCart } from "@/lib/actions/actions.cart";
import Link from "next/link";

interface Props {
  productId: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productCurrency: string;
}

const ProductCard: React.FC<Props> = async ({
  productCurrency,
  productId,
  productImage,
  productName,
  productPrice,
}) => {
  const isAdded = await isAddedToCart(productId);
  return (
    <div className=" p-5 flex flex-col gap-2 justify-center items-center rounded-md bg-neutral-700">
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
        <Rating />
        <h1 className="text-white font-semibold">
          {productPrice}
          <span className="text-xs text-gray-200">
            {" "}
            {productCurrency.toUpperCase()}
          </span>
        </h1>
      </div>
      {isAdded ? (
        <Link
          href="/cart"
          className="bg-black text-center hover:bg-neutral-900 text-white rounded-md px-3 py-2 w-full">
          Go To Cart
        </Link>
      ) : (
        <Button
          productId={productId}
          productImage={productImage}
          productName={productName}
          productPrice={productPrice}
          productCurrency={productCurrency}
        />
      )}
    </div>
  );
};

export default ProductCard;
