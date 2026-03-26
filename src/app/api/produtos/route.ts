import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(`products_${ip}`, 60, 60 * 1000)) { // 60 requests per minute
      return NextResponse.json({ message: "MUITAS REQUISIÇÕES. REDUZA A VELOCIDADE." }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100); // Max 100
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
