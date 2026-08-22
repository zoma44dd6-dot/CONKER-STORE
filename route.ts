import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.customer || !body.phone || !body.address || !Array.isArray(body.items) || !body.items.length)
      return NextResponse.json({error:"بيانات الطلب غير مكتملة"}, {status:400});

    const ids = body.items.map((x:any) => x.productId);
    const products = await prisma.product.findMany({where:{id:{in:ids}}});
    let total = 0;

    const items = body.items.map((x:any) => {
      const p = products.find(v => v.id === x.productId);
      if (!p) throw new Error("منتج غير موجود");
      const quantity = Math.max(1, Number(x.quantity || 1));
      if (quantity > p.stock) throw new Error(`الكمية غير متاحة للمنتج: ${p.name}`);
      total += p.price * quantity;
      return {productId:p.id, quantity, price:p.price};
    });

    const order = await prisma.order.create({
      data:{
        customer:body.customer,
        phone:body.phone,
        address:body.address,
        total,
        items:{create:items}
      }
    });

    for (const item of items) {
      await prisma.product.update({
        where:{id:item.productId},
        data:{stock:{decrement:item.quantity}}
      });
    }

    return NextResponse.json({id:order.id, total});
  } catch (e:any) {
    return NextResponse.json({error:e.message || "حدث خطأ"}, {status:400});
  }
}