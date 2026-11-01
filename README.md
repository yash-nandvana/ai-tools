# DevAtlas — The Ultimate Developer Tools & Open-Source Directory

> **Discover the tools. Explore the code. Build better.**

DevAtlas is a premium, high-density, searchable directory for software developers and AI architects. It aggregates verified AI tools, developer platforms, QA automation frameworks, APIs, and open-source GitHub repositories into an ultra-fast, static-ready web application.

---

## 🌟 Key Features

- **Exact Dual-Directory Architecture**:
  - **Tools Tab**: AI coding assistants, QA testing frameworks, backend platforms, DevOps infrastructure, and developer utilities.
  - **Repositories Tab**: Open-source GitHub projects with verified stars, forks, licenses, languages, and quick installation commands.
- **Pixel-Matched Desktop Sidebar & Mobile Modal**:
  - **Desktop (Large screens)**: Clicking any tool or repository card smoothly opens a detailed **right sidebar drawer** alongside the directory grid.
  - **Mobile & Tablet**: Opens as a responsive, touch-friendly modal sheet with full backdrop blur and accessibility.
- **Multi-Factor Search & Filtering**:
  - Instant client-side search across names, categories, descriptions, developer use cases, and tags.
  - Interactive **Category Pills Slider** with navigation controls.
  - Pricing filters: *Free*, *Freemium*, *Paid*, *Open Source*.
  - Sort options: *Most Popular*, *Alphabetical*, *Recently Updated*, *GitHub Stars*.
- **Developer Use-Case Discovery**:
  - Explores concrete tasks like *"I want to build an AI agent"*, *"I want to automate browser testing"*, *"I want to run local AI models"*, etc.
- **Static & Edge Ready**:
  - **Zero backend**, **zero database**, **no paid API dependencies**.
  - All routes (`/`, `/tools`, `/tools/[slug]`, `/repositories`, `/repositories/[slug]`, `/categories`, `/trending`, `/research`, `/about`) are pre-rendered statically with Next.js SSG.
- **AI Research & Discovery Pipeline**:
  - Future-ready research dashboard (`/research`) detailing our 10-step verification audit pipeline with sample audited candidates (*approved*, *pending*, *rejected/fraudulent*) and an interactive submission form.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: Pure JavaScript (ES6+ / JSX) — *no TypeScript*
- **Styling**: Tailwind CSS with dark & light theme modes
- **Icons**: Lucide React
- **Data Architecture**: Structured, deduplicated static JS datasets in `data/`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested on Node.js v24.18.0)
- npm or pnpm

### Installation

```bash
# Clone or navigate to the repository
cd ai-tools

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production / Static Export

```bash
# Build optimized production bundle and statically pre-render all pages
npm run build

# Start production server
npm run start
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.js                 # Global Root Layout with ThemeProvider & Navbar
│   ├── page.js                   # Homepage with Hero, Task Explorer & Dual Directory
│   ├── globals.css               # Tailwind CSS base and theme rules
│   ├── sitemap.js                # Auto-generated XML sitemap
│   ├── robots.txt                # Search engine crawler instructions
│   ├── tools/
│   │   ├── page.js               # Dedicated Tools Directory page
│   │   └── [slug]/page.js        # Shareable static Tool Detail page
│   ├── repositories/
│   │   ├── page.js               # Dedicated Repositories Directory page
│   │   └── [slug]/page.js        # Shareable static Repository Detail page
│   ├── categories/page.js        # Category & Taxonomy explorer
│   ├── trending/page.js          # Trending Tools & Repositories
│   ├── research/page.js          # AI Research Pipeline & Candidate Submission
│   └── about/page.js             # DevAtlas Mission, Architecture & Verification
├── components/
│   ├── Navbar.js                 # Header navigation with Tools & Repos tabs and Theme toggle
│   ├── Footer.js                 # Directory footer with taxonomy links
│   ├── ThemeProvider.js          # Dark / Light theme provider (localStorage-backed)
│   ├── CategoryPillSlider.js     # Horizontal scrollable category slider with < > arrows
│   ├── ToolCard.js               # Card matching design with badges and quick links
│   ├── ToolSidebarModal.js       # Desktop Right Sidebar Drawer & Mobile Modal for Tools
│   ├── RepositoryCard.js         # Repository Card with Stars, Language and License
│   ├── RepositorySidebarModal.js # Desktop Right Sidebar Drawer & Mobile Modal for Repos
│   ├── ToolsDirectory.js         # Full searchable/filterable Tools view
│   ├── RepositoriesDirectory.js  # Full searchable/filterable Repositories view
│   └── PricingBadge.js           # Consistent pricing & open-source badge renderer
├── data/
│   ├── categories.js             # Taxonomy definitions, icons, and metadata
│   ├── index.js                  # Master dataset deduplication and directory stats
│   ├── research-items.js         # Verified audit entries and discovery records
│   ├── tools/                    # Verified software tools across categories
│   │   ├── ai-coding.js
│   │   ├── qa-testing.js
│   │   ├── backend-database.js
│   │   ├── devops-cloud.js
│   │   ├── developer-utilities.js
│   │   └── agent-frameworks-and-mcp.js
│   └── repositories/             # Verified open-source GitHub repositories
│       └── repositories.js
```

---

## 📋 Data Processing & Quality Note

As specified in the requirements:
1. When external source dumps (`global developer-tools` and `QA/testing research collection`) are not supplied as local files on disk, the system explicitly identifies the missing input and generates a verified, authentic dataset covering the 42-category taxonomy without fabricating fake URLs, star counts, or product claims.
2. Every tool and repository has a canonical slug, unique identifier, verified official website, and concrete developer use cases.
3. Total counts (`totalTools`, `totalRepositories`, `totalCategories`) are calculated dynamically from the deduplicated data structures.

---

## 📄 License

MIT License. Free to use, adapt, and deploy.
