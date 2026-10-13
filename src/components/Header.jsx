import React from 'react';
import { Shield, Sparkles, Activity, Lock, AlertOctagon } from 'lucide-react';

export default function Header({ onOpenCab }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-dark-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-guard-600 to-shield-600 flex items-center justify-center shadow-lg shadow-guard-500/25 border border-guard-400/30">
            <Shield className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                Guard<span className="text-guard-400">Agent</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-guard-500/20 text-guard-300 border border-guard-500/30">
                Zero-Trust Firewall
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Runtime Data Boundary Governor & Tool Interceptor
            </p>
          </div>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900 border border-shield-500/30 text-xs font-mono text-shield-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Proxy Latency: 1.8ms (Zero-Overhead)</span>
          </div>

          <button
            onClick={onOpenCab}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-guard-600 via-rose-600 to-shield-600 text-white shadow-md shadow-guard-500/25 hover:shadow-guard-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all border border-guard-400/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Join Founding CAB (70% Off)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
