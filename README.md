# GuardAgent (`/tools/agent-permissions-manager-firewall`)

> **Runtime Zero-Trust Permission Firewall for AI Agents That Inspects Tool Calls, Blocks Unauthorized Data Access in <3ms, and Logs Data Safety Compliance**

[![Deploy GuardAgent to GitHub Pages](https://github.com/21cabbagee/guard-agent/actions/workflows/deploy.yml/badge.svg)](https://github.com/21cabbagee/guard-agent/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/demo-online-crimson)](https://21cabbagee.github.io/guard-agent/)

---

## 🎯 Executive Summary & Problem Thesis
- **Target Audience:** Chief Information Security Officers (CISOs), DevSecOps engineers, and compliance leads at AI-enabled companies deploying multi-agent workflows.
- **Core Problem:** Autonomous agents are given broad access to SQL databases, file systems, Gmail APIs, and internal company tools. If an agent suffers from a prompt injection or hallucinated parameters, it can dump confidential customer tables, delete cloud resources, or email unauthorized external parties. Traditional firewalls and IAM tools inspect user logins, not autonomous non-human agent actions.
- **GuardAgent Solution:** A drop-in proxy policy layer that halts any agent tool call violating your company's data boundaries in under 3ms, returning `HTTP 403 Forbidden` and providing cryptographic SOC2 audit logs.

---

## 🚀 Key Features (Black Car V1 Scope)
1. **Zero-Trust Policy Rule Engine:** Visual boundary editor defining boundaries (e.g. `Agent_Researcher` cannot read tables containing `ssn` or call `send_email` without human approval).
2. **Tool Call Interceptor Proxy:** Inspects JSON tool invocations before execution, evaluating schema parameters against policy rules with &lt;3ms latency.
3. **Real-Time Security Sandbox:** Flags and blocks malicious prompt injections and data exfiltration patterns with instant `HTTP 403 Forbidden` halting.
4. **Cryptographic Compliance Audit Trail:** Immutable ledger of every inspected, approved, and blocked agent tool call with cryptographic SHA-256 verification and downloadable JSON compliance export.
5. **Founding Customer Advisory Board (CAB) Modal:** Direct capture mechanism offering 10 founding engineering teams a 70% lifetime platform discount ($89/mo instead of $299/mo).

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite 8
- **Styling:** TailwindCSS 3.4 (Zero-trust security aesthetic with crimson/shield-indigo neon accents & glassmorphism)
- **Icons:** Lucide React
- **Animations:** Canvas Confetti + Tailwind Keyframes
- **Deployment:** GitHub Pages via GitHub Actions CI/CD

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/21cabbagee/guard-agent.git
cd guard-agent

# Install dependencies
npm install

# Start local development server
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```

---

## 🌐 Live Deployment
- **URL:** [https://21cabbagee.github.io/guard-agent/](https://21cabbagee.github.io/guard-agent/)
- **Repository:** [https://github.com/21cabbagee/guard-agent](https://github.com/21cabbagee/guard-agent)
