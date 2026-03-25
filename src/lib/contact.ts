import { CONTACT_INFO } from './constants';

/**
 * Gera um link do WhatsApp formatado corretamente.
 * Extrai apenas os dígitos do número de telefone das constantes.
 * @param message Mensagem opcional a ser enviada
 */
export function getWhatsAppLink(message?: string): string {
  // Extrai apenas os números do link wa.me ou do campo phone
  const phoneDigits = CONTACT_INFO.whatsapp.replace(/\D/g, '');
  
  let url = `https://wa.me/${phoneDigits}`;
  
  if (message) {
    url += `?text=${encodeURIComponent(message)}`;
  }
  
  return url;
}
