"use server";

import { revalidatePath } from "next/cache";
import { stripe } from "../stripe";

export async function AddProduct(formData: FormData) {
  if (formData) {
    const product = String(formData.get("product"));
    const price = String(formData.get("price"));
    const currency = String(formData.get("currency"));
    const image = String(formData.get("image"));

    const addedProduct = await stripe.products.create({
      name: product,
      default_price_data: {
        currency: currency,
        unit_amount_decimal: price,
      },
      images: [image],
    });

    revalidatePath("/product");
  }
}

export async function fetchProducts() {
  const inventory = await stripe.products.list({
    expand: ["data.default_price"],
    active: true,
  });

  const products = inventory.data.map((product: any) => {
    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
      currency: product.default_price?.currency,
      price: product.default_price?.unit_amount,
    };
  });

  return products;
}
