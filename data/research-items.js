export const researchItemsData = [
  {
    id: "research-supermaven",
    name: "Supermaven",
    type: "tool",
    category: "AI Coding Assistants & Agents",
    website: "https://supermaven.com",
    github: null,
    description: "Ultra-fast AI code autocompletion engine with a 1-million-token context window.",
    discoverySource: "Hacker News & Product Hunt",
    discoveredAt: "2025-01-20",
    evidence: [
      "Acquired by Cursor / Anysphere team in late 2024",
      "Benchmark latency under 50ms for inline completions",
      "Official VS Code and JetBrains extension downloads > 500k"
    ],
    verificationStatus: "approved",
    recommendation: "Merge into main AI Coding directory under subcategory 'AI Code Completion'.",
    notes: "Verified official creator and domain. Team joined Cursor."
  },
  {
    id: "research-roo-code",
    name: "Roo Code",
    type: "tool",
    category: "AI Coding Assistants & Agents",
    website: "https://roocode.com",
    github: "https://github.com/RooVetGit/Roo-Code",
    description: "Autonomous coding assistant for VS Code fork of Cline with custom modes and orchestrations.",
    discoverySource: "GitHub Trending & Reddit r/LocalLLaMA",
    discoveredAt: "2025-01-25",
    evidence: [
      "GitHub repo stars > 12,000",
      "Active daily commits and release cycles",
      "Full MCP support with multi-mode prompt switching"
    ],
    verificationStatus: "approved",
    recommendation: "Publish in Tools & Repositories as open-source agent extension.",
    notes: "Active community fork of Cline with rapid feature iteration."
  },
  {
    id: "research-browserbase",
    name: "Browserbase",
    type: "tool",
    category: "AI Testing & QA Automation",
    website: "https://browserbase.com",
    github: "https://github.com/browserbase",
    description: "Serverless headless browser infrastructure designed specifically for AI agents and web automation.",
    discoverySource: "Twitter / X AI builders",
    discoveredAt: "2025-01-18",
    evidence: [
      "Official integration with Stagehand and Playwright",
      "High concurrency cloud browser execution",
      "Stealth mode, session video recording, captcha solving"
    ],
    verificationStatus: "approved",
    recommendation: "Add to Browser Automation & Cloud Testing category.",
    notes: "Verified enterprise-grade headless browser platform."
  },
  {
    id: "research-stagehand",
    name: "Stagehand",
    type: "repository",
    category: "AI Testing & QA Automation",
    website: "https://stagehand.dev",
    github: "https://github.com/browserbase/stagehand",
    description: "An AI web browsing framework built on Playwright with act(), extract(), and observe() primitives.",
    discoverySource: "GitHub Trending",
    discoveredAt: "2025-01-26",
    evidence: [
      "Open-source TypeScript repository with 10k+ stars",
      "Natural language DOM interaction with zero fragile CSS selectors",
      "Self-healing Playwright automation scripts"
    ],
    verificationStatus: "approved",
    recommendation: "Feature on Trending Repositories tab.",
    notes: "Top trending AI browser agent repository."
  },
  {
    id: "research-deepseek-r1",
    name: "DeepSeek-R1",
    type: "repository",
    category: "Local AI & Inference",
    website: "https://deepseek.com",
    github: "https://github.com/deepseek-ai/DeepSeek-R1",
    description: "Incentivizing reasoning capability in LLMs via reinforcement learning. Open weights release.",
    discoverySource: "Hugging Face & GitHub Trending",
    discoveredAt: "2025-01-22",
    evidence: [
      "Phenomenal global adoption matching OpenAI o1 benchmarks",
      "MIT licensed distilled checkpoints (1.5B to 70B)",
      "Native Ollama and vLLM support within hours of launch"
    ],
    verificationStatus: "approved",
    recommendation: "Add to Repositories & Local AI taxonomy.",
    notes: "Historical milestone in open-source reasoning models."
  },
  {
    id: "research-candidate-unverified",
    name: "AutonomousDevGenX",
    type: "tool",
    category: "AI Coding Assistants & Agents",
    website: "https://fake-devgen-ai-placeholder.io",
    github: null,
    description: "Purported 100% automated AI software engineer with no human intervention.",
    discoverySource: "Reddit promotional spam",
    discoveredAt: "2025-01-28",
    evidence: [
      "Domain unregistered or redirecting to generic template",
      "No working product demo or verifiable GitHub commits",
      "Fails official URL verification step"
    ],
    verificationStatus: "rejected",
    recommendation: "Reject and log in research candidate audit table.",
    notes: "Did not meet quality and authenticity guidelines."
  }
];
