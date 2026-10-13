import React from 'react';
import { Shield, ShieldCheck, Activity, Terminal } from 'lucide-react';

export default function Footer({ onOpenCab }) {
  return (
    <footer className="mt-16 border-t border-white/10 bg-dark-950 py-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-guard-600 to-shield-600 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white">
                Guard<span className="text-guard-400">Agent</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Runtime zero-trust permission firewall for AI agents that inspects tool calls, blocks unauthorized data access in &lt;3ms, and logs data safety compliance.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-guard-300 font-mono">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compatible with LangGraph • CrewAI • AutoGen • OpenAI Swarm • MCP</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Features</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#interceptor-proxy" className="hover:text-guard-400 transition-colors">Tool Call Interceptor Proxy</a></li>
              <li><a href="#policy-rules" className="hover:text-guard-400 transition-colors">Visual Policy Rule Engine</a></li>
              <li><a href="#audit-trail" className="hover:text-guard-400 transition-colors">Cryptographic Audit Trail</a></li>
              <li><button onClick={onOpenCab} className="text-guard-300 hover:text-white font-semibold">Join CAB (70% Off)</button></li>
            </ul>
          </div>

          {/* Target SEO Index */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">SEO Index</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400 font-mono">
              <li>ai agent permissions manager</li>
              <li>llm tool call security firewall</li>
              <li>autonomous agent data boundary governor</li>
              <li>prompt injection tool interceptor</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 GuardAgent Security Inc. All rights reserved. Zero-Trust Autonomous Systems.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">SOC2 Compliance Spec</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Boundary Protocol</span>
            <span>•</span>
            <span className="text-guard-400">V1 Black Car Scope Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
