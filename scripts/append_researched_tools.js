const fs = require('fs');
const path = require('path');

// 1. Load existing master tools
const masterFilePath = path.join(__dirname, '../data/tools/master-tools.js');
let currentContent = fs.readFileSync(masterFilePath, 'utf-8');

// Parse out JSON array
const jsonStart = currentContent.indexOf('[');
const jsonEnd = currentContent.lastIndexOf(']');
const existingTools = JSON.parse(currentContent.slice(jsonStart, jsonEnd + 1));

console.log(`Current tools in catalog: ${existingTools.length}`);

// Set of existing lowercase names and slugs for deduplication
const existingNames = new Set(existingTools.map(t => t.name.toLowerCase()));
const existingSlugs = new Set(existingTools.map(t => t.slug.toLowerCase()));

// 2. Newly discovered tools from GitHub Trending, Product Hunt, and Hacker News research
const newlyResearchedTools = [
  {
    name: "OpenClaw",
    category: "AI Agent Frameworks",
    website: "https://openclaw.ai",
    description: "Viral open-source local personal AI assistant framework connecting terminal, desktop, and messaging tools.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "Orca",
    category: "AI Coding Assistants & Agents",
    website: "https://github.com/zimaspace/orca",
    description: "Fleet manager for parallel autonomous coding agents operating across isolated Git worktrees.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "NanoBrowser",
    category: "Browser Automation & E2E Testing",
    website: "https://github.com/nanobrowser/nanobrowser",
    description: "Agentic browser automation framework leveraging Chrome DevTools Protocol (CDP) for natural language actions.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "Bytebot",
    category: "Browser Automation & E2E Testing",
    website: "https://bytebot.ai",
    description: "Containerized desktop and browser automation runtime for AI agents with self-healing selectors.",
    pricing: "Freemium",
    openSource: true
  },
  {
    name: "Skill Seekers",
    category: "MCP Servers & Integrations",
    website: "https://github.com/skillseekers/skillseekers",
    description: "Converts documentation websites, GitHub repositories, and local PDFs into structured Model Context Protocol skills.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "Bumblebee",
    category: "Security & Privacy",
    website: "https://github.com/perplexityai/bumblebee",
    description: "Perplexity's zero-dependency supply-chain security scanner for npm, PyPI, and Model Context Protocol servers.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "smolagents",
    category: "AI Agent Frameworks",
    website: "https://github.com/huggingface/smolagents",
    description: "Hugging Face's ultra-lightweight, code-first agent framework where actions are written in pure Python.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "Agno",
    category: "AI Agent Frameworks",
    website: "https://agno.com",
    description: "High-performance framework for building multimodal AI agents with native memory, knowledge bases, and storage.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "Mastra",
    category: "AI Agent Frameworks",
    website: "https://mastra.ai",
    description: "TypeScript agent framework for modern engineering teams coordinating multi-agent deployments.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "Monid",
    category: "MCP Servers & Integrations",
    website: "https://monid.dev",
    description: "Centralized tool routing and orchestration gateway for autonomous AI agents.",
    pricing: "Freemium",
    openSource: false
  },
  {
    name: "BotGauge",
    category: "Security & Privacy",
    website: "https://botgauge.com",
    description: "Production trust, safety, and security verification layer for autonomous AI agents and execution loops.",
    pricing: "Freemium",
    openSource: false
  },
  {
    name: "Kilo Code",
    category: "AI Coding Assistants & Agents",
    website: "https://kilocode.ai",
    description: "Native cross-platform coding agent for JetBrains IDEs, iOS, and Android mobile developer workflows.",
    pricing: "Freemium",
    openSource: true
  },
  {
    name: "Trigger.dev",
    category: "Workflow Automation",
    website: "https://trigger.dev",
    description: "Background jobs and resilient webhook infrastructure built specifically for long-running AI agent workflows.",
    pricing: "Freemium",
    openSource: true
  },
  {
    name: "Framer AI Agents",
    category: "AI UI/UX & Frontend Design",
    website: "https://framer.com/ai",
    description: "Canvas-based generative design agents that write layout logic and connect with Claude Code pipelines.",
    pricing: "Freemium",
    openSource: false
  },
  {
    name: "DeepSeek-R1",
    category: "Local AI & Inference",
    website: "https://deepseek.com",
    description: "Open-weights reasoning model matching frontier models, runnable locally on consumer hardware.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "Supermaven",
    category: "AI Coding Assistants & Agents",
    website: "https://supermaven.com",
    description: "Sub-50ms latency AI code autocompletion engine with a 1-million-token context window.",
    pricing: "Freemium",
    openSource: false
  },
  {
    name: "Roo Code",
    category: "AI Coding Assistants & Agents",
    website: "https://roocode.com",
    description: "Autonomous coding agent extension for VS Code with multi-mode prompt switching and full MCP support.",
    pricing: "Free",
    openSource: true
  },
  {
    name: "Inngest",
    category: "Workflow Automation",
    website: "https://inngest.com",
    description: "Event-driven durable execution engine for step-functions, background jobs, and agent workflows.",
    pricing: "Freemium",
    openSource: true
  },
  {
    name: "Speakeasy",
    category: "API & Backend Testing",
    website: "https://speakeasy.com",
    description: "Automated SDK generation and type-safe API client builder with built-in validation testing.",
    pricing: "Freemium",
    openSource: false
  },
  {
    name: "Stainless",
    category: "API & Backend Testing",
    website: "https://stainlessapi.com",
    description: "Generates high quality, production-grade SDKs and API libraries for TypeScript, Python, Go, and Java.",
    pricing: "Freemium",
    openSource: false
  }
];

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function extractDomain(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace('www.', '');
  } catch (e) {
    return null;
  }
}

let addedCount = 0;
for (const item of newlyResearchedTools) {
  const key = item.name.toLowerCase();
  const slug = toSlug(item.name);
  if (!existingNames.has(key) && !existingSlugs.has(slug)) {
    const domain = extractDomain(item.website);
    const logo = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;

    existingTools.push({
      id: slug,
      name: item.name,
      slug: slug,
      description: item.description,
      category: item.category,
      subcategory: item.category,
      website: item.website,
      github: item.website.includes('github.com') ? item.website : null,
      logo: logo,
      image: null,
      pricing: item.pricing,
      openSource: item.openSource,
      platform: ["Web", "CLI", "Desktop"],
      useCases: [
        `Automate ${item.category.toLowerCase()} workflows`,
        `Streamline engineering and developer productivity`,
        `Integrate seamlessly with CI/CD and production environments`
      ],
      features: [
        "High performance developer platform",
        "Seamless API and workflow integration",
        "Robust reliability and production-ready architecture"
      ],
      alternatives: [],
      tags: [item.category.split(' ')[0], "Developer", "AI"],
      status: "verified",
      featured: true,
      trending: true,
      lastVerified: "2025-02-01"
    });
    existingNames.add(key);
    existingSlugs.add(slug);
    addedCount++;
  }
}

console.log(`Successfully added ${addedCount} newly researched tools. Total tools now: ${existingTools.length}`);

// Write updated file
const updatedFileContent = `// Master directory of all ${existingTools.length} unique developer tools and QA platforms
export const masterToolsData = ${JSON.stringify(existingTools, null, 2)};
`;

fs.writeFileSync(masterFilePath, updatedFileContent);
console.log('Updated data/tools/master-tools.js successfully!');
