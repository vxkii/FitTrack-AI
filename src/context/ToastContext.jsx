import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((options, argMessage, argDuration) => {
    let type = 'info';
    let message = '';
    let duration = 4000;

    // Handle both object syntax: showToast({ type: 'success', message: '...' })
    // and positional syntax: showToast('success', '...')
    if (typeof options === 'string') {
      type = options;
      message = argMessage || '';
      if (argDuration) duration = argDuration;
    } else if (typeof options === 'object' && options !== null) {
      type = options.type || 'info';
      message = options.message || '';
      duration = options.duration || 4000;
    }

    if (!message) return;

    const id = Date.now() + Math.random().toString(36).substring(2, 9);

    setToasts((prevToasts) => [...prevToasts, { id, type, message, duration }]);

    // Automatic dismissal timer
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Reusable Toast Container - Floating top-right overlay, non-blocking to underlying page */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-5 right-0 sm:right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }) {
  const { type, message } = toast;

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          border: 'border-emerald-500/30',
          bg: 'bg-slate-900/95',
          text: 'text-emerald-400',
          iconBg: 'bg-emerald-500/10 text-emerald-400',
          progressBar: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-5 h-5 shrink-0" />,
          title: 'SUCCESS'
        };
      case 'error':
        return {
          border: 'border-rose-500/30',
          bg: 'bg-slate-900/95',
          text: 'text-rose-400',
          iconBg: 'bg-rose-500/10 text-rose-400',
          progressBar: 'bg-rose-500',
          icon: <AlertCircle className="w-5 h-5 shrink-0" />,
          title: 'ERROR'
        };
      case 'warning':
        return {
          border: 'border-amber-500/30',
          bg: 'bg-slate-900/95',
          text: 'text-amber-400',
          iconBg: 'bg-amber-500/10 text-amber-400',
          progressBar: 'bg-amber-500',
          icon: <AlertTriangle className="w-5 h-5 shrink-0" />,
          title: 'WARNING'
        };
      case 'info':
      default:
        return {
          border: 'border-blue-500/30',
          bg: 'bg-slate-900/95',
          text: 'text-blue-400',
          iconBg: 'bg-blue-500/10 text-blue-400',
          progressBar: 'bg-blue-500',
          icon: <Info className="w-5 h-5 shrink-0" />,
          title: 'INFO'
        };
    }
  };

  const style = getStyles();

  return (
    <div
      role="alert"
      className={`pointer-events-auto relative overflow-hidden flex items-start gap-3.5 p-4 rounded-2xl border ${style.border} ${style.bg} backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0 animate-fade-in`}
    >
      <div className={`p-1.5 rounded-xl ${style.iconBg}`}>
        {style.icon}
      </div>

      <div className="flex-1 pt-0.5">
        <h4 className={`text-[11px] font-black uppercase tracking-wider ${style.text}`}>
          {style.title}
        </h4>
        <p className="text-sm font-semibold text-slate-100 mt-0.5 leading-snug">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
