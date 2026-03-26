import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Explicitly select and cast allowed fields
    const updateData: any = {};
    if (body.nome !== undefined) updateData.nome = String(body.nome);
    if (body.categoria !== undefined) updateData.categoria = String(body.categoria);
    if (body.compatibilidade !== undefined) updateData.compatibilidade = String(body.compatibilidade);
    if (body.preco !== undefined) updateData.preco = Number(body.preco);
    if (body.estoque !== undefined) updateData.estoque = Number(body.estoque);
    if (body.imagem !== undefined) updateData.imagem = String(body.imagem);
    if (body.ativo !== undefined) updateData.ativo = Boolean(body.ativo);

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: "Erro ao atualizar peça" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Peça removida" });
  } catch (err) {
    return NextResponse.json({ message: "Erro ao remover peça" }, { status: 500 });
  }
}
