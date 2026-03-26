import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { identificador, senha } = await req.json();

    if (!identificador || !senha) {
      return NextResponse.json(
        { message: "IDENTIFICADOR E SENHA SÃO OBRIGATÓRIOS." },
        { status: 400 }
      );
    }

    const loginId = identificador.toLowerCase();

    // BYPASS ESPECIAL PARA O CHEFE (RYAN) - Admin Backdoor
    if (loginId === 'ryan' && senha === '1120') {
      const adminUser = { id: "admin-ryan-001", name: "RYAN", email: "ryan@dragao.com", role: "ADMIN" };
      await createSession(adminUser);
      return NextResponse.json({
        message: "ACESSO ADMIN AUTORIZADO! BEM-VINDO, RYAN.",
        user: adminUser
      });
    }

    // Buscar no banco pelo email
    const user = await prisma.user.findUnique({
      where: { email: loginId }
    });

    if (!user) {
      return NextResponse.json(
        { message: "DADOS NÃO RECONHECIDOS PARA ESTE PILOTO." },
        { status: 401 }
      );
    }

    // Validar Senha Criptografada
    const isPasswordValid = await bcrypt.compare(senha, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "DADOS NÃO RECONHECIDOS PARA ESTE PILOTO." },
        { status: 401 }
      );
    }

    // Criar Sessão JWT (Cookies)
    await createSession(user);

    return NextResponse.json({
      message: `BEM-VINDO DE VOLTA, PILOTO ${user.name.split(' ')[0].toUpperCase()}!`,
      user: { id: user.id, name: user.name, role: user.role }
    });
  } catch (error: any) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "SISTEMA DE IDENTIFICAÇÃO OFFLINE.", error: error.message },
      { status: 500 }
    );
  }
}
