import ProductForm from "@/components/ProductForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center flex-grow w-full bg-teal-500">
      <ProductForm />
    </div>
  );
};

export default page;
