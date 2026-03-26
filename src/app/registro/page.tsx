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

  const [formData, setFormData] = React.useState({
    nome: '',
    identificador: '', // Will store the WhatsApp number
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

    const telefoneLimpo = formData.identificador.replace(/\D/g, '');
    if (telefoneLimpo.length < 10) {
      setToastMsg('ERRO: NÚMERO DE WHATSAPP INVÁLIDO. INSIRA O DDD E O NÚMERO.');
      setToastType('error');
      setShowToast(true);
      setIsSubmitting(false);
      return;
    }

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

    // REGISTRO REAL COM SUPABASE (API)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          identificador: formData.identificador,
          senha: formData.senha
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setToastMsg(data.message || 'ERRO AO AUTORIZAR ACESSO NO QG.');
        setToastType('error');
        setShowToast(true);
        setIsSubmitting(false);
        return;
      }

      setToastMsg('CONTA CRIADA! PILOTO AUTORIZADO A ENTRAR NO QG!');
      setToastType('success');
      setShowToast(true);
      setIsSubmitting(false);

      // Redirecionamento após 2 segundos
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setToastMsg('ERRO CRÍTICO NO SISTEMA DO QG. VERIFIQUE SUA CONEXÃO.');
      setToastType('error');
      setShowToast(true);
      setIsSubmitting(false);
    }
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
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10"
      >
        {/* LADO ESQUERDO: PERSUASÃO E BENEFÍCIOS */}
        <div className="lg:col-span-5 space-y-4">
           <div className="space-y-3">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-3 py-0.5 rounded-full bg-neon-verde/10 border border-neon-verde/30 text-neon-verde text-[9px] font-black uppercase tracking-[0.2em]"
              >
                Benefícios Exclusivos
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic leading-none text-white tracking-tighter">
                VENHA SER UM <br/><span className="text-neon-verde drop-shadow-[0_0_15px_rgba(0,255,51,0.5)]">PILOTO DE ELITE</span>
              </h2>
              <p className="text-white/40 text-[10px] font-medium leading-relaxed tracking-wider max-w-sm">
                Não é apenas um cadastro. É o seu passaporte para a melhor mecânica do Brasil. 
              </p>
           </div>

           <div className="grid gap-4">
              {[
                { icon: Trophy, title: 'ACESSO A PEÇAS RARAS', desc: 'Estoque exclusivo de itens premium.' },
                { icon: Star, title: 'RANKING DE PILOTOS', desc: 'Pontue e troque por brindes oficiais.' },
                { icon: Bell, title: 'RASTREAMENTO REAL', desc: 'Acompanhe cada ajuste na sua moto.' }
              ].map((item, id) => (
                <motion.div 
                  key={id} 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + (id * 0.1) }}
                  className="flex gap-3 group cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-aco-grad border-chrome flex items-center justify-center group-hover:border-neon-verde transition-colors shadow-chrome group-hover:shadow-neon">
                     <item.icon className="text-white/40 group-hover:text-neon-verde transition-colors" size={18} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white mb-0.5 group-hover:text-neon-verde transition-colors">{item.title}</h3>
                    <p className="text-[9px] text-white/30 tracking-wider leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
           </div>

           {/* RETORNAR AO LOGIN (LATERAL) */}
           <Link href="/login" className="block outline-none">
             <motion.div
               initial={{ x: -30, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="mt-8 p-6 bg-aco-grad border-chrome/30 rounded-2xl relative overflow-hidden group hover:border-neon-verde/30 transition-all shadow-xl cursor-pointer"
             >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white/30 text-[8px] font-black uppercase tracking-widest mb-1">JÁ POSSUI ACESSO AO QG?</p>
                    <h3 className="text-xl font-display font-black uppercase italic text-white leading-none group-hover:text-neon-verde transition-colors">EFETUAR LOGIN</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-neon-verde/10 border border-neon-verde/20 flex items-center justify-center text-neon-verde group-hover:bg-neon-verde group-hover:text-black transition-all shadow-neon">
                    <ChevronLeft size={24} />
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-0 p-1 opacity-5">
                   <ShieldCheck size={40} />
                </div>
             </motion.div>
           </Link>
        </div>

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className="lg:col-span-7">
           <div className="bg-aco-grad border-chrome p-6 md:p-8 rounded-[2rem] relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-verde/20 animate-[scan_6s_linear_infinite] pointer-events-none"></div>

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-black uppercase italic tracking-tighter text-metallic leading-none">
                    REGISTRO <span className="text-white">OFICIAL</span>
                  </h1>
                </div>
                <div className="px-2 py-0.5 bg-black/40 border border-white/5 rounded-lg text-white/20 text-[7px] font-black tracking-[0.4em]">DS-PROTO_02</div>
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
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">WhatsApp</label>
                      <div className="relative group/input">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                        <input 
                          type="tel" 
                          name="identificador"
                          value={formData.identificador}
                          onChange={handleInputChange}
                          required
                          placeholder="SEU WHATSAPP COM DDD..."
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
                      Eu aceito os <span className="text-neon-verde">protocolos de segurança</span> e desejo aderir ao sistema oficial.
                    </label>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-verde py-4 rounded-2xl text-black font-display font-black uppercase italic text-xl tracking-widest shadow-neon hover:shadow-neon-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-50 disabled:cursor-wait"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                       <div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                       SINCROZINANDO...
                    </div>
                  ) : (
                    <>
                      AUTORIZAR MEU ACESSO
                      <UserPlus size={24} className="group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
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
