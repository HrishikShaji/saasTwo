"use client";
import { AddProduct } from "@/lib/actions/actions.product";
import React, { useRef } from "react";

const ProductForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  async function handleSubmit(formData: FormData) {
    await AddProduct(formData);
    ref.current?.reset();
  }
  return (
    <form ref={ref} action={handleSubmit} className="flex flex-col gap-2">
      <input
        required
        name="product"
        type="text"
        className="p-2 rounded-md"
        placeholder="Product name"
      />
      <input
        required
        name="price"
        type="text"
        className="p-2 rounded-md"
        placeholder="Price"
      />
      <input
        required
        name="currency"
        type="text"
        className="p-2 rounded-md"
        placeholder="Currency"
      />
      <input
        required
        name="image"
        type="text"
        className="p-2 rounded-md"
        placeholder="Image URL"
      />

      <button className="bg-black text-white rounded-md py-2">Add</button>
    </form>
  );
};

export default ProductForm;
