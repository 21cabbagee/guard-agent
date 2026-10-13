export const INITIAL_POLICIES = [
  {
    id: "pol-pii-guard",
    name: "PII & Confidential Data Boundary",
    targetAgent: "Agent_Researcher",
    targetTool: "database_query, vector_search, read_file",
    restrictedParams: ["ssn", "credit_card", "bank_account", "dob", "passwords"],
    action: "BLOCK_IMMEDIATE",
    status: "active",
    enforcedCount: 412,
    description: "Prohibits autonomous retrieval or exfiltration of sensitive identity identifiers and user financial records."
  },
  {
    id: "pol-email-hitl",
    name: "External Email Human-in-the-Loop",
    targetAgent: "SalesOutreach_v2",
    targetTool: "send_external_email, dispatch_slack_dm",
    restrictedParams: ["bulk_recipients", "external_domain", "unverified_leads"],
    action: "REQUIRE_HUMAN_APPROVAL",
    status: "active",
    enforcedCount: 189,
    description: "Forces human operator sign-off before dispatching emails to third-party domains outside verified CRM domains."
  },
  {
    id: "pol-sql-destruct",
    name: "Destructive DDL & Unbounded Mutation Guard",
    targetAgent: "* (All Autonomous Agents)",
    targetTool: "execute_sql_query, run_migration",
    restrictedParams: ["DROP TABLE", "TRUNCATE", "DELETE FROM without WHERE", "ALTER TABLE"],
    action: "BLOCK_IMMEDIATE",
    status: "active",
    enforcedCount: 58,
    description: "Blocks catastrophic irreversible schema mutations and bulk table deletions at runtime proxy layer."
  },
  {
    id: "pol-cloud-infra",
    name: "Cloud Resource Destruction Gate",
    targetAgent: "DevOpsAgent_v1",
    targetTool: "aws_delete_s3, gcloud_storage_rm, destroy_cluster",
    restrictedParams: ["production_env", "k8s_cluster", "primary_vpc"],
    action: "BLOCK_IMMEDIATE",
    status: "active",
    enforcedCount: 14,
    description: "Zero-trust gatekeeper preventing autonomous agent scripts from destroying production infrastructure."
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "audit-9812",
    timestamp: "2026-10-13T23:10:14.218Z",
    agentId: "Agent_Researcher",
    toolName: "database_query",
    decision: "BLOCKED_403",
    latency: "1.8ms",
    sha256Proof: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    violation: "Restricted field 'ssn' detected in SELECT projection.",
    payloadSnippet: {
      query: "SELECT user_id, email, ssn, billing_zip FROM customer_vault WHERE plan = 'enterprise'",
      max_rows: 500
    }
  },
  {
    id: "audit-9811",
    timestamp: "2026-10-13T23:08:42.502Z",
    agentId: "SalesOutreach_v2",
    toolName: "send_external_email",
    decision: "PENDING_APPROVAL",
    latency: "2.1ms",
    sha256Proof: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    violation: "External domain dispatch requires human reviewer sign-off.",
    payloadSnippet: {
      to: "ciso@target-enterprise.com",
      subject: "Partnership Exploration - Q4 Security Stack",
      template: "outbound_exec_v2"
    }
  },
  {
    id: "audit-9810",
    timestamp: "2026-10-13T23:05:19.891Z",
    agentId: "Agent_Researcher",
    toolName: "sec_edgar_lookup",
    decision: "APPROVED_200",
    latency: "1.1ms",
    sha256Proof: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    violation: null,
    payloadSnippet: {
      ticker: "MSFT",
      form: "10-K",
      year: 2026
    }
  },
  {
    id: "audit-9809",
    timestamp: "2026-10-13T23:01:05.114Z",
    agentId: "DevOpsAgent_v1",
    toolName: "execute_sql_query",
    decision: "BLOCKED_403",
    latency: "1.4ms",
    sha256Proof: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    violation: "Restricted SQL command 'DROP TABLE' detected in input string.",
    payloadSnippet: {
      sql: "DROP TABLE legacy_user_sessions_temp CASCADE;",
      database: "prod_core"
    }
  }
];

export const PRESET_SIMULATION_PAYLOADS = [
  {
    name: "🚨 Exfiltration Attack: Query Customer SSNs",
    agent: "Agent_Researcher",
    tool: "database_query",
    expectedOutcome: "BLOCKED_403",
    payload: {
      tool: "database_query",
      parameters: {
        table: "users_auth_vault",
        fields: ["id", "full_name", "ssn", "hash_salt"],
        limit: 100
      }
    }
  },
  {
    name: "⚠️ Unapproved Outbound: Cold Pitch to External CISO",
    agent: "SalesOutreach_v2",
    tool: "send_external_email",
    expectedOutcome: "PENDING_APPROVAL",
    payload: {
      tool: "send_external_email",
      parameters: {
        to: "compliance-officer@fintechcorp.io",
        subject: "Special Offer: Uncapped API Credits",
        body: "Hey! We'd love to connect on your Q4 architecture."
      }
    }
  },
  {
    name: "💥 Destructive Command: Drop Legacy Auth Table",
    agent: "DevOpsAgent_v1",
    tool: "execute_sql_query",
    expectedOutcome: "BLOCKED_403",
    payload: {
      tool: "execute_sql_query",
      parameters: {
        sql: "DROP TABLE users_historical_archive;",
        environment: "production"
      }
    }
  },
  {
    name: "✅ Benign Execution: Public Weather & Analytics Read",
    agent: "Agent_Researcher",
    tool: "public_api_fetch",
    expectedOutcome: "APPROVED_200",
    payload: {
      tool: "public_api_fetch",
      parameters: {
        endpoint: "https://api.weather.gov/gridpoints/TOP/31,80/forecast",
        method: "GET"
      }
    }
  }
];
