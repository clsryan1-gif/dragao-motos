'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/ui/FadeIn';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, User, MessageSquare, Motorbike, ChevronRight, CheckCircle2, Zap, Settings, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO, SERVICES_DATA } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/contact';

export default function AgendamentoPage() {
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    moto: '',
    mensagem: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'whatsapp') {
      // Máscara simples para (00) 00000-0000
      const x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      if (x) {
        const maskedValue = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        setFormData(prev => ({ ...prev, [name]: maskedValue.slice(0, 15) }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedService) newErrors.servico = "Por favor, escolha um dos planos de revisão acima.";
    if (!formData.nome.trim()) newErrors.nome = "Precisamos saber o seu nome.";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "Como vamos entrar em contato? Informe seu WhatsApp.";
    if (formData.whatsapp.replace(/\D/g, '').length < 10) newErrors.whatsapp = "Este número parece estar incompleto.";
    if (!formData.moto.trim()) newErrors.moto = "Diga pra gente qual sua moto para prepararmos as ferramentas certas.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos como tocados para mostrar erros
    setTouched({
      nome: true,
      whatsapp: true,
      moto: true,
      servico: true
    });

    if (!validate()) {
      // Scroll para o primeiro erro
      const firstError = document.querySelector('.text-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    // Gerar mensagem para WhatsApp
    const serviceName = SERVICES_DATA.find(s => s.id === selectedService)?.title || 'Serviço Geral';
    
    // Texto bonito e chamativo da Dragão Motos
    const intro = `Olá Dragão Motos! 🐉🔥%0A%0A` +
      `Gostaria de agendar uma *${serviceName}* para minha máquina! 🛠️⚡%0A%0A` +
      `*DETALHES DO AGENDAMENTO:*%0A` +
      `• *Nome:* ${formData.nome}%0A` +
      `• *Moto:* ${formData.moto}%0A` +
      `• *WhatsApp:* ${formData.whatsapp}%0A`;
    
    const extraMsg = formData.mensagem ? `%0A*MENSAGEM:* ${formData.mensagem}%0A` : '';
    const footer = `%0AEstou pronto para dar a potência e o cuidado que minha moto merece! Aguardo o retorno do monstro mecânico! 🏁👊`;
    
    const text = intro + extraMsg + footer;
    
    // Usando o utilitário centralizado para gerar o link do WhatsApp
    const waLink = getWhatsAppLink(text);
    window.open(waLink, '_blank');
    setIsSubmitted(true);
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'express': return <Zap className="w-6 h-6" />;
      case 'stander': return <Settings className="w-6 h-6 text-neon-verde" />;
      case 'premium': return <ShieldCheck className="w-6 h-6" />;
      case 'revitalizacao': return <Sparkles className="w-6 h-6" />;
      default: return <Motorbike className="w-6 h-6" />;
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-preto-profundo text-white">
        <Navbar />
        <div className="pt-24 pb-12 md:pt-32 md:pb-20 px-6 flex flex-col items-center justify-center text-center">
          <FadeIn>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-neon-verde/20 rounded-full flex items-center justify-center mb-6 md:mb-8 border border-neon-verde shadow-neon">
              <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-neon-verde" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 uppercase italic tracking-tighter">Solicitação Enviada!</h1>
            <p className="text-white/60 text-xl max-w-md mx-auto mb-10 font-sans">
              Sua solicitação foi enviada para o nosso WhatsApp. Em breve um de nossos mecânicos entrará em contato.
            </p>
            <Link href="/">
              <Button variant="neon" size="lg" aria-label="Voltar para a página inicial">
                Voltar para Início
              </Button>
            </Link>
          </FadeIn>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-preto-profundo text-white">
      <Navbar />
      
      <div className="pt-24 pb-12 md:pt-32 md:pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-neon-verde shadow-neon animate-pulse" />
              <span className="font-display tracking-[0.2em] text-neon-verde uppercase text-sm md:text-lg">Agendamento Online</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-display font-bold mb-6 md:mb-8 uppercase italic tracking-tighter leading-none">
              Reserve sua <span className="text-neon-verde">Vaga na Oficina</span>
            </h1>
          </FadeIn>

          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
            {/* Seleção de Serviço */}
            <FadeIn delay={200}>
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-display font-bold uppercase tracking-widest flex items-center gap-3">
                  <Motorbike className="text-neon-verde" /> 1. Qual serviço sua moto precisa?
                </h2>
                {touched.servico && errors.servico && (
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest animate-pulse">{errors.servico}</p>
                )}
                <div role="radiogroup" aria-label="Selecione um serviço" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES_DATA.map((service) => (
                    <button 
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(service.id);
                        setErrors(prev => ({ ...prev, servico: '' }));
                        setTouched(prev => ({ ...prev, servico: true }));
                      }}
                      aria-checked={selectedService === service.id}
                      role="radio"
                      className={`cursor-pointer p-6 border transition-all duration-300 group text-left w-full ${
                        selectedService === service.id 
                        ? 'bg-neon-verde/10 border-neon-verde shadow-neon' 
                        : (touched.servico && errors.servico ? 'bg-red-500/5 border-red-500/50' : 'bg-grafite border-grafite-claro hover:border-white/30')
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`${selectedService === service.id ? 'text-neon-verde' : 'text-white/40 group-hover:text-white/60'}`}>
                          {getServiceIcon(service.id)}
                        </div>
                        {selectedService === service.id && <CheckCircle2 className="text-neon-verde w-5 h-5" />}
                      </div>
                      <h3 className={`text-xl font-display font-bold uppercase mb-2 ${selectedService === service.id ? 'text-neon-verde' : 'text-white'}`}>
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/50">{service.shortDescription}</p>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Informações Pessoais */}
            <FadeIn delay={400}>
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-display font-bold uppercase tracking-widest flex items-center gap-3">
                  <User className="text-neon-verde" /> 2. Fale um pouco sobre você e sua máquina
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-xs uppercase font-bold tracking-widest text-white/50 ml-1 cursor-pointer">Qual seu nome?</label>
                    <input 
                      required
                      id="nome"
                      type="text" 
                      name="nome"
                      value={formData.nome}
                      onChange={(e) => {
                        handleInputChange(e);
                        setTouched(prev => ({ ...prev, nome: true }));
                      }}
                      onBlur={() => setTouched(prev => ({ ...prev, nome: true }))}
                      placeholder="Ex: Ryan Silva (Seu nome completo)"
                      autoComplete="name"
                      enterKeyHint="next"
                      className={`w-full bg-grafite border p-4 focus:border-neon-verde focus:outline-none transition-colors font-sans ${
                        touched.nome && !formData.nome.trim() ? 'border-red-500 bg-red-500/5 animate-shake' : 'border-grafite-claro'
                      }`}
                    />
                    {touched.nome && !formData.nome.trim() && (
                      <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Precisamos do seu nome</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-xs uppercase font-bold tracking-widest text-white/50 ml-1 cursor-pointer">Seu WhatsApp para contato</label>
                    <input 
                      required
                      id="whatsapp"
                      type="tel" 
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => {
                        handleInputChange(e);
                        setTouched(prev => ({ ...prev, whatsapp: true }));
                      }}
                      onBlur={() => setTouched(prev => ({ ...prev, whatsapp: true }))}
                      placeholder="(83) 99999-9999 (Seu WhatsApp)"
                      inputMode="tel"
                      autoComplete="tel"
                      enterKeyHint="next"
                      className={`w-full bg-grafite border p-4 focus:border-neon-verde focus:outline-none transition-colors font-sans ${
                        touched.whatsapp && (!formData.whatsapp.trim() || formData.whatsapp.replace(/\D/g, '').length < 10) ? 'border-red-500 bg-red-500/5 animate-shake' : 'border-grafite-claro'
                      }`}
                    />
                    {touched.whatsapp && !formData.whatsapp.trim() && (
                      <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Informe seu número de contato</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="moto" className="text-xs uppercase font-bold tracking-widest text-white/50 ml-1 cursor-pointer">Qual o modelo e ano da sua moto?</label>
                  <input 
                    required
                    id="moto"
                    type="text" 
                    name="moto"
                    value={formData.moto}
                    onChange={(e) => {
                      handleInputChange(e);
                      setTouched(prev => ({ ...prev, moto: true }));
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, moto: true }))}
                    placeholder="Ex: Honda Hornet 600 - Ano 2012 (Modelo e Ano)"
                    className={`w-full bg-grafite border p-4 focus:border-neon-verde focus:outline-none transition-colors font-sans ${
                      touched.moto && !formData.moto.trim() ? 'border-red-500 bg-red-500/5 animate-shake' : 'border-grafite-claro'
                    }`}
                  />
                  {touched.moto && !formData.moto.trim() && (
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Precisamos saber qual é a máquina</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="mensagem" className="text-xs uppercase font-bold tracking-widest text-white/50 ml-1 cursor-pointer">Quer deixar algum recado ou detalhe extra? (Opcional)</label>
                  <textarea 
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Descreva o que sua moto precisa..."
                    className="w-full bg-grafite border border-grafite-claro p-4 focus:border-neon-verde focus:outline-none transition-colors font-sans resize-none"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="space-y-4">
                {Object.keys(errors).length > 0 && touched.nome && (
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg flex items-center gap-3 animate-shake">
                    <CheckCircle2 className="w-5 h-5 text-red-500 rotate-180" />
                    <p className="text-red-500 text-sm font-bold uppercase tracking-widest">
                      Opa! Quase lá. Preencha os campos destacados em vermelho acima.
                    </p>
                  </div>
                )}
                <Button 
                  type="submit"
                  variant="neon" 
                  size="lg" 
                  className="w-full group"
                  aria-label="Confirmar Agendamento e abrir WhatsApp"
                >
                  Confirmar Agendamento via WhatsApp
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  *Ao clicar, você será enviado para o WhatsApp para dar o OK final.
                </p>
              </div>
            </FadeIn>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
