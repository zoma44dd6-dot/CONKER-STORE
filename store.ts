export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
};

export type CartItem = Product & { quantity: number };

export const money = (value: number) =>
  new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0
  }).format(value);