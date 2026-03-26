import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50"); // Previne travar memóriah
    const offset = parseInt(searchParams.get("offset") || "0");

    const products = await prisma.product.findMany({
      where: { ativo: true },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ message: "Erro ao buscar peças no banco" }, { status: 500 });
  }
}
