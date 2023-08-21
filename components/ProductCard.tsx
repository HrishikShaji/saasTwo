import React from "react";
import Image from "next/image";
import Rating from "./Rating";
import Button from "./Button";
import { isAddedToCart } from "@/lib/actions/actions.cart";
import Link from "next/link";

import { fetchProduct } from "@/lib/actions/actions.product";
import CartButton from "./CartButton";

interface ProductCardProps {
  productId: string;
}

const ProductCard: React.FC<ProductCardProps> = async ({ productId }) => {
  const isAdded = await isAddedToCart(productId);
  const product = await fetchProduct(productId);
  return (
    <div className=" p-5 flex flex-col gap-2 justify-center items-center rounded-md bg-neutral-700">
      <Link href={`/product/${productId}`}>
        <Image
          src={product.image}
          height={1000}
          width={1000}
          alt=""
          className="h-40 w-40"
          style={{ objectFit: "contain" }}
        />
      </Link>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white">{product.name}</h1>
        <Rating />
        <h1 className="text-white font-semibold">
          {product.price}
          <span className="text-xs text-gray-200">
            {" "}
            {product.currency.toUpperCase()}
          </span>
        </h1>
      </div>
      <CartButton productId={product.productId} />
    </div>
  );
};

export default ProductCard;
