'use client';

import { useState } from 'react';
import { Shield, Trash2, Zap } from "lucide-react";
import { deleteUser, toggleAdmin } from '../actions';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';

export default function UserActions({ userId, currentRole }: { userId: string, currentRole: string }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('DESEJA REALMENTE BANIR ESTE PILOTO DO QG?')) return;
    setLoading(true);
    try {
      await deleteUser(userId);
      showToast('PILOTO BANIDO COM SUCESSO!', 'success');
    } catch (err: any) {
      showToast(err.message || 'ERRO AO BANIR PILOTO', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleAdmin() {
    setLoading(true);
    try {
      await toggleAdmin(userId, currentRole);
      showToast(`CARGO ALTERADO PARA ${currentRole === 'ADMIN' ? 'USER' : 'ADMIN'}!`, 'success');
    } catch (err: any) {
      showToast(err.message || 'ERRO AO ALTERAR CARGO', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2 text-right">
      <button 
        onClick={handleToggleAdmin}
        disabled={loading}
        title="Alterar Cargo"
        className={cn(
          "p-2 rounded-lg border transition-all disabled:opacity-50",
          currentRole === 'ADMIN' 
            ? "bg-neon-verde/20 border-neon-verde/50 text-neon-verde hover:bg-neon-verde hover:text-black" 
            : "bg-white/5 border-white/10 text-white/30 hover:bg-white/10"
        )}
      >
        <Shield size={16} />
      </button>
      <button 
        onClick={handleDelete}
        disabled={loading}
        title="Banir Piloto"
        className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-50"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
