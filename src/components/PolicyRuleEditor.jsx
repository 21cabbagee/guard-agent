import React, { useState } from 'react';
import { Database, Plus, Shield, ShieldAlert, Check, X, Trash2, ToggleLeft, ToggleRight, Sparkles, Filter } from 'lucide-react';

export default function PolicyRuleEditor({ policies, onUpdatePolicies }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    targetAgent: 'Agent_Researcher',
    targetTool: 'database_query',
    restrictedParams: '',
    action: 'BLOCK_IMMEDIATE',
    description: ''
  });

  const toggleStatus = (id) => {
    onUpdatePolicies(
      policies.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p)
    );
  };

  const deletePolicy = (id) => {
    onUpdatePolicies(policies.filter(p => p.id !== id));
  };

  const handleAddPolicy = (e) => {
    e.preventDefault();
    if (!newPolicy.name) return;

    const created = {
      id: `pol-${Date.now()}`,
      name: newPolicy.name,
      targetAgent: newPolicy.targetAgent,
      targetTool: newPolicy.targetTool,
      restrictedParams: newPolicy.restrictedParams.split(',').map(s => s.trim()).filter(Boolean),
      action: newPolicy.action,
      status: 'active',
      enforcedCount: 0,
      description: newPolicy.description || 'Custom security policy boundary created by administrator.'
    };

    onUpdatePolicies([created, ...policies]);
    setIsAdding(false);
    setNewPolicy({
      name: '',
      targetAgent: 'Agent_Researcher',
      targetTool: 'database_query',
      restrictedParams: '',
      action: 'BLOCK_IMMEDIATE',
      description: ''
    });
  };

  return (
    <section id="policy-rules" className="py-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-guard-400" />
              <span>Zero-Trust Policy Rule Engine</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Visual boundary editor enforcing data boundaries, forbidden parameter projections, and human-in-the-loop triggers
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-guard-600/90 hover:bg-guard-500 text-white font-bold text-xs shadow-md shadow-guard-500/20 transition-all"
          >
            {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isAdding ? 'Cancel' : 'Add Policy Rule'}</span>
          </button>
        </div>

        {/* Add Policy Form */}
        {isAdding && (
          <form onSubmit={handleAddPolicy} className="glass-panel p-6 rounded-2xl border-guard-500/40 mb-6 text-xs space-y-4 animate-fade-in text-left">
            <div className="font-bold text-white text-sm flex items-center gap-2 text-guard-300">
              <Sparkles className="w-4 h-4" />
              <span>Define New Agent Data Boundary Rule</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Policy Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Strip Unapproved Payment Fields"
                  value={newPolicy.name}
                  onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white focus:border-guard-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Target Agent ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Agent_Researcher or *"
                  value={newPolicy.targetAgent}
                  onChange={(e) => setNewPolicy({ ...newPolicy, targetAgent: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white font-mono focus:border-guard-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Intercepted Tools (Comma-separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. database_query, execute_sql"
                  value={newPolicy.targetTool}
                  onChange={(e) => setNewPolicy({ ...newPolicy, targetTool: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white font-mono focus:border-guard-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Restricted Parameters (Comma-separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ssn, DROP TABLE, password"
                  value={newPolicy.restrictedParams}
                  onChange={(e) => setNewPolicy({ ...newPolicy, restrictedParams: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white font-mono focus:border-guard-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Enforcement Action</label>
                <select
                  value={newPolicy.action}
                  onChange={(e) => setNewPolicy({ ...newPolicy, action: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white focus:border-guard-500 focus:outline-none"
                >
                  <option value="BLOCK_IMMEDIATE">BLOCK_IMMEDIATE (HTTP 403 Forbidden)</option>
                  <option value="REQUIRE_HUMAN_APPROVAL">REQUIRE_HUMAN_APPROVAL (HITL Queue)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Rule Rationale / Description</label>
              <input
                type="text"
                placeholder="Explain the security compliance reason for this boundary..."
                value={newPolicy.description}
                onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white focus:border-guard-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-guard-600 hover:bg-guard-500 text-white font-bold transition-all"
            >
              Deploy Policy Rule to Edge Proxy
            </button>
          </form>
        )}

        {/* Existing Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {policies.map((policy) => {
            const isActive = policy.status === 'active';
            const isBlock = policy.action === 'BLOCK_IMMEDIATE';

            return (
              <div
                key={policy.id}
                className={`glass-panel p-5 rounded-2xl border transition-all ${
                  isActive ? 'border-white/10 hover:border-guard-500/30' : 'border-white/5 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isBlock ? 'bg-guard-950/80 border border-guard-500/40 text-guard-400' : 'bg-shield-950/80 border border-shield-500/40 text-shield-400'
                    }`}>
                      {isBlock ? <ShieldAlert className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{policy.name}</h3>
                      <span className="text-[10px] font-mono text-slate-400">Target: {policy.targetAgent}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStatus(policy.id)}
                      className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                        isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-white/5'
                      }`}
                    >
                      {isActive ? 'Active' : 'Disabled'}
                    </button>
                    <button
                      onClick={() => deletePolicy(policy.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  {policy.description}
                </p>

                <div className="space-y-2 text-[11px] font-mono bg-dark-900/80 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Intercepted Tools:</span>
                    <span className="text-shield-300 font-semibold">{policy.targetTool}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-slate-400 mr-1">Restricted Terms:</span>
                    {policy.restrictedParams.map((param, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-guard-950/80 text-guard-300 border border-guard-500/30 text-[10px]">
                        {param}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-slate-400">Action:</span>
                    <span className={`font-bold ${isBlock ? 'text-guard-400' : 'text-amber-400'}`}>
                      {policy.action}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Enforced at runtime:</span>
                  <span className="font-bold text-white font-mono">{policy.enforcedCount.toLocaleString()} times</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
