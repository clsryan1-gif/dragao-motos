'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ChevronRight, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');
  const [toastType, setToastType] = React.useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form States
  const [formData, setFormData] = React.useState({
    identificador: '',
    senha: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loginId = formData.identificador.toLowerCase();

    // BYPASS ESPECIAL PARA O CHEFE (RYAN)
    if (loginId === 'ryan' && formData.senha === '1120') {
      setToastMsg('ACESSO ADMIN AUTORIZADO! BEM-VINDO, RYAN.');
      setToastType('success');
      setShowToast(true);
      setIsSubmitting(false);
      
      // Redirecionamento para o Dashboard de Elite
      setTimeout(() => {
        router.push('/admin');
      }, 1500);
      return;
    }

    // LOGIN REAL COM SUPABASE (API)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identificador: formData.identificador,
          senha: formData.senha
        })
      });

      const data = await response.json();

      if (response.ok) {
        setToastMsg(data.message);
        setToastType('success');
        setShowToast(true);
        setIsSubmitting(false);

        // A Sessão de Segurança (Cookie JWT) já foi criada pelo Backend.
        
        // Redirecionamento 
        setTimeout(() => {
          router.push(data.user.role === 'ADMIN' ? '/admin' : '/');
        }, 1500);
      } else {
        setToastMsg(data.message || 'ERRO NA AUTENTICAÇÃO.');
        setToastType('error');
        setShowToast(true);
        setIsSubmitting(false);
      }
    } catch (error) {
      setToastMsg('SISTEMA DE IDENTIFICAÇÃO OFFLINE. TENTE NOVAMENTE.');
      setToastType('error');
      setShowToast(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-preto-profundo flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-verde/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="street-flow"></div>
      </div>

      <Toast 
        isVisible={showToast} 
        message={toastMsg} 
        type={toastType} 
        onClose={() => setShowToast(false)} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10"
      >
        <div className="lg:col-span-3">
          {/* Logo/Title */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-3 p-3 rounded-2xl bg-aco-grad border-chrome relative group"
            >
              <div className="absolute inset-0 bg-neon-verde/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Zap size={32} className="text-neon-verde relative z-10" />
            </motion.div>
            <h1 className="text-4xl font-display font-black uppercase italic tracking-tighter text-metallic mb-1">
              DRAGÃO <span className="text-white">MOTOS</span>
            </h1>
            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em]">
              Acesso Restrito ao <span className="text-neon-verde">QG</span>
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-aco-grad border-chrome p-6 rounded-[2rem] relative overflow-hidden group shadow-2xl">
            {/* Scanline effect mimic */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-verde/30 animate-[scan_4s_linear_infinite] pointer-events-none"></div>
            
            <div className="mb-4 flex items-center gap-2 text-neon-verde/60">
               <Sparkles size={14} />
               <p className="text-[9px] font-black uppercase tracking-widest italic">Turbine sua moto agora</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">WhatsApp de Acesso</label>
                <div className="relative group/input">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                  <input 
                    type="text" 
                    name="identificador"
                    value={formData.identificador}
                    onChange={handleInputChange}
                    required
                    placeholder="SEU WHATSAPP (EX: 11999999999)"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 focus:ring-1 focus:ring-neon-verde/20 transition-all placeholder:text-white/5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Senha de Ignição</label>
                <div className="relative group/input">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-neon-verde transition-colors" />
                  <input 
                    type="password" 
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    required
                    placeholder="INSERIR CÓDIGO AGORA"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-neon-verde/50 focus:ring-1 focus:ring-neon-verde/20 transition-all placeholder:text-white/5"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <label className="flex items-center gap-2 text-white/40 cursor-pointer hover:text-white/60 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-black/40 checked:bg-neon-verde accent-neon-verde" />
                  Lembrar Conexão
                </label>
                <button type="button" className="text-neon-verde hover:glow-neon transition-all">Recuperar Código</button>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neon-verde py-4 rounded-2xl text-black font-display font-black uppercase italic text-xl tracking-widest shadow-neon hover:shadow-neon-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-50 disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                     <div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                     AUTENTICANDO...
                  </div>
                ) : (
                  <>
                    INICIAR SISTEMAS
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* LATERAL CHAMATIVA: CADASTRO */}
        <div className="lg:col-span-2 h-full flex flex-col justify-center">
          <Link href="/registro" className="block outline-none">
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-aco-grad border-chrome p-8 rounded-[2rem] relative overflow-hidden group shadow-2xl text-center flex flex-col items-center gap-4 hover:border-neon-verde/50 transition-all cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-neon-verde/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.3em]">
                NOVO NA OFICINA?
              </p>
              
              <h2 className="text-3xl font-display font-black uppercase italic leading-none text-white tracking-tighter transition-all group-hover:glow-neon group-hover:text-neon-verde">
                CADASTRAR <br/>NOVO PILOTO
              </h2>
              
              <div className="w-12 h-1 bg-neon-verde/30 rounded-full group-hover:w-20 group-hover:bg-neon-verde transition-all"></div>
              
              <div className="mt-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-neon-verde group-hover:text-black transition-all flex items-center gap-2 group/btn2">
                CRIAR CONTA AGORA
                <ChevronRight size={14} className="group-hover/btn2:translate-x-1 transition-transform" />
              </div>

              <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Zap size={80} />
              </div>
            </motion.div>
          </Link>

          <div className="mt-8 flex items-center justify-center gap-2 text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">
            <ShieldCheck size={12} />
            CONEXÃO ENCRIPTADA • DRAGÃO MOTOS PROTOCOL
          </div>
        </div>
      </motion.div>

    </div>
  );
}
