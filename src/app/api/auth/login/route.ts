import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // BYPASS ESPECIAL PARA O CHEFE (RYAN) - Mantendo lógica da UI
    if (loginId === 'ryan' && senha === '1120') {
      return NextResponse.json({
        message: "ACESSO ADMIN AUTORIZADO! BEM-VINDO, RYAN.",
        user: { name: "RYAN", role: "ADMIN" }
      });
    }

    // Buscar no banco pelo email
    const user = await prisma.user.findUnique({
      where: { email: loginId }
    });

    if (!user || user.password !== senha) {
      return NextResponse.json(
        { message: "DADOS NÃO RECONHECIDOS PARA ESTE PILOTO." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: `BEM-VINDO DE VOLTA, PILOTO ${user.name.split(' ')[0].toUpperCase()}!`,
      user: { name: user.name, role: user.role }
    });
  } catch (error: any) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "SISTEMA DE IDENTIFICAÇÃO OFFLINE.", error: error.message },
      { status: 500 }
    );
  }
}
