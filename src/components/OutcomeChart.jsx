import React, { useState } from 'react';
import { TrendingUp, Shield, ShieldAlert, Zap, DollarSign, Lock, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * OutcomeChart for GuardAgent (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares $18,500/mo cybersecurity consulting retainers & penetration testing agencies ($6 layer)
 * with Autonomous Zero-Trust Agent Permission Proxy Middleware ($1 software layer).
 */
export default function OutcomeChart({
  serviceName = "Autonomous Agent Zero-Trust Permission Firewall",
  defaultTools = 25,
  onCtaClick
}) {
  const [tools, setTools] = useState(defaultTools);

  // Legacy agency/consulting: $650/tool/mo in manual security reviews, IAM audits, pentest contractors
  const legacyServicesCost = tools * 650;
  // GuardAgent automated software fee: $49/mo flat + $12/tool/mo
  const autoSoftwareCost = 49 + (tools * 12);
  const netValueReclaimed = legacyServicesCost - autoSoftwareCost;
  const savingsPercent = Math.round(((legacyServicesCost - autoSoftwareCost) / legacyServicesCost) * 100);

  const maxCost = Math.max(legacyServicesCost, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((autoSoftwareCost / maxCost) * 100), 5);

  return (
    <div className="relative rounded-2xl border border-rose-500/30 bg-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden my-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-900 border-rose-500/40 text-rose-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs $18,500/mo Cybersecurity Firms ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Agent Boundary Security Economics: <span className="text-rose-400">{savingsPercent}% Retainer Slashed</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Julien Bek Thesis: Displacing expensive manual security retainers and SOC pentest farms with sub-3ms inline cryptographic proxy enforcement.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 border border-rose-500/30 rounded-xl p-3">
          <Shield className="w-5 h-5 text-rose-400" />
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Net Monthly Savings</div>
            <div className="text-lg font-black text-rose-400 font-mono">
              +${netValueReclaimed.toLocaleString()}/mo
            </div>
          </div>
        </div>
      </div>

      {/* Slider Control */}
      <div className="my-6 bg-slate-900/60 rounded-xl p-4 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-400" />
            <span>Active External Tools & Endpoints Monitored:</span>
          </label>
          <span className="text-base font-bold text-rose-400 font-mono bg-rose-500/10 px-3 py-0.5 rounded-lg border border-rose-500/20">
            {tools} Tool APIs
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="120"
          value={tools}
          onChange={(e) => setTools(parseInt(e.target.value))}
          className="w-full accent-rose-400 bg-slate-800 rounded-lg cursor-pointer h-2"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>5 Core Endpoints</span>
          <span>50 Production Tools</span>
          <span>120+ Enterprise Agent Mesh</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Legacy Manual Services ($6) */}
        <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Legacy Cybersecurity Retainers</h4>
                <p className="text-xs text-red-300/70">Human Audits & Periodic Pen Tests</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded">
              The $6 Service Layer
            </span>
          </div>

          <div className="space-y-3 mb-6 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">• Security Consultant Retainer:</span>
              <span className="font-mono text-red-400 font-bold">${(tools * 450).toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Vulnerability Response Time:</span>
              <span className="font-mono text-red-400 font-bold">14 - 30 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Accidental Data Leak Liability:</span>
              <span className="font-mono text-red-400 font-bold">${(tools * 200).toLocaleString()}/mo</span>
            </div>
            <div className="border-t border-red-500/20 pt-2 flex justify-between font-bold text-sm">
              <span className="text-white">Total Human Cost:</span>
              <span className="font-mono text-red-400">${legacyServicesCost.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Bar visualization */}
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-red-500/30">
            <div
              className="bg-gradient-to-r from-red-600 to-rose-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${legacyBarHeight}%` }}
            />
          </div>
        </div>

        {/* GuardAgent Software Layer ($1) */}
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/15 p-5 relative overflow-hidden shadow-lg shadow-rose-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">GuardAgent Runtime Proxy</h4>
                <p className="text-xs text-rose-300/80">Sub-3ms Inline Zero-Trust Enforcement</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">
              The $1 Software Layer
            </span>
          </div>

          <div className="space-y-3 mb-6 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">• Proxy Interception Latency:</span>
              <span className="font-mono text-rose-400 font-bold">&lt; 2.4 ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Unauthorized SQL / PII Block Rate:</span>
              <span className="font-mono text-rose-400 font-bold">100% Deterministic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Software Fee + Tool Gateways:</span>
              <span className="font-mono text-rose-400 font-bold">${autoSoftwareCost.toLocaleString()}/mo</span>
            </div>
            <div className="border-t border-rose-500/20 pt-2 flex justify-between font-bold text-sm">
              <span className="text-white">Software Price:</span>
              <span className="font-mono text-rose-400">${autoSoftwareCost.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Bar visualization */}
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-rose-500/30">
            <div
              className="bg-gradient-to-r from-rose-500 to-red-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${autoBarHeight}%` }}
            />
          </div>
        </div>
      </div>

      {/* Larry Ellison Economic Guarantee Box */}
      <div className="rounded-xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-red-950/40 border border-rose-500/30 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>The Ellison SLA: $1,000,000 Data Breach Warranty</span>
              <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono">Zero-Trust SLA</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              If an autonomous agent performs an unauthorized tool write through GuardAgent, we provide immediate insurance coverage up to $1M.
            </p>
          </div>
        </div>

        <button
          onClick={onCtaClick}
          className="whitespace-nowrap px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition-all hover:scale-105 active:scale-95"
        >
          Activate Free Firewall
        </button>
      </div>
    </div>
  );
}
