import { NextResponse } from "next/server";
import { destroySession } from "@/lib/session";

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ success: true, message: "SESSÃO ENCERRADA." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "ERRO AO ENCERRAR SESSÃO." }, { status: 500 });
  }
}
