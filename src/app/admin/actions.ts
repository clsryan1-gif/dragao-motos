'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCaixaEntry(formData: FormData) {
  const descricao = formData.get('descricao') as string;
  const tipo = formData.get('tipo') as string;
  const valor = parseFloat(formData.get('valor') as string);
  const categoria = formData.get('categoria') as string || 'GERAL';

  if (!descricao || !tipo || isNaN(valor)) {
    throw new Error("Dados inválidos para o lançamento.");
  }

  await prisma.financeiro.create({
    data: {
      descricao,
      tipo,
      valor,
      categoria,
      data: new Date()
    }
  });

  revalidatePath('/admin/caixa');
  revalidatePath('/admin');
}

export async function deleteUser(userId: string) {
  await prisma.user.delete({
    where: { id: userId }
  });
  revalidatePath('/admin/usuarios');
}

export async function toggleAdmin(userId: string, currentRole: string) {
  const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
  await prisma.user.update({
    where: { id: userId },
    data: { role: nextRole }
  });
  revalidatePath('/admin/usuarios');
}
