import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(`login_${ip}`, 10, 60 * 1000)) { // 10 requests per minute
      return NextResponse.json({ message: "MUITAS TENTATIVAS. SISTEMA BLOQUEADO TEMPORARIAMENTE." }, { status: 429 });
    }

    const { identificador, senha } = await req.json();

    if (!identificador || !senha) {
      return NextResponse.json(
        { message: "IDENTIFICADOR E SENHA SÃO OBRIGATÓRIOS." },
        { status: 400 }
      );
    }

    const loginId = identificador.toLowerCase();

    // BYPASS PARA ADMIN (Fallback '1120' se não tiver ENV)
    const adminPassword = process.env.ADMIN_PASSWORD || '1120';
    
    if (loginId === 'ryan' && senha === adminPassword) {
      const adminUser = { id: "admin-ryan-001", name: "RYAN", email: "ryan@dragao.com", role: "ADMIN" };
      await createSession(adminUser);
      return NextResponse.json({
        message: "ACESSO ADMIN AUTORIZADO! BEM-VINDO, RYAN.",
        user: adminUser
      });
    }

    // Criar o formato virtual do WhatsApp
    const waNumber = identificador.replace(/\D/g, '');
    const dummyEmail = waNumber ? `wa_${waNumber}@dragao.com` : loginId;

    // Buscar no banco pelo email virtual ou email legado
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: dummyEmail },
          { email: loginId }
        ]
      }
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
