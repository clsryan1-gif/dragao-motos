import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: body,
    });

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ message: "Erro ao cadastrar peça" }, { status: 500 });
  }
}
