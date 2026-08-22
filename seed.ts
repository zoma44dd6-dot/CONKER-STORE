import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "CONKER Premium Hoodie",
        slug: "conker-premium-hoodie",
        description: "هودي فاخر بتصميم CONKER وخامة مريحة للاستخدام اليومي.",
        price: 899,
        oldPrice: 1099,
        image: "/products/hoodie.jpg",
        category: "ملابس",
        stock: 25,
        featured: true
      },
      {
        name: "CONKER Classic T-Shirt",
        slug: "conker-classic-tshirt",
        description: "تيشيرت CONKER بتصميم بسيط وهوية قوية.",
        price: 449,
        oldPrice: 549,
        image: "/products/tshirt.jpg",
        category: "ملابس",
        stock: 40,
        featured: true
      },
      {
        name: "CONKER Cap",
        slug: "conker-cap",
        description: "كاب بتصميم CONKER.",
        price: 299,
        image: "/products/cap.jpg",
        category: "إكسسوارات",
        stock: 30,
        featured: true
      }
    ]
  });
}

main().finally(() => prisma.$disconnect());