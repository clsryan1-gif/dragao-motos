'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ChevronLeft, ShieldCheck, UserPlus, Gift, Trophy, Star, Bell } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/ui/Toast';

export default function RegistroPage() {
  const router = useRouter();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');
  const [toastType, setToastType] = React.useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form States
  const [formData, setFormData] = React.useState({
    nome: '',
    identificador: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validação de Segurança
    if (formData.senha.length < 4) {
      setToastMsg('ERRO: CÓDIGO DE SEGURANÇA MUITO CURTO. MÍNIMO 4 DÍGITOS.');
      setToastType('error');
      setShowToast(true);
      setIsSubmitting(false);
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setToastMsg('ERRO: OS CÓDIGOS DE SEGURANÇA NÃO COINCIDEM.');
      setToastType('error');
      setShowToast(true);
      setIsSubmitting(false);
      return;
    }

    // Simulação de processamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    setToastMsg('CONTA CRIADA! PILOTO AUTORIZADO. SEU CUPOM DE 10% OFF FOI ATIVADO NO CATÁLOGO!');
    setToastType('success');
    setShowToast(true);
    setIsSubmitting(false);

    // Redirecionamento após 2 segundos
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-preto-profundo flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-verde/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="street-flow"></div>
      </div>

      <Toast 
        isVisible={showToast} 
        message={toastMsg} 
        type={toastType} 
        onClose={() => setShowToast(false)} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10"
      >
        {/* LADO ESQUERDO: PERSUASÃO E BENEFÍCIOS */}
        <div className="lg:col-span-5 space-y-8">
           <div className="space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-4 py-1 rounded-full bg-neon-verde/10 border border-neon-verde/30 text-neon-verde text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Benefícios Exclusivos
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic italic leading-none text-white tracking-tighter">
                VENHA SER UM <br/><span className="text-neon-verde drop-shadow-[0_0_15px_rgba(0,255,51,0.5)]">PILOTO DE ELITE</span>
              </h2>
              <p className="text-white/40 text-xs font-medium leading-relaxed tracking-wider max-w-md">
                Não é apenas um cadastro. É o seu passaporte para a melhor mecânica do Brasil. 
                Sua moto merece tecnologia de ponta e cuidado especializado.
              </p>
           </div>

           <div className="grid gap-6">
              {[
                { icon: Gift, title: '10% OFF NA PRIMEIRA MÃO', desc: 'Sua primeira manutenção completa com desconto imediato.' },
                { icon: Trophy, title: 'ACESSO A PEÇAS RARAS', desc: 'Estoque exclusivo de peças que você não acha em lugar nenhum.' },
                { icon: Star, title: 'RANKING DE PILOTOS', desc: 'Acumule pontos e troque por serviços e brindes oficiais.' },
                { icon: Bell, title: 'RASTREAMENTO EM TEMPO REAL', desc: 'Acompanhe cada ajuste na sua moto direto pelo seu painel.' }
              ].map((item, id) => (
                <motion.div 
                  key={id} 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + (id * 0.1) }}
                  className="flex gap-4 group cursor-default"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-aco-grad border-chrome flex items-center justify-center group-hover:border-neon-verde transition-colors shadow-chrome group-hover:shadow-neon">
                     <item.icon className="text-white/40 group-hover:text-neon-verde transition-colors" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1 group-hover:text-neon-verde transition-colors">{item.title}</h3>
                    <p className="text-[10px] text-white/30 tracking-wider leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className="lg:col-span-7">
           <div className="bg-aco-grad border-chrome p-8 md:p-12 rounded-[3rem] relative overflow-hidden group shadow-2xl">
              {/* Scanline effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-verde/20 animate-[scan_6s_linear_infinite] pointer-events-none"></div>

              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-display font-black uppercase italic tracking-tighter text-metallic leading-none">
                    REGISTRO <span className="text-white">OFICIAL</span>
                  </h1>
                </div>
                <div className="px-3 py-1 bg-black/40 border border-white/5 rounded-lg text-white/20 text-[8px] font-black tracking-[0.4em]">DS-PROTO_02</div>
              </div>

              <form onSubmit={handleRegistro} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Codinome / Nome</label>
                      <div className="relative group/input">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                        <input 
                          type="text" 
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          required
                          placeholder="SEU NOME COMPLETO..."
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 transition-all placeholder:text-white/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Canal / Email</label>
                      <div className="relative group/input">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                        <input 
                          type="text" 
                          name="identificador"
                          value={formData.identificador}
                          onChange={handleInputChange}
                          required
                          placeholder="DIGITE SEU EMAIL OU CANAL..."
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 transition-all placeholder:text-white/5"
                        />
                      </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Código de Segurança</label>
                      <div className="relative group/input">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                        <input 
                          type="password" 
                          name="senha"
                          value={formData.senha}
                          onChange={handleInputChange}
                          required
                          placeholder="MÍNIMO 4 DÍGITOS..."
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 transition-all placeholder:text-white/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Confirmar Código</label>
                      <div className="relative group/input">
                        <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                        <input 
                          type="password" 
                          name="confirmarSenha"
                          value={formData.confirmarSenha}
                          onChange={handleInputChange}
                          required
                          placeholder="REPETIR SUA SENHA..."
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 transition-all placeholder:text-white/5"
                        />
                      </div>
                    </div>
                </div>

                <div className="pt-4 flex items-start gap-4">
                    <input type="checkbox" id="terms" className="mt-1 w-5 h-5 rounded border-white/10 bg-black/40 checked:bg-neon-verde accent-neon-verde cursor-pointer" required />
                    <label htmlFor="terms" className="text-[9px] font-black uppercase tracking-widest text-white/30 leading-relaxed cursor-pointer hover:text-white/50 transition-colors">
                      Eu aceito os <span className="text-neon-verde">protocolos de de segurança</span> e desejo receber o cupom de boas-vindas no meu perfil.
                    </label>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-verde py-5 rounded-2xl text-black font-display font-black uppercase italic text-2xl tracking-widest shadow-neon hover:shadow-neon-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-50 disabled:cursor-wait"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                       <div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                       SINCROZINANDO...
                    </div>
                  ) : (
                    <>
                      AUTORIZAR MEU ACESSO
                      <UserPlus size={28} className="group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <Link href="/login" className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                  <ChevronLeft size={14} /> Já tem acesso? Efetuar Login
                </Link>
                <div className="flex gap-4">
                   <div className="w-10 h-1 md:w-16 bg-white/5 rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-neon-verde w-1/3 animate-pulse"></div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
