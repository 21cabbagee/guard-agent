import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PolicyRuleEditor from './components/PolicyRuleEditor';
import ToolInterceptorProxy from './components/ToolInterceptorProxy';
import AuditTrailManifest from './components/AuditTrailManifest';
import OutcomeChart from './components/OutcomeChart';
import CabModal from './components/CabModal';
import Footer from './components/Footer';
import { INITIAL_POLICIES, INITIAL_AUDIT_LOGS } from './data/mockSecurityData';

export default function App() {
  const [policies, setPolicies] = useState(INITIAL_POLICIES);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [isCabOpen, setIsCabOpen] = useState(false);

  const handleUpdatePolicies = (updatedPolicies) => {
    setPolicies(updatedPolicies);
  };

  const handleAddAuditLog = (newLog) => {
    setAuditLogs(prev => [newLog, ...prev]);

    // Increment policy enforcedCount if matched
    if (newLog.matchedPolicy) {
      setPolicies(prev =>
        prev.map(p =>
          p.name === newLog.matchedPolicy
            ? { ...p, enforcedCount: p.enforcedCount + 1 }
            : p
        )
      );
    }
  };

  const scrollToProxy = () => {
    document.getElementById('interceptor-proxy')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPolicies = () => {
    document.getElementById('policy-rules')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-guard-500/30 selection:text-white">
      {/* Navigation Header */}
      <Header onOpenCab={() => setIsCabOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onJumpToProxy={scrollToProxy}
          onJumpToPolicies={scrollToPolicies}
        />

        {/* Julien Bek $1:$6 Economic Engine / Larry Ellison SLA Proof */}
        <OutcomeChart onCtaClick={() => setIsCabOpen(true)} />

        {/* Live Tool Call Interceptor Proxy & Security Sandbox */}
        <ToolInterceptorProxy
          policies={policies}
          onAddAuditLog={handleAddAuditLog}
        />

        {/* Visual Zero-Trust Policy Rule Engine */}
        <PolicyRuleEditor
          policies={policies}
          onUpdatePolicies={handleUpdatePolicies}
        />

        {/* Cryptographic Compliance Audit Trail Manifest */}
        <AuditTrailManifest auditLogs={auditLogs} />
      </main>

      {/* Footer */}
      <Footer onOpenCab={() => setIsCabOpen(true)} />

      {/* Founding CAB Program Modal */}
      <CabModal
        isOpen={isCabOpen}
        onClose={() => setIsCabOpen(false)}
      />
    </div>
  );
}
