import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ type = 'success', message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed top-6 right-6 z-50 animate-bounce-in max-w-md w-full px-4">
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 ${
          isSuccess
            ? 'bg-slate-900/95 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10'
            : 'bg-slate-900/95 border-rose-500/30 text-rose-400 shadow-rose-500/10'
        }`}
      >
        <div className={`p-1.5 rounded-xl shrink-0 ${isSuccess ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        </div>
        <div className="flex-1 pt-0.5">
          <h4 className={`text-xs font-black uppercase tracking-wider ${isSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isSuccess ? 'Success' : 'Registration Error'}
          </h4>
          <p className="text-sm font-semibold text-slate-200 mt-0.5 leading-snug">
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
