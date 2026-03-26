import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronLeft, Zap, Shield, CheckCircle2, MessageSquare, Clock, Gauge, Database } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function ProdutoDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  // Extração de Detalhes Específicos se for a "Revisão Completa"
  const isRevisaoCompleta = product.nome.toUpperCase().includes('REVISÃO COMPLETA');
  
  const techSpecs = isRevisaoCompleta ? [
    "Caixa de direção",
    "Lubrificação da balança",
    "Limpeza e higienização",
    "Regulagem de válvula",
    "Troca do filtro de ar"
  ] : [
    "Certificação Dragão Motos",
    "Performance Otimizada",
    "Instalação Inclusa",
    "Garantia de QG"
  ];

  const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse no item: ${product.nome}. Pode me passar mais detalhes?`);
  const whatsappUrl = `https://wa.me/558387426823?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-preto-profundo text-white pt-24 pb-32">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb Tático */}
        <Link href="/produtos" className="inline-flex items-center gap-2 text-white/40 hover:text-neon-verde transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Retornar ao Estoque</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Lado Esquerdo: Visual & Atmosfera */}
          <div className="relative space-y-8">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <Image 
                src={product.imagem || '/images/placeholder-moto.png'} 
                alt={product.nome}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Badge de Status */}
              <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md border border-neon-verde/30 px-4 py-2 rounded-full flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-neon-verde rounded-full animate-pulse" />
                 <span className="text-[9px] font-black text-neon-verde uppercase tracking-widest">Operacional</span>
              </div>
            </div>

            {/* Galeria Auxiliar (Placeholders Cyber) */}
            <div className="grid grid-cols-3 gap-4">
               {[1,2,3].map(i => (
                 <div key={i} className="aspect-video bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/10 italic text-[10px]">
                    ANG-{i} VIEW
                 </div>
               ))}
            </div>
          </div>

          {/* Lado Direito: Dados & Ação */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                 <Database size={14} className="text-neon-verde" />
                 <span className="text-[10px] text-neon-verde font-black uppercase tracking-[0.3em] glow-neon">Especificação de Elite</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-tight mb-4">
                {product.nome}
              </h1>
              <p className="text-white/40 text-sm md:text-lg font-sans leading-relaxed">
                {isRevisaoCompleta 
                  ? "A integração definitiva para sua Fan 160. Ajuste técnico de alta precisão para garantir o máximo desempenho e longevidade do motor."
                  : "Componente de alta performance certificado pela Dragão Motos. Durabilidade extrema e encaixe plug-and-play."
                }
              </p>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-md">
                  <div className="flex items-center gap-2 text-white/40 mb-2">
                    <Gauge size={14} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Compatibilidade</span>
                  </div>
                  <p className="text-xl font-display font-black uppercase italic italic">{product.compatibilidade || 'Universal'}</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-md">
                  <div className="flex items-center gap-2 text-white/40 mb-2">
                    <Clock size={14} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Tempo Estimado</span>
                  </div>
                  <p className="text-xl font-display font-black uppercase italic">{isRevisaoCompleta ? '3.5H' : '45MIN'}</p>
               </div>
            </div>

            {/* Lista Técnica (Vinda da Foto) */}
            <div className="bg-aco-grad border-chrome p-8 rounded-[2.5rem] space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-neon-verde/5 blur-2xl" />
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neon-verde mb-4">Checklist de Operação</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                  {techSpecs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                       <CheckCircle2 size={16} className="text-neon-verde shrink-0 group-hover:scale-110 transition-transform" />
                       <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">{spec}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Preço & CTA */}
            <div className="flex flex-col md:flex-row items-center gap-6 pt-6">
               <div className="flex flex-col items-center md:items-start">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Investimento Total</span>
                  <div className="text-4xl md:text-6xl font-display font-black italic tracking-tighter text-white">
                    {formatCurrency(product.preco)}
                  </div>
               </div>
               
               <Link 
                 href={whatsappUrl}
                 target="_blank"
                 className="flex-1 w-full bg-neon-verde text-black py-6 rounded-2xl flex items-center justify-center gap-4 group hover:shadow-neon hover:scale-[1.02] transition-all"
               >
                 <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
                 <span className="font-display font-black uppercase italic tracking-widest">Agendar no WhatsApp</span>
               </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
