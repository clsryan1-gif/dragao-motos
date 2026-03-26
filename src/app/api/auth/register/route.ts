import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { nome, identificador, senha } = await req.json();

    if (!nome || !identificador || !senha) {
      return NextResponse.json(
        { message: "TODOS OS CAMPOS SÃO OBRIGATÓRIOS." },
        { status: 400 }
      );
    }

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identificador.toLowerCase() },
          { name: nome }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "ESTE PILOTO JÁ ESTÁ CADASTRADO NO QG!" },
        { status: 400 }
      );
    }

    // Criptografar Senha com Bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Criar o novo usuário
    const user = await prisma.user.create({
      data: {
        name: nome,
        email: identificador.toLowerCase(),
        password: hashedPassword,
        role: "USER"
      }
    });

    // Criar Sessão JWT (Cookies)
    await createSession(user);

    return NextResponse.json(
      { message: "CONTA CRIADA! PILOTO AUTORIZADO.", user: { id: user.id, name: user.name, role: user.role } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { message: "ERRO CRÍTICO NO SISTEMA DO QG.", error: error.message },
      { status: 500 }
    );
  }
}
