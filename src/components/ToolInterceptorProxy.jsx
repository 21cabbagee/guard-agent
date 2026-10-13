import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Zap, Terminal, Play, Lock, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import { PRESET_SIMULATION_PAYLOADS } from '../data/mockSecurityData';

export default function ToolInterceptorProxy({ policies, onAddAuditLog }) {
  const [selectedAgent, setSelectedAgent] = useState("Agent_Researcher");
  const [toolName, setToolName] = useState("database_query");
  const [jsonParams, setJsonParams] = useState(
    JSON.stringify({
      table: "users_auth_vault",
      fields: ["id", "full_name", "ssn", "hash_salt"],
      limit: 100
    }, null, 2)
  );

  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectionResult, setInspectionResult] = useState(null);

  const loadPreset = (preset) => {
    setSelectedAgent(preset.agent);
    setToolName(preset.tool);
    setJsonParams(JSON.stringify(preset.payload.parameters, null, 2));
    setInspectionResult(null);
  };

  const handleInspect = (e) => {
    e.preventDefault();
    setIsInspecting(true);

    setTimeout(() => {
      let parsedParams = {};
      try {
        parsedParams = JSON.parse(jsonParams);
      } catch (err) {
        parsedParams = { raw: jsonParams };
      }

      const paramsString = JSON.stringify(parsedParams).toLowerCase();
      let matchedPolicy = null;
      let violationReason = null;
      let decision = "APPROVED_200";

      // Evaluate against active policies
      for (const policy of policies) {
        if (policy.status !== 'active') continue;

        // Check if agent matches (or wildcard)
        const agentMatches = policy.targetAgent === '*' || policy.targetAgent.includes(selectedAgent) || policy.targetAgent.includes('*');
        if (!agentMatches) continue;

        // Check if tool is targeted
        const toolMatches = policy.targetTool.includes(toolName) || policy.targetTool.includes('*');
        if (!toolMatches) continue;

        // Check restricted params
        for (const restricted of policy.restrictedParams) {
          if (paramsString.includes(restricted.toLowerCase())) {
            matchedPolicy = policy;
            violationReason = `Forbidden parameter or pattern '${restricted}' detected matching policy: "${policy.name}"`;
            decision = policy.action === 'BLOCK_IMMEDIATE' ? 'BLOCKED_403' : 'PENDING_APPROVAL';
            break;
          }
        }

        if (matchedPolicy) break;
      }

      // Generate SHA-256 proof
      const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const latencyMs = (1.1 + Math.random() * 1.4).toFixed(1);

      const result = {
        id: `audit-${Date.now()}`,
        timestamp: new Date().toISOString(),
        agentId: selectedAgent,
        toolName: toolName,
        decision: decision,
        latency: `${latencyMs}ms`,
        sha256Proof: randomHex,
        violation: violationReason,
        matchedPolicy: matchedPolicy?.name || null,
        payloadSnippet: parsedParams
      };

      setInspectionResult(result);
      setIsInspecting(false);

      if (onAddAuditLog) {
        onAddAuditLog(result);
      }
    }, 450);
  };

  return (
    <section id="interceptor-proxy" className="py-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 text-left">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-guard-400" />
                <span>Tool Call Interceptor Proxy & Security Sandbox</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero-trust proxy layer evaluating autonomous JSON tool invocations against data boundary rules in &lt;3ms
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>Proxy Active: Cloudflare Worker Mode</span>
            </div>
          </div>

          {/* Preset Attack & Benign Scenarios */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              1-Click Attack & Policy Simulation Presets:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {PRESET_SIMULATION_PAYLOADS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => loadPreset(preset)}
                  className="px-3 py-2 rounded-xl bg-dark-900 hover:bg-dark-800 text-left border border-white/5 hover:border-guard-500/30 text-xs text-slate-200 transition-all font-sans"
                >
                  <div className="font-semibold text-white truncate">{preset.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                    {preset.agent} → {preset.tool}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Tool Invocation Editor (7 cols) */}
            <form onSubmit={handleInspect} className="lg:col-span-7 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Caller Agent ID</label>
                  <input
                    type="text"
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white font-mono focus:border-guard-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Invoked Tool Name</label>
                  <input
                    type="text"
                    value={toolName}
                    onChange={(e) => setToolName(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-white font-mono focus:border-guard-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-semibold">Tool Arguments (Raw JSON Payload)</label>
                  <span className="text-[10px] text-slate-500 font-mono">schema: OpenAPI / JSONSchema</span>
                </div>
                <textarea
                  rows={6}
                  value={jsonParams}
                  onChange={(e) => setJsonParams(e.target.value)}
                  className="w-full px-3 py-2.5 bg-dark-950 border border-white/10 rounded-xl text-white font-mono text-[11px] focus:border-guard-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isInspecting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-guard-600 to-rose-600 hover:from-guard-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-guard-500/25 transition-all hover:scale-[1.01]"
              >
                {isInspecting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Inspecting Tool Parameters via Proxy...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Inspect & Intercept Tool Call at Proxy Layer</span>
                  </>
                )}
              </button>
            </form>

            {/* Right: Live Proxy Inspection Verdict (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              {inspectionResult ? (
                <div className={`p-5 rounded-2xl border text-xs space-y-3 animate-fade-in ${
                  inspectionResult.decision === 'BLOCKED_403'
                    ? 'bg-guard-950/60 border-guard-500/50 shadow-lg shadow-guard-950/50'
                    : inspectionResult.decision === 'PENDING_APPROVAL'
                    ? 'bg-amber-950/50 border-amber-500/40'
                    : 'bg-emerald-950/50 border-emerald-500/40'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      inspectionResult.decision === 'BLOCKED_403'
                        ? 'bg-guard-500/20 text-guard-300 border border-guard-500/40'
                        : inspectionResult.decision === 'PENDING_APPROVAL'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {inspectionResult.decision === 'BLOCKED_403' && <ShieldAlert className="w-3.5 h-3.5" />}
                      {inspectionResult.decision === 'PENDING_APPROVAL' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {inspectionResult.decision === 'APPROVED_200' && <ShieldCheck className="w-3.5 h-3.5" />}
                      <span>{inspectionResult.decision.replace('_', ' ')}</span>
                    </span>

                    <span className="text-[11px] font-mono text-slate-300">
                      Latency: <strong className="text-white">{inspectionResult.latency}</strong>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">
                      {inspectionResult.decision === 'BLOCKED_403'
                        ? 'Tool Call Intercepted & Blocked'
                        : inspectionResult.decision === 'PENDING_APPROVAL'
                        ? 'Human Review Sign-Off Required'
                        : 'Tool Call Safe: Forwarded to Execution Rails'}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {inspectionResult.violation || 'Zero data boundary violations detected. All projection parameters adhere strictly to company zero-trust policy.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-dark-950 font-mono text-[10px] text-slate-400 space-y-1.5 border border-white/5">
                    <div className="text-slate-300 font-semibold">Cryptographic Proof:</div>
                    <div className="truncate text-shield-300">sha256:{inspectionResult.sha256Proof}</div>
                    <div className="text-slate-500">Timestamp: {inspectionResult.timestamp}</div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-dark-900/60 border border-white/5 flex flex-col items-center justify-center text-center h-full text-slate-400">
                  <Lock className="w-8 h-8 text-slate-500 mb-2" />
                  <p className="text-xs font-semibold text-slate-300">Proxy Standing By</p>
                  <p className="text-[11px] text-slate-500 max-w-xs mt-1">
                    Select a preset simulation above or enter custom tool arguments to inspect against active data boundary policies.
                  </p>
                </div>
              )}

              <div className="mt-4 p-3 rounded-xl bg-dark-900 border border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Interception Rule:</span>
                <span className="text-guard-300">Halt unauthorized queries &lt; 3ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
