"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authUser } from "../authUser";
import { revalidatePath } from "next/cache";
import { stripe } from "../stripe";
import Stripe from "stripe";
import { CartProduct } from "@/types/Types";

const prisma = new PrismaClient();

export async function fetchCartProducts() {
  const { id } = await authUser();
  const products = await prisma.product.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      productId: true,
    },
  });

  const cartProducts = await Promise.all(
    products.map(async (product) => {
      const stripeProduct = await stripe.products.retrieve(product.productId, {
        expand: ["default_price"],
      });

      const price = stripeProduct.default_price as Stripe.Price;
      const currency = price.currency as string;
      const unitAmount = price.unit_amount as number;

      return {
        id: product.id,
        productId: stripeProduct.id,
        name: stripeProduct.name,
        image: stripeProduct.images[0],
        currency: currency,
        price: unitAmount,
      } as CartProduct;
    })
  );

  return cartProducts;
}

export async function addToCart(productId: string) {
  const { id } = await authUser();
  await prisma.product.create({
    data: {
      productId: productId,

      user: {
        connect: {
          id: id,
        },
      },
    },
  });

  revalidatePath("/");
}

export async function removeCartProducts(productId: string) {
  const { id } = await authUser();

  console.log("product id :", productId, "UserId :", id);

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/cart");
}

export async function isAddedToCart(productId: string) {
  const products = await prisma.product.findFirst({
    where: {
      productId: productId,
    },
  });
  if (products) {
    return true;
  } else {
    return false;
  }
}
