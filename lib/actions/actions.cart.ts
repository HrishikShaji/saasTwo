"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authUser } from "../authUser";

const prisma = new PrismaClient();

export async function fetchCartProducts() {
  const { id } = await authUser();
  const products = await prisma.product.findMany({
    where: {
      userId: id,
    },
    select: {
      productId: true,
      productCurrency: true,
      productImage: true,
      productName: true,
      productPrice: true,
    },
  });

  console.log(products);

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
      user: {
        connect: {
          id: id,
        },
      },
    },
  });
}
