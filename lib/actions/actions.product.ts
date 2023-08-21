"use server";

import { revalidatePath } from "next/cache";
import { stripe } from "../stripe";
import Stripe from "stripe";
import { Product } from "@/types/Types";

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
      productId: product.id,
      name: product.name,
      image: product.images[0],
      currency: product.default_price?.currency,
      price: product.default_price?.unit_amount,
    } as Product;
  });

  return products;
}

export async function fetchProduct(productId: string) {
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;
  const currency = price.currency as string; // Explicitly cast currency
  const unitAmount = price.unit_amount as number; // Explicitly cast unit_amount

  return {
    productId: product.id,
    name: product.name,
    image: product.images[0],
    currency: currency,
    price: unitAmount,
  } as Product;
}
