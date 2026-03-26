import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const status = body?.status;

    if (typeof status !== 'string' || !status) {
      return NextResponse.json({ message: "Status inválido" }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: "Erro ao atualizar status do pedido" }, { status: 500 });
  }
}
