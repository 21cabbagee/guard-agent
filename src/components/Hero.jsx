import React from 'react';
import { Shield, Lock, ShieldAlert, ArrowRight, Zap, Database, Terminal, CheckCircle2 } from 'lucide-react';

export default function Hero({ onJumpToProxy, onJumpToPolicies }) {
  return (
    <section className="relative pt-12 pb-8 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-guard-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-shield-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-guard-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Lock className="w-3.5 h-3.5 text-guard-400" />
          <span>Runtime Zero-Trust Permission Firewall for AI Agents</span>
        </div>

        {/* Exact Target SEO H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Agent Permission Manager: <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-guard-400 via-rose-300 to-shield-300">
            Secure Data Boundaries for Autonomous AI Agents
          </span>
        </h1>

        {/* Value Proposition Body */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Stop autonomous agents from dumping confidential customer records, executing rogue SQL mutations, or emailing external executives unchecked. GuardAgent proxies every tool call in <strong className="text-white">&lt;3ms</strong>, blocking unauthorized parameters with <span className="font-mono text-guard-400 font-bold">HTTP 403 Forbidden</span> and writing cryptographic audit trails.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onJumpToProxy}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-guard-600 to-rose-600 hover:from-guard-500 hover:to-rose-500 text-white font-bold shadow-lg shadow-guard-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>Simulate Tool Call Interceptor</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onJumpToPolicies}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-800/80 hover:bg-dark-750 text-slate-200 font-medium border border-white/10 hover:border-white/20 transition-all"
          >
            <Database className="w-4 h-4 text-shield-400" />
            <span>Configure Policy Rules</span>
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-guard-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Proxy Overhead</span>
            </div>
            <div className="text-xl font-bold text-white">&lt;3ms Latency</div>
            <p className="text-[11px] text-slate-400">Cloudflare edge & Go proxy</p>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-shield-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Security Model</span>
            </div>
            <div className="text-xl font-bold text-shield-300">Zero-Trust</div>
            <p className="text-[11px] text-slate-400">Parameter-level inspection</p>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-rose-400 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Attacks Foiled</span>
            </div>
            <div className="text-xl font-bold text-white">412 Blocked</div>
            <p className="text-[11px] text-slate-400">PII exfiltrations & drops</p>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Market TAM</span>
            </div>
            <div className="text-xl font-bold text-white">$897M TAM</div>
            <p className="text-[11px] text-slate-400">250k AI tech enterprises</p>
          </div>
        </div>
      </div>
    </section>
  );
}
