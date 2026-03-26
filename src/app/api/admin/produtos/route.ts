import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, categoria, compatibilidade, preco, estoque, imagem, ativo } = body;

    if (!nome || !categoria || !compatibilidade || preco === undefined || estoque === undefined) {
      return NextResponse.json({ message: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        nome,
        categoria,
        compatibilidade,
        preco: Number(preco),
        estoque: Number(estoque),
        imagem: imagem || '',
        ativo: ativo !== undefined ? Boolean(ativo) : true
      },
    });

    return NextResponse.json(product);
  } catch (err: any) {
    console.error("Erro ao cadastrar peça:", err);
    return NextResponse.json({ message: "Erro ao cadastrar peça" }, { status: 500 });
  }
}
