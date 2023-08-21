import { fetchProduct } from "@/lib/actions/actions.product";
import React from "react";
import Image from "next/image";
import CartButton from "@/components/CartButton";

const page = async ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
  const productId = params.productId;
  const product = await fetchProduct(productId);

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center p-10">
      <Image
        src={product.image}
        width={1000}
        height={1000}
        alt=""
        className="h-[300px] w-[300px]"
      />
      <h1 className="text-white">{product.name}</h1>
      <h1 className="text-white font-semibold">
        {product.price}
        <span className="text-xs text-gray-200">
          {" "}
          {product.currency.toUpperCase()}
        </span>
      </h1>
      <CartButton productId={product.productId} />
    </div>
  );
};

export default page;
