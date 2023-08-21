"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authUser } from "../authUser";
import { revalidatePath } from "next/cache";

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
      productCurrency: true,
      productImage: true,
      productName: true,
      productPrice: true,
      addedToCart: true,
    },
  });

  return products;
}

interface Product {
  productId: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productCurrency: string;
}

export async function addToCart(product: Product) {
  const { id } = await authUser();
  await prisma.product.create({
    data: {
      productId: product.productId,
      productImage: product.productImage,
      productName: product.productName,
      productPrice: Number(product.productPrice),
      productCurrency: product.productCurrency,
      addedToCart: true,
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
