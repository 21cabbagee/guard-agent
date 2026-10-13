import React from 'react';
import { FileText, Download, ShieldCheck, ShieldAlert, AlertTriangle, Key, ExternalLink } from 'lucide-react';

export default function AuditTrailManifest({ auditLogs }) {
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `guardagent-soc2-compliance-manifest-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="audit-trail" className="py-8 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-shield-400" />
              <span>Cryptographic Compliance Audit Trail</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Immutable ledger of every intercepted, evaluated, and blocked agent tool call with cryptographic SHA-256 verification
            </p>
          </div>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 border border-white/10 text-xs font-semibold hover:border-white/20 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-shield-400" />
            <span>Export SOC2 / ISO 27001 Manifest (JSON)</span>
          </button>
        </div>

        {/* Audit Log Table */}
        <div className="glass-panel rounded-2xl overflow-hidden border-white/10 text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-dark-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="py-3 px-4">Timestamp & Latency</th>
                  <th className="py-3 px-4">Agent & Tool</th>
                  <th className="py-3 px-4">Decision</th>
                  <th className="py-3 px-4">Violation / Policy Rationale</th>
                  <th className="py-3 px-4">SHA-256 Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {auditLogs.map((log) => {
                  const isBlocked = log.decision === 'BLOCKED_403';
                  const isPending = log.decision === 'PENDING_APPROVAL';

                  return (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Timestamp & Latency */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-white text-[11px]">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="text-[10px] text-emerald-400">
                          {log.latency} overhead
                        </div>
                      </td>

                      {/* Agent & Tool */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-bold text-white text-[11px]">{log.agentId}</div>
                        <div className="text-slate-400 text-[10px]">{log.toolName}</div>
                      </td>

                      {/* Decision */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isBlocked
                            ? 'bg-guard-500/20 text-guard-300 border border-guard-500/30'
                            : isPending
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {isBlocked && <ShieldAlert className="w-3 h-3" />}
                          {isPending && <AlertTriangle className="w-3 h-3" />}
                          {!isBlocked && !isPending && <ShieldCheck className="w-3 h-3" />}
                          <span>{log.decision}</span>
                        </span>
                      </td>

                      {/* Violation / Rationale */}
                      <td className="py-3 px-4 font-sans text-xs max-w-xs text-slate-300">
                        {log.violation ? (
                          <span className={isBlocked ? 'text-rose-300' : 'text-amber-300'}>
                            {log.violation}
                          </span>
                        ) : (
                          <span className="text-slate-400">Safe pass-through verification.</span>
                        )}
                      </td>

                      {/* Proof */}
                      <td className="py-3 px-4 whitespace-nowrap text-[10px] text-slate-400">
                        <div className="flex items-center gap-1 truncate max-w-[130px]" title={log.sha256Proof}>
                          <Key className="w-3 h-3 text-shield-400 flex-shrink-0" />
                          <span className="truncate">{log.sha256Proof.slice(0, 16)}...</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
