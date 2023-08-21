export interface Product {
  productId: string;
  name: string;
  image: string;
  currency: string;
  price: number;
}

export interface CartProduct {
  id: string;
  productId: string;
  name: string;
  image: string;
  currency: string;
  price: number;
}
